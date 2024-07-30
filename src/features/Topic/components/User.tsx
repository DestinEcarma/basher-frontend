import React from "react";

interface UserProps {
	index: number;
}

const User: React.FC<UserProps> = ({ index }) => {
	return (
		<div className="flex select-none items-center gap-1 text-xs leading-none">
			<h1 className="flex items-center justify-center rounded-full bg-accent px-2 py-1 text-white">
				Anonymous #{index}
			</h1>
			{index === 0 && <h1 className="font-bold text-[#00A3FF]">OP</h1>}
		</div>
	);
};

export default User;
