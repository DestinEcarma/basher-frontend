import React from "react";
import Logo from "../components/Logo";
import SearchBarContainer from "../features/Forum/SearchBarContainer";
import ForumContainer from "../features/Forum/ForumContainer";

const ForumPage:React.FC = () => {
	return (
		<div className="min-h-screen  bg-gray-100 flex flex-col items-center">
			<div className="top-10">
				<Logo />
			</div>
			<div>
					<SearchBarContainer />
				</div>
			<div>
				<ForumContainer />
			</div>
		</div>
	)
}

export default ForumPage;