import React, { useState } from "react";
import Input from "../../components/Input";
import FormContainer from "../../components/FormContainer";
import { MdAlternateEmail, MdLockOutline } from "react-icons/md";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { login, LoginResults } from "./services/login"; // Adjust the path as necessary

const LoginForm: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rememberMe, setRememberMe] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [showPassword, setShowPassword] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await login(email, password, rememberMe);
			switch (response) {
				case LoginResults.EMAIL_NOT_FOUND:
				case LoginResults.INVALID_PASSWORD:
					setError("Invalid Login Attempt");
					return;
				case LoginResults.BAD_REQUEST:
					setError("Bad Request");
					return;
				case LoginResults.INTERNAL_SERVER_ERROR:
					setError("Internal Server Error");
					return;
				case LoginResults.SUCCESS:
					break;
				default:
					return;
			}

			// Insert Login process
			setError(null);
			console.log("Successful Login");
		} catch (error) {
			setError("An error occurred during login");
		}
	};

	return (
		<FormContainer title="Login">
			<form onSubmit={handleSubmit}>
				<Input
					id="email"
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					icon={<MdAlternateEmail />}
				/>
				<div className="relative mb-4">
					<Input
						id="password"
						type={showPassword ? "text" : "password"}
						placeholder="Password"
						value={password}
						onChange={(e) => {
							const newPassword = e.target.value;
							setPassword(newPassword);
							if (!newPassword) {
								setShowPassword(false); // Reset password visibility to false if input is empty
							}
						}}
						icon={<MdLockOutline />}
					/>
					{password && (
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute inset-y-0 right-0 flex items-center pr-3 pt-7 text-gray-500 focus:outline-none"
						>
							{showPassword ? <IoEyeSharp /> : <FaEyeSlash />}
						</button>
					)}
				</div>
				{error && <p className="text-center text-red-500">{error}</p>}
				<div className="mb-4 flex items-center justify-between">
					<label className="block text-sm text-gray-700">
						<input
							id="rememberMe"
							type="checkbox"
							className="mr-2 leading-tight"
							checked={rememberMe}
							onChange={(e) => setRememberMe(e.target.checked)}
						/>
						Remember me
					</label>
					<a href="/forgot-password" className="text-sm text-blue-500 hover:text-blue-700">
						Forgot password?
					</a>
				</div>
				<div className="flex items-center justify-between">
					<button
						type="submit"
						className="focus:shadow-outline w-full rounded bg-black px-4 py-2 font-bold text-white hover:bg-gray-800 focus:outline-none"
					>
						Login
					</button>
				</div>
				<div className="mt-4 text-center">
					<p className="text-sm text-gray-600">
						Don't have an account?{" "}
						<a href="/signup" className="text-blue-500 hover:text-blue-700">
							Sign Up
						</a>
					</p>
				</div>
			</form>
		</FormContainer>
	);
};

export default LoginForm;
