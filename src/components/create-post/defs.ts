import { Reply } from "@features/Topic/utils/defs";
import { CreateTopicFields, Tag, Topic } from "@features/forum/utils/defs";

export type CreatePostProps =
	| {
		mode: "create";
		onSubmit: (content: string, title: string, tags: Tag[]) => void;
	}
	| {
		mode: "reply";
		postId: string;
		replyUserIndex: number;
		onSubmit: (content: string) => void;
	}
	| {
		mode: "editTopic";
		topic: Topic;
		onSubmit: (content: string, title: string, tags: Tag[]) => void;
	}
	| {
		mode: "editReply";
		reply: Reply;
		onSubmit: (content: string) => void;
	};

export type CreatePostFields = CreateTopicFields & { tags: string };

export const DEFAULT_CONTENT = `# Styling text

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
