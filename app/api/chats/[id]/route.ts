import { auth } from "@clerk/nextjs/server";
import { db } from "@/db/index";
import { messages, chats } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";

// GET /api/chats/[id] - Get specific chat messages
export async function GET(_: Request, { params }: { params: { id: string } }) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    // Verify chat belongs to user
    const [chat] = await db
      .select()
      .from(chats)
      .where(and(eq(chats.id, params.id), eq(chats.userId, userId)));

    if (!chat) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 });
    }

    const chatMessages = await db
      .select()
      .from(messages)
      .where(eq(messages.chatId, params.id))
      .orderBy(messages.createdAt);

    return NextResponse.json(chatMessages);
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch chat messages" },
      { status: 500 }
    );
  }
}
