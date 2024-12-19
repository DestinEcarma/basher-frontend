import { CreatePostProps } from "./defs";
import { eventEmitter } from "./event";
import { CreatePostDisplay } from "./modal";

const createPost = (props: CreatePostProps) => {
	eventEmitter.emit("open", props);
};

export default {
	Display: CreatePostDisplay,
	open: createPost,
};
