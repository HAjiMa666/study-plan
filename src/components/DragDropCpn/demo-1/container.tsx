import React, { CSSProperties, memo } from "react";
import { useDrop } from "react-dnd";

import { ItemTypes } from "./ItemTypes";

const styleTest: CSSProperties = {
  width: "300px",
  height: "300px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
};

const Container = memo(() => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop: (dragItem) => {
      console.log("dragItem", dragItem);
      return { name: "container1111" };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;

  let backgroundColor = "#222";
  if (isOver) {
    backgroundColor = "red";
  } else if (isActive) {
    backgroundColor = "skyblue";
  } else if (canDrop) {
    backgroundColor = "violet";
  }
  return (
    <div
      ref={drop}
      style={{ ...styleTest, backgroundColor }}
      data-testid="container">
      {isActive ? "已经覆盖可以放上来" : "可以把盒子放在这里"}
    </div>
  );
});

export default Container;
