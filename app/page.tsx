'use client';

import { useState } from 'react';
import { streamComponent } from './actions';

export default function Page() {
	const [prompt, setPrompt] = useState<string>('Get the weather for Bhopal');
	const [component, setComponent] = useState<React.ReactNode>();

	return (
		<div>
			<form
				onSubmit={async (e) => {
					e.preventDefault();
					setComponent(await streamComponent(prompt));
				}}
			>
				<input
					type='text'
					value={prompt}
					onChange={(e) => setPrompt(e.target.value)}
					className='border border-gray-300 p-2 rounded-lg w-full'
				/>
				<br />
				<br />
				<button className='bg-blue-500 text-white px-4 py-2 rounded-lg ml-2'>
					Stream Component
				</button>
			</form>
			<div>{component}</div>
		</div>
	);
}
