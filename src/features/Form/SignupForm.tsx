import React, { useState } from 'react';
import Input from '../../components/Input';
import FormContainer from '../../components/FormContainer';
import { Signup } from '../../services/api'; // Adjust the path as necessary

const SignupForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await Signup(email, password);
      if (response === false) {
        setError("Email is already in use");
      } else {
        // Handle successful signup (e.g., redirect or update state)
        console.log("Signup successful");
      }
    } catch (error) {
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
        />
        <Input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign Up
          </button>
        </div>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account? <a href="/login" className="text-blue-500 hover:text-blue-700">Login</a>
          </p>
        </div>
      </form>
    </FormContainer>
  );
};

export default SignupForm;
