import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import SortButton from './SortButton';
import AddNewTopic from './AddNewTopic';

const SearchBarContainer: React.FC = () => {
	const [sortBy, setSortBy] = useState<"new" | "top" | "unreads" |null>(null);
	const handleSort = (type: "new" | "top" | "unreads") => {
		setSortBy(type);
	};

	return (
    <div className="w-[600px] h-[50px] bg-white shadow-xl mt-10 mb-5 flex items-center px-[10px] rounded-lg">
		<FaSearch className="text-gray-400 ml-[12px]" />
		<input type="text" placeholder="Search" className="w-1/2 h-4/5 px-[10px] text-sm ml-[12px] mr-2 outline-none"></input>
		<SortButton 
			label="New" 
			isActive={sortBy === "new"} 
			onClick={() => handleSort("new")} 
		/>
		<SortButton 
			label="Top" 
			isActive={sortBy === "top"} 
			onClick={() => handleSort("top")} 
		/>
		<SortButton 
			label="Unreads" 
			isActive={sortBy === "unreads"} 
			onClick={() => handleSort("unreads")} 
		/>
		<AddNewTopic />
    </div>
  );
};

export default SearchBarContainer;