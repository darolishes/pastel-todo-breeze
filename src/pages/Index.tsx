
import { TodoList } from "@/components/TodoList";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Linke Seite - Chat */}
        <div className="w-1/2 border-r border-muted/20 p-6 flex flex-col bg-card/50 backdrop-blur-xl">
          <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">AI Assistant</h2>
          <div className="flex-1 overflow-y-auto mb-4 rounded-xl bg-secondary/50 p-4">
            <div className="text-2xl text-muted-foreground/60 text-center mt-20">
              Ask anything
            </div>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Schreibe eine Nachricht..."
              className="w-full px-4 py-3 rounded-lg border border-muted bg-secondary/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 pr-12"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-accent transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>

        {/* Rechte Seite - Todo Liste */}
        <div className="w-1/2 overflow-y-auto bg-background/50 backdrop-blur-xl">
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Meine Aufgaben</h1>
            <TodoList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
