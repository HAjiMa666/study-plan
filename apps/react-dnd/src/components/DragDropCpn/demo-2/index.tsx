import React, { memo } from "react";
import Main from "./main";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
const Demo2 = memo(() => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Main />
    </DndProvider>
  );
});

export default Demo2;
