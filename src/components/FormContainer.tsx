import React from "react";

interface FormContainerProps {
	title: string;
	children: React.ReactNode;
}

const FormContainer: React.FC<FormContainerProps> = ({ title, children }) => {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
			<div className="mt-14 w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
				<h1 className="mb-6 text-center text-3xl font-bold">{title}</h1>
				{children}
			</div>
		</div>
	);
};

export default FormContainer;
