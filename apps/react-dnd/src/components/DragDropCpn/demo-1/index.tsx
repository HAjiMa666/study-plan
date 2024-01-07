import React, { ReactNode, memo } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Container from "./container";
import Box from "./box";

type DragDropCpnProps = {
  dropContainer: ReactNode;
  dragItem: ReactNode;
};

const DragDropCpn = memo(() => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <Container />
      </div>
      <div style={{ marginTop: "16px" }}>
        <Box name="box1" />
        <Box name="box2" />
        <Box name="box3" />
      </div>
    </DndProvider>
  );
});

export default DragDropCpn;
