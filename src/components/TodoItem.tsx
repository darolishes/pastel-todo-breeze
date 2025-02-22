
import { useState } from "react";
import { Check, Edit2, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  category: string;
  subtasks?: { id: string; title: string; completed: boolean }[];
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
}

export const TodoItem = ({ todo, onToggle, onDelete, onEdit }: TodoItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.title);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleEdit = () => {
    onEdit(todo.id, editValue);
    setIsEditing(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="todo-item animate-fade-in cursor-move"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <button
            onClick={() => onToggle(todo.id)}
            className={`todo-checkbox ${todo.completed ? "checked" : ""} flex items-center justify-center`}
          >
            {todo.completed && <Check size={16} className="text-white" />}
          </button>
          
          {isEditing ? (
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={handleEdit}
              onKeyDown={(e) => e.key === "Enter" && handleEdit()}
              className="todo-input"
              autoFocus
            />
          ) : (
            <div className="flex-1">
              <p className={`${todo.completed ? "line-through text-muted-foreground" : ""}`}>
                {todo.title}
              </p>
              <span className="category-chip mt-2">{todo.category}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <Edit2 size={18} className="text-muted-foreground" />
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
          >
            <Trash2 size={18} className="text-destructive" />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            {isExpanded ? (
              <ChevronUp size={18} className="text-muted-foreground" />
            ) : (
              <ChevronDown size={18} className="text-muted-foreground" />
            )}
          </button>
        </div>
      </div>

      {isExpanded && todo.description && (
        <div className="mt-4 pl-10 text-muted-foreground animate-fade-in">
          <p>{todo.description}</p>
          {todo.subtasks && (
            <div className="mt-3">
              {todo.subtasks.map((subtask) => (
                <div key={subtask.id} className="flex items-center gap-2 mt-2">
                  <div className={`w-4 h-4 rounded-full border-2 ${subtask.completed ? "bg-primary border-primary" : "border-muted-foreground"}`}>
                    {subtask.completed && <Check size={12} className="text-white" />}
                  </div>
                  <span className={subtask.completed ? "line-through" : ""}>
                    {subtask.title}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
