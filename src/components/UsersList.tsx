import { useState } from "react";
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
} from "@dnd-kit/core";
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

const UsersList: React.FC<UsersListProps> = ({ users, setUsers }) => {
  const [activeItem, setActiveItem] = useState<User | undefined>();

  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveItem(users.find((item) => item.id === active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeIndex = users.findIndex((item) => item.id === active.id);
    const overIndex = users.findIndex((item) => item.id === over.id);

    if (activeIndex !== overIndex) {
      setUsers((prev: User[]) => {
        const newUsers = arrayMove(prev, activeIndex, overIndex);
        localStorage.setItem("users", JSON.stringify(newUsers)); // Зберігаємо новий порядок
        return newUsers;
      });
    }
    setActiveItem(undefined);
  };

  const handleDragCancel = () => {
    setActiveItem(undefined);
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
  );
};

export default UsersList;