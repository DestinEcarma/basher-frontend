import { CreatePostFields, CreatePostProps, DEFAULT_CONTENT } from "./defs";
import { eventEmitter } from "./event";
import { Inputs } from "./inputs";
import { useQuery } from "@apollo/client";
import { Button } from "@components/button";
import User from "@features/Topic/components/User";
import { AUTH, AuthQuery } from "@utils/defs";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const CreatePostModal: React.FC<CreatePostProps> = ({ onSubmit, ...props }) => {
	const navigate = useNavigate();
	const [height, setHeight] = useState(500);
	const [isResizing, setIsResizing] = useState(false);
	const [startY, setStartY] = useState(0);
	const [startHeight, setStartHeight] = useState(0);
	const { loading, data } = useQuery<AuthQuery>(AUTH);
	const form = useForm<CreatePostFields>({
		defaultValues: {
			content: DEFAULT_CONTENT,
		},
	});

	const { handleSubmit } = form;

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

	const onSubmitWrapper: SubmitHandler<CreatePostFields> = ({ content, title, tags }) => {
		onSubmit(
			content,
			title,
			tags
				.trim()
				.split(" ")
				.map((tag) => ({ name: tag }))
				.filter((tag) => tag.name.length > 0),
		);
	};

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
			<form
				onSubmit={handleSubmit(onSubmitWrapper)}
				className="flex h-full flex-col overflow-hidden bg-white p-4 shadow-lg"
			>
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

				<Inputs props={props} form={form} />
				<div className="flex flex-shrink-0 gap-4">
					<Button type="submit">{props.mode == "create" ? "Create Topic" : "Reply"}</Button>
					<Button type="button" variant={"ghost"} onClick={onClose}>
						Close
					</Button>
				</div>
			</form>
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
