
import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  user?: {
    name: string;
  };
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, user }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={user ? `Nachricht als ${user.name}...` : "Schreibe eine Nachricht..."}
        className="w-full px-4 py-3 pr-12 rounded-lg border border-muted bg-secondary/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
      />
      <button 
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-accent transition-colors disabled:opacity-50"
        disabled={!message.trim()}
      >
        <Send size={20} />
      </button>
    </form>
  );
};
