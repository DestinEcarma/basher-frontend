import React, { useState } from "react";
import ReplyButton from "./ReplyButton";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ToggleSwitch from "../../../components/ToggleSwitch";
import Preview from "./Preview";
import ReplyText from "./ReplyText";

interface ReplyInputContainerProps {
	User?: React.ReactElement;
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
		<div className="fixed left-1/2 top-1/2 flex min-h-screen w-full -translate-x-1/2 -translate-y-1/2 items-end justify-center bg-black bg-opacity-30">
			<div className="mt-4 flex max-h-screen w-full gap-5 rounded-md bg-white px-4 pb-3 pt-5 shadow-lg md:max-w-3xl lg:max-w-7xl">
				<div className="flex w-full flex-col">
					{User != null && (
						<div className="mb-2 flex items-center gap-1">
							<h1 className="font-medium text-gray-700">Replying to</h1>
							{User}
						</div>
					)}
					<ReplyText changePreview={changePreview} preview={preview} setPreview={setPreview} />
					<div className="mt-2 flex items-center gap-4">
						<ReplyButton
							color="#FFFFFF"
							className="rounded-md bg-accent px-2 py-1 transition-colors hover:bg-accent-light"
						/>
						<p onClick={openReply} className="select-none text-[#808080] hover:cursor-pointer">
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
