import React from "react";

interface JumpToButtonProps {
	replyId: string;
	children: React.ReactNode;
}

const JumpToButton: React.FC<JumpToButtonProps> = ({ replyId, children }) => {
	const jumpToReply = () => {
		const replyElement = document.getElementById(`reply-${replyId}`);
		if (replyElement) {
			const offset = replyElement.offsetTop;
			window.scrollTo({
				top: offset,
				behavior: "smooth",
			});
		}
	};

	return <button onClick={jumpToReply}>{children}</button>;
};

export default JumpToButton;
