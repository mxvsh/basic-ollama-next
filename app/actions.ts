'use server';

import { generateText } from 'ai';
import { createOllama } from 'ollama-ai-provider';

const ollama = createOllama();
const model = ollama('mistral');

export async function getAnswer(question: string) {
	console.log('question', question);
	const { text, finishReason, usage } = await generateText({
		model,
		prompt: question,
	});

	return { text, finishReason, usage };
}
