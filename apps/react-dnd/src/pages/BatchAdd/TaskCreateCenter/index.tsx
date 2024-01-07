import { css } from '@emotion/css';
import { DatePicker, Form, FormInstance, Space, Switch } from 'antd';
import dayjs from 'dayjs';
import {
  Ref,
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { usePreview } from 'react-dnd-preview';
import { useShallow } from 'zustand/react/shallow';
import { useBatchAddStore } from '../store';
import SingleTemp from './components/SingleGroup';
import PersonSelect from './components/personSelect';
import { cellNames } from './config';
import { ItemTypes } from './config/ItemTypes';
import {
  ContainerWrapper,
  FormWrapper,
  PersonDragWrapper,
  TableCell,
  TableHeadWrapper,
} from './styled';

type SingleTempProps = {
  id: number | string;
  index: number;
  moveCard: (from: number, to: number) => void;
  add: () => void;
  remove: () => void;
  name: number;
  form: FormInstance;
};

const groupsCss = css`
  width: 100%;
  border: 1px solid #d9d9d9;
  overflow: auto;
  border-radius: 8px 8px 0px 0px;
`;

const TaskCreateCenter = (props, ref: Ref<{ form: FormInstance }>) => {
  const { tempData } = props;
  const [form] = Form.useForm();
  const [groupsHeight, setGroupsHeight] = useState<number | undefined>(0);
  const [isStartDragging, setIsDragging] = useState(false);
  const { setBatchAddData, hasCircle } = useBatchAddStore(
    useShallow((state) => ({
      setBatchAddData: state.setBatchAddData,
      hasCircle: state.hasCircle,
    })),
  );

  useImperativeHandle(ref, () => ({
    form: form,
  }));

  const groupRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   // 监听任务列表的高度，用于同步设置人员选择组件的高度
  //   const ele = groupRef.current;
  //   const observer = new ResizeObserver((entries) => {
  //     entries.forEach((entry) => {
  //       const { height } = entry.contentRect;
  //       setGroupsHeight(height);
  //     });
  //   });
  //   observer.observe(ele as Element);
  //   return () => {
  //     observer.unobserve(ele as Element);
  //   };
  // }, []);

  useEffect(() => {
    if (tempData) {
      form.setFieldsValue({
        ...tempData,
        templateEndTime: dayjs(tempData?.templateEndTime),
      });
      setBatchAddData('hasCircle', tempData?.hasCircle ?? false);
      console.log('模板数据', tempData);
    }
  }, [tempData, form, setBatchAddData]);

  const MyPreview = () => {
    const preview = usePreview();
    setIsDragging(preview.display);
    if (!preview.display) {
      return null;
    }
    const { style, monitor } = preview;
    if (
      monitor.getItemType() === ItemTypes.person ||
      monitor.getItemType() === ItemTypes.list
    ) {
      return null;
    }
    // console.log('itemType', monitor.isDragging(), itemType, item, style);
    return (
      <div
        className={css`
          width: 1000px;
          height: 60px;
          background-color: #fff;
          border: 1px solid #000;
          box-shadow: 0 -10px 12px rgba(0, 0, 0, 0.1);
        `}
        style={style}
      >
        预览
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <ContainerWrapper>
        <FormWrapper>
          <Form form={form} style={{ width: '100%' }}>
            <Space style={{ marginBottom: '12px' }}>
              <Form.Item
                label="重复日程"
                name="hasCycle"
                normalize={(value) => (value ? 1 : 0)}
                valuePropName="checked"
                initialValue={false}
              >
                <Switch
                  onChange={(value) => {
                    setBatchAddData('hasCircle', value);
                  }}
                />
              </Form.Item>
              {hasCircle && (
                <Form.Item
                  label="截止日期"
                  name="templateEndTime"
                  rules={[{ required: true }]}
                >
                  <DatePicker picker="date" />
                </Form.Item>
              )}
            </Space>
            <div className={groupsCss} ref={groupRef}>
              <TableHeadWrapper>
                <Space
                  style={{
                    backgroundColor: '#fafafa',
                    paddingLeft: '84px',
                  }}
                  styles={{
                    item: {
                      height: '100%',
                    },
                  }}
                >
                  {cellNames.map((item) => {
                    return (
                      <TableCell key={item.name} width={item.width}>
                        {item.label}
                      </TableCell>
                    );
                  })}
                  <TableCell width={100}>操作</TableCell>
                </Space>
              </TableHeadWrapper>
              <Form.List name="allTemp" initialValue={[{}]}>
                {(fields, { add, remove, move }) => {
                  return (
                    <Space direction="vertical">
                      {fields.map(({ key, name, ...restField }, index) => {
                        const moveCard = (
                          dragIndex: number,
                          hoverIndex: number,
                        ) => {
                          move(dragIndex, hoverIndex);
                        };
                        return (
                          <SingleTemp
                            key={key}
                            form={form}
                            moveCard={moveCard}
                            name={name}
                            index={index}
                            add={(value) => {
                              add(value, index + 1);
                            }}
                            remove={() => {
                              remove(name);
                            }}
                            data={tempData?.allTemp[name]}
                            isStartDragging={isStartDragging}
                          />
                        );
                      })}
                    </Space>
                  );
                }}
              </Form.List>
            </div>
          </Form>
        </FormWrapper>
        <PersonDragWrapper>
          <PersonSelect
            id="box1"
            className={css`
              flex: 1;
              margin-left: 16px;
              width: 100%;
              height: ${groupsHeight}px;
            `}
          />
        </PersonDragWrapper>
      </ContainerWrapper>
      <MyPreview />
    </DndProvider>
  );
};

export default memo(forwardRef(TaskCreateCenter));
