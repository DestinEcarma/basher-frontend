import { Button, ButtonProps } from "@components/button";
import Form from "@components/form";
import { InputBox } from "@components/input-box";
import { LeftSide } from "@components/sides";
import Passowrds from "@features/sign-up/components/passwords";
import useSignUp from "@features/sign-up/hooks/use-sign-up";
import { PASSWORD_REGEX, SignUpFields } from "@features/sign-up/utils/defs";
import { EMAIL_REGEX } from "@utils/defs";
import React from "react";
import { SubmitHandler } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { Link } from "react-router-dom";

const SignUpPage: React.FC = () => {
	const {
		form: {
			register,
			setError,
			handleSubmit,
			formState: { errors },
		},
		apollo: [signUp, { data, loading }],
	} = useSignUp();

	const onSubmit: SubmitHandler<SignUpFields> = ({ email, password, confirmPassword }) => {
		if (password !== confirmPassword) {
			return setError("confirmPassword", { message: "Password does not match" });
		}

		signUp({ variables: { input: { email, password } } });
	};

	const emailAttributes = {
		label: "Email",
		error: errors.email?.message,

		children: (
			<LeftSide>
				<MdAlternateEmail className="text-lg" />
			</LeftSide>
		),

		...register("email", {
			required: "Email is required",
			pattern: {
				value: EMAIL_REGEX,
				message: "Field must be a valid email",
			},
		}),
	};

	const passwordsAttributes = {
		password: {
			error: errors.password?.message,

			...register("password", {
				required: "Password is required",
				minLength: {
					value: 8,
					message: "Password must be at least 8 characters",
				},
				validate: (value) => {
					if (value.match(PASSWORD_REGEX)) return true;

					return "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special charact";
				},
			}),
		},

		confirmPassword: {
			error: errors.confirmPassword?.message,

			...register("confirmPassword", {
				required: "Confirm Password is required",
			}),
		},
	};

	const submitAttributes = {
		type: "submit",
		size: "w-full",
		className: "flex items-center justify-center",
		disabled: loading || !!data,

		children: loading ? (
			<AiOutlineLoading3Quarters className="my-1 animate-spin" />
		) : data ? (
			<FaCheck />
		) : (
			"Sign Up"
		),
	} as ButtonProps;

	return (
		<Form onSubmit={handleSubmit(onSubmit)} size="w450px">
			<h1 className="mb-4 text-center text-4xl font-bold">Sign Up</h1>
			<div className="flex flex-col gap-4">
				<InputBox {...emailAttributes} />
				<Passowrds {...passwordsAttributes} />
				<Button {...submitAttributes} />
				<p className="text-center text-sm">
					Already have an account?
					<Link to="/login" className="ml-2 text-blue-500">
						Login
					</Link>
				</p>
			</div>
		</Form>
	);
};

export default SignUpPage;
