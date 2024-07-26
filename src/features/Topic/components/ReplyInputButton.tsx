import React from 'react'

interface ReplyInputButton {
	Icon: React.ElementType;
	addElement: React.MouseEventHandler<HTMLDivElement>;
}

const ReplyInputButton: React.FC<ReplyInputButton> = ({Icon, addElement}) => {
  return (
	<div className='p-1 mt-1 rounded-md hover:cursor-pointer hover:bg-gray-200 transition-all' onClick={addElement}>
		<Icon className="size-3" color="#808080"/>
	</div>
  )
}

export default ReplyInputButton;
