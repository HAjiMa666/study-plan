import { css } from "@emotion/css";
import { history } from "umi";
import { Button, FormInstance, Modal } from "antd";
import {
  FC,
  ReactNode,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import dayjs from "dayjs";
import { useShallow } from "zustand/react/shallow";
import TaskCreateCenter from "./TaskCreateCenter";
import { useBatchAddStore } from "./store";
import { BatchAddWrapper } from "./style";
import { handleBatchAddTaskData } from "./utils";

interface BatchAddProps {
  children?: ReactNode;
  dutyData?: any;
  tableActionRef: ActionType | null;
}

// 批量创建任务
const BatchAdd: FC<BatchAddProps> = memo((props) => {
  const { tableActionRef, dutyData } = props;
  const [open, setOpen] = useState(false);
  const taskCreateRef = useRef<{ form: FormInstance }>(null);
  const { setCurrentDutyStartTime, setGroupsTime } = useBatchAddStore(
    useShallow((state) => ({
      setCurrentDutyStartTime: state.setCurrentDutyStartTime,
      setGroupsTime: state.setGroupsTime,
    }))
  );
  const onOpen = useCallback(() => {
    setOpen(true);
    document.body.style.overflow = "hidden";
  }, []);
  const onClose = useCallback(() => {
    setOpen(false);
    document.body.style.overflow = "";
  }, []);

  return (
    <BatchAddWrapper>
      <Button
        onClick={() => {
          onOpen();
        }}>
        {"批量创建"}
      </Button>
      <Modal
        open={open}
        onCancel={onClose}
        title={"批量创建"}
        width={"100vw"}
        wrapClassName={css`
          min-height: 90vh;
        `}
        onOk={() => {
          onClose();
        }}>
        <TaskCreateCenter ref={taskCreateRef} tempData={[]} />
      </Modal>
    </BatchAddWrapper>
  );
});

export default BatchAdd;
