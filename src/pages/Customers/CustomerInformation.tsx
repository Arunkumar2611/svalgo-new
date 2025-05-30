import React from "react";
import {
  Box,
  Typography,
  Grid,
  FormControl,
  MenuItem,
  FormLabel,
  Button,
} from "@mui/material";
import { StyledTextField } from "../../components/TextField/StyledTextField";
import { StyledSelect } from "../../components/Select/StyledSelect";

interface CustomerInformationProps {
  toggleOpen: () => void;
}

const CustomerInformation: React.FC<CustomerInformationProps> = ({ toggleOpen }) => {
  console.log("toggle", toggleOpen)
  return (
    <Box
      sx={{
        // border: "1px solid #E0E0E0",
        borderRadius: "12px",
        // p: 3,
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Box sx={{  display: "flex", flexDirection: "column", gap: "20px",  borderRadius: "10px" }}>
        <Box sx={{ border: "1px solid #E0E0E0", borderRadius: "10px", overflow: "hidden" }}>
          <Box sx={{ p: "20px", }}>
            <Typography
              variant="body1"
              sx={{
                color: "#6f6f6f",
                fontWeight: 500,
              }}
            >
              Customer information
            </Typography>
          </Box>
          <Box sx={{ p: "20px", outline: '1px #E0E0E0 solid', outlineOffset: '0px', borderTopRightRadius: "10px", borderTopLeftRadius: "10px" }}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormLabel>Choose Legal Entity</FormLabel>
                <StyledTextField
                  fullWidth
                  // label="Task name"
                  defaultValue=""
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormLabel>Customer Number</FormLabel>
                <StyledTextField
                  fullWidth
                  // label="Task name"
                  defaultValue=""
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormLabel>Company Name</FormLabel>
                <StyledTextField
                  fullWidth
                  // label="Task name"
                  defaultValue=""
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormLabel>Legal Name</FormLabel>
                <StyledTextField
                  fullWidth
                  // label="Task name"
                  defaultValue=""
                  variant="outlined"
                />
              </Grid>


              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth>
                  <FormLabel>Choose Country</FormLabel>
                  <StyledSelect size="small">
                    <MenuItem value="Assign to">USA</MenuItem>
                    <MenuItem value="Other">UAE</MenuItem>
                  </StyledSelect>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormLabel>City</FormLabel>
                <StyledTextField
                  fullWidth
                  // label="Task name"
                  defaultValue=""
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormLabel>Choose Date</FormLabel>
                <StyledTextField
                  fullWidth
                  // label="Task name"
                  defaultValue=""
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormLabel>Zip Code</FormLabel>
                <StyledTextField
                  fullWidth
                  // label="Task name"
                  defaultValue=""
                  variant="outlined"
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <FormLabel>Phone</FormLabel>
                <StyledTextField
                  fullWidth
                  defaultValue=""
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormLabel>Fax</FormLabel>
                <StyledTextField
                  fullWidth
                  defaultValue=""
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormLabel>Company established date</FormLabel>
                <StyledTextField
                  fullWidth
                  defaultValue=""
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormLabel>Choose business type</FormLabel>
                <StyledTextField
                  fullWidth
                  defaultValue=""
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormLabel>Choose business style</FormLabel>
                <StyledTextField
                  fullWidth
                  defaultValue=""
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormLabel>Choose No of employees</FormLabel>
                <StyledTextField
                  fullWidth
                  defaultValue=""
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Box>
        </Box>

        {/* Credit information */}
        <Box sx={{ border: "1px solid #E0E0E0", borderRadius: "10px", overflow: "hidden" }}>
          <Box sx={{ p: "20px", }}>
            <Typography
              variant="body1"
              sx={{
                color: "#6f6f6f",
                fontWeight: 500,
              }}
            >
              Credit information
            </Typography>
          </Box>
          <Box sx={{ p: "20px", outline: '1px #E0E0E0 solid', outlineOffset: '0px', borderTopRightRadius: "10px", borderTopLeftRadius: "10px" }}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormLabel>Choose credit term</FormLabel>
                <StyledTextField
                  fullWidth
                  // label="Task name"
                  defaultValue=""
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormLabel>Balance</FormLabel>
                <StyledTextField
                  fullWidth
                  // label="Task name"
                  defaultValue=""
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormLabel>Credit limit</FormLabel>
                <StyledTextField
                  fullWidth
                  // label="Task name"
                  defaultValue=""
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormLabel>Next review date</FormLabel>
                <StyledTextField
                  fullWidth
                  // label="Task name"
                  defaultValue=""
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* Business contact information */}
        <Box sx={{ border: "1px solid #E0E0E0", borderRadius: "10px", overflow: "hidden" }}>
          <Box sx={{ p: "20px", }}>
            <Typography
              variant="body1"
              sx={{
                color: "#6f6f6f",
                fontWeight: 500,
              }}
            >
              Business contact information
            </Typography>
          </Box>
          <Box sx={{ p: "20px", outline: '1px #E0E0E0 solid', outlineOffset: '0px', borderTopRightRadius: "10px", borderTopLeftRadius: "10px" }}>
            <Grid container spacing={"24px"}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormLabel>First name</FormLabel>
                <StyledTextField
                  fullWidth
                  // label="Task name"
                  defaultValue=""
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormLabel>Last name</FormLabel>
                <StyledTextField
                  fullWidth
                  // label="Task name"
                  defaultValue=""
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormLabel>Email</FormLabel>
                <StyledTextField
                  fullWidth
                  // label="Task name"
                  defaultValue=""
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormLabel>Phone</FormLabel>
                <StyledTextField
                  fullWidth
                  // label="Task name"
                  defaultValue=""
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormLabel>Internal code</FormLabel>
                <StyledTextField
                  fullWidth
                  // label="Task name"
                  defaultValue=""
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
      <Box sx={{ padding: "20px", textAlign: "right" }}>
        <Button variant="outlined">Review and Submit</Button>
      </Box>
    </Box>
  );
};

export default CustomerInformation;
