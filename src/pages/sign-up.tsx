import React from "react";
import Form from "@components/form";
import Button from "@components/button";
import InputBox from "@components/input-box";
import useShowPassword from "@components/use-show-password";
import { CgLock } from "react-icons/cg";
import { MdAlternateEmail } from "react-icons/md";
import { LeftSide, RightSide } from "@components/sides";
import { Link, useNavigate } from "react-router-dom";
import { signup as signUp, SignUpResults } from "@features/Form/services/signup";

const SignUpPage: React.FC = () => {
	const navigate = useNavigate();

	const [showPassword, setShowPassword] = useShowPassword();
	const [{ emailError, passwordError, confirmPasswordError }, setError] = React.useState({
		emailError: "",
		passwordError: "",
		confirmPasswordError: "",
	});

	const [{ email, password, confirmPassword }, setForm] = React.useState({
		email: "",
		password: "",
		confirmPassword: "",
	});

	const passwordType = showPassword ? "text" : "password";

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setForm((prev) => ({ ...prev, [name]: value }));
		setError((prev) => ({ ...prev, [`${name}Error`]: "" }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setError((prev) => ({ ...prev, confirmPasswordError: "Passwords do not match" }));
			return;
		}

		try {
			const response = await signUp(email, password);
			switch (response) {
				case SignUpResults.EMAIL_TAKEN:
					setError((prev) => ({ ...prev, emailError: "Email is already taken" }));
					return;
				case SignUpResults.BAD_REQUEST:
					alert("Bad Request");
					return;
				case SignUpResults.INTERNAL_SERVER_ERROR:
					alert("Internal Server Error");
					return;
				case SignUpResults.SUCCESS:
					break;
				default:
					return;
			}

			navigate("/forum");
		} catch (error) {
			alert("An error occurred during sign up");
			console.error(error);
		}
	};

	return (
		<Form onSubmit={handleSubmit} size="w450px">
			<h1 className="mb-4 text-center text-4xl font-bold">Sign Up</h1>
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
					type={passwordType}
					error={passwordError}
					onChange={handleChange}
				>
					<LeftSide>
						<CgLock className="text-lg" />
					</LeftSide>
					<RightSide>{setShowPassword}</RightSide>
				</InputBox>
				<InputBox
					label="Confirm Password"
					name="confirmPassword"
					type={passwordType}
					value={confirmPassword}
					error={confirmPasswordError}
					onChange={handleChange}
				>
					<LeftSide>
						<CgLock className="text-lg" />
					</LeftSide>
					<RightSide>{setShowPassword}</RightSide>
				</InputBox>
				<Button type="submit" size="full">
					Sign Up
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
