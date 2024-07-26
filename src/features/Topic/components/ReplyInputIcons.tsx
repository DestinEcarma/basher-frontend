import React, { SetStateAction } from 'react'
import { FaBold, FaItalic, FaLink, FaCode, FaListUl, FaListOl   } from "react-icons/fa";
import ReplyInputButton from './ReplyInputButton';

interface ReplyInputIconsProps {
	setPreview: React.Dispatch<SetStateAction<string>>;
	textareaRef: React.RefObject<HTMLTextAreaElement>
}



const ReplyInputIcons: React.FC<ReplyInputIconsProps> = ({setPreview, textareaRef}) => {

	const addBold = (type: string) => ():void => {
		if(textareaRef.current) {
			const { selectionStart, selectionEnd, value } = textareaRef.current;
			const part1 = value.slice(0, selectionStart);
			let part2 = value.slice(selectionStart, selectionEnd);
			const part3 = value.slice(selectionEnd);

			if(part2 === '') part2 = ' ';

			let left: string = '', right: string = '';

			switch(type) {
				case 'bold': left = right = "**"; break;
				case 'italic': left = right = "*"; break;
				case 'link': left = '[Link]('; right = ")"; break;
				case 'code': left = right = "```"; break;
				case 'ul': left = '\n- '; break;
				case 'ol': left = '\n1. '; break;
			}
			
			setPreview(`${part1}${left}${part2}${right}${part3}`);
		}
	}

	return (
		<div className="absolute top-0 left-1 px-1 border-b-[1px] w-[calc(100%-0.5rem)] flex gap-2 items-center">
			<ReplyInputButton Icon={FaBold} addElement={addBold('bold')} />
			<ReplyInputButton Icon={FaItalic} addElement={addBold('italic')} />
			<ReplyInputButton Icon={FaLink} addElement={addBold('link')} />
			<ReplyInputButton Icon={FaCode} addElement={addBold('code')} />
			<ReplyInputButton Icon={FaListUl} addElement={addBold('ul')} />
			<ReplyInputButton Icon={FaListOl} addElement={addBold('ol')} />
		</div>
	)
}

export default ReplyInputIcons
