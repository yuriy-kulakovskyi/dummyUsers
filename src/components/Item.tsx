import { forwardRef, HTMLAttributes } from "react"
import { User } from "../interfaces/User"

type Props = {
  item: User
  isOpacityEnabled?: boolean
  isDragging?: boolean
} & HTMLAttributes<HTMLDivElement>

const Item = forwardRef<HTMLDivElement, Props>(
  ({ item, isOpacityEnabled, isDragging, style, ...props }, ref) => {
    return (
      <div className="w-full p-[20px] rounded-lg text-white bg-gray-400" ref={ref} {...props}>
        <h1>{item.firstName} {item.lastName}</h1>
        <h2>Email: {item.email}</h2>
        <p>Age: {item.age}</p> 
        <p>University: {item.university}</p>
      </div>
    )
  }
)

export default Item