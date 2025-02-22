"use client"

import { useState } from "react"
import { Trash } from "lucide-react"
import {
  AnimatePresence,
  LayoutGroup,
  Reorder,
  motion,
  useDragControls,
} from "framer-motion"
import useMeasure from "react-use-measure"

import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"

export type Item = {
  text: string
  checked: boolean
  id: number
  description: string
}

interface SortableListItemProps {
  item: Item
  order: number
  onCompleteItem: (id: number) => void
  onRemoveItem: (id: number) => void
  renderExtra?: (item: Item) => React.ReactNode
  isExpanded?: boolean
  className?: string
  handleDrag: () => void
}

export function SortableListItem({
  item,
  order,
  onCompleteItem,
  onRemoveItem,
  renderExtra,
  handleDrag,
  isExpanded,
  className,
}: SortableListItemProps) {
  let [ref, bounds] = useMeasure()
  const [isDragging, setIsDragging] = useState(false)
  const [isDraggable, setIsDraggable] = useState(true)
  const dragControls = useDragControls()

  const handleDragStart = (event: any) => {
    setIsDragging(true)
    setIsDraggable(false)
    dragControls.start(event, { snapToCursor: true })
    handleDrag()
  }

  const handleDragEnd = () => {
    setIsDragging(false)
    setTimeout(() => setIsDraggable(true), 300) // Add delay before re-enabling drag
  }

  return (
    <motion.div 
      className={cn("select-none", className)} 
      key={item.id}
      animate={{
        scale: isDragging ? 1 : item.checked ? 0.95 : 1,
        y: item.checked && !isDragging ? order * -4 : 0,
        transition: {
          type: "spring",
          stiffness: 800,
          damping: 35,
          mass: 0.8
        }
      }}
    >
      <div className="flex w-full items-center">
        <Reorder.Item
          value={item}
          className={cn(
            "relative z-auto grow",
            "h-full rounded-xl bg-[#161716]/80",
            "shadow-[0px_1px_0px_0px_hsla(0,0%,100%,.03)_inset,0px_0px_0px_1px_hsla(0,0%,100%,.03)_inset,0px_0px_0px_1px_rgba(0,0,0,.1),0px_2px_2px_0px_rgba(0,0,0,.1),0px_4px_4px_0px_rgba(0,0,0,.1),0px_8px_8px_0px_rgba(0,0,0,.1)]",
            item.checked ? "cursor-not-allowed" : "cursor-grab",
            item.checked && !isDragging ? "w-[90%] transition-all duration-200" : "w-full"
          )}
          key={item.id}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            height: bounds.height > 0 ? bounds.height : undefined,
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.3,
            },
          }}
          exit={{
            opacity: 0,
            scale: 0.95,
            transition: {
              duration: 0.2,
              ease: "easeInOut"
            },
          }}
          layout
          layoutId={`item-${item.id}`}
          dragListener={!item.checked}
          dragControls={dragControls}
          onDragEnd={handleDragEnd}
          style={{
            ...(!isExpanded ? {
              position: "relative",
              overflow: "hidden",
              zIndex: isDragging ? 50 : item.checked ? 10 : 1
            } : {
              zIndex: 9999,
              marginTop: 10,
              marginBottom: 10,
              position: "relative",
              overflow: "hidden"
            })
          }}
          whileDrag={{ 
            zIndex: 9999,
            scale: 1.02,
            transition: {
              duration: 0.2
            }
          }}
        >
          <div ref={ref} className={cn(isExpanded ? "" : "", "z-20 select-none")}>
            <motion.div
              layout="position"
              className="flex items-center justify-center select-none"
            >
              <AnimatePresence>
                {!isExpanded ? (
                  <motion.div
                    initial={{ opacity: 0, filter: "blur(4px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(4px)" }}
                    transition={{ duration: 0.001 }}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      checked={item.checked}
                      id={`checkbox-${item.id}`}
                      aria-label="Mark to delete"
                      onCheckedChange={() => onCompleteItem(item.id)}
                      className="ml-3 h-5 w-5 rounded-md border-white/20 bg-black/30 data-[state=checked]:bg-black data-[state=checked]:text-red-200"
                    />
                    <p className="font-mono text-xs pl-1 text-white/50">
                      {order + 1}
                    </p>

                    <motion.div
                      key={`${item.checked}`}
                      className="px-1 min-w-[150px] select-none"
                      initial={{
                        opacity: 0,
                        filter: "blur(4px)",
                      }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      transition={{
                        bounce: 0.2,
                        delay: item.checked ? 0.2 : 0,
                        type: "spring",
                      }}
                    >
                      <h4
                        className={cn(
                          "tracking-tighter text-base md:text-lg",
                          item.checked ? "text-red-400" : "text-white/70"
                        )}
                      >
                        {item.checked ? "Delete" : ` ${item.text}`}
                      </h4>
                    </motion.div>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              {renderExtra && renderExtra(item)}
            </motion.div>
          </div>
          <div
            onPointerDown={isDraggable ? handleDragStart : undefined}
            style={{ touchAction: "none" }}
          />
        </Reorder.Item>
        <AnimatePresence mode="popLayout">
          {item.checked && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onClick={() => onRemoveItem(item.id)}
              className="ml-2 p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
            >
              <Trash size={18} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}