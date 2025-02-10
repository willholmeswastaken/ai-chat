"use client";

import { Card } from "@/components/ui/card";
import { BookOpen, Globe2, Headphones, Activity } from "lucide-react";
import { ChatInput } from "./chat-input";
import { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

export default function ChatInterface() {
  const chatId = useMemo(() => uuidv4(), []);
  const { push } = useRouter();

  const navigateToChat = (): void => {
    push(`/chat/${chatId}`);
  };
  return (
    <div className="min-h-screen text-white p-4 flex flex-col items-center space-y-10">
      {/* Logo */}
      <div className="w-full max-w-3xl flex justify-center mb-8 mt-12">
        <h2 className="text-3xl font-bold">Will Ai Chat</h2>
      </div>

      {chatId.length > 0 && (
        <ChatInput id={chatId} submitCallback={navigateToChat} />
      )}

      {/* Features Section */}
      <div className="w-full max-w-3xl">
        <h2 className="text-xl font-semibold mb-4">
          Explore what Will Ai Chat can do
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-[#1A1A1A] text-white border-0 p-4 hover:bg-[#2A2A2A] transition-colors cursor-pointer">
            <BookOpen className="h-6 w-6 mb-2" />
            <div className="font-medium">Recommend books</div>
          </Card>
          <Card className="bg-[#1A1A1A] text-white border-0 p-4 hover:bg-[#2A2A2A] transition-colors cursor-pointer">
            <Globe2 className="h-6 w-6 mb-2" />
            <div className="font-medium">Translate text</div>
          </Card>
          <Card className="bg-[#1A1A1A] text-white border-0 p-4 hover:bg-[#2A2A2A] transition-colors cursor-pointer">
            <Headphones className="h-6 w-6 mb-2" />
            <div className="font-medium">Recommend podcasts</div>
          </Card>
          <Card className="bg-[#1A1A1A] text-white border-0 p-4 hover:bg-[#2A2A2A] transition-colors cursor-pointer">
            <Activity className="h-6 w-6 mb-2" />
            <div className="font-medium">Analyze doctor&apos;s note</div>
          </Card>
        </div>
      </div>
    </div>
  );
}
