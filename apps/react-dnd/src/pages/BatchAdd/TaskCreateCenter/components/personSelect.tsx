import c from "classnames";
import { FC, ReactNode, memo, useState } from "react";
import { DragPreviewImage, useDrag } from "react-dnd";

// import PersonPreviewImage from "@/assets/images/task/personDrag.png";
// import DptPersonPanel from '@/components/DptPersonSelect/DptPersonPanel';
import DragItem from "@/components/DragDropCpn/DragItem";
import { ItemTypes } from "../config/ItemTypes";

type DropResult = {
  name: string;
};

type PersonSelectProps = {
  id: string;
  children?: ReactNode;
  className?: string;
};

const PersonSelect: FC<PersonSelectProps> = memo((props) => {
  const [dptPersonValue, setDptPersonValue] = useState<any>(null);
  const [{ handleId }, drag, preview] = useDrag(
    () => ({
      type: ItemTypes.person,
      item: {
        personList: dptPersonValue?.person,
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
    }),
    [dptPersonValue]
  );
  return (
    <>
      {/* <DragPreviewImage connect={preview} src={PersonPreviewImage} /> */}
      <DragItem dragRef={drag}>
        111
        {/* <DptPersonPanel
          mode="multiplePerson"
          value={dptPersonValue}
          onChange={(value) => {
            setDptPersonValue(value);
          }}
          className={c(props.className)}
          isNeedClassify={true}
        /> */}
      </DragItem>
    </>
  );
});

export default PersonSelect;
