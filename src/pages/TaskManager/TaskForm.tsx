import { ChevronLeft, ChevronRight, Close } from "@mui/icons-material";
import {
    Autocomplete,
    Box,
    Card,
    CardContent,
    FormControl,
    FormLabel,
    Grid,
    IconButton,
    MenuItem,
    TextField,
    Typography
} from "@mui/material";
import { useState } from "react";
import DrawerFooter from "../../components/Drawer/DrawerFooter";
import { StyledSelect } from "../../components/Select/StyledSelect";
import { StyledTextField } from "../../components/TextField/StyledTextField";

const invoiceData = [
  { invoiceId: "INV-1001", amount: 2500.0, assignedDate: "2025-05-01" },
  { invoiceId: "INV-1002", amount: 1800.5, assignedDate: "2025-05-02" },
  { invoiceId: "INV-1003", amount: 3200.75, assignedDate: "2025-05-03" },
  { invoiceId: "INV-1004", amount: 1450.0, assignedDate: "2025-05-04" },
  { invoiceId: "INV-1005", amount: 2100.3, assignedDate: "2025-05-05" },
  { invoiceId: "INV-1006", amount: 975.2, assignedDate: "2025-05-06" },
  { invoiceId: "INV-1007", amount: 2890.6, assignedDate: "2025-05-07" },
  { invoiceId: "INV-1008", amount: 1345.0, assignedDate: "2025-05-08" },
  { invoiceId: "INV-1009", amount: 4000.99, assignedDate: "2025-05-09" },
  { invoiceId: "INV-1010", amount: 1999.95, assignedDate: "2025-05-10" },
];

const TaskForm = ({ toggleOpen }: any) => {
  const [selectedInvoices, setSelectedInvoices] = useState<typeof invoiceData>(
    []
  );

  console.log(toggleOpen);
  

  const handleRemove=(id:string)=>{

    const removeSelected = selectedInvoices?.filter((item)=>item.invoiceId !== id)

    setSelectedInvoices(removeSelected)

  }

  return (
    <Box className="taskForm">
      <Card variant="outlined" sx={{ p: 0, borderRadius: 2,mb:2 }}>
        <Box
          px={2}
          py={1.5}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Autocomplete
            //   sx={{ width: "280px" }}
              sx={{
                width: "280px",
                "& .MuiAutocomplete-inputRoot": {
                  flexWrap: "nowrap", // prevent wrapping
                },
                "& .MuiAutocomplete-tag": {
                  display: "none", // hide tags completely if needed
                },
              }}
              multiple
              size="small"
              options={invoiceData}
              disableCloseOnSelect
              getOptionLabel={(option) => option.invoiceId}
              value={selectedInvoices}
              limitTags={1}
              onChange={(event, newValue) => setSelectedInvoices(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Invoices"
                  placeholder="Choose invoice(s)"
                />
              )}
              isOptionEqualToValue={(option, value) =>
                option.invoiceId === value.invoiceId
              }
            />

            {/* Cards for selected invoices */}
          </Box>
          <Box>
            <IconButton size="small">
              <ChevronLeft />
            </IconButton>
            <IconButton size="small">
              <ChevronRight />
            </IconButton>
          </Box>
        </Box>
        {selectedInvoices && selectedInvoices.length > 0 && (
          <Card variant="outlined" sx={{ p: 0, borderRadius: 2 }}>
            <Box px={2.5} py={2} sx={{ display: "flex", gap: 2 }}>
              {selectedInvoices.map((inv) => (
                <Card
                  key={inv.invoiceId}
                  variant="outlined"
                  sx={{
                    background: "#E9EAEB",
                    borderRadius: "12px",
                    minWidth: "240px",
                    height: "120px",
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 ,justifyContent:'space-between'}}>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontSize: "1rem", fontWeight: 600 }}
                      >
                        {inv.invoiceId}
                      </Typography>
                      <IconButton size="small" sx={{p:0 ,}} onClick={()=>handleRemove(inv?.invoiceId)}>
                        <Close sx={{color: "#A4A7AE",}} />
                      </IconButton>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Typography variant="body2" sx={{ mr: 0.5 }}>
                        {" "}
                        Amount:{" "}
                      </Typography>
                      <Typography variant="body2" fontWeight={600}>
                        ${inv.amount.toFixed(2)}{" "}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Typography variant="body2" sx={{ mr: 0.5 }}>
                        Assigned Date:{" "}
                      </Typography>
                      <Typography variant="body2" fontWeight={600}>
                        {inv.assignedDate}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Card>
        )}
      </Card>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormLabel>Task name</FormLabel>
          <StyledTextField
            fullWidth
            // label="Task name"
            defaultValue="Send notice"
            variant="outlined"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth>
            <FormLabel>Action Date</FormLabel>
            <StyledSelect size="small">
              <MenuItem value="Assign to">Assign to</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </StyledSelect>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth>
            <FormLabel>Action type</FormLabel>
            <StyledSelect size="small" defaultValue="">
              <MenuItem value="Assign to">Assign to</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </StyledSelect>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth>
            <FormLabel>Repeat Action</FormLabel>
            <StyledSelect size="small">
              <MenuItem value="Assign to">Assign to</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </StyledSelect>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth>
            <FormLabel>Assign To</FormLabel>
            <StyledSelect size="small">
              <MenuItem value="Assign to">Assign to</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </StyledSelect>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <FormLabel>Subject</FormLabel>
          <StyledTextField
            fullWidth
            defaultValue="Invoices Report (client name)"
            variant="outlined"
          />
        </Grid>

        {/* <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth>
            <FormLabel>Action date</FormLabel>
          </FormControl>
        </Grid> */}
      </Grid>

      <DrawerFooter
        buttonOneText={"Create"}
        // buttonTwoText={t("categoryconfiguration.cancel")}
        // onButtonTwoClick={toggleOpen}
      />
    </Box>
  );
};

export default TaskForm;
