import { eventEmitter } from "./event";
import { Form, FormProps } from "./form";
import { useQuery } from "@apollo/client";
import { Button } from "@components/button";
import User from "@features/Topic/components/User";
import { Tag } from "@features/forum/utils/defs";
import { AUTH, AuthQuery } from "@utils/defs";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export type CreatePostProps = FormProps & {
	onSubmit: (title: string, tags: Tag[], content: string) => void;
};

export const CreatePostModal: React.FC<CreatePostProps> = (props) => {
	const navigate = useNavigate();
	const [height, setHeight] = useState(500);
	const [isResizing, setIsResizing] = useState(false);
	const [startY, setStartY] = useState(0);
	const [startHeight, setStartHeight] = useState(0);
	const { loading, data } = useQuery<AuthQuery>(AUTH);

	useEffect(() => {
		if (data?.user.auth === false) {
			toast.warning("You need to login to create a new topic");
			navigate("/login");
		}

		if (isResizing) {
			document.addEventListener("mousemove", handleMouseMove);
			document.addEventListener("mouseup", handleMouseUp);
		} else {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
		}

		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
		};
	});

	const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
		setIsResizing(true);
		setStartY(e.clientY);
		setStartHeight(height);
	};

	const handleMouseMove = (e: MouseEvent) => {
		if (!isResizing) return;
		setHeight(startHeight - (e.clientY - startY));
	};

	const handleMouseUp = () => {
		if (isResizing) setIsResizing(false);
	};

	const onClose = () => {
		eventEmitter.emit("close");
	};

	const onSubmit = () => {
		eventEmitter.emit("submit", props.onSubmit);
	};

	// TODO: Improve loading state
	if (loading || data?.user.auth === false) return null;

	return (
		<div
			style={{
				height: `${height}px`,
			}}
			className="fixed bottom-0 left-1/2 flex h-full max-h-full min-h-[30%] w-full max-w-[1475px] -translate-x-1/2 flex-col"
		>
			<button className="h-4 flex-shrink-0 cursor-row-resize bg-sky-600" onMouseDown={handleMouseDown}></button>
			<div className="flex h-full flex-col overflow-hidden bg-white p-4 shadow-lg">
				{/*
					TODO: Change title depending on the mode
				*/}
				{props.mode == "create" ? (
					<h1 className="mb-2">Create a new Topic</h1>
				) : (
					props.mode == "reply" && (
						<div className="mb-2 flex items-center gap-1">
							<h1>Replying to</h1>
							<User index={props.replyUserIndex} />
						</div>
					)
				)}

				<Form {...props} />
				<div className="flex flex-shrink-0 gap-4">
					<Button onClick={onSubmit}>{props.mode == "create" ? "Create Topic" : "Reply"}</Button>
					<Button variant={"ghost"} onClick={onClose}>
						Close
					</Button>
				</div>
			</div>
		</div>
	);
};

export const CreatePostDisplay: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [modal, setModal] = useState<React.ReactNode>(null);

	useEffect(() => {
		const handleOpen = (props: CreatePostProps) => setModal(<CreatePostModal {...props} />);
		const handleClose = () => setModal(null);

		eventEmitter.on("open", handleOpen);
		eventEmitter.on("close", handleClose);

		return () => {
			eventEmitter.off("open", handleOpen);
			eventEmitter.off("close", handleClose);
		};
	});

	return (
		<>
			{modal}
			{children}
		</>
	);
};
