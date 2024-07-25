import React from "react";

interface InputProps {
	id: string;
	type: string;
	placeholder: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ id, type, placeholder, value, onChange, icon }) => {
	return (
		<div className="mb-4">
			<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
				{placeholder}
			</label>
			<div className="relative">
				{icon && (
					<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>
				)}
				<input
					id={id}
					type={type}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${icon ? "pl-10" : ""}`}
					required
				/>
			</div>
		</div>
	);
};

export default Input;
