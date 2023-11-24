import { AnthropicStream, StreamingTextResponse } from "ai";
import { Anthropic } from '@anthropic-ai/sdk'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export const runtime = "edge";

const handler = async (req: Request): Promise<Response> => {
  const { prompt, elon, length, tone, audience, emotion, claude, hashtags } = await req.json();
  const systemPrompt = `You are a Tweet feedback expert. You are tasked with reviewing a Tweet. Provide feedback targeting an audience described as ${audience}, using a tone that is ${tone}. Your feedback should convey the emotion of ${emotion} and shall harshness level of ${length}%. Make it fun and interesting. Remember, do not engage in a conversation with the user; simply write the Tweet feedback. ${elon ? "Think you are Elon Musk" : "Think you are a normal person"}. ${hashtags ? "Include hashtags in your feedback" : "Do not include hashtags in your feedback"}.`;
  console.log(systemPrompt);

  const response = await anthropic.completions.create({
    model: claude,
    stream: true,
    max_tokens_to_sample: 300,
    prompt: systemPrompt + `\n\nHuman: ${prompt}\n\nAssistant:`,
  });

  const stream = AnthropicStream(response);

  return new StreamingTextResponse(stream);
}

export default handler;