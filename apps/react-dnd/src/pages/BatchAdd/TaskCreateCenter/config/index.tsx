import { FormRule, Input, TimePicker } from 'antd';
import dayjs from 'dayjs';
import { ReactNode } from 'react';
import AddressSelect from '../components/AddressSelect';
import DropWrapper from '../components/DropWrapper';
import RangeDatePickerCpn from '../components/RangeDatePickerCpn';

type CellNameProps = {
  label: string;
  width: number;
  name: string;
  render: (form: any, extraInfo?: any) => ReactNode;
  rules?: FormRule[];
  defaultValue?: any;
};

export const cellNames: CellNameProps[] = [
  {
    label: '日期',
    width: 250,
    name: 'date',
    render: (form, extraInfo) => {
      return <RangeDatePickerCpn extraInfo={extraInfo} />;
    },
    rules: [{ required: true, message: '请选择日期' }],
  },
  {
    label: '时间',
    width: 200,
    name: 'time',
    defaultValue: [dayjs().startOf('d'), dayjs().endOf('d')],
    render: () => {
      return <TimePicker.RangePicker format={'HH:mm'} />;
    },
    rules: [{ required: true, message: '请选择时间' }],
  },
  {
    label: '值班内容',
    width: 280,
    name: 'dutyContent',
    render: () => {
      return <Input placeholder="请填写值班内容" maxLength={100} />;
    },
    rules: [{ required: true, message: '请填写值班内容' }],
  },
  {
    label: '值班地点',
    width: 184,
    name: 'dutySiteName',
    render: () => {
      return <AddressSelect />;
    },
    rules: [{ required: true, message: '请填写值班地点' }],
  },
  {
    label: '组员',
    width: 184,
    name: 'belongUserIds',
    render: () => {
      return <DropWrapper />;
    },
  },
  {
    label: '组长',
    width: 184,
    name: 'chargeUserIds',
    render: () => {
      return <DropWrapper />;
    },
  },
  {
    label: '备注',
    width: 184,
    name: 'remark',
    render: () => {
      return <Input placeholder="请填写备注" maxLength={100} />;
    },
  },
];
