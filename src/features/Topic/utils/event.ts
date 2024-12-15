import { Reply } from "./defs";
import EventEmitter from "eventemitter3";

const eventEmitter = new EventEmitter();

export const useEvent = () => {
	return eventEmitter;
};

export const eventCreateReply = (reply: Reply) => {
	eventEmitter.emit("createReply", reply);
};
