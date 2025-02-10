import { xai } from "@ai-sdk/xai";
import { streamText } from "ai";
import { auth } from "@clerk/nextjs/server";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  try {
    const { messages: messageHistory } = await req.json();

    const result = streamText({
      model: xai("grok-2-1212"),
      messages: messageHistory,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error in chat route:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
