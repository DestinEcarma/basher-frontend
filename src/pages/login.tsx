import { Button, ButtonProps } from "@components/button";
import CheckBox from "@components/checkbox";
import Form from "@components/form";
import { InputBox } from "@components/input-box";
import { LeftSide } from "@components/sides";
import Passowrd from "@features/login/components/password";
import useLogin from "@features/login/hooks/use-login";
import { LoginFields } from "@features/login/utils/defs";
import { EMAIL_REGEX } from "@utils/defs";
import React from "react";
import { SubmitHandler } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { Link } from "react-router-dom";

const LoginPage: React.FC = () => {
	const {
		form: {
			register,
			handleSubmit,
			formState: { errors },
		},
		apollo: [login, { data, loading }],
	} = useLogin();

	const onSubmit: SubmitHandler<LoginFields> = ({ email, password, rememberMe }) => {
		login({ variables: { input: { email, password, rememberMe } } });
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

	const passwordAttributes = {
		error: errors.password?.message,

		...register("password", { required: "Password is required" }),
	};

	const rememberMeAttributes = {
		label: "Remember Me",

		...register("rememberMe"),
	};

	const submitAttributes = {
		type: "submit",
		size: "w-full",
		className: "flex items-center justify-center",
		disabled: loading || !!data,
		children: loading ? <AiOutlineLoading3Quarters className="my-1 animate-spin" /> : data ? <FaCheck /> : "Login",
	} as ButtonProps;

	return (
		<Form onSubmit={handleSubmit(onSubmit)} size="w450px">
			<h1 className="mb-4 text-center text-4xl font-bold">Login</h1>
			<div className="flex flex-col gap-4">
				<InputBox {...emailAttributes} />
				<Passowrd {...passwordAttributes} />
				<div className="flex items-center justify-between">
					<CheckBox {...rememberMeAttributes} />
					<Link to="/login" className="text-sm text-blue-500">
						Forgot password?
					</Link>
				</div>
				<Button {...submitAttributes} />
				<p className="text-center text-sm">
					Don't have an account?
					<Link to="/sign-up" className="ml-2 text-blue-500">
						Sign Up
					</Link>
				</p>
			</div>
		</Form>
	);
};

export default LoginPage;
