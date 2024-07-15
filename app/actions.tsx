'use server';

import { streamUI } from 'ai/rsc';
import { createOllama } from 'ollama-ai-provider';
import { z } from 'zod';

const ollama = createOllama();
const model = ollama('mistral');

const LoadingComponent = ({ message }: { message: string }) => (
	<div className='animate-pulse p-4'>{message}...</div>
);

const getWeather = async (location: string) => {
	await new Promise((resolve) => setTimeout(resolve, 2000));
	return '82°F️ ☀️';
};

interface WeatherProps {
	location: string;
	weather: string;
}

const WeatherComponent = (props: WeatherProps) => (
	<div className='border border-neutral-200 p-4 rounded-lg max-w-fit'>
		The weather in {props.location} is {props.weather}
	</div>
);

const DistanceComponent = ({
	loc1,
	loc2,
	distance,
}: {
	distance: string;
	loc1: string;
	loc2: string;
}) => (
	<div className='flex justify-evenly items-center p-4 bg-yellow-100 rounded-lg'>
		<div className='p-4'>{loc2}</div>
		<div className='p-4'>{loc1}</div>
		<div className='p-4'>{distance}km</div>
	</div>
);

export async function streamComponent(prompt: string) {
	const result = await streamUI({
		model,
		prompt,
		text: ({ content }) => <div>{content}</div>,
		tools: {
			getWeather: {
				description: 'Get the weather for a location',
				parameters: z.object({
					location: z.string(),
				}),
				generate: async function* ({ location }) {
					yield <LoadingComponent message='Getting weather' />;
					const weather = await getWeather(location);
					return <WeatherComponent weather={weather} location={location} />;
				},
			},
			getDistance: {
				description: 'Get the distance between two locations',
				parameters: z.object({
					location1: z.string(),
					location2: z.string(),
				}),
				generate: async function* ({ location1, location2 }) {
					yield <LoadingComponent message='Getting distance' />;
					const distance = (Math.random() * 1000).toFixed(2);
					return (
						<DistanceComponent
							loc1={location1}
							loc2={location2}
							distance={distance}
						/>
					);
				},
			},
		},
	});

	return result.value;
}
