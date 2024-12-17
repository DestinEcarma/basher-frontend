import { CreatePostProps, CreatePostFields, DEFAULT_CONTENT } from "./defs";
import { mergeDeep } from "@apollo/client/utilities";
import { InputBox } from "@components/input-box";
import MDEditor, { ICommand, MDEditorProps } from "@uiw/react-md-editor";
import React, { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import rehypeKatex from "rehype-katex";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import { toast } from "sonner";

interface InputsProps {
	props: Omit<CreatePostProps, "onSubmit">;
	form: UseFormReturn<CreatePostFields, unknown, undefined>;
}

const CUSTOM_SCHEMA = mergeDeep(defaultSchema, { attributes: { div: ["center"] } });

export const Inputs: React.FC<InputsProps> = ({
	props: { mode },
	form: {
		register,
		setValue,
		formState: { errors },
	},
}) => {
	const [content, setContent] = React.useState(DEFAULT_CONTENT);

	useEffect(() => {
		setValue("content", content);
	}, [content, setValue]);

	useEffect(() => {
		if (errors.content?.message !== undefined) {
			toast.error(errors.content.message);
		}
	}, [errors]);

	register("content", {
		required: "Content is required",
		minLength: {
			value: 30,
			message: "Content must be at least 30 characters",
		},
	});

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
		onChange: (value) => setContent(value ?? content),
		commandsFilter: (command: ICommand) => {
			if (command.name === "fullscreen") return false;
			return command;
		},
		previewOptions: {
			remarkPlugins: [remarkMath, remarkRehype],
			rehypePlugins: [[rehypeSanitize, CUSTOM_SCHEMA], rehypeKatex, rehypeStringify],
			components: {
				div: ({ node, ...rest }) => {
					if (node !== undefined && "center" in rest) {
						delete rest.center;
						return <div className="text-center" {...rest} />;
					}

					return <div {...rest} />;
				},
			},
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
