import { toggle } from "@utils/helper";
import React from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const useShowPassword = (): [boolean, React.FC] => {
	const [showPassword, setShowPassword] = React.useState(false);

	const showPasswordButton: React.FC = () => (
		<button
			type="button"
			onClick={() => setShowPassword(toggle)}
			className="text-lg transition-transform hover:scale-125 focus:scale-125"
		>
			{showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
		</button>
	);

	return [showPassword, showPasswordButton];
};

export default useShowPassword;
