import { InputBox, InputBoxProps } from "@components/input-box";
import { LeftSide, RightSide } from "@components/sides";
import useShowPassword from "@hooks/use-show-password";
import React from "react";
import { CgLock } from "react-icons/cg";

const Passowrd = React.forwardRef<HTMLInputElement, InputBoxProps>((props, ref) => {
	const [showPassword, ShowPasswordButton] = useShowPassword();

	return (
		<InputBox label="Password" type={showPassword ? "text" : "password"} ref={ref} {...props}>
			<LeftSide>
				<CgLock className="text-lg" />
			</LeftSide>
			<RightSide>
				<ShowPasswordButton />
			</RightSide>
		</InputBox>
	);
});

export default Passowrd;
