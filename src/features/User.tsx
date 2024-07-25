import React from "react";

interface UserProps {
	id: number;
}

const User: React.FC<UserProps> = ({ id }) => {
	return (
		<div className="flex flex-row items-center justify-center bg-accent p-1 rounded-full">
			<h1>Anonymous #{id}</h1>
		</div>
	);
};

export default User;
