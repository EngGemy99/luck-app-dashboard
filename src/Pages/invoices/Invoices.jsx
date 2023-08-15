import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { columns, rows } from "./data";

function Invoices() {
  return (
    <Box sx={{ height: 650, width: "98%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        slots={{
          toolbar: GridToolbar,
        }}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        checkboxSelection
        pageSizeOptions={[5, 10, 25]}
      />
    </Box>
  );
}

export default Invoices;
