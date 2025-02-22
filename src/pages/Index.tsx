import { TodoList } from "@/components/TodoList";
import { ChatInput } from "@/components/ChatInput";

const Index = () => {
  const handleSendMessage = (message: string) => {
    console.log("Sending message:", message);
    // Hier können wir später die OpenAI-Integration implementieren
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Linke Seite - Chat */}
        <div className="w-1/2 border-r border-muted/20 p-6 flex flex-col bg-card/50 backdrop-blur-xl">
          <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            AI Assistant
          </h2>
          <div className="flex-1 overflow-y-auto mb-4 rounded-xl bg-secondary/50 p-4">
            <div className="text-2xl text-muted-foreground/60 text-center mt-20">
              Ask anything
            </div>
          </div>
          <ChatInput onSendMessage={handleSendMessage} />
        </div>

        {/* Rechte Seite - Todo Liste */}
        <div className="w-1/2 overflow-y-auto bg-background/50 backdrop-blur-xl">
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Meine Aufgaben
            </h1>
            <TodoList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
