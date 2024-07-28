import React from "react";

interface UserProps {
	author: string;
	isOP: boolean;
}

const User: React.FC<UserProps> = ({ author, isOP }) => {
	return (
		<div className="flex text-xs items-center gap-1 leading-none select-none">
			<h1 className="bg-accent text-white rounded-full px-2 py-1 flex items-center justify-center">
				Anonymous #{author}
			</h1>
			{isOP && <h1 className="text-[#00A3FF] font-bold">OP</h1>}
		</div>
	);
};

export default User;
