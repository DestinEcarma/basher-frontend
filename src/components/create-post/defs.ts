import { Reply } from "@features/Topic/utils/defs";
import { CreateTopicFields, Topic } from "@features/forum/utils/defs";

type CreateMode = {
	mode: "create";
	onSubmit: (content: string, title: string, tags: string) => void;
};

type ReplyMode = {
	mode: "reply";
	postId: string;
	replyUserIdentity: {
		identity: number;
		isOwner: boolean;
	};
	onSubmit: (content: string) => void;
};

type EditTopicMode = {
	mode: "editTopic";
	topic: Topic;
	onSubmit: (content: string, title: string, tags: string) => void;
};

type EditReplyMode = {
	mode: "editReply";
	reply: Reply;
	onSubmit: (content: string) => void;
};

export type CreatePostProps = CreateMode | ReplyMode | EditTopicMode | EditReplyMode;

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
