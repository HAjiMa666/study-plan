import React, { FC, ReactNode, memo } from "react";
import { useDrag } from "react-dnd";

import DragItem from "@/components/DragDropCpn/DragItem";
import { ItemTypes } from "./ItemTypes";
import { box } from "./styled";

type DropResult = {
  name: string;
};

type BoxProps = {
  id: string;
  children?: ReactNode;
};

const Box: FC<BoxProps> = memo((props) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: {
      personList: [
        {
          label: "人员一",
          value: 1,
        },
      ],
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      console.log("dropResult", dropResult);
      console.log("item", item);
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handleId: monitor.getHandlerId(),
    }),
  }));
  return (
    <DragItem id="box1" dragRef={drag} className={box}>
      {props.children}
    </DragItem>
  );
});

export default Box;
