
import { TodoList } from "@/components/TodoList";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Meine Aufgaben</h1>
        <TodoList />
      </div>
    </div>
  );
};

export default Index;
