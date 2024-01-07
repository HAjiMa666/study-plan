import { Form, FormInstance, FormRule, Space } from 'antd';
import {
  CSSProperties,
  FC,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useShallow } from 'zustand/react/shallow';

import DragDropItem from '@/components/DragDropCpn/DragDropItem';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import dayjs from 'dayjs';
import { useBatchAddStore } from '../../store';
import { getWeekNumber } from '../../utils';
import { cellNames } from '../config';
import { ItemTypes } from '../config/ItemTypes';
import { SingleGroupWrapper } from '../styled';

type SingleTempProps = {
  index: number;
  moveCard: (from: number, to: number) => void;
  add: (value?: any) => void;
  remove: () => void;
  name: number;
  form: FormInstance;
  data: any;
  isStartDragging?: boolean;
};

type WithFormItemProps = {
  component: ReactNode;
  name: (string | number)[];
  style?: CSSProperties;
  restField?: any;
  rules?: FormRule[];
  defaultValue?: any;
};

const WithFormItem: FC<WithFormItemProps> = (props) => {
  return (
    <Form.Item
      name={props.name}
      style={props.style}
      rules={props.rules}
      initialValue={props.defaultValue}
      {...props.restField}
    >
      {props.component}
    </Form.Item>
  );
};

const SingleTemp: FC<SingleTempProps> = (props) => {
  const { index: groupIndex, moveCard, add, remove, name, form } = props;
  const [startTime, setStartTime] = useState<any>(null);
  const [preIndex, setPreIndex] = useState<any>(0);
  const [currentWeek, setCurrentWeek] = useState<any>(1);
  const currentGroupIndex = useRef(0);
  const {
    setGroupsTime,
    currentDutyStartTime,
    groupsTime,
    addGroups,
    deleteGroupsTime,
  } = useBatchAddStore(
    useShallow((state) => ({
      setGroupsTime: state.setGroupsTime,
      groupsTime: state.groupsTime,
      currentDutyStartTime: state.currentDutyStartTime,
      deleteGroupsTime: state.deleteGroupsTime,
      addGroups: state.addGroups,
    })),
  );

  useEffect(() => {
    currentGroupIndex.current = groupIndex;
  }, [groupIndex]);

  useEffect(() => {
    console.log('propsData', props.data);
    // 编辑的时候 传值给模板
    if (!props.data) return;
    const currentGroupStart = props.data?.dateStart;
    addGroups(groupIndex);
    setGroupsTime(groupIndex, dayjs(currentGroupStart));
  }, [props.data, groupIndex, setGroupsTime, addGroups]);

  useEffect(() => {
    // 拿到之前组所在的索引位置，拿到这个位置的时间数据
    // 计算当前索引所在的位置是第几周，列表交换后进行更新周。
    const date = groupsTime[groupIndex]?.date;
    if (date) {
      console.log('当前日期', date);
      setCurrentWeek(getWeekNumber(date, dayjs(currentDutyStartTime)));
    }
  }, [groupsTime, groupIndex, currentDutyStartTime]);

  useEffect(() => {
    const dateFormat = 'YYYY-MM-DD';
    const dateIndex = ['allTemp', name, 'dateIndex'];
    const dateEnd = ['allTemp', name, 'dateEnd'];
    const dateStart = ['allTemp', name, 'dateStart'];
    const dataStartValue = groupsTime[groupIndex]?.date
      ?.weekday(0)
      ?.format(dateFormat);
    const dateEndValue = groupsTime[groupIndex]?.date
      ?.weekday(6)
      ?.format(dateFormat);
    form.setFieldValue(dateIndex, currentWeek);
    form.setFieldValue(dateEnd, dateEndValue);
    form.setFieldValue(dateStart, dataStartValue);
  }, [currentWeek, groupIndex, form, name, groupsTime]);

  useEffect(() => {
    console.log('groupsTime变化', groupsTime);
  }, [groupsTime]);

  return (
    <DragDropItem
      index={groupIndex}
      moveCard={moveCard}
      accept={ItemTypes.group}
      previewNode={
        <div
          className={css`
            width: 400px;
            height: 50px;
            background-color: #bfbfbf;
          `}
        >
          第{currentWeek}周
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          className="groupHead"
          style={{
            width: '100%',
            padding: '16px 0',
            paddingLeft: 12,
          }}
        >
          <Space>
            <PlusCircleOutlined
              onClick={() => {
                const firstListValue = form.getFieldValue(['allTemp', name]);
                console.log('第一个数据', firstListValue);
                add(firstListValue);
                addGroups(groupIndex + 1);
              }}
            />
            <div>第{currentWeek}周</div>
            <MinusCircleOutlined
              onClick={() => {
                remove();
                deleteGroupsTime(currentGroupIndex);
              }}
              style={{ color: 'red' }}
            />
          </Space>
        </div>
        <Form.List
          name={[name, 'singleTemp']}
          initialValue={[
            {
              date: [dayjs(currentDutyStartTime), dayjs(currentDutyStartTime)],
            },
          ]}
        >
          {(fields, { add, remove, move }) => {
            const moveCard = (dragIndex: number, hoverIndex: number) => {
              move(dragIndex, hoverIndex);
            };
            const addItem = (index: number) => {
              add('', index + 1);
            };
            const removeItem = (name: number) => {
              remove(name);
            };
            return (
              <Space direction="vertical" style={{ width: '100%' }}>
                {fields.map(
                  ({ key, name: childrenName, ...restField }, index) => {
                    return (
                      <SingleGroupWrapper key={childrenName}>
                        <DragDropItem
                          index={index}
                          moveCard={moveCard}
                          accept={ItemTypes.list}
                        >
                          <Space>
                            {cellNames.map((cell) => {
                              return (
                                <WithFormItem
                                  key={cell.name}
                                  rules={cell.rules}
                                  defaultValue={cell.defaultValue}
                                  component={cell.render(form, {
                                    currentGroupIndex: groupIndex,
                                    currentWeek: getWeekNumber(
                                      startTime,
                                      dayjs(currentDutyStartTime),
                                    ),
                                    startTime: startTime,
                                    setStartTime: setStartTime,
                                    setPreIndex: setPreIndex,
                                  })}
                                  name={[childrenName, cell.name]}
                                  style={{ width: cell.width }}
                                  restField={{ ...restField }}
                                />
                              );
                            })}
                            <Form.Item hidden name="dateStart" />
                            <Form.Item hidden name="dateEnd" />
                            <Form.Item hidden name="dateIndex" />
                            <PlusCircleOutlined
                              onClick={() => addItem(index)}
                            />
                            <MinusCircleOutlined
                              style={{ color: 'red' }}
                              onClick={() => removeItem(childrenName)}
                            />
                          </Space>
                        </DragDropItem>
                        {/* <Line /> */}
                      </SingleGroupWrapper>
                    );
                  },
                )}
              </Space>
            );
          }}
        </Form.List>
      </div>
    </DragDropItem>
  );
};

export default SingleTemp;
