import React from "react";
import Form from "@components/form";
import Button from "@components/button";
import CheckBox from "@components/checkbox";
import InputBox from "@components/input-box";
import useShowPassword from "@components/use-show-password";
import { CgLock } from "react-icons/cg";
import { MdAlternateEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { LeftSide, RightSide } from "@components/sides";
import { login, LoginResults } from "@features/Form/services/login";
import { SubmitHandler, useForm } from "react-hook-form";
import { EMAIL_REGEX } from "@utils/defs";

interface LoginFields {
	email: string;
	password: string;
	rememberMe: boolean;
}

const LoginPage: React.FC = () => {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useShowPassword();

	const {
		register,
		setError,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFields>({ defaultValues: { rememberMe: false } });

	const onSubmit: SubmitHandler<LoginFields> = async ({ email, password, rememberMe }) => {
		try {
			const response = await login(email, password, rememberMe);

			switch (response) {
				case LoginResults.EMAIL_NOT_FOUND:
					setError("email", { message: "Email not found" });
					return;
				case LoginResults.INVALID_PASSWORD:
					setError("password", { message: "Invalid password" });
					return;
				case LoginResults.BAD_REQUEST:
					alert("Bad Request");
					return;
				case LoginResults.INTERNAL_SERVER_ERROR:
					alert("Internal Server Error");
					return;
				case LoginResults.SUCCESS:
					break;
				default:
					alert("Unkown error");
					return;
			}

			navigate("/forum");
		} catch (error) {
			alert("An error occurred during login");
			console.error(error);
		}
	};

	console.log(
		register("email", {
			required: "Email is required",
			pattern: {
				value: EMAIL_REGEX,
				message: "Field must be a valid email",
			},
		}),
	);

	return (
		<Form onSubmit={handleSubmit(onSubmit)} size="w450px">
			<h1 className="mb-4 text-center text-4xl font-bold">Login</h1>
			<div className="flex flex-col gap-4">
				<InputBox
					label="Email"
					error={errors.email?.message}
					{...register("email", {
						required: "Email is required",
						pattern: {
							value: EMAIL_REGEX,
							message: "Field must be a valid email",
						},
					})}
				>
					<LeftSide>
						<MdAlternateEmail className="text-lg" />
					</LeftSide>
				</InputBox>
				<InputBox
					label="Password"
					error={errors.password?.message}
					type={showPassword ? "text" : "password"}
					{...register("password", { required: "Password is required" })}
				>
					<LeftSide>
						<CgLock className="text-lg" />
					</LeftSide>
					<RightSide>{setShowPassword}</RightSide>
				</InputBox>
				<div className="flex items-center justify-between">
					<CheckBox label="Remember Me" {...register("rememberMe")} />
					<Link to="/login" className="text-sm text-blue-500">
						Forgot password?
					</Link>
				</div>
				<Button type="submit" size="full">
					Login
				</Button>
				<p className="flex justify-center gap-2 text-sm">
					Don't have an account?
					<Link to="/sign-up" className="text-blue-500">
						Sign Up
					</Link>
				</p>
			</div>
		</Form>
	);
};

export default LoginPage;
