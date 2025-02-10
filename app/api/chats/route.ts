import { auth } from "@clerk/nextjs/server";
import { db } from "@/db/index";
import { chats, messages } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { HistoricalChat } from "@/lib/types/historical-chat";

// GET /api/chats - Get user's chat list
export async function GET() {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const userChats = await db.query.chats.findMany({
      where: eq(chats.userId, userId),
      with: {
        messages: {
          limit: 1,
          orderBy: [desc(messages.createdAt)],
        },
      },
      orderBy: [desc(chats.createdAt)],
    });

    const simplifiedChats: HistoricalChat[] = userChats.map((chat) => ({
      id: chat.id,
      createdAt: chat.createdAt,
      firstMessage: chat.messages[0]?.content || "New Chat",
    }));

    return NextResponse.json(simplifiedChats);
  } catch (error) {
    console.error("Error fetching chats:", error);
    return NextResponse.json(
      { error: "Failed to fetch chats" },
      { status: 500 }
    );
  }
}
