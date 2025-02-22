
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format } from "date-fns"
import type { Message } from "@/store/chatStore"

interface ChatMessageProps {
  message: Message
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div className="flex items-start space-x-4 p-4 hover:bg-accent/5 rounded-lg transition-colors">
      <Avatar>
        <AvatarImage src={message.sender.avatar} />
        <AvatarFallback>{message.sender.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{message.sender.name}</span>
          <span className="text-xs text-muted-foreground">
            {format(message.timestamp, 'HH:mm')}
          </span>
        </div>
        <p className="text-sm text-foreground/90">{message.text}</p>
      </div>
    </div>
  )
}
