import { InputBox, InputBoxPropsNoRef } from "@components/input-box";
import { LeftSide, RightSide } from "@components/sides";
import useShowPassword from "@hooks/use-show-password";
import React from "react";
import { CgLock } from "react-icons/cg";

const Passowrd: React.FC<InputBoxPropsNoRef> = (props) => {
	const [showPassword, ShowPasswordButton] = useShowPassword();

	return (
		<InputBox label="Password" type={showPassword ? "text" : "password"} {...props}>
			<LeftSide>
				<CgLock className="text-lg" />
			</LeftSide>
			<RightSide>
				<ShowPasswordButton />
			</RightSide>
		</InputBox>
	);
};

export default Passowrd;
