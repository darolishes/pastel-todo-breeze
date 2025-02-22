
import { useState, useEffect, useCallback } from "react";
import { TodoItem } from "./TodoItem";
import { Search, Plus } from "lucide-react";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

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
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["Heute", "Diese Woche"]);
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());

  // DnD Sensoren konfigurieren
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

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

          const isExpanded = expandedCategories.includes(category);

          return (
            <div key={category} className="mb-12 relative">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                {category}
                <span className="text-sm text-muted-foreground">
                  ({categoryTodos.length})
                </span>
              </h2>
              
              {/* Gestapelte Karten im Hintergrund */}
              {!isExpanded && categoryTodos.length > 1 && (
                <div className="absolute top-[4.5rem] left-0 right-0 z-0">
                  {categoryTodos.slice(1, 3).map((_, idx) => (
                    <div
                      key={`stack-${idx}`}
                      className="bg-white/50 rounded-xl border border-border h-[72px] absolute w-full transition-all duration-1000 ease-in-out"
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
                {/* Hauptliste mit Animationen */}
                <div className={`space-y-3 transition-all duration-1500 ease-in-out ${
                  isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                }`}>
                  <SortableContext
                    items={categoryTodos.map(todo => todo.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {categoryTodos.map((todo, index) => (
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
                          onToggle={handleToggle}
                          onDelete={handleDelete}
                          onEdit={handleEdit}
                        />
                      </div>
                    ))}
                  </SortableContext>
                </div>

                {/* Oberste Karte */}
                {!isExpanded && categoryTodos.length > 0 && (
                  <div className="relative z-10 transition-all duration-1500 ease-in-out">
                    <TodoItem
                      todo={categoryTodos[0]}
                      onToggle={handleToggle}
                      onDelete={handleDelete}
                      onEdit={handleEdit}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}

        <button className="fixed bottom-6 right-6 bg-primary text-white rounded-full p-4 shadow-lg hover:bg-primary-hover transition-colors duration-200">
          <Plus size={24} />
        </button>
      </div>
    </DndContext>
  );
};
