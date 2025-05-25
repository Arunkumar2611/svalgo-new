import React from "react";
import { GridColDef, DataGridProps } from "@mui/x-data-grid";
import {StyledDataGrid} from './StyledDataGrid'

interface CustomDataGridTableProps extends Omit<DataGridProps, "columns" | "rows"> {
  columns: GridColDef[];
  rows: any[];
}

const CustomDataGridTable: React.FC<CustomDataGridTableProps> = ({ columns, rows, ...props }) => {
  return (
    <StyledDataGrid
      columns={columns}
      rows={rows}
      autoHeight
      disableSelectionOnClick
      pageSizeOptions={[5, 10, 20]}
      {...props}
    />
  );
};

export default CustomDataGridTable;
