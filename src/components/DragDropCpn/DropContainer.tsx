import React, { CSSProperties, FC, ReactNode, memo } from "react";
import { useDrop } from "react-dnd";

type DropContainerProps = {
  id: string;
  dropRef: any;
  children?: ReactNode;
  styles?: CSSProperties;
  className?: string;
};

const DropContainer: FC<DropContainerProps> = memo((props) => {
  return (
    <div
      ref={props.dropRef}
      data-id={props.id}
      style={props.styles}
      className={props.className}>
      {props.children}
    </div>
  );
});

export default DropContainer;
