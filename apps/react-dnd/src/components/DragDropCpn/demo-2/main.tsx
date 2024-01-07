import React, { FC, memo, useEffect, useState } from "react";
import { DndProvider, useDragDropManager, useDrop } from "react-dnd";
import {
  Form,
  Input,
  Card,
  Space,
  DatePicker,
  TimePicker,
  Select,
  Button,
  FormInstance,
} from "antd";
import { PlusCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import DragDropItem from "@/components/DragDropCpn/DragDropItem";
import { HTML5Backend } from "react-dnd-html5-backend";
import { nanoid } from "nanoid";
import { ContainerWrapper } from "./styled";
import Container from "./container";
import Box from "./box";

type SingleTempProps = {
  id: string;
  index: number;
  moveCard: (from: number, to: number) => void;
  add: () => void;
  remove: () => void;
  name: number;
  form: FormInstance;
};

const SingleTemp: FC<SingleTempProps> = (props) => {
  const { id, index, moveCard, add, remove, name, form, manager, setManager } =
    props;
  return (
    <DragDropItem
      id={id}
      index={index}
      moveCard={moveCard}
      accept="group"
      manager={manager}
      setManager={setManager}>
      <Card
        size="small"
        title={
          <Space>
            <span>表单拖拽Demo</span>
            <Button>拖拽</Button>
            <Button onClick={add}>添加下一组</Button>
            <Button onClick={remove}>删除</Button>
          </Space>
        }>
        <Form.List name={[name, "singleTemp"]} initialValue={[{}]}>
          {(fields, { add, remove, move }) => {
            return (
              <Space direction="vertical">
                {fields.map(({ key, name, ...restField }, index) => {
                  return (
                    <DragDropItem
                      manager={manager}
                      setManager={setManager}
                      id={nanoid()}
                      key={key}
                      index={index}
                      moveCard={(dragIndex: number, hoverIndex: number) => {
                        move(dragIndex, hoverIndex);
                      }}
                      accept="listItem">
                      <Space key={key}>
                        <Form.Item
                          name={[name, "date"]}
                          {...restField}
                          key={key}>
                          <DatePicker />
                        </Form.Item>
                        <Form.Item
                          name={[name, "time"]}
                          {...restField}
                          key={key}>
                          <TimePicker />
                        </Form.Item>
                        <Form.Item
                          name={[name, "content"]}
                          {...restField}
                          key={key}>
                          <Input />
                        </Form.Item>
                        <Form.Item
                          name={[name, "address"]}
                          {...restField}
                          key={key}>
                          <Select />
                        </Form.Item>
                        <Container
                          name="Test1"
                          dropFn={(dragItem) => {
                            console.log("dragItem", dragItem);
                          }}>
                          <Form.Item
                            name={[name, "person"]}
                            {...restField}
                            key={key}>
                            <Select placeholder="请选择组员" />
                          </Form.Item>
                        </Container>
                        <Container
                          name="Test1"
                          dropFn={(dragItem) => {
                            console.log("dragItem", dragItem);
                            form.setFieldsValue({
                              container1: dragItem.personList[0].label,
                            });
                          }}>
                          <Form.Item
                            name={[name, "leader"]}
                            {...restField}
                            key={key}>
                            <Select placeholder="请选择组长" />
                          </Form.Item>
                        </Container>
                        <Form.Item
                          name={[name, "note"]}
                          {...restField}
                          key={key}>
                          <Input />
                        </Form.Item>
                        <PlusCircleOutlined
                          onClick={() => {
                            add();
                          }}
                        />
                        <DeleteOutlined
                          onClick={() => {
                            remove(name);
                          }}
                        />
                      </Space>
                    </DragDropItem>
                  );
                })}
              </Space>
            );
          }}
        </Form.List>
      </Card>
    </DragDropItem>
  );
};

const Demo2 = memo(() => {
  const [form] = Form.useForm();
  const [groupDragging, setGroupDragging] = useState(false);
  const [manager, setManager] = useState(false);

  return (
    <ContainerWrapper>
      <Form form={form}>
        <Form.List name="allTemp" initialValue={[{}, {}]}>
          {(fields, { add, remove, move }) => {
            return (
              <Space
                direction="vertical"
                // style={{ maxHeight: "50vh", overflow: "auto" }}
              >
                {fields.map(({ key, name, ...restField }, index) => {
                  const moveCard = (dragIndex: number, hoverIndex: number) => {
                    move(dragIndex, hoverIndex);
                  };
                  return (
                    <SingleTemp
                      manager={manager}
                      setManager={setManager}
                      form={form}
                      moveCard={moveCard}
                      key={key}
                      name={name}
                      id={nanoid()}
                      index={index}
                      add={() => {
                        add("", index + 1);
                      }}
                      remove={() => {
                        remove(name);
                      }}
                    />
                  );
                })}
              </Space>
            );
          }}
        </Form.List>
      </Form>
      <Card style={{ flex: 1, marginLeft: "12px" }}>
        <Box id="box1">box1</Box>
      </Card>
    </ContainerWrapper>
  );
});

export default Demo2;
