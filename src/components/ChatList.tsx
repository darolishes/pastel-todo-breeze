
import { Message } from "@/store/chatStore"
import { ChatMessage } from "./ChatMessage"
import { ScrollArea } from "./ui/scroll-area"

interface ChatListProps {
  messages: Message[]
}

export const ChatList = ({ messages }: ChatListProps) => {
  return (
    <ScrollArea className="flex-1">
      <div className="flex flex-col">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>
    </ScrollArea>
  )
}
