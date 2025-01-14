import React, { useEffect } from 'react'
import { useState } from 'react'
import Editor from 'react-simple-wysiwyg'

export const Story = ({setStory, story}) => {

	const [html, setHTML] = useState("")

	useEffect(() => {
		setHTML(story)
	}, [story])

	return (
		<div className='overflow-hidden text-clip'>
			<Editor value={html} placeholder='Írj...' onChange={e => setHTML(e.target.value)} onBlur={() => setStory(html)} className='bg-[#1b1b1f_!important]'/>
		</div>
	)
}