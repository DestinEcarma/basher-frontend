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
			<label className="mb-2 block text-sm font-bold text-gray-700" htmlFor={id}>
				{placeholder}
			</label>
			<div className="relative">
				{icon && (
					<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">{icon}</div>
				)}
				<input
					id={id}
					type={type}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					className={`focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ${icon ? "pl-10" : ""}`}
					required
				/>
			</div>
		</div>
	);
};

export default Input;
