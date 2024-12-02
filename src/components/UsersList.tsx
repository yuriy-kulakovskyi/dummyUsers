import { useState } from "react"
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  TouchSensor,
  closestCenter
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy
} from "@dnd-kit/sortable";
import { User } from "../interfaces/User";
import Item from "./Item";
import SortableItem from "./SortableItem";

interface UsersListProps {
  users: User[];
  setUsers(prev?: any): void;
}

const UsersList: React.FC<UsersListProps> = ({
  users,
  setUsers
}) => {

  const [activeItem, setActiveItem] = useState<User>()

  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));


  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    setActiveItem(users.find((item) => item.id === active.id))
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return

    const activeItem = users.find((item) => item.id === active.id)
    const overItem = users.find((item) => item.id === over.id)

    if (!activeItem || !overItem) {
      return
    }

    const activeIndex = users.findIndex((item) => item.id === active.id)
    const overIndex = users.findIndex((item) => item.id === over.id)

    if (activeIndex !== overIndex) {
      setUsers((prev: any) => arrayMove<User>(prev, activeIndex, overIndex))
    }
    setActiveItem(undefined);
  }

  const handleDragCancel = () => {
    setActiveItem(undefined)
  }

  const handleButtonClick = () => {
    localStorage.setItem("users", JSON.stringify(users));
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={users} strategy={rectSortingStrategy}>
        <div className="flex flex-col gap-[10px] p-[20px]">

          <button
            className="p-[20px] bg-green-400 text-white rounded-md hover:opacity-80"
            onClick={handleButtonClick}
          >
            Save this order
          </button>

          <ul className="min-w-[500px] flex flex-col justify-start items-start gap-[10px] p-[20px]">
            {users.map((item) => (
              <SortableItem key={item.id} item={item} />
            ))}
          </ul>
        </div>
      </SortableContext>
      <DragOverlay adjustScale>
        {activeItem ? <Item item={activeItem} isDragging /> : null}
      </DragOverlay>
    </DndContext>
  )
}

export default UsersList;