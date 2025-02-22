
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"
import { useState } from "react"

interface NavigationItem {
  text: string
  href: string
}

interface NavigationListProps {
  items: NavigationItem[]
}

export const NavigationList = ({ items }: NavigationListProps) => {
  const [activeItem, setActiveItem] = useState<string>("")

  return (
    <nav className="w-full max-w-xs">
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={item.href}
            className="animate-fade-in"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <Link
              to={item.href}
              onClick={() => setActiveItem(item.href)}
              className={cn(
                "block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                "bg-background hover:bg-accent hover:text-accent-foreground",
                "transform hover:translate-x-1",
                activeItem === item.href && "bg-accent text-accent-foreground",
              )}
            >
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
