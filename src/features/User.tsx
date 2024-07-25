import React from "react";

interface UserProps {
	id: number;
}

const User: React.FC<UserProps> = ({ id }) => {
	return (
		<div className="flex flex-row min-w-24 w-min items-center justify-center bg-accent p-1 rounded-full">
			<h1 className="text-white text-xs font-regular">Anonymous #{id}</h1>
		</div>
	);
};

export default User;
