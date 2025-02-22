
export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  category: string;
  subtasks?: { id: string; title: string; completed: boolean }[];
}
