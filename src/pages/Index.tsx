
import { Chat } from "@/components/Chat"
import { NavigationList } from "@/components/NavigationList"

const navigationItems = [
  { text: "Dashboard", href: "/" },
  { text: "Messages", href: "/messages" },
  { text: "Settings", href: "/settings" },
  { text: "Profile", href: "/profile" },
]

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
        <NavigationList items={navigationItems} />
        <div className="max-w-2xl mx-auto w-full">
          <Chat />
        </div>
      </div>
    </div>
  )
}

export default Index
