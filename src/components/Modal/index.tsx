"use client";

import React, { FC, memo, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

const ModalCpn: FC<ModalCpnProps> = memo((props) => {
  const [open, setOpen] = useState(false);
  const handleCloseModal = () => {
    setOpen(false);
  };
  const handleOpenModal = () => {
    setOpen(true);
  };
  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpenModal}>
        {props.text}
      </Button>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}>
        <DialogTitle>{props.modalTitle}</DialogTitle>
        <DialogContent>{props.content}</DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleCloseModal}>
            取消
          </Button>
          <Button variant="contained" onClick={handleCloseModal} type="submit">
            确定
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

export default ModalCpn;
