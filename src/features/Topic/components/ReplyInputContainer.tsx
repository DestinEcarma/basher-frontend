import React, { useState } from "react";
import ReplyButton from "./ReplyButton";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ToggleSwitch from "../../../components/ToggleSwitch";
import Preview from "./Preview";
import ReplyText from "./ReplyText";

interface ReplyInputContainerProps {
	User: React.ReactElement;
	openReply: React.MouseEventHandler;
}

const ReplyInputContainer: React.FC<ReplyInputContainerProps> = ({ User, openReply }) => {
	const [preview, setPreview] = useState("");
	const [checked, setChecked] = useState(true);

	const changePreview: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
		setPreview(e.target.value);
		e.currentTarget.style.height = "auto";
		e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
	};

	const changeChecked: React.ChangeEventHandler<HTMLInputElement> = () => {
		setChecked((prev) => !prev);
	};

	return (
		<div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-end justify-center min-h-screen w-full bg-black bg-opacity-30">
			<div className="bg-white lg:max-w-7xl md:max-w-3xl w-full shadow-lg rounded-md pt-5 px-4 pb-3 mt-4 flex gap-5 max-h-screen">
				<div className="w-full flex flex-col">
					<div className="flex mb-2 items-center gap-1">
						<h1 className="text-gray-700 font-medium">Replying to</h1>
						{User}
					</div>
					<ReplyText changePreview={changePreview} preview={preview} setPreview={setPreview} />
					<div className="flex mt-2 items-center gap-4">
						<ReplyButton
							color="#FFFFFF"
							className="bg-accent hover:bg-accent-light transition-colors py-1 px-2 rounded-md"
						/>
						<p onClick={openReply} className="text-[#808080] hover:cursor-pointer select-none">
							Close
						</p>
						<div className="flex items-center gap-2">
							<FaEyeSlash className="size-3" color="#808080" />
							<ToggleSwitch checked={checked} changeChecked={changeChecked} />
							<FaEye className="size-3" color="#808080" />
						</div>
					</div>
				</div>
				{checked && <Preview preview={preview} />}
			</div>
		</div>
	);
};

export default ReplyInputContainer;
