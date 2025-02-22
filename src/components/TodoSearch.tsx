
import { Search } from "lucide-react";

interface TodoSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const TodoSearch = ({ value, onChange }: TodoSearchProps) => {
  return (
    <div className="relative mb-8">
      <Search 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
        size={20} 
      />
      <input
        type="text"
        placeholder="Aufgaben suchen..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="todo-input pl-10"
      />
    </div>
  );
};
