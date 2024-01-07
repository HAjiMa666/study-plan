import React, { CSSProperties, FC, ReactNode, memo } from "react";
import { Ref } from "react";

export interface BoxProps {
  dragRef: Ref<any>;
  id: string;
  children?: ReactNode;
  styles?: CSSProperties;
  className?: string;
}

const DragItem: FC<BoxProps> = memo((props) => {
  return (
    <div
      ref={props.dragRef}
      style={props.styles}
      className={props.className}
      data-id={props.id}>
      {props.children}
    </div>
  );
});

export default DragItem;
