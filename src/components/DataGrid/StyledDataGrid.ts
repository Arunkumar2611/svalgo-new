import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
export const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  overflowX: "auto",
  "& .MuiDataGrid-columnHeaderTitle": {
    fontSize: "0.75rem !important",
    // fontSize: "0.75rem !important",
    fontWeight: "600 !important",
    // color: theme.palette.text.primary,
    color: "#717680",
    textTransform: "uppercase",
  },

  "& .MuiDataGrid-columnHeader": {
    backgroundColor: "#ffffff",
    // color: theme.palette.primary.contrastText,
  },
  "& .MuiDataGrid-root": {
    overflow: "visible !important",
  },
  "& .MuiDataGrid-cell": {
    fontSize: "0.813rem !important",
    fontWeight: "500 !important",
    color: "#535862",
  },
  "& .MuiDataGrid-row": {
    border: "1px solid rgba(9, 30, 66, 0.14)",
    borderBottom: "none",

    "&:nth-child(odd) .MuiDataGrid-cell, &:nth-child(odd) .MuiDataGrid-cell:nth-last-child(1)":
      {
        backgroundColor: "#ffffff",
      },

    "&:nth-child(even) .MuiDataGrid-cell, &:nth-child(even) .MuiDataGrid-cell:nth-last-child(1)":
      {
        // backgroundColor: "#fcfcfc",
        backgroundColor: "#f6f6f6",
      },
    "&:nth-child(odd) .MuiDataGrid-cell:nth-of-type(2), &:nth-child(odd) .MuiDataGrid-cell.MuiDataGrid-cellCheckbox + .MuiDataGrid-cell":
      {
        backgroundColor: "#ffffff",
      },
    "&:nth-child(even) .MuiDataGrid-cell:nth-of-type(2), &:nth-child(even) .MuiDataGrid-cell.MuiDataGrid-cellCheckbox + .MuiDataGrid-cell":
      {
        // backgroundColor: "#fcfcfc",
        backgroundColor: "#f6f6f6",
      },
  },
  "& .MuiDataGrid-row:hover": {
    // backgroundColor: "#f6f6f6 !important",
    backgroundColor: "#e8f4f8 !important",
  },
  "& .MuiDataGrid-row:hover .MuiDataGrid-cell": {
    // backgroundColor: "#f6f6f6 !important",
    backgroundColor: "#e8f4f8 !important",
  },
  "& .MuiCheckbox-root": {
    color: " #44546F !important",
    fontSize: "0.688rem !important",
    fontWeight: "500 !important",
  },
  "& .MuiCheckbox-root:hover": {
    backgroundColor: "transparent !important",
    boxShadow: "none !important",
  },
  "& .MuiCheckbox-root.Mui-focusVisible": {
    backgroundColor: "transparent !important",
  },
  "& .MuiCheckbox-root .MuiTouchRipple-root": {
    display: "none !important",
  },
  "& .MuiDataGrid-scrollbar--horizontal": {
    bottom: "-3px !important",
  },
  "& .MuiCheckbox-root.Mui-checked": {
    color: `${theme.palette.primary.main} !important`,
  },

  "& .MuiDataGrid-row.Mui-selected .MuiDataGrid-cell": {
    backgroundColor: "#D7E3FC !important",
    borderBottom: "1px solid rgba(9, 30, 66, 0.14) !important",
  },
  "& .MuiDataGrid-cellCheckbox": {
    // width: "35px !important",
    padding: "0px !important",
  },
  "& .MuiDataGrid-columnHeaderCheckbox": {
    // width: "40px !important",
    padding: "0px !important",
  },

  "& .MuiDataGrid-row.Mui-selected:hover .MuiDataGrid-cell": {
    backgroundColor: "#B0C4F5 !important",
  },

  // For the first non-checkbox header cell
  "& .MuiDataGrid-columnHeadersInner > div:nth-of-type(2)": {
    paddingLeft: "16px !important",
    paddingRight: "16px !important",
  },

  // For the first non-checkbox row cell
  "& .MuiDataGrid-row > .MuiDataGrid-cell:nth-of-type(2)": {
    paddingLeft: "16px !important",
    paddingRight: "16px !important",
  },
}));
