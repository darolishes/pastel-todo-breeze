
import { Todo } from "@/types/todo";
import { TodoItem } from "./TodoItem";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

interface TodoCategoryProps {
  category: string;
  todos: Todo[];
  isExpanded: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
}

export const TodoCategory = ({
  category,
  todos,
  isExpanded,
  onToggle,
  onDelete,
  onEdit,
}: TodoCategoryProps) => {
  return (
    <div className="mb-12 relative">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        {category}
        <span className="text-sm text-muted-foreground">
          ({todos.length})
        </span>
      </h2>
      
      {!isExpanded && todos.length > 1 && (
        <div className="absolute top-[4.5rem] left-0 right-0 z-0">
          {todos.slice(1, 3).map((_, idx) => (
            <div
              key={`stack-${idx}`}
              className="bg-secondary/50 rounded-xl border border-border h-[72px] absolute w-full transition-all duration-1000 ease-in-out"
              style={{
                top: `${idx * 4}px`,
                transform: `scale(${0.99 - idx * 0.02})`,
                opacity: 0.5 - idx * 0.1,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative">
        <div className={`space-y-3 transition-all duration-1500 ease-in-out ${
          isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <SortableContext
            items={todos.map(todo => todo.id)}
            strategy={verticalListSortingStrategy}
          >
            {todos.map((todo, index) => (
              <div
                key={todo.id}
                className="transition-all duration-1500 ease-in-out"
                style={{
                  transform: isExpanded ? 'translateY(0)' : 'translateY(-8px)',
                  opacity: isExpanded ? 1 : 0,
                  transitionDelay: `${index * 200}ms`,
                }}
              >
                <TodoItem
                  todo={todo}
                  onToggle={onToggle}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              </div>
            ))}
          </SortableContext>
        </div>

        {!isExpanded && todos.length > 0 && (
          <div className="relative z-10 transition-all duration-1500 ease-in-out">
            <TodoItem
              todo={todos[0]}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          </div>
        )}
      </div>
    </div>
  );
};
