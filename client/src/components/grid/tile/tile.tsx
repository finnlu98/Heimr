
import { CSS } from "@dnd-kit/utilities";
import {
  useSortable
} from "@dnd-kit/sortable";
import "./tile.css"

interface TileProps {
  id: string;
  children: React.ReactNode
}

const Tile: React.FC<TileProps> = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "none",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="grid-item">
      {children}
      <div className="dragger" {...listeners} {...attributes}> ||| </div>
    </div>
  );
};

export default Tile;