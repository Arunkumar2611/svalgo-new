import {
    Box,
    Typography,
    Chip,
    Avatar,
    Stack,
    useTheme,
    Button,
} from "@mui/material";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CustomDataGrid from "../../../../components/DataGrid2/CustomDataGrid";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import BusinessIcon from "@mui/icons-material/Business";
import { Add } from "@mui/icons-material";
import InvoiceToolbar from "./InvoiceToolbar";

// Sample data mimicking API
const columns = [
    {
        field: "invoice",
        headerName: "Invoice",
        width: 200,
        headerAlign: "left",
        align: "left",
        renderCell: (params) => (
            <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                height: "100%",
                gap: 1,
            }}>
                <ReceiptIcon fontSize="small" sx={{ color: "gray" }} />
                <Typography variant="body2">{params.value}</Typography>
            </Box>
        ),

    },

    {
        field: "date",
        headerName: "Date",
        width: 160,
        headerAlign: "left",
        align: "left",
    },
    {
        field: "paymentTerm",
        headerName: "Payment Term",
        width: 180,
        headerAlign: "left",
        align: "left",
    },
    {
        field: "balance",
        headerName: "Balance (USD)",
        width: 180,
        headerAlign: "left",
        align: "left",
    },
    {
        field: "invoiceAmount",
        headerName: "Invoice Amount",
        width: 180,
        headerAlign: "left",
        align: "left",
    },
    {
        field: "dueDate",
        headerName: "Due Date",
        width: 180,
        headerAlign: "left",
        align: "left",
    },
    {
        field: "agingDays",
        headerName: "Aging Days",
        width: 180,
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

export const rows = [
    {
        id: 1,
        invoice: "INV-1001",
        date: "2025-05-01",
        paymentTerm: "Net 30",
        balance: "$2,500.00",
        invoiceAmount: "$10,000.00",
        dueDate: "2025-05-31",
        agingDays: 28,
        tags: ["Overdue"],
    },
    {
        id: 2,
        invoice: "INV-1002",
        date: "2025-04-15",
        paymentTerm: "Net 15",
        balance: "$0.00",
        invoiceAmount: "$3,200.00",
        dueDate: "2025-04-30",
        agingDays: 45,
        tags: ["Paid"],
    },
    {
        id: 3,
        invoice: "INV-1003",
        date: "2025-05-10",
        paymentTerm: "Net 45",
        balance: "$1,800.00",
        invoiceAmount: "$4,500.00",
        dueDate: "2025-06-24",
        agingDays: 15,
        tags: [],
    },
    {
        id: 4,
        invoice: "INV-1004",
        date: "2025-03-22",
        paymentTerm: "Net 60",
        balance: "$4,000.00",
        invoiceAmount: "$4,000.00",
        dueDate: "2025-05-21",
        agingDays: 38,
        tags: ["High Priority"],
    },
    {
        id: 5,
        invoice: "INV-1005",
        date: "2025-05-18",
        paymentTerm: "Net 15",
        balance: "$500.00",
        invoiceAmount: "$2,500.00",
        dueDate: "2025-06-02",
        agingDays: 11,
        tags: [],
    },
    {
        id: 6,
        invoice: "INV-1006",
        date: "2025-05-01",
        paymentTerm: "Net 30",
        balance: "$0.00",
        invoiceAmount: "$1,200.00",
        dueDate: "2025-05-31",
        agingDays: 28,
        tags: ["Paid"],
    },
    {
        id: 7,
        invoice: "INV-1007",
        date: "2025-04-10",
        paymentTerm: "Net 20",
        balance: "$750.00",
        invoiceAmount: "$2,000.00",
        dueDate: "2025-04-30",
        agingDays: 49,
        tags: ["Disputed"],
    },
    {
        id: 8,
        invoice: "INV-1008",
        date: "2025-05-05",
        paymentTerm: "Net 10",
        balance: "$3,500.00",
        invoiceAmount: "$5,000.00",
        dueDate: "2025-05-15",
        agingDays: 22,
        tags: [],
    },
    {
        id: 9,
        invoice: "INV-1009",
        date: "2025-05-25",
        paymentTerm: "Net 7",
        balance: "$1,000.00",
        invoiceAmount: "$1,000.00",
        dueDate: "2025-06-01",
        agingDays: 4,
        tags: ["Urgent"],
    },
    {
        id: 10,
        invoice: "INV-1010",
        date: "2025-04-01",
        paymentTerm: "Net 90",
        balance: "$9,000.00",
        invoiceAmount: "$9,000.00",
        dueDate: "2025-06-30",
        agingDays: 58,
        tags: ["Long Term"],
    },
    {
        id: 11,
        invoice: "INV-1011",
        date: "2025-05-20",
        paymentTerm: "Net 30",
        balance: "$3,000.00",
        invoiceAmount: "$6,000.00",
        dueDate: "2025-06-19",
        agingDays: 9,
        tags: ["Pending", "Follow-up"],
    },
    {
        id: 12,
        invoice: "INV-1012",
        date: "2025-03-05",
        paymentTerm: "Net 60",
        balance: "$0.00",
        invoiceAmount: "$7,800.00",
        dueDate: "2025-05-04",
        agingDays: 60,
        tags: ["Paid", "Archived"],
    },
    {
        id: 13,
        invoice: "INV-1013",
        date: "2025-04-25",
        paymentTerm: "Net 20",
        balance: "$2,200.00",
        invoiceAmount: "$2,200.00",
        dueDate: "2025-05-15",
        agingDays: 34,
        tags: ["Urgent", "Client Dispute"],
    },
    {
        id: 14,
        invoice: "INV-1014",
        date: "2025-05-12",
        paymentTerm: "Net 15",
        balance: "$900.00",
        invoiceAmount: "$1,000.00",
        dueDate: "2025-05-27",
        agingDays: 13,
        tags: ["Overdue", "Reminder Sent"],
    },
    {
        id: 15,
        invoice: "INV-1015",
        date: "2025-01-15",
        paymentTerm: "Net 90",
        balance: "$0.00",
        invoiceAmount: "$12,000.00",
        dueDate: "2025-04-15",
        agingDays: 74,
        tags: ["Paid", "Reviewed", "Archived"],
    },
    {
        id: 16,
        invoice: "INV-1016",
        date: "2025-05-03",
        paymentTerm: "Net 20",
        balance: "$2,000.00",
        invoiceAmount: "$2,500.00",
        dueDate: "2025-05-23",
        agingDays: 26,
        tags: ["Partial Payment", "Follow-up"],
    },
    {
        id: 17,
        invoice: "INV-1017",
        date: "2025-02-18",
        paymentTerm: "Net 45",
        balance: "$5,500.00",
        invoiceAmount: "$6,000.00",
        dueDate: "2025-04-03",
        agingDays: 85,
        tags: ["Critical", "Legal Notice"],
    },
    {
        id: 18,
        invoice: "INV-1018",
        date: "2025-05-27",
        paymentTerm: "Net 10",
        balance: "$750.00",
        invoiceAmount: "$750.00",
        dueDate: "2025-06-06",
        agingDays: 2,
        tags: ["New", "To Be Reviewed"],
    },
    {
        id: 19,
        invoice: "INV-1019",
        date: "2025-04-18",
        paymentTerm: "Net 30",
        balance: "$0.00",
        invoiceAmount: "$4,400.00",
        dueDate: "2025-05-18",
        agingDays: 41,
        tags: ["Paid", "Follow-up", "Client Verified"],
    },
    {
        id: 20,
        invoice: "INV-1020",
        date: "2025-05-16",
        paymentTerm: "Net 15",
        balance: "$1,100.00",
        invoiceAmount: "$2,200.00",
        dueDate: "2025-05-31",
        agingDays: 13,
        tags: ["Pending", "Watchlist", "Repeat Client"],
    },
];



export default function OpenInvoiceTable() {
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
            rows={rows}

            handleExport={handleExport}
            headerChildren={
                <InvoiceToolbar />
            }
        />
    );
}

