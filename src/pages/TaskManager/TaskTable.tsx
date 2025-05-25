import {
  Add,
  FilterList,
  UnfoldMore,
  CheckCircleOutline,
  CalendarTodayOutlined,
} from "@mui/icons-material";

import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import StatusChip from "../../components/Chip/StatusChip";
import { CustomPagination } from "../../components/DataGrid/CustomPagination";
import DataGridFiltersMenu from "../../components/DataGrid/DataGridFiltersMenu";
import { StyledDataGrid } from "../../components/DataGrid/StyledDataGrid";
import TaskFormDrawer from "./TaskFormDrawer";
const userOptions = [
  { label: "Alice Johnson", value: "a1b2c3d4-e5f6-7890-abcd-ef1234567890" },
  { label: "Bob Smith", value: "b2c3d4e5-f678-9012-abcd-1234567890ef" },
  { label: "Charlie Davis", value: "c3d4e5f6-7890-1234-abcd-567890ef1234" },
  { label: "Diana Moore", value: "d4e5f678-9012-3456-abcd-7890ef123456" },
  { label: "Ethan Brown", value: "e5f67890-1234-5678-abcd-90ef12345678" },
  { label: "Fiona Clark", value: "f6789012-3456-7890-abcd-ef1234567890" },
  { label: "George Lee", value: "67890123-4567-8901-abcd-1234567890ef" },
  { label: "Hannah Scott", value: "78901234-5678-9012-abcd-34567890ef12" },
  { label: "Ian Wright", value: "89012345-6789-0123-abcd-567890ef1234" },
  { label: "Jenna White", value: "90123456-7890-1234-abcd-7890ef123456" },
  { label: "Dec 31 2024", value: "Dec 31 2024" },
];

