import { CreatePostProps, CreatePostFields, DEFAULT_CONTENT, DEFAULT_PREVIEW_OPTIONS } from "./defs";
import { InputBox } from "@components/input-box";
import { Reply, Topic } from "@features/Topic/utils/defs";
import MDEditor, { ICommand, MDEditorProps } from "@uiw/react-md-editor";
import React, { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

interface InputsProps {
	props: Omit<CreatePostProps, "onSubmit">;
	form: UseFormReturn<CreatePostFields, unknown, undefined>;
}

export const Inputs: React.FC<InputsProps> = ({
	props: { mode, ...props },
	form: {
		register,
		setValue,
		formState: { errors },
	},
}) => {
	const [content, setContent] = React.useState(DEFAULT_CONTENT);

	useEffect(() => {
		if (mode === "editTopic") {
			const { title, tags, content } = (props as { topic: Topic }).topic;

			setValue("title", title);
			setValue("tags", tags.join(" "));
			setValue("content", content);
			setContent(content);
		} else if (mode === "editReply") {
			const { content } = (props as { reply: Reply }).reply;
			setValue("content", content);
			setContent(content);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mode]);

	useEffect(() => {
		setValue("content", content);
	}, [content, setValue]);

	useEffect(() => {
		if (errors.content?.message !== undefined) {
			toast.error(errors.content.message);
		}
	}, [errors]);

	register("content", { required: "Content is required" });

	const displayTitleAndTag = () => {
		const titleAttributes = {
			placeholder: "Title",
			error: errors.title?.message,
			...register("title", { required: "Title is required" }),
		};

		const tagsAttributes = {
			placeholder: "Tags (e.g. usc dcism)",
			...register("tags"),
		};

		return (
			<div className="mb-4 grid grid-cols-2 gap-4">
				<InputBox {...titleAttributes} />
				<InputBox {...tagsAttributes} />
			</div>
		);
	};

	const mdEditorAttributes: MDEditorProps = {
		height: "100%",
		value: content,
		visibleDragbar: false,
		previewOptions: DEFAULT_PREVIEW_OPTIONS,
		onChange: (value) => setContent(value ?? content),
		commandsFilter: (command: ICommand) => {
			if (command.name === "fullscreen") return false;
			return command;
		},
	};

	const isTopicMode = mode === "create" || mode === "editTopic";

	return (
		<>
			{isTopicMode && displayTitleAndTag()}
			<div className="mb-4 flex-grow overflow-hidden rounded-lg border shadow transition-colors [&:has(textarea:focus)]:border-blue-500">
				<MDEditor {...mdEditorAttributes} />
				{errors.content?.message && <p className="text-xs text-red-500">{errors.content?.message}</p>}
			</div>
		</>
	);
};
