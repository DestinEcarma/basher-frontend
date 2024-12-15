import React from "react";
import { FaBold } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Logo: React.FC = () => {
	const navigate = useNavigate();

	const onClick = () => {
		navigate("/forum");
	};

	return (
		<button
			onClick={onClick}
			className="flex select-none items-center justify-center py-8 font-roboto-mono text-[4rem] font-bold leading-none tracking-wide"
		>
			<span className="flex size-[4.5rem] items-center justify-center rounded-[0.625rem] bg-black text-[4rem] leading-none text-white">
				<FaBold />
			</span>
			<span>asher</span>
		</button>
	);
};

export default Logo;
