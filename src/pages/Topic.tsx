import React from 'react'
import { useParams } from 'react-router-dom'

const Topic: React.FC = () => {
	const { id }= useParams<{ id: string }>();

	return (
		<div className='w-full min-h-screen bg-white'>
			<h1>Topic #{id}</h1>
		</div>
	)
};

export default Topic;