import { eventEmitter } from "./event";
import { mergeDeep } from "@apollo/client/utilities";
import { InputBox } from "@components/input-box";
import { Reply } from "@features/Topic/utils/defs";
import { Topic } from "@features/forum/utils/defs";
import MDEditor, { ICommand, MDEditorProps } from "@uiw/react-md-editor";
import React, { useEffect, useState } from "react";
import rehypeKatex from "rehype-katex";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";

export type FormProps =
	| { mode: "create" }
	| { mode: "reply"; postId: string }
	| { mode: "editTopic"; topic: Topic }
	| { mode: "editReply"; reply: Reply };

const CUSTOM_SCHEMA = mergeDeep(defaultSchema, { attributes: { div: ["center"] } });

const DEFAULT_CONTENT = `
# Styling text

You can make text **bold** or *italic*.

## Ordered lists

1. Item 1
2. Item 2 
2. Item 3

### Unordered lists

- Item 1
- Item 2
- Item 3

#### More information

[Click here](https://www.markdownguide.org/basic-syntax/)
`;

export const Form: React.FC<FormProps> = () => {
	const [content, setContent] = useState(DEFAULT_CONTENT);

	useEffect(() => {
		const handleSubmitRequest = (callback: (content: string) => void) => {
			callback(content);
		};

		eventEmitter.on("submit", handleSubmitRequest);

		return () => {
			eventEmitter.off("submit", handleSubmitRequest);
		};
	});

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
				code: ({ children = [], className, ...props }) => {
					console.log(children, className);

					return <code {...props}>{children}</code>;
				},
			},
		},
	};

	return (
		<>
			<div className="mb-4 grid grid-cols-2 gap-4">
				<InputBox placeholder="Title" />
				<InputBox placeholder="#tags (e.g. #usc #dcism)" />
			</div>
			<div className="mb-4 flex-grow overflow-hidden rounded-lg border shadow transition-colors [&:has(textarea:focus)]:border-blue-500">
				<MDEditor {...mdEditorAttributes} />
			</div>
		</>
	);
};
