import React from "react";
import { toggle } from "@utils/helper";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const useShowPassword = (): [boolean, JSX.Element] => {
	const [showPassword, setShowPassword] = React.useState(false);

	return [
		showPassword,
		<button
			type="button"
			onClick={() => setShowPassword(toggle)}
			className="text-lg transition-transform hover:scale-125 focus:scale-125"
		>
			{showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
		</button>,
	];
};

export default useShowPassword;
