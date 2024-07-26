import React from "react";

interface ToggleSwitchProps {
	checked: boolean;
	changeChecked: React.ChangeEventHandler<HTMLDivElement>;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, changeChecked }) => {
	return (
		<label className="flex items-center cursor-pointer">
			<input type="checkbox" id="toggle" className="sr-only peer" checked={checked} onChange={changeChecked} />
			<div className="block relative bg-red-400 w-7 h-4 p-1 rounded-full before:absolute before:bg-white before:w-2 before:h-2 before:p-1 before:rounded-full before:transition-all transition-all duration-500 before:duration-500 before:left-[0.125rem] before:top-[0.125rem] peer-checked:before:left-[0.875rem] peer-checked:before:bg-gray-500 peer-checked:bg-green-400 border-2 border-[#808080]"></div>
		</label>
	);
};

export default ToggleSwitch;
