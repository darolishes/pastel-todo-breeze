
import { create } from 'zustand'

export interface Message {
  id: string
  text: string
  timestamp: number
  sender: {
    id: number
    name: string
    avatar: string
  }
}

interface ChatStore {
  messages: Message[]
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  addMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          ...message,
          id: Math.random().toString(36).substring(7),
          timestamp: Date.now(),
        },
      ],
    })),
}))
