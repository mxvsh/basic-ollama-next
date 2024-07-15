import { z } from 'zod';
import { createOllama } from 'ollama-ai-provider';
import { StreamingTextResponse, streamText, StreamData } from 'ai';
import { streamUI } from 'ai/rsc';

const ollama = createOllama();
const model = ollama('mistral');

export const maxDuration = 30;

export async function POST(req: Request) {
	const { messages } = await req.json();

	const result = await streamUI({
		model,
		messages,
		tools: {
			getWeather: {
				description: 'Get the weather for a location',
				parameters: z.object({ location: z.string() }),
				generate: async function* ({ location }) {
					yield <LoadingComponent />;
					const weather = await getWeather(location);
					return <WeatherComponent weather={weather} location={location} />;
				},
			},
		},
	});

	const data = new StreamData();

	data.append({ test: 'value' });

	const stream = result.toAIStream({
		onFinal(_) {
			data.close();
		},
	});

	return new StreamingTextResponse(stream, {}, data);
}
