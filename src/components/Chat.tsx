
import { useState } from "react"
import { ChatInput } from "./ChatInput"
import { ChatList } from "./ChatList"
import { useChatStore } from "@/store/chatStore"
import { useToast } from "@/hooks/use-toast"

// Mock user for demo purposes
const currentUser = {
  id: 1,
  name: "John Doe",
  avatar: "https://github.com/shadcn.png"
}

export const Chat = () => {
  const { messages, addMessage } = useChatStore()
  const { toast } = useToast()
  const [error, setError] = useState<string | null>(null)

  const handleSendMessage = (text: string) => {
    if (text.trim().length < 1) {
      setError("Bitte geben Sie eine Nachricht ein")
      toast({
        variant: "destructive",
        title: "Fehler",
        description: "Bitte geben Sie eine Nachricht ein"
      })
      return
    }

    if (text.trim().length > 500) {
      setError("Nachricht darf nicht länger als 500 Zeichen sein")
      toast({
        variant: "destructive",
        title: "Fehler",
        description: "Nachricht darf nicht länger als 500 Zeichen sein"
      })
      return
    }

    setError(null)
    addMessage({
      text,
      sender: currentUser
    })
  }

  return (
    <div className="flex h-[600px] flex-col rounded-lg border bg-background shadow">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Chat</h2>
      </div>
      <ChatList messages={messages} />
      <div className="border-t p-4">
        <ChatInput 
          onSendMessage={handleSendMessage} 
          error={error}
          user={currentUser}
        />
      </div>
    </div>
  )
}
