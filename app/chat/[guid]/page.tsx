import { ChatInput } from "@/components/chat-input";
import { Button } from "@/components/ui/button";
import {
  Pencil,
  Copy,
  Share2,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

export default function ChatPage() {
  const messages = [];
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 p-4">
        <div className="flex items-center gap-3 max-w-3xl mx-auto">
          <img
            src="https://pbs.twimg.com/profile_images/1524749706915565569"
            alt="Avatar"
            className="w-10 h-10 rounded-full"
          />
          <h1 className="text-xl font-semibold">Hello world</h1>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((message) => (
            <div key={message.id} className="space-y-2">
              <div className="flex flex-col">
                <div
                  className={`inline-block max-w-[85%] px-4 py-2 rounded-lg ${
                    message.role === "assistant"
                      ? "bg-[#2A2A2A] text-white"
                      : "bg-blue-600 text-white ml-auto"
                  }`}
                >
                  {message.content}
                </div>
                {message.role === "assistant" && (
                  <div className="flex items-center gap-2 mt-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Post</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">Copy</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Share2 className="h-4 w-4" />
                      <span className="sr-only">Share</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <RefreshCw className="h-4 w-4" />
                      <span className="sr-only">Regenerate</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ThumbsUp className="h-4 w-4" />
                      <span className="sr-only">Like</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ThumbsDown className="h-4 w-4" />
                      <span className="sr-only">Dislike</span>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4">
        <div className="max-w-3xl mx-auto">
          <ChatInput />
        </div>
      </div>
    </div>
  );
}
