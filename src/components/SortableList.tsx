
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableItemProps {
  id: string;
  value: string;
  children?: string;
}

interface SortableListProps {
  items: SortableItemProps[];
  onSort: (items: SortableItemProps[]) => void;
}

const SortableItem = ({ id, value, children }: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 2 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`p-4 mb-2 bg-card rounded-lg border border-border cursor-move hover:border-primary/50 transition-colors ${
        isDragging ? "shadow-lg opacity-90" : ""
      }`}
    >
      <div className="font-medium text-card-foreground">{value}</div>
      {children && (
        <div className="text-sm text-muted-foreground mt-1">{children}</div>
      )}
    </div>
  );
};

export const SortableList = ({ items, onSort }: SortableListProps) => {
  const [newItemValue, setNewItemValue] = useState("");
  const [error, setError] = useState("");

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
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      const newItems = [...items];
      const [movedItem] = newItems.splice(oldIndex, 1);
      newItems.splice(newIndex, 0, movedItem);

      onSort(newItems);
    }
  };

  const handleAddItem = () => {
    if (!newItemValue.trim()) {
      setError("Der Wert darf nicht leer sein");
      return;
    }

    const newItem: SortableItemProps = {
      id: `item-${Date.now()}`,
      value: newItemValue.trim(),
    };

    onSort([...items, newItem]);
    setNewItemValue("");
    setError("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div className="flex gap-2">
        <Input
          value={newItemValue}
          onChange={(e) => {
            setNewItemValue(e.target.value);
            setError("");
          }}
          placeholder="Neues Element hinzufügen"
          className={error ? "border-destructive" : ""}
        />
        <Button onClick={handleAddItem} className="shrink-0">
          <Plus className="h-4 w-4 mr-1" />
          Hinzufügen
        </Button>
      </div>
      
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((item) => (
            <SortableItem key={item.id} {...item} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};
