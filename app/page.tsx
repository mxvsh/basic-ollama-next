'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { getAnswer } from './actions';
import { useChat } from 'ai/react';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

export default function Home() {
	const { messages, input, handleInputChange, handleSubmit } = useChat();

	return (
		<div className='flex flex-col h-screen'>
			<div className='flex-grow bg-gray-100 '>
				{/* Chat messages */}
				<div className='p-4'>
					{/* Individual chat messages */}
					<div className='flex flex-col space-y-2'>
						{/* Chat message */}
						{messages.map((m) => (
							<div key={m.id} className='whitespace-pre-wrap text-black'>
								{m.role === 'user' ? 'User: ' : 'AI: '}
								{m.content}
							</div>
						))}
						{/* <div className='flex items-start'>
							<div className='flex-shrink-0'>
								<Image
									src='https://picsum.photos/200'
									alt='User Avatar'
									width={40}
									height={40}
									className='rounded-full'
								/>
							</div>
							<div className='ml-4 p-2 bg-white rounded-lg'>
								<p className='text-gray-800'>Hello, how can I help you?</p>
							</div>
						</div> */}
						{/* More chat messages */}
					</div>
				</div>
			</div>
			{/* Chat input */}
			<form onSubmit={handleSubmit}>
				<div className='p-4 bg-white flex items-center'>
					<input
						type='text'
						placeholder='Type your message...'
						className='text-black w-full px-4 flex-1 py-2 border border-gray-300 rounded-lg'
						onChange={handleInputChange}
					/>
					<button
						type='submit'
						className='ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg'
					>
						Send
					</button>
				</div>
			</form>
		</div>
	);
}
