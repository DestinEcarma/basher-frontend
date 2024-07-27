import React, { useState } from "react";
import Input from "../../components/Input";
import FormContainer from "../../components/FormContainer";
import { MdAlternateEmail, MdLockOutline } from "react-icons/md";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { SignUpResults, Signup } from "../SignUp/services/SignUp"; // Adjust the path as necessary

const SignupForm: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setError("Passwords do not match");
			return;
		}
		try {
			const response = await Signup(email, password);
			if (response === SignUpResults.EMAIL_TAKEN) {
				console.log(response);
				setError("Email is already in use");
			} else {
				// Handle successful signup (e.g., redirect or update state)
				console.log("Signup successful");
			}
		} catch (error) {
			console.log(error);
			setError("An error occurred during signup");
		}
	};

	return (
		<FormContainer title="Sign Up">
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
							className="absolute inset-y-0 right-0 pt-7 pr-3 flex items-center text-gray-500 focus:outline-none"
						>
							{showPassword ? <IoEyeSharp /> : <FaEyeSlash />}
						</button>
					)}
				</div>
				<div className="relative mb-4">
					<Input
						id="confirmPassword"
						type={showConfirmPassword ? "text" : "password"}
						placeholder="Confirm Password"
						value={confirmPassword}
						onChange={(e) => {
							const newConfirmPassword = e.target.value;
							setConfirmPassword(newConfirmPassword);
							if (!newConfirmPassword) {
								setShowConfirmPassword(false); // Reset password visibility to false if input is empty
							}
						}}
						icon={<MdLockOutline />}
					/>
					{confirmPassword && (
						<button
							type="button"
							onClick={() => setShowConfirmPassword(!showConfirmPassword)}
							className="absolute inset-y-0 right-0 pt-7 pr-3 flex items-center text-gray-500 focus:outline-none"
						>
							{showConfirmPassword ? <IoEyeSharp /> : <FaEyeSlash />}
						</button>
					)}
				</div>
				{error && <p className="text-red-500 text-center">{error}</p>}
				<div className="flex items-center justify-between">
					<button
						type="submit"
						className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
					>
						Sign Up
					</button>
				</div>
				<div className="text-center mt-4">
					<p className="text-sm text-gray-600">
						Already have an account?{" "}
						<a href="/login" className="text-blue-500 hover:text-blue-700">
							Login
						</a>
					</p>
				</div>
			</form>
		</FormContainer>
	);
};

export default SignupForm;
