import React, {
  CSSProperties,
  FC,
  ReactNode,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDrag, useDragDropManager, useDrop } from "react-dnd";

type DragDropItemProps = {
  id: string;
  index: number;
  className?: string;
  styles?: CSSProperties;
  children?: ReactNode;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  accept: string;
  manager: any;
  setManager: any;
};

const style = {
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  backgroundColor: "white",
  cursor: "move",
};

const DragDropItem: FC<DragDropItemProps> = memo((props) => {
  const { index, moveCard, id, accept, manager, setManager } = props;
  const ref = useRef<any>(null);
  const dragDropManager = useDragDropManager();

  const [{ handlerId }, drop] = useDrop(
    {
      accept,
      collect: (monitor) => ({
        handlerId: monitor.getHandlerId(),
        didDrop: monitor.didDrop(),
      }),
      hover: (item, monitor) => {
        if (!ref.current) {
          return;
        }
        const dragIndex = item.index;
        const hoverIndex = props.index;

        if (dragIndex === hoverIndex) {
          return;
        }
        // 获取当前hover的 ListItem 元素的宽高,位置等数据
        const hoverBoundingRect = ref.current.getBoundingClientRect();
        // console.log('hoverBoundingRect', hoverBoundingRect);
        // 获取 当前ListItem 一半的高度
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        // console.log('hoverMiddleY', hoverMiddleY);
        // 获得鼠标的位置
        const clientOffset = monitor.getClientOffset();
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
      canDrop(item, monitor) {
        // dragDropManager.getActions().endDrag();
        console.log("11", item);
        if (monitor.getItemType() === accept) return true;
        return false;
      },
      drop(item, monitor) {
        console.log("item", item);
        dragDropManager.getActions().endDrag();
      },
    },
    [index, moveCard]
  );
  const [{ isDragging, tetsId }, drag] = useDrag(
    {
      type: accept,
      item: () => {
        return { id, index };
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        tetsId: monitor.getHandlerId(),
      }),
      end: () => {
        console.log("end");
        return true;
      },
      canDrag: () => {
        console.log("czxß");
        return true;
      },
    },
    [id, index]
  );

  drag(drop(ref));

  useEffect(() => {
    console.log(
      "dragDropManager",
      dragDropManager.getMonitor().isDragging(),
      dragDropManager.getMonitor().isDragging() ? "red" : "白色"
    );
    setManager(dragDropManager.getMonitor().isDragging());
  }, [isDragging, setManager]);

  useEffect(() => {
    console.log("1222", manager);
  }, [manager]);

  return (
    <div>
      <div
        ref={ref}
        style={{
          ...props.styles,
          ...style,
          opacity: isDragging ? 0.5 : 1,
          backgroundColor: manager ? "red" : "#fff",
          padding: manager ? "12px" : "0",
          width: manager && "1000px",
        }}
        className={props.className}
        data-handler-id={handlerId}>
        {manager ? "拖拽" : props.children}
      </div>
    </div>
  );
});

export default DragDropItem;
