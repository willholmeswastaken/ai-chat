"use client";

import Link from "next/link";
import { useChats } from "@/hooks/use-chats";

export function ChatHistory() {
  const { data: chats, isLoading, error } = useChats();

  if (isLoading) return <div className="w-64 p-4">Loading...</div>;
  if (error) return <div className="w-64 p-4">Error loading chats</div>;

  return (
    <div className="w-64 p-4 border-r border-gray-800">
      <h3 className="text-lg font-semibold mb-4">Chat History</h3>
      <div className="space-y-2">
        {chats?.map((chat) => (
          <Link
            key={chat.id}
            href={`/chat/${chat.id}`}
            className="block p-2 hover:bg-gray-800 rounded transition-colors"
          >
            {chat.firstMessage.substring(0, 50)}...
          </Link>
        ))}
      </div>
    </div>
  );
}
