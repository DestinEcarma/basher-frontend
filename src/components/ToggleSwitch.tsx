import React from "react";

interface ToggleSwitchProps {
	checked: boolean;
	changeChecked: React.ChangeEventHandler<HTMLDivElement>;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, changeChecked }) => {
	return (
		<label className="flex cursor-pointer items-center">
			<input type="checkbox" id="toggle" className="peer sr-only" checked={checked} onChange={changeChecked} />
			<div className="relative block h-4 w-7 rounded-full border-2 border-[#808080] bg-red-400 p-1 transition-all duration-500 before:absolute before:left-[0.125rem] before:top-[0.125rem] before:h-2 before:w-2 before:rounded-full before:bg-white before:p-1 before:transition-all before:duration-500 peer-checked:bg-green-400 peer-checked:before:left-[0.875rem] peer-checked:before:bg-gray-500"></div>
		</label>
	);
};

export default ToggleSwitch;
