
import { useState } from "react";
import { SortableList } from "@/components/SortableList";
import type { Item } from "@/components/SortableList";

const initialItems: Item[] = [
  {
    id: 1,
    text: "Erste Aufgabe",
    checked: false,
    description: "Details zur ersten Aufgabe"
  },
  {
    id: 2,
    text: "Zweite Aufgabe",
    checked: false,
    description: ""
  },
  {
    id: 3,
    text: "Dritte Aufgabe",
    checked: false,
    description: "Weitere Informationen"
  },
];

const Index = () => {
  const [items, setItems] = useState<Item[]>(initialItems);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Sortierbare Liste
        </h1>
        
        <SortableList
          items={items}
          setItems={setItems}
          onCompleteItem={(id) => {
            setItems(items.map(item =>
              item.id === id ? { ...item, checked: !item.checked } : item
            ));
          }}
          renderItem={(item, order, onComplete, onRemove) => (
            <SortableListItem
              key={item.id}
              item={item}
              order={order}
              onCompleteItem={onComplete}
              onRemoveItem={onRemove}
              handleDrag={() => {}}
            />
          )}
        />
      </div>
    </div>
  );
};

export default Index;
