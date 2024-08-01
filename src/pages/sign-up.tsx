import { useMutation } from "@apollo/client";
import Button from "@components/button";
import Form from "@components/form";
import InputBox from "@components/input-box";
import { LeftSide, RightSide } from "@components/sides";
import { PASSWORD_REGEX, SIGN_UP, SignUpFields } from "@features/sign-up/defs";
import useShowPassword from "@hooks/use-show-password";
import { GraphqlErrorType } from "@services/graphql";
import { EMAIL_REGEX } from "@utils/defs";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CgLock } from "react-icons/cg";
import { MdAlternateEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SignUpPage: React.FC = () => {
	const navigate = useNavigate();

	const [showPassword, ShowPasswordButton] = useShowPassword();
	const [signUp, { data, loading, error }] = useMutation(SIGN_UP);
	const {
		register,
		setError,
		handleSubmit,
		formState: { errors },
	} = useForm<SignUpFields>();

	useEffect(() => {
		if (!error) return;

		error.graphQLErrors.forEach(({ message }) => {
			if (message !== GraphqlErrorType.EMAIL_TAKEN) return;

			setError("email", { message: "Email is already taken" });
		});
	}, [error, setError]);

	useEffect(() => {
		if (!data) return;

		const onClose = () => navigate("/forum");

		toast.success("Signed up successfully", {
			duration: 3000,
			onDismiss: onClose,
			onAutoClose: onClose,
		});
	}, [data, navigate]);

	const onSubmit: SubmitHandler<SignUpFields> = ({ email, password, confirmPassword }) => {
		if (password !== confirmPassword) {
			return setError("confirmPassword", { message: "Password does not match" });
		}

		signUp({ variables: { input: { email, password } } });
	};

	const passwordType = showPassword ? "text" : "password";

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
							if (value.match(PASSWORD_REGEX)) return true;

							return "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special charact";
						},
					})}
				>
					<LeftSide>
						<CgLock className="text-lg" />
					</LeftSide>
					<RightSide>
						<ShowPasswordButton />
					</RightSide>
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
					<RightSide>
						<ShowPasswordButton />
					</RightSide>
				</InputBox>
				<Button type="submit" size="w-full" className="flex items-center justify-center" disabled={loading}>
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
