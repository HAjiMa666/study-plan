// import { useRequest } from '@umijs/max';
import { memo } from "react";

// import { fetchAddressList } from '@/services/taskManage';
import { Select } from "antd";

const AddressSelect = memo((props) => {
  // const { data } = useRequest(fetchAddressList);
  const data = [];
  return (
    <Select
      options={data}
      value={props?.value?.id}
      placeholder="请选择值班场地"
      fieldNames={{
        label: "name",
        value: "id",
      }}
      onChange={(value, option) => {
        props?.onChange?.(option);
      }}
    />
  );
});

export default AddressSelect;
