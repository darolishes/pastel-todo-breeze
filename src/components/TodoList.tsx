import { useState, useEffect, useCallback } from "react";
import { Plus } from "lucide-react";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { TodoSearch } from "./TodoSearch";
import { TodoCategory } from "./TodoCategory";
import { Todo } from "@/types/todo";

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
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["Heute", "Diese Woche"]);
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());

  const sensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 8,
    },
  });
  
  const sensors = useSensors(sensor);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setTodos((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
    setLastInteractionTime(Date.now());
  };

  const handleToggle = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
    setLastInteractionTime(Date.now());
  };

  const handleDelete = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
    setLastInteractionTime(Date.now());
  };

  const handleEdit = (id: string, newTitle: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, title: newTitle } : todo
    ));
    setLastInteractionTime(Date.now());
  };

  const handleInteraction = useCallback(() => {
    setLastInteractionTime(Date.now());
    setExpandedCategories(["Heute", "Diese Woche"]);
  }, []);

  useEffect(() => {
    const inactivityTimeout = 5000;
    let timeoutId: NodeJS.Timeout;

    const checkInactivity = () => {
      const currentTime = Date.now();
      if (currentTime - lastInteractionTime > inactivityTimeout) {
        setExpandedCategories(prev => {
          if (prev.length === 0) return prev;
          return prev.slice(0, -1);
        });
      }
    };

    timeoutId = setInterval(checkInactivity, 2000);

    return () => clearInterval(timeoutId);
  }, [lastInteractionTime]);

  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = ["Heute", "Diese Woche"];

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div onClick={handleInteraction} className="relative">
        <TodoSearch value={searchQuery} onChange={setSearchQuery} />

        {categories.map(category => {
          const categoryTodos = filteredTodos.filter(todo => todo.category === category);
          if (categoryTodos.length === 0) return null;

          return (
            <TodoCategory
              key={category}
              category={category}
              todos={categoryTodos}
              isExpanded={expandedCategories.includes(category)}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          );
        })}

        <button className="fixed bottom-6 right-6 bg-primary text-white rounded-full p-4 shadow-lg hover:bg-primary-hover transition-colors duration-200">
          <Plus size={24} />
        </button>
      </div>
    </DndContext>
  );
};
