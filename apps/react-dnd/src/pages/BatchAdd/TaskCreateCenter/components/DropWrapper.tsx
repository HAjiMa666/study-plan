import DropContainer from "@/components/DragDropCpn/DropContainer";
import c from "classnames";
import { FC, memo } from "react";
import { useDrop } from "react-dnd";

// import DptPersonModal from '@/components/DptPersonSelect/Modal';
import { css } from "@emotion/css";
import { message } from "antd";
import { ItemTypes } from "../config/ItemTypes";

type ContainerProps = {
  onChange?: (value: any) => void;
  value?: any;
};

const container = css``;

const containerOver = css`
  .fakeSelect {
    box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.2);
  }
`;

const DropWrapper: FC<ContainerProps> = memo((props) => {
  const { onChange } = props;
  const [{ isOver, id }, drop] = useDrop(
    () => ({
      accept: ItemTypes.person,
      drop: (item: any) => {
        if (item?.personList?.length > 100) {
          message.warning("当前最多可选择100个");
          return;
        }
        props.onChange?.({
          dpt: [],
          person: item?.personList,
        });
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        id: monitor.getHandlerId(),
        canDrop: monitor.canDrop(),
        didDrop: monitor.didDrop(),
      }),
    }),
    [onChange]
  );

  return (
    <DropContainer
      id={id}
      dropRef={drop}
      className={c(container, {
        [containerOver]: isOver,
      })}>
      111
      {/* <DptPersonModal
        mode="multiplePerson"
        onChange={props.onChange}
        value={props.value}
        maxCount={1}
        max={100}
        panelClassName={css`
          height: 400px;
        `}
      /> */}
    </DropContainer>
  );
});

export default DropWrapper;
