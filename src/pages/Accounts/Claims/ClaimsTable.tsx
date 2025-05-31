import {
    Box,
    Typography,
    Chip,
    Avatar,
    Stack,
    useTheme,
} from "@mui/material";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ClaimsToolbar from "./ClaimsToolbar";
import CustomDataGrid from "../../../components/DataGrid2/CustomDataGrid";

// Sample data mimicking API
const columns = [
    {
        field: 'claimId',
        headerName: 'Claim ID',
        width: 150,
        headerAlign: 'left',
        align: 'left',
    },
    {
        field: 'claimLevel',
        headerName: 'Claim level',
        width: 200,
        headerAlign: 'left',
        align: 'left',
    },
    {
        field: 'claimAmount',
        headerName: 'Claim amount',
        width: 180,
        headerAlign: 'left',
        align: 'left',
        renderCell: (params) => (
            <Typography sx={{ color: 'green', fontWeight: 500 }}>
                {params.value}
            </Typography>
        ),
    },
    {
        field: 'claimDate',
        headerName: 'Claim date',
        width: 180,
        headerAlign: 'left',
        align: 'left',
    },
    {
        field: 'claimPriority',
        headerName: 'Claim priority',
        width: 180,
        headerAlign: 'left',
        align: 'left',
        renderCell: (params) => (
            <Chip
                label={params.value}
                sx={{
                    backgroundColor: params.value === 'Very low' ? '#E0F7FA' :
                        params.value === 'Low' ? '#BBDEFB' :
                        params.value === 'Medium' ? '#FFE0B2' :
                        params.value === 'High' ? '#FFCDD2' :
                        '#E1BEE7',
                    color: '#000',
                    fontWeight: 500,
                }}
            />
        ),
    },
    {
        field: 'settlement',
        headerName: 'Settlement',
        width: 180,
        headerAlign: 'left',
        align: 'left',
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 180,
        headerAlign: 'left',
        align: 'left',
        renderCell: (params) => (
            <Chip
                label={params.value}
                sx={{
                    backgroundColor: params.value === 'Approved' ? '#C8E6C9' :
                        params.value === 'Declined' ? '#FFCDD2' :
                        params.value === 'Cancelled' ? '#FFE0B2' :
                        '#BBDEFB',
                    color: '#000',
                    fontWeight: 500,
                }}
            />
        ),
    },
];

const rows = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    claimId: `CLAIM${index + 1}`,
    claimLevel: index % 2 === 0 ? 'Invoice' : 'Item quantity',
    claimAmount: `$${(index + 1) * 1000}.00`,
    claimDate: `May ${index % 31 + 1}, 2025`,
    claimPriority: ['Very low', 'Low', 'Medium', 'High', 'Very high'][index % 5],
    settlement: 'Credit note',
    status: ['Approved', 'Declined', 'Cancelled', 'Open'][index % 4],
}));

export default function ClaimsTable() {
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
        <CustomDataGrid
            columns={columns}
            rows={rows.map((row, index) => ({ ...row, id: row.id || index }))} // Ensure each row has a unique id

            handleExport={handleExport}
            headerChildren={
                <ClaimsToolbar />
            }
        />
    );
}
