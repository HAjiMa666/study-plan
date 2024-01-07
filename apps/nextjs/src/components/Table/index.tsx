import React, { FC, memo } from "react";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";

type TableProps = {
  columns?: any;
  dataSource?: any;
};

const TableCpn: FC<TableProps> = memo((props) => {
  const { columns, dataSource } = props;
  return (
    <TableContainer component={Paper} elevation={4} title="记账">
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            {columns?.map((item) => {
              return (
                <TableCell key={item.id} align={item.align ?? "center"}>
                  {item?.title}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataSource.map((row) => {
            const keys = Object.keys(row)?.filter((item) => item !== "id");
            return (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                {keys.map((item, index) => {
                  return (
                    <TableCell
                      component="th"
                      scope="row"
                      key={item}
                      align={
                        columns.find((column) => column.id === item)?.align ??
                        "center"
                      }>
                      {row[item]}
                    </TableCell>
                  );
                })}
                <TableCell>
                  {
                    <>
                      <Button variant="text">编辑</Button>
                    </>
                  }
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

export default TableCpn;
