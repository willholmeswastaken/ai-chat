import { xai } from "@ai-sdk/xai";
import { streamText } from "ai";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db/index";
import { chats, messages, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

// Allow streaming responses up to 30 secon ds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  try {
    const { messages: messageHistory } = await req.json();

    // Ensure user exists in our database
    let [user] = await db.select().from(users).where(eq(users.clerkId, userId));

    if (!user) {
      const [newUser] = await db
        .insert(users)
        .values({
          id: uuidv4(),
          clerkId: userId,
        })
        .returning();
      user = newUser;
    }

    // Create chat and first message in a transaction
    const chatId = uuidv4();
    await db.transaction(async (tx) => {
      await tx.insert(chats).values({
        id: chatId,
        userId: user.id,
      });

      if (messageHistory.length > 0) {
        await tx.insert(messages).values({
          id: uuidv4(),
          chatId: chatId,
          role: messageHistory[0].role,
          content: messageHistory[0].content,
        });
      }
    });

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
