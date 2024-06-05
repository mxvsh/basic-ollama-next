import { createOllama } from 'ollama-ai-provider';
import { StreamingTextResponse, streamText, StreamData } from 'ai';

const ollama = createOllama();
const model = ollama('mistral');

export const maxDuration = 30;

export async function POST(req: Request) {
	const { messages } = await req.json();

	const result = await streamText({
		model,
		messages,
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
