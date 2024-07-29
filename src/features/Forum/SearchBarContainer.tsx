import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import SortButton from "./SortButton";
import AddNewTopic from "./AddNewTopic";

interface SearchBarContainerProps {
	onSearch: (searchTerm: string) => void;
	onSort: (type: "new" | "top" | null) => void;
}

const SearchBarContainer: React.FC<SearchBarContainerProps> = ({ onSearch, onSort }) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [sortBy, setSortBy] = useState<"new" | "top" | null>("new");

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
		onSearch(e.target.value);
	};

	const handleSort = (type: "new" | "top") => {
		setSortBy(type);
		onSort(type);
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			onSearch(searchTerm);
		}
	};

	return (
		<div className="w-[600px] h-[50px] bg-white shadow-xl mt-10 mb-5 flex items-center px-[10px] rounded-lg">
			<FaSearch className="text-gray-400 ml-[12px]" />
			<input
				type="text"
				placeholder="Search"
				value={searchTerm}
				onChange={handleSearch}
				onKeyPress={handleKeyPress}
				className="w-1/2 h-4/5 px-[10px] text-sm ml-[12px] mr-2 outline-none"
			/>
			<SortButton label="New" isActive={sortBy === "new"} onClick={() => handleSort("new")} />
			<SortButton label="Top" isActive={sortBy === "top"} onClick={() => handleSort("top")} />
			<AddNewTopic />
		</div>
	);
};

export default SearchBarContainer;
