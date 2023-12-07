import React, {
  CSSProperties,
  FC,
  ReactNode,
  memo,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useDrag, useDrop } from "react-dnd";

type DragDropItemProps = {
  id: string;
  index: number;
  className?: string;
  styles?: CSSProperties;
  children?: ReactNode;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
};

const style = {
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  backgroundColor: "white",
  cursor: "move",
};

const DragDropItem: FC<DragDropItemProps> = memo((props) => {
  const { index, moveCard, id } = props;
  const ref = useRef<any>(null);

  const [{ handlerId }, drop] = useDrop(
    {
      accept: "listItem",
      collect: (monitor) => ({
        handlerId: monitor.getHandlerId(),
      }),
      hover: (item, monitor) => {
        if (!ref.current) {
          return;
        }
        const dragIndex = item.index;
        const hoverIndex = props.index;
        // console.log("hoverIndex", dragIndex, hoverIndex);

        if (dragIndex === hoverIndex) {
          return;
        }
        // 获取当前hover的 ListItem 元素的宽高,位置等数据
        const hoverBoundingRect = ref.current.getBoundingClientRect();
        // console.log("hoverBoundingRect", hoverBoundingRect);
        // 获取 当前ListItem 一半的高度
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        console.log("hoverMiddleY", hoverMiddleY);
        // 获得鼠标的位置
        const clientOffset = monitor.getClientOffset();
        // console.log("clientOffset", clientOffset);
        const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

        // 向下拖动
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }
        // 向上拖动
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }
        props.moveCard(dragIndex, hoverIndex);
        item.index = hoverIndex;
      },
    },
    [index, moveCard]
  );
  const [{ isDragging }, drag] = useDrag(
    {
      type: "listItem",
      item: () => {
        return { id, index };
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    },
    [id, index]
  );

  drag(drop(ref));
  return (
    <div
      ref={ref}
      style={{ ...props.styles, ...style, opacity: isDragging ? 0 : 1 }}
      className={props.className}
      data-handler-id={handlerId}>
      {props.children}
    </div>
  );
});

export default DragDropItem;
