import {
  Select,
  SelectProps,
  styled
} from "@mui/material";
  
  export const StyledSelect = styled((props: SelectProps) => (
    <Select
      {...props}
    //   input={<OutlinedInput notched label={props.label} />}
    size="small"
    />
  ))(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      minHeight: "40px", 
      backgroundColor: "#fff", 
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#D5D7DA",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
    //   borderColor: theme.palette.primary.main,
      borderColor:  "#D5D7DA",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor:  "#D5D7DA",
      borderWidth: "1.5px",
    },
    "& .MuiSelect-select": {
      padding: "10px 14px",
      fontSize: "14px",
    },
    "& .MuiInputLabel-root": {
      top: "-5px",
    },
  }));
  