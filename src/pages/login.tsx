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

const LoginPage: React.FC = () => {
	const navigate = useNavigate();

	const [showPassword, setShowPassword] = useShowPassword();
	const [{ emailError, passwordError }, setError] = React.useState({
		emailError: "",
		passwordError: "",
	});

	const [{ email, password, rememberMe }, setForm] = React.useState({
		email: "",
		password: "",
		rememberMe: false,
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, checked } = e.target;

		if (name === "rememberMe") {
			return setForm((prev) => ({ ...prev, [name]: checked }));
		}

		setForm((prev) => ({ ...prev, [name]: value }));
		setError((prev) => ({ ...prev, [`${name}Error`]: "" }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!email) {
			return setError((prev) => ({ ...prev, emailError: "Email is required" }));
		}

		if (!password) {
			return setError((prev) => ({ ...prev, passwordError: "Password is required" }));
		}

		setError({ emailError: "", passwordError: "" });

		try {
			const response = await login(email, password, rememberMe);

			switch (response) {
				case LoginResults.EMAIL_NOT_FOUND:
					setError((prev) => ({ ...prev, emailError: "Email not found" }));
					return;
				case LoginResults.INVALID_PASSWORD:
					setError((prev) => ({ ...prev, passwordError: "Invalid password" }));
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

	return (
		<Form onSubmit={handleSubmit} size="w450px">
			<h1 className="mb-4 text-center text-4xl font-bold">Login</h1>
			<div className="flex flex-col gap-4">
				<InputBox
					label="Email"
					name="email"
					type="email"
					value={email}
					error={emailError}
					onChange={handleChange}
				>
					<LeftSide>
						<MdAlternateEmail className="text-lg" />
					</LeftSide>
				</InputBox>
				<InputBox
					label="Password"
					name="password"
					value={password}
					error={passwordError}
					onChange={handleChange}
					type={showPassword ? "text" : "password"}
				>
					<LeftSide>
						<CgLock className="text-lg" />
					</LeftSide>
					<RightSide>{setShowPassword}</RightSide>
				</InputBox>
				<div className="flex items-center justify-between">
					<CheckBox name="rememberMe" label="Remember Me" checked={rememberMe} onChange={handleChange} />
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
