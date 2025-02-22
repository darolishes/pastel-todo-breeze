
import { useState } from "react";
import { SortableList } from "@/components/SortableList";

interface ListItem {
  id: string;
  value: string;
  children?: string;
}

const initialItems: ListItem[] = [
  {
    id: "1",
    value: "Erste Aufgabe",
    children: "Details zur ersten Aufgabe",
  },
  {
    id: "2",
    value: "Zweite Aufgabe",
  },
  {
    id: "3",
    value: "Dritte Aufgabe",
    children: "Weitere Informationen",
  },
];

const Index = () => {
  const [items, setItems] = useState<ListItem[]>(initialItems);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Sortierbare Liste
        </h1>
        
        <SortableList
          items={items}
          onSort={setItems}
        />
      </div>
    </div>
  );
};

export default Index;
