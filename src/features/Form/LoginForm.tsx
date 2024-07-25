import React, { useState } from "react";
import Input from "../../components/Input";
import FormContainer from "../../components/FormContainer";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { Login } from "../../services/api"; // Adjust the path as necessary

const LoginForm: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await Login(email, password);
			if (response === false) {
				setError("Invalid email or password");
			} else {
				// Handle successful login (e.g., redirect or update state)
				console.log("Login successful");
			}
		} catch (error) {
			setError("An error occurred during login");
		}
	};

	return (
		<FormContainer title="Sign In">
			<form onSubmit={handleSubmit}>
				<Input
					id="email"
					type="email"
					placeholder="Enter your Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					icon={<AiOutlineMail />}
				/>
				<Input
					id="password"
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					icon={<AiOutlineLock />}
				/>
				{error && <p className="text-red-500 text-center">{error}</p>}
				<div className="flex items-center justify-between mb-4">
					<label className="block text-sm text-gray-700">
						<input type="checkbox" className="mr-2 leading-tight" />
						Remember me
					</label>
					<a href="/forgot-password" className="text-sm text-blue-500 hover:text-blue-700">
						Forgot password?
					</a>
				</div>
				<div className="flex items-center justify-between">
					<button
						type="submit"
						className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					>
						Sign In
					</button>
				</div>
				<div className="text-center mt-4">
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
