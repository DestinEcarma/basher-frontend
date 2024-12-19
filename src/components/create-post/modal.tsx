import { CreatePostFields, CreatePostProps, DEFAULT_CONTENT } from "./defs";
import { eventEmitter } from "./event";
import { Inputs } from "./inputs";
import { AuthContext } from "@components/auth";
import { Button } from "@components/button";
import User from "@features/Topic/components/User";
import React, { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const CreatePostModal: React.FC<CreatePostProps> = ({ onSubmit, ...props }) => {
	const navigate = useNavigate();

	const auth = useContext(AuthContext);

	const [height, setHeight] = useState(500);
	const [isResizing, setIsResizing] = useState(false);
	const [startY, setStartY] = useState(0);
	const [startHeight, setStartHeight] = useState(0);

	const form = useForm<CreatePostFields>({
		defaultValues: {
			content: DEFAULT_CONTENT,
		},
	});

	const { handleSubmit } = form;

	useEffect(() => {
		if (!auth) {
			toast.warning("You need to login to create a new post");
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
		if (content.trim().length < 30) {
			toast.error("Content must be at least 30 characters");
			return;
		}

		if (props.mode === "create" || props.mode === "editTopic") {
			onSubmit(content, title, tags);
		} else {
			(onSubmit as (content: string) => void)(content);
		}

		eventEmitter.emit("close");
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

	const submitText = () => {
		switch (props.mode) {
			case "create":
				return "Create Topic";
			case "reply":
				return "Create Reply";
			case "editTopic":
			case "editReply":
				return "Save Changes";
		}
	};

	return (
		<div
			style={{
				height: `${height}px`,
			}}
			className="fixed bottom-0 left-1/2 z-[9999] flex h-full max-h-full min-h-[30%] w-full max-w-[1475px] -translate-x-1/2 flex-col"
		>
			<button className="h-4 flex-shrink-0 cursor-row-resize bg-sky-600" onMouseDown={handleMouseDown}></button>
			<form
				onSubmit={handleSubmit(onSubmitWrapper)}
				className="flex h-full flex-col overflow-hidden bg-white p-4 shadow-lg"
			>
				{props.mode == "create" ? (
					<h1 className="mb-2">Create a new Topic</h1>
				) : (
					props.mode == "reply" && (
						<div className="mb-2 flex items-center gap-1">
							<h1>Replying to</h1>
							<User
								identity={props.replyUserIdentity.identity}
								isOwner={props.replyUserIdentity.isOwner}
							/>
						</div>
					)
				)}

				<Inputs props={props} form={form} />
				<div className="flex flex-shrink-0 gap-4">
					<Button type="submit">{submitText()}</Button>
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
