"use client";

import React, { memo } from "react";
import { useForm, useController } from "react-hook-form";
import {
  Table,
  Button,
  Divider,
  Stack,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

import DataOverview from "./components/dataOverview";
import TableCpn from "@/components/Table";
import ModalCpn from "@/components/Modal";

import { columns, mockDataSource } from "./config";

const Cash = memo(() => {
  const { handleSubmit, register } = useForm();

  const onSubmit = (data: any) => {
    console.log("表单数据", data);
  };

  return (
    <div>
      <Stack spacing={2}>
        <DataOverview />
        <Divider />
        <ModalCpn
          text="新增"
          modalTitle="新增账单"
          content={
            <div className="p-4">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={1}>
                  <TextField label="账单金额" {...register("cash")} />
                  <FormControl>
                    <InputLabel>账单类型</InputLabel>
                    <Select label="账单类型" {...register("type")}>
                      <MenuItem value={1}>收入</MenuItem>
                      <MenuItem value={2}>支出</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
                <Button type="submit">提交</Button>
              </form>
            </div>
          }
        />
        <TableCpn columns={columns} dataSource={mockDataSource} />
      </Stack>
    </div>
  );
});

export default Cash;
