import React, { memo } from "react";
import { Table, Button } from "@mui/material";

import DataOverview from "./components/dataOverview";

const Components = memo(() => {
  return (
    <div>
      <DataOverview />
      <Button variant="contained">Contained</Button>
    </div>
  );
});

export default Components;
