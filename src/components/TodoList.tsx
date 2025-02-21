
import { useState } from "react";
import { TodoItem } from "./TodoItem";
import { Search, Plus } from "lucide-react";

interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  category: string;
  subtasks?: { id: string; title: string; completed: boolean }[];
}

const initialTodos: Todo[] = [
  {
    id: "1",
    title: "Design-Meeting vorbereiten",
    description: "Präsentation für das morgige Meeting erstellen",
    completed: false,
    category: "Heute",
    subtasks: [
      { id: "1-1", title: "Slides erstellen", completed: true },
      { id: "1-2", title: "Designs exportieren", completed: false },
    ],
  },
  {
    id: "2",
    title: "E-Mails beantworten",
    completed: false,
    category: "Heute",
  },
  {
    id: "3",
    title: "Projekt-Timeline aktualisieren",
    description: "Neue Meilensteine hinzufügen",
    completed: false,
    category: "Diese Woche",
  },
];

export const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [searchQuery, setSearchQuery] = useState("");

  const handleToggle = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDelete = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleEdit = (id: string, newTitle: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, title: newTitle } : todo
    ));
  };

  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = ["Heute", "Diese Woche"];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
        <input
          type="text"
          placeholder="Aufgaben suchen..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="todo-input pl-10"
        />
      </div>

      {categories.map(category => {
        const categoryTodos = filteredTodos.filter(todo => todo.category === category);
        if (categoryTodos.length === 0) return null;

        return (
          <div key={category} className="mb-8">
            <h2 className="text-lg font-semibold mb-4">{category}</h2>
            {categoryTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        );
      })}

      <button className="add-button">
        <Plus size={24} />
      </button>
    </div>
  );
};
