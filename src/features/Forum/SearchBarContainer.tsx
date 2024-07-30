import AddNewTopic from "./AddNewTopic";
import SortButton from "./SortButton";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

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
		<div className="mb-5 mt-10 flex h-[50px] w-[600px] items-center rounded-lg bg-white px-[10px] shadow-xl">
			<FaSearch className="ml-[12px] text-gray-400" />
			<input
				type="text"
				placeholder="Search"
				value={searchTerm}
				onChange={handleSearch}
				onKeyPress={handleKeyPress}
				className="ml-[12px] mr-2 h-4/5 w-1/2 px-[10px] text-sm outline-none"
			/>
			<SortButton label="New" isActive={sortBy === "new"} onClick={() => handleSort("new")} />
			<SortButton label="Top" isActive={sortBy === "top"} onClick={() => handleSort("top")} />
			<AddNewTopic />
		</div>
	);
};

export default SearchBarContainer;
