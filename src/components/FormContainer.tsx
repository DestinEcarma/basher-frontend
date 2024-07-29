import React from "react";

interface FormContainerProps {
	title: string;
	children: React.ReactNode;
}

const FormContainer: React.FC<FormContainerProps> = ({ title, children }) => {
	return (
		<div className="min-h-screen  bg-gray-100 flex flex-col items-center justify-center">
			<div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mt-14">
				<h1 className="text-3xl font-bold mb-6 text-center">{title}</h1>
				{children}
			</div>
		</div>
	);
};

export default FormContainer;
