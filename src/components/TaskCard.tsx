
import React, { useState } from 'react';
import { Calendar, Edit2, Trash2, Check } from 'lucide-react';

interface Task {
  title: string;
  description: string;
  dueDate: string;
  priority: string;
}

interface TaskCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
  onDelete?: () => void;
  onComplete?: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  onComplete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-destructive/10 text-destructive';
      case 'medium':
        return 'bg-accent/10 text-accent';
      default:
        return 'bg-muted/10 text-muted-foreground';
    }
  };

  const handleSubmit = () => {
    onEdit?.(editedTask);
    setIsEditing(false);
  };

  return (
    <div className="todo-item group">
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
            className="todo-input"
          />
          <textarea
            value={editedTask.description}
            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
            className="todo-input min-h-[100px]"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
            >
              Abbrechen
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary-hover transition-colors"
            >
              Speichern
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-medium text-lg">{task.title}</h3>
              <p className="text-muted-foreground mt-1">{task.description}</p>
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar size={14} />
                  <span>{task.dueDate}</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <Edit2 size={18} className="text-muted-foreground" />
              </button>
              <button
                onClick={onDelete}
                className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
              >
                <Trash2 size={18} className="text-destructive" />
              </button>
              <button
                onClick={onComplete}
                className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
              >
                <Check size={18} className="text-primary" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
