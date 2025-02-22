
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  error?: string | null;
  user?: {
    name: string;
  };
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, error, user }) => {
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
        className={cn(
          "w-full px-4 py-3 pr-12 rounded-lg border bg-secondary/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200",
          error ? "border-destructive" : "border-muted"
        )}
        aria-invalid={error ? "true" : "false"}
      />
      {error && (
        <span className="text-destructive text-sm mt-1 block">
          {error}
        </span>
      )}
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
