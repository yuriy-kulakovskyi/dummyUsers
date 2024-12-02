import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import Item from "./Item"
import { HTMLAttributes } from "react"
import { User } from "../interfaces/User"

type Props = {
  item: User
} & HTMLAttributes<HTMLDivElement>

const SortableItem = ({ item, ...props }: Props) => {
  const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({
    id: item.id,
  })

  return (
    <Item
      item={item}
      ref={setNodeRef}
      isOpacityEnabled={isDragging}
      {...props}
      {...attributes}
      {...listeners}
    />
  )
}

export default SortableItem;