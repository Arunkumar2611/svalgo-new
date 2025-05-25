import { TextField, TextFieldProps, styled } from "@mui/material";

export const StyledTextField = styled((props: TextFieldProps) => (
  <TextField {...props} />
))(({ theme }) => ({
  "& .MuiInputBase-root": {
    borderRadius: "8px",
    backgroundColor: "#fff", // optional
    minHeight: "40px", // optional
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#D5D7DA",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main,
  },
  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main,
    borderWidth: "1.5px",
  },
  "& .MuiInputLabel-root": {
    fontSize: "14px",
  },
  "& .MuiInputBase-input": {
    fontSize: "14px",
    padding: "10px 14px",
  },
}));
