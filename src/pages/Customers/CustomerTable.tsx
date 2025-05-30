import {
    Box,
    Typography,
    Chip,
    Avatar,
    Stack,
    useTheme,
  } from "@mui/material";
  import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
  import BusinessIcon from "@mui/icons-material/Business";
  import CustomDataGrid from "../../components/DataGrid2/CustomDataGrid";
  
  // Sample data mimicking API
  const rows = [
    {
      id: 1,
      name: "Advanced Manufacturing",
      customerNumber: "28469875737",
      creditLimit: "$51,823",
      balance: "$16,666.67",
      creditUtilization: "70.14%",
      totalInvoices: "15",
      openInvoices: "12",
      rating: "N/A",
      current: "$0",
      tags: ["E", "D", "P", ...Array(11).fill(null).map((_, i) => `Extra ${i + 1}`)],
    },
    {
      id: 2,
      name: "Advanced Research an",
      customerNumber: "30436048245",
      creditLimit: "$52,568",
      balance: "$19,524.00",
      creditUtilization: "62.86%",
      totalInvoices: "05",
      openInvoices: "01",
      rating: "N/A",
      current: "$0",
      tags: [],
    },
    {
      id: 3,
      name: "Advanced Manufacturing",
      customerNumber: "28469875737",
      creditLimit: "$51,823",
      balance: "$16,666.67",
      creditUtilization: "70.14%",
      totalInvoices: "15",
      openInvoices: "12",
      rating: "N/A",
      current: "$0",
      tags: ["E", "D", "P", ...Array(11).fill(null).map((_, i) => `Extra ${i + 1}`)],
    },
    {
      id: 4,
      name: "Advanced Research an",
      customerNumber: "30436048245",
      creditLimit: "$52,568",
      balance: "$19,524.00",
      creditUtilization: "62.86%",
      totalInvoices: "05",
      openInvoices: "01",
      rating: "N/A",
      current: "$0",
      tags: [],
    },
    {
      id: 5,
      name: "Advanced Manufacturing",
      customerNumber: "28469875737",
      creditLimit: "$51,823",
      balance: "$16,666.67",
      creditUtilization: "70.14%",
      totalInvoices: "15",
      openInvoices: "12",
      rating: "N/A",
      current: "$0",
      tags: ["E", "D", "P", ...Array(11).fill(null).map((_, i) => `Extra ${i + 1}`)],
    },
    {
      id: 6,
      name: "Advanced Research an",
      customerNumber: "30436048245",
      creditLimit: "$52,568",
      balance: "$19,524.00",
      creditUtilization: "62.86%",
      totalInvoices: "05",
      openInvoices: "01",
      rating: "N/A",
      current: "$0",
      tags: [],
    },
    {
      id: 7,
      name: "Advanced Manufacturing",
      customerNumber: "28469875737",
      creditLimit: "$51,823",
      balance: "$16,666.67",
      creditUtilization: "70.14%",
      totalInvoices: "15",
      openInvoices: "12",
      rating: "N/A",
      current: "$0",
      tags: ["E", "D", "P", ...Array(11).fill(null).map((_, i) => `Extra ${i + 1}`)],
    },
    {
      id: 8,
      name: "Advanced Research an",
      customerNumber: "30436048245",
      creditLimit: "$52,568",
      balance: "$19,524.00",
      creditUtilization: "62.86%",
      totalInvoices: "05",
      openInvoices: "01",
      rating: "N/A",
      current: "$0",
      tags: [],
    },
    {
      id: 9,
      name: "Advanced Manufacturing",
      customerNumber: "28469875737",
      creditLimit: "$51,823",
      balance: "$16,666.67",
      creditUtilization: "70.14%",
      totalInvoices: "15",
      openInvoices: "12",
      rating: "N/A",
      current: "$0",
      tags: ["E", "D", "P", ...Array(11).fill(null).map((_, i) => `Extra ${i + 1}`)],
    },
    {
      id: 10,
      name: "Advanced Research an",
      customerNumber: "30436048245",
      creditLimit: "$52,568",
      balance: "$19,524.00",
      creditUtilization: "62.86%",
      totalInvoices: "05",
      openInvoices: "01",
      rating: "N/A",
      current: "$0",
      tags: [],
    },
    {
      id: 11,
      name: "Advanced Manufacturing",
      customerNumber: "28469875737",
      creditLimit: "$51,823",
      balance: "$16,666.67",
      creditUtilization: "70.14%",
      totalInvoices: "15",
      openInvoices: "12",
      rating: "N/A",
      current: "$0",
      tags: ["E", "D", "P", ...Array(11).fill(null).map((_, i) => `Extra ${i + 1}`)],
    },
    {
      id: 12,
      name: "Advanced Research an",
      customerNumber: "30436048245",
      creditLimit: "$52,568",
      balance: "$19,524.00",
      creditUtilization: "62.86%",
      totalInvoices: "05",
      openInvoices: "01",
      rating: "N/A",
      current: "$0",
      tags: [],
    },
    {
      id: 13,
      name: "Advanced Manufacturing",
      customerNumber: "28469875737",
      creditLimit: "$51,823",
      balance: "$16,666.67",
      creditUtilization: "70.14%",
      totalInvoices: "15",
      openInvoices: "12",
      rating: "N/A",
      current: "$0",
      tags: ["E", "D", "P", ...Array(11).fill(null).map((_, i) => `Extra ${i + 1}`)],
    },
    {
      id: 14,
      name: "Advanced Research an",
      customerNumber: "30436048245",
      creditLimit: "$52,568",
      balance: "$19,524.00",
      creditUtilization: "62.86%",
      totalInvoices: "05",
      openInvoices: "01",
      rating: "N/A",
      current: "$0",
      tags: [],
    },
    {
      id: 15,
      name: "Advanced Manufacturing",
      customerNumber: "28469875737",
      creditLimit: "$51,823",
      balance: "$16,666.67",
      creditUtilization: "70.14%",
      totalInvoices: "15",
      openInvoices: "12",
      rating: "N/A",
      current: "$0",
      tags: ["E", "D", "P", ...Array(11).fill(null).map((_, i) => `Extra ${i + 1}`)],
    },
    {
      id: 16,
      name: "Advanced Research an",
      customerNumber: "30436048245",
      creditLimit: "$52,568",
      balance: "$19,524.00",
      creditUtilization: "62.86%",
      totalInvoices: "05",
      openInvoices: "01",
      rating: "N/A",
      current: "$0",
      tags: [],
    },
    {
      id: 17,
      name: "Advanced Manufacturing",
      customerNumber: "28469875737",
      creditLimit: "$51,823",
      balance: "$16,666.67",
      creditUtilization: "70.14%",
      totalInvoices: "15",
      openInvoices: "12",
      rating: "N/A",
      current: "$0",
      tags: ["E", "D", "P", ...Array(11).fill(null).map((_, i) => `Extra ${i + 1}`)],
    },
    {
      id: 18,
      name: "Advanced Research an",
      customerNumber: "30436048245",
      creditLimit: "$52,568",
      balance: "$19,524.00",
      creditUtilization: "62.86%",
      totalInvoices: "05",
      openInvoices: "01",
      rating: "N/A",
      current: "$0",
      tags: [],
    },
    {
      id: 19,
      name: "Advanced Manufacturing",
      customerNumber: "28469875737",
      creditLimit: "$51,823",
      balance: "$16,666.67",
      creditUtilization: "70.14%",
      totalInvoices: "15",
      openInvoices: "12",
      rating: "N/A",
      current: "$0",
      tags: ["E", "D", "P", ...Array(11).fill(null).map((_, i) => `Extra ${i + 1}`)],
    },
    {
      id: 20,
      name: "Advanced Research an",
      customerNumber: "30436048245",
      creditLimit: "$52,568",
      balance: "$19,524.00",
      creditUtilization: "62.86%",
      totalInvoices: "05",
      openInvoices: "01",
      rating: "N/A",
      current: "$0",
      tags: [],
    },
  ];
  
  const columns = [
    {
      field: "name",
      headerName: "Customer name",
      width: 200,
      headerAlign: "left",
      align: "left",
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            height: "100%",
            gap: 1,
          }}
        >
          <BusinessIcon fontSize="small" sx={{ color: "gray" }} />
          <Typography variant="body2">{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: "customerNumber",
      headerName: "Customer #",
      width: 150,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "creditLimit",
      headerName: "Credit limit",
      width: 150,
      headerAlign: "left",
      align: "left",
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            height: "100%",
            gap: 1,
          }}
        >
          <Typography sx={{ color: "green", fontWeight: 500 }}>{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: "balance",
      headerName: "Balance",
      width: 150,
      headerAlign: "left",
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            height: "100%",
            gap: 1,
          }}
        >
          <Typography sx={{ color: "green", fontWeight: 500 }}>{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: "creditUtilization",
      headerName: "Credit utilization",
      width: 180,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "totalInvoices",
      headerName: "Total invoice(s)",
      width: 150,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "openInvoices",
      headerName: "Open invoice(s)",
      width: 150,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "rating",
      headerName: "Rating",
      width: 100,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "current",
      headerName: "Current",
      width: 100,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "tags",
      headerName: "Tag",
      width: 200,
      headerAlign: "left",
      align: "left",
      sortable: false,
      renderCell: (params) => {
        const visibleTags = params.value.slice(0, 3);
        const hiddenCount = params.value.length - visibleTags.length;
  
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              height: "100%",
              gap: 1,
            }}
          >
            <AddCircleOutlineIcon sx={{ color: "#B388FF", fontSize: 20 }} />
            <Stack direction="row" spacing={0.5} alignItems="center">
              {visibleTags.map((tag, i) => (
                <Avatar
                  key={i}
                  sx={{
                    width: 24,
                    height: 24,
                    bgcolor: "#FFD600",
                    color: "#000",
                    fontSize: 12,
                  }}
                >
                  {tag[0]}
                </Avatar>
              ))}
              {hiddenCount > 0 && (
                <Chip
                  label={`+${hiddenCount}`}
                  size="small"
                  sx={{
                    backgroundColor: "#E0F7FA",
                    fontWeight: 500,
                    height: 24,
                  }}
                />
              )}
            </Stack>
          </Box>
        );
      },
    },
  ];
  
  
  export default function CustomerTable() {
    const theme = useTheme();
  
        const handleExport = (type: any) => {
            if (type === 'excel') {
                console.log('Exporting as Excel...');
                // Implement Excel logic (e.g., SheetJS)
            } else if (type === 'pdf') {
                console.log('Exporting as PDF...');
                // Implement PDF logic (e.g., jsPDF)
            }
        };
  
    return (
      <CustomDataGrid columns={columns} rows={rows} handleExport={handleExport} toolbarTitle={"Team Performance Overview"} />
    );
  }
  