const TaskTable = () => {
  const ActionDateView = ({ params }: { params: any }) => {
    const [value, setValue] = useState(params?.value || null);
    console.log(params?.value, "params", value);

    return (
      <Box sx={{ height: "100%", display: "flex" }}>
        <FormControl fullWidth size="small" sx={{ justifyContent: "center" }}>
          <Select
            id="select"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            size="small"
            input={
              <OutlinedInput
              sx={{
                borderRadius: '8px',
              }}
                startAdornment={
                  <InputAdornment position="start">
                    <CalendarTodayOutlined fontSize="small" />
                  </InputAdornment>
                }
              />
            }
          >
            {userOptions?.map((item) => (
              <MenuItem value={item?.value}>{item?.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
  };
  const columns = [
    {
      field: "customerName",
      headerName: "Customer name",
      minWidth: 200,
      flex: 1,
      //   renderCell: (params:any) => (
      //     <Typography className='textOverflow' sx={{ fontWeight: 'bold' }}>
      //       {params.value}
      //     </Typography>
      //   )
      renderCell: (params: any) => (
        <Box
          sx={{ gap: 1, display: "flex", alignItems: "center", height: "100%" }}
        >
          <Avatar
            src="img"
            alt={params.row.customerName}
            sx={{ width: "24px", height: "24px" }}
          />
          <Typography
            component="span"
            className="textOverflow"
            title={params.row.customerName}
            sx={{ fontSize: 14, fontWeight: "500", color: "#181D27" }}
          >
            {params.row.customerName}
          </Typography>
        </Box>
      ),
    },
    { field: "taskNumber", headerName: "Task number", width: 90 },
    {
      field: "task",
      headerName: "Task",
      minWidth: 220,
      flex: 1,
      renderCell: (params: any) => (
        <Box
          sx={{ gap: 1, display: "flex", alignItems: "center", height: "100%" }}
        >
          <CheckCircleOutline
            sx={{ color: "#A4A7AE", width: "22px", height: "22px" }}
          />
          <Typography
            component="span"
            className="textOverflow"
            sx={{ fontSize: 14, fontWeight: "500", color: "#535862" }}
          >
            {params?.row?.task}
          </Typography>
        </Box>
      ),
    },
    // { field: "task", headerName: "Task", minWidth: 220, flex: 1 },
    {
      field: "actionDate",
      headerName: "Action date",
      minWidth: 200,
      maxWidth: 230,
      flex: 1,
      renderCell: (params: any) => {
        return <ActionDateView params={params} />;
      },
    },
    { field: "dueDate", headerName: "Due date", width: 120 },
    {
      field: "priority",
      headerName: "Priority",
      width: 130,
      renderCell: (params: any) => {
        const { priority } = params.row;
        return <StatusChip status={priority} />;
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params: any) => {
        const { status } = params.row;
        return <StatusChip status={status} />;
      },
    },
    { field: "notes", headerName: "Notes", minWidth: 200, flex: 1 },
  ];

  const rows = [
    {
      id: 1,
      customerName: "Advanced Manufacturing",
      taskNumber: "TSK32798",
      task: "Contact Customer for overdue invoices",
      actionDate: "Dec 31 2024",
      dueDate: "Dec 31 2024",
      priority: "LOW",
      status: "Promise to pay",
      notes: "Contact customers who have overdue in",
    },
    {
      id: 2,
      customerName: "Advanced Research an",
      taskNumber: "TSK32780",
      task: "Send reminder for upcoming invoice",
      actionDate: "Dec 31 2024",
      dueDate: "Dec 31 2024",
      priority: "HIGH",
      status: "Over due",
      notes: "Send reminders to customers about invoice",
    },
    {
      id: 3,
      customerName: "Advanced Robotics and",
      taskNumber: "TSK3279",
      task: "Send fax notices",
      actionDate: "Dec 31 2024",
      dueDate: "Dec 31 2024",
      priority: "HIGH",
      status: "Disputed",
      notes: "Notices to customers for overdue invoice",
    },
    {
      id: 4,
      customerName: "Advanced Biotech and Pharmaco",
      taskNumber: "TSK32714",
      task: "Send SMS reminders",
      actionDate: "Dec 31 2024",
      dueDate: "Dec 31 2024",
      priority: "MEDIUM",
      status: "Current",
      notes: "Reminders to customers about upcoming",
    },
    {
      id: 5,
      customerName: "Advanced Biotech and Pharmaco",
      taskNumber: "TSK32798",
      task: "Send reminder for upcoming invoice",
      actionDate: "Dec 31 2024",
      dueDate: "Dec 31 2024",
      priority: "LOW",
      status: "Promise to pay",
      notes: "Send reminders to customers about invoice",
    },
    {
      id: 6,
      customerName: "Advanced Biotech and Pharmaco",
      taskNumber: "TSK32738",
      task: "Periodically review",
      actionDate: "Dec 31 2024",
      dueDate: "Dec 31 2024",
      priority: "HIGH",
      status: "Over due",
      notes: "Adjust credit limits for customers based",
    },
    {
      id: 7,
      customerName: "Advanced Robotics and",
      taskNumber: "TSK32798",
      task: "Send fax notices",
      actionDate: "Dec 31 2024",
      dueDate: "Dec 31 2024",
      priority: "HIGH",
      status: "Disputed",
      notes: "Notices to customers for overdue invoice",
    },
    {
      id: 8,
      customerName: "Advanced Manufacturing",
      taskNumber: "TSK32721",
      task: "Send reminder for upcoming invoice",
      actionDate: "Dec 31 2024",
      dueDate: "Dec 31 2024",
      priority: "LOW",
      status: "Promise to pay",
      notes: "Reminders to customers about upcoming",
    },
    {
      id: 9,
      customerName: "Comprehensive Digital",
      taskNumber: "TSK32798",
      task: "Send SMS reminders",
      actionDate: "Dec 31 2024",
      dueDate: "Dec 31 2024",
      priority: "LOW",
      status: "Promise to pay",
      notes: "Contact customers who have overdue in",
    },
    {
      id: 10,
      customerName: "Advanced Manufacturing",
      taskNumber: "TSK32798",
      task: "Contact Customer for overdue invoices",
      actionDate: "Dec 31 2024",
      dueDate: "Dec 31 2024",
      priority: "LOW",
      status: "Promise to pay",
      notes: "Contact customers who have overdue in",
    },
    {
      id: 11,
      customerName: "Advanced Research an",
      taskNumber: "TSK32780",
      task: "Send reminder for upcoming invoice",
      actionDate: "Dec 31 2024",
      dueDate: "Dec 31 2024",
      priority: "HIGH",
      status: "Over due",
      notes: "Send reminders to customers about invoice",
    },
    {
      id: 12,
      customerName: "Advanced Research an",
      taskNumber: "TSK32780",
      task: "Send reminder for upcoming invoice",
      actionDate: "Dec 31 2024",
      dueDate: "Dec 31 2024",
      priority: "HIGH",
      status: "Over due",
      notes: "Send reminders to customers about invoice",
    },
    {
      id: 13,
      customerName: "Advanced Robotics and",
      taskNumber: "TSK3279",
      task: "Send fax notices",
      actionDate: "Dec 31 2024",
      dueDate: "Dec 31 2024",
      priority: "HIGH",
      status: "Disputed",
      notes: "Notices to customers for overdue invoice",
    },
    {
      id: 14,
      customerName: "Advanced Biotech and Pharmaco",
      taskNumber: "TSK32714",
      task: "Send SMS reminders",
      actionDate: "Dec 31 2024",
      dueDate: "Dec 31 2024",
      priority: "MEDIUM",
      status: "Current",
      notes: "Reminders to customers about upcoming",
    },
    {
      id: 15,
      customerName: "Advanced Biotech and Pharmaco",
      taskNumber: "TSK32798",
      task: "Send reminder for upcoming invoice",
      actionDate: "Dec 31 2024",
      dueDate: "Dec 31 2024",
      priority: "LOW",
      status: "Promise to pay",
      notes: "Send reminders to customers about invoice",
    },
  ];

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const handleAddClick = () => {
    setOpenAddDrawer(true)
  };

  function EnhancedTableToolbar() {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography sx={{ flex: 1 }} variant="h6">
          Todays task's
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Button
            onClick={handleAddClick}
            startIcon={<Add className="iconBtnCss" />}
            variant="contained"
            // size="small"
            sx={{
              background: "#7F56D9",
              color: "#fff",
              borderRadius: 1.5,
              borderColor: "#7F56D9",
              textTransform: "none",
            }}
          >
            Create new task
          </Button>
          <IconButton
            size="small"
            sx={{ border: "1px solid #ccc", borderRadius: "8px", p: 0.5 }}
          >
            <FilterList sx={{ color: "#A4A7AE" }} />
          </IconButton>
          <IconButton
            size="small"
            sx={{ border: "1px solid #ccc", borderRadius: "8px", p: 0.5 }}
          >
            <UnfoldMore sx={{ color: "#A4A7AE" }} />
          </IconButton>
        </Box>
      </Box>
    );
  }

  const CustomToolbar = () => (
    <DataGridFiltersMenu sx={{ p: 2 }} fileName="Task">
      <EnhancedTableToolbar />
    </DataGridFiltersMenu>
  );

  const [openAddDrawer, setOpenAddDrawer] = useState(false);
  const toggleAddOpen = () => {
    setOpenAddDrawer(!openAddDrawer);
  };


  return (
    <Box>
      <Box sx={{ width: "100%" }}>
        <StyledDataGrid
          showToolbar
          columns={columns}
          rows={rows}
          disableRowSelectionOnClick
          disableColumnFilter
          paginationModel={paginationModel}
          onPaginationModelChange={(model) => setPaginationModel(model)}
          initialState={{
            density: "comfortable",
          }}
          slots={{
            toolbar: CustomToolbar,
            pagination: () => (
              <CustomPagination count={rows?.length} pageSizeOption={10} />
            ),
          }}
        />
      </Box>
      
      {openAddDrawer && (
        <TaskFormDrawer
          toggleOpen={toggleAddOpen}
        />
      )}
    </Box>
  );
};

export default TaskTable;
