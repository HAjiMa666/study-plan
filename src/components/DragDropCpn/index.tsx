import React, { ReactNode, memo } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Container from "./DropContainer";
import Box from "./DragItem";

type DragDropCpnProps = {
  dropContainer: ReactNode;
  dragItem: ReactNode;
};

const DragDropCpn = memo(() => {
  return <DndProvider backend={HTML5Backend}></DndProvider>;
});

export default DragDropCpn;
