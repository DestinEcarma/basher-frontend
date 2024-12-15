import { eventEmitter } from "./event";
import { CreatePostDisplay, CreatePostProps } from "./modal";

const createPost = (props: CreatePostProps) => {
	eventEmitter.emit("open", props);
};

export default {
	Display: CreatePostDisplay,
	open: createPost,
};
