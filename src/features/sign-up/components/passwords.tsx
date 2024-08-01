import { InputBox, InputBoxPropsNoRef } from "@components/input-box";
import { LeftSide, RightSide } from "@components/sides";
import useShowPassword from "@hooks/use-show-password";
import React from "react";
import { CgLock } from "react-icons/cg";

interface PasswordsProps {
	password: InputBoxPropsNoRef;
	confirmPassword: InputBoxPropsNoRef;
}

const Passowrds: React.FC<PasswordsProps> = ({ password, confirmPassword }) => {
	const [showPassword, ShowPasswordButton] = useShowPassword();

	const inputType = showPassword ? "text" : "password";

	return (
		<>
			<InputBox label="Password" type={inputType} {...password}>
				<LeftSide>
					<CgLock className="text-lg" />
				</LeftSide>
				<RightSide>
					<ShowPasswordButton />
				</RightSide>
			</InputBox>
			<InputBox label="Confirm Password" type={inputType} {...confirmPassword}>
				<LeftSide>
					<CgLock className="text-lg" />
				</LeftSide>
				<RightSide>
					<ShowPasswordButton />
				</RightSide>
			</InputBox>
		</>
	);
};

export default Passowrds;
