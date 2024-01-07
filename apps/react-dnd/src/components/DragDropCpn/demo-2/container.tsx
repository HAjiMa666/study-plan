import React, { FC, ReactNode, memo } from "react";
import { useDrop } from "react-dnd";
import DropContainer from "@/components/DragDropCpn/DropContainer";
import c from "classnames";

import { ItemTypes } from "./ItemTypes";
import { container, containerOver } from "./styled";

type ContainerProps = {
  name: string;
  children?: ReactNode;
  dropFn?: (dragItem: any, monitor: any) => any;
};

const Container: FC<ContainerProps> = memo((props) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop: props.dropFn,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <DropContainer
      id="container1"
      dropRef={drop}
      className={c(container, {
        [containerOver]: isOver,
      })}>
      {props.children}
    </DropContainer>
  );
});

export default Container;
