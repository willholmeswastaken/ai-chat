"use client";

import { useQuery } from "@tanstack/react-query";
import { HistoricalChat } from "@/lib/types/historical-chat";
import { Message } from "@/db/schema";

export function useChats() {
  return useQuery<HistoricalChat[]>({
    queryKey: ["chats"],
    queryFn: async () => {
      const response = await fetch("/api/chats");
      if (!response.ok) throw new Error("Failed to fetch chats");
      return response.json();
    },
  });
}

export function useChatMessages(chatId: string) {
  return useQuery<Message[]>({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const response = await fetch(`/api/chats/${chatId}`);
      if (!response.ok) throw new Error("Failed to fetch chat messages");
      return response.json();
    },
    enabled: !!chatId,
  });
}
