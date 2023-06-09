import { Configuration, OpenAIApi } from "openai";
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { OPENAI_API_KEY } from '$env/static/private'

const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
});

const apiClient = new OpenAIApi(configuration);

interface errorRes {
    response: {
        data: {
            error: {
                message: string
            }
        }
    }
}

export const POST = (async function ({ request }) {
    const body = await request.json();
    try {
        const completions = await apiClient.createCompletion({
            model: 'text-davinci-003',
            prompt: `Make a quote about: ${body.prompt} and add emojis to make it more fun in the style of Oscar Wilde.`,
            max_tokens: 880,
            temperature: 0.7,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0
        });
        const response = completions.data.choices[0].text;
        console.log(completions.data.choices);
        return json(response);
    } catch (error) {
        const errorMessage = error as errorRes;
        return json(errorMessage.response.data.error.message);
    }

}) satisfies RequestHandler;
