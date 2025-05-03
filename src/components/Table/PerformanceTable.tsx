import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Avatar,
    Typography,
    Box,
    IconButton,
    TableContainer,
    Paper,
    Pagination,
    Button,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

// Define the interface for the data structure
interface PerformanceData {
    name: string;
    avatar: string;
    totalCollected: string;
    arOutstanding: string;
    ptp: string;
    ptpRate: string;
    cei: string;
    accountResolve: string;
    avgDaysToPayment: string;
}

// Dummy data
const data: PerformanceData[] = [
    {
        name: "Lily-Rose Chedjou",
        avatar: "https://i.pravatar.cc/150?img=1",
        totalCollected: "$15,000",
        arOutstanding: "$16,666.67",
        ptp: "28 days",
        ptpRate: "85%",
        cei: "85%",
        accountResolve: "20",
        avgDaysToPayment: "25 days",
    },
    {
        name: "Caitlyn King",
        avatar: "https://i.pravatar.cc/150?img=2",
        totalCollected: "$15,000",
        arOutstanding: "$16,666.67",
        ptp: "28 days",
        ptpRate: "85%",
        cei: "85%",
        accountResolve: "20",
        avgDaysToPayment: "25 days",
    },
    {
        name: "Fleur Cook",
        avatar: "https://i.pravatar.cc/150?img=3",
        totalCollected: "$15,000",
        arOutstanding: "$16,666.67",
        ptp: "28 days",
        ptpRate: "85%",
        cei: "85%",
        accountResolve: "20",
        avgDaysToPayment: "25 days",
    },
    {
        name: "Marco Kelly",
        avatar: "https://i.pravatar.cc/150?img=4",
        totalCollected: "$15,000",
        arOutstanding: "$16,666.67",
        ptp: "28 days",
        ptpRate: "85%",
        cei: "85%",
        accountResolve: "20",
        avgDaysToPayment: "25 days",
    },
    {
        name: "Lulu Meyers",
        avatar: "https://i.pravatar.cc/150?img=5",
        totalCollected: "$15,000",
        arOutstanding: "$16,666.67",
        ptp: "28 days",
        ptpRate: "85%",
        cei: "85%",
        accountResolve: "20",
        avgDaysToPayment: "25 days",
    },
    {
        name: "Mikey Lawrence",
        avatar: "https://i.pravatar.cc/150?img=6",
        totalCollected: "$15,000",
        arOutstanding: "$16,666.67",
        ptp: "28 days",
        ptpRate: "85%",
        cei: "85%",
        accountResolve: "20",
        avgDaysToPayment: "25 days",
    },
    {
        name: "Freya Browning",
        avatar: "https://i.pravatar.cc/150?img=7",
        totalCollected: "$15,000",
        arOutstanding: "$16,666.67",
        ptp: "28 days",
        ptpRate: "85%",
        cei: "85%",
        accountResolve: "20",
        avgDaysToPayment: "25 days",
    },
];

const columnHeaders = [
    { label: "Assigned to", key: "name" },
    { label: "Total collected", key: "totalCollected" },
    { label: "AR outstanding", key: "arOutstanding" },
    { label: "PTP", key: "ptp" },
    { label: "PTP rate %", key: "ptpRate" },
    { label: "CEI %", key: "cei" },
    { label: "Account resolve", key: "accountResolve" },
    { label: "Average days to payment", key: "avgDaysToPayment" },
];

const PerformanceTable = () => {
    const [page, setPage] = useState(1);
    const rowsPerPage = 5;

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const paginatedData = data.slice(
        (page - 1) * rowsPerPage,
        page * rowsPerPage
    );

    return (
        <Box width={"100%"}>
            {/* <Paper variant="outlined" sx={{ borderRadius: 2, p: 2 }}> */}
                
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {columnHeaders.map((col) => (
                                    <TableCell
                                        key={col.key}
                                        sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
                                    >
                                        <Box display="flex" alignItems="center">
                                            {col.label}
                                            <IconButton size="small" sx={{ ml: 0.5 }}>
                                                <ArrowDropDownIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedData.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Box display="flex" alignItems="center" gap={2}>
                                            <Avatar src={row.avatar} />
                                            <Typography>{row.name}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{row.totalCollected}</TableCell>
                                    <TableCell>{row.arOutstanding}</TableCell>
                                    <TableCell>{row.ptp}</TableCell>
                                    <TableCell>{row.ptpRate}</TableCell>
                                    <TableCell>{row.cei}</TableCell>
                                    <TableCell>{row.accountResolve}</TableCell>
                                    <TableCell>{row.avgDaysToPayment}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Pagination controls */}
                <Box display="flex" justifyContent="flex-end" alignItems="center" mt={2}>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        sx={{ mr: 1 }}
                    >
                        Previous
                    </Button>
                    <Pagination
                        count={Math.ceil(data.length / rowsPerPage)}
                        page={page}
                        onChange={handlePageChange}
                        size="small"
                        variant="outlined"
                        shape="rounded"
                    />
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() =>
                            setPage((p) =>
                                p < Math.ceil(data.length / rowsPerPage) ? p + 1 : p
                            )
                        }
                        disabled={page === Math.ceil(data.length / rowsPerPage)}
                        sx={{ ml: 1 }}
                    >
                        Next
                    </Button>
                </Box>
            {/* </Paper> */}
        </Box>
    );
};

export default PerformanceTable;
