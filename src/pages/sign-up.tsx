import React, { useState } from "react";
import Form from "@components/form";
import Button from "@components/button";
import InputBox from "@components/input-box";
import useShowPassword from "@components/use-show-password";
import { CgLock } from "react-icons/cg";
import { EMAIL_REGEX } from "@utils/defs";
import { MdAlternateEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { LeftSide, RightSide } from "@components/sides";
import { SubmitHandler, useForm } from "react-hook-form";
import { signUp, SignUpResults } from "@features/sign-up/api";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface SignUpFields {
	email: string;
	password: string;
	confirmPassword: string;
}

const SignUpPage: React.FC = () => {
	const navigate = useNavigate();

	const [showPassword, setShowPassword] = useShowPassword();
	const [loading, setLoading] = useState(false);
	const {
		register,
		setError,
		handleSubmit,
		formState: { errors },
	} = useForm<SignUpFields>();

	const passwordType = showPassword ? "text" : "password";

	const onSubmit: SubmitHandler<SignUpFields> = async ({ email, password, confirmPassword }) => {
		if (password !== confirmPassword) {
			setError("confirmPassword", { message: "Password does not match" });
			return;
		}

		setLoading(true);
		try {
			const response = await signUp(email, password);
			switch (response) {
				case SignUpResults.EMAIL_TAKEN:
					setError("email", { message: "Email is already taken" });
					setLoading(false);
					return;
				case SignUpResults.BAD_REQUEST:
					alert("Bad Request");
					setLoading(false);
					return;
				case SignUpResults.INTERNAL_SERVER_ERROR:
					alert("Internal Server Error");
					setLoading(false);
					return;
				case SignUpResults.SUCCESS:
					break;
				default:
					setLoading(false);
					return;
			}

			navigate("/forum");
		} catch (error) {
			alert("An error occurred during sign up");
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)} size="w450px">
			<h1 className="mb-4 text-center text-4xl font-bold">Sign Up</h1>
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
					type={passwordType}
					error={errors.password?.message}
					{...register("password", {
						required: "Password is required",
						minLength: {
							value: 8,
							message: "Password must be at least 8 characters",
						},
						validate: (value) => {
							if (value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
								return true;
							}

							return "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
						},
					})}
				>
					<LeftSide>
						<CgLock className="text-lg" />
					</LeftSide>
					<RightSide>{setShowPassword}</RightSide>
				</InputBox>
				<InputBox
					label="Confirm Password"
					type={passwordType}
					error={errors.confirmPassword?.message}
					{...register("confirmPassword", {
						required: "Confirm Password is required",
					})}
				>
					<LeftSide>
						<CgLock className="text-lg" />
					</LeftSide>
					<RightSide>{setShowPassword}</RightSide>
				</InputBox>
				<Button type="submit" size="full" className="flex items-center justify-center" disabled={loading}>
					{loading ? <AiOutlineLoading3Quarters className="my-1 animate-spin" /> : "Sign Up"}
				</Button>
				<p className="flex justify-center gap-2 text-sm">
					Already have an account?
					<Link to="/login" className="text-blue-500">
						Login
					</Link>
				</p>
			</div>
		</Form>
	);
};

export default SignUpPage;