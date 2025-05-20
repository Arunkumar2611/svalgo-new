import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import StatsCard from "../../components/StatsCard/StatsCard";
import BasicTable from "../../components/Table/BasicTable";
import AgingAnalysisChart from "./AgingAnalysisChart";
import DsoChart from "./DsoChart";
import ARChart from "./ARChart";
import PerformanceTable from "../../components/Table/PerformanceTable";
import TeamPerformanceTable from "./TeamPerformanceTable";
import OverdueCustomers from "./OverdueCustomers";
import InformCard from "../../components/StatsCard/InformCard";
import TopCustomerTable from "../../components/Table/TopCustomerTable";
import EnhancedToolbar from "../../components/CustomToolbar/EnhancedToolbar";
import CustomToggle from "../../components/CustomToggle/CustomToggle";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CustomToggleButtonGroup from "../../components/CustomToggle/CustomToogleButtonGroup";
import AgingChart from "../../components/Chart/AgingChart";
import FollowUpCard from "../../components/StatsCard/FollowUpCard";
import CustomToggleTaskbar from "../../components/CustomToggle/CustomToggleTaskbar";
import SimpleCard from "../../components/Header/SimpleCard";
import DaySaleChart from "../../components/Chart/DaySaleChart";
import ComponentHeader from "../../components/Header/ComponentHeader";

const cardData = [
    { title: 'Current Balance', value: '$50K', subtitle: '5 Invoices' },
    { title: 'Disputed Amount', value: '$10.2K', subtitle: '3 Invoices' },
    { title: 'Overdue Balance', value: '$10.7K', subtitle: '2 Invoices' },
    { title: 'Promise to Pay', value: '$740K', subtitle: '8 Invoices' },
    { title: 'Pending Amount', value: '$1.71K', subtitle: '4 Invoices' },
    { title: 'Sales Orders', value: '$4.1K', subtitle: '9 Invoices' },
    { title: 'Collections', value: '$10.4K', subtitle: '249 Invoices' },
];

const Dashboard = () => {
    const headers = ['Customer Name', 'Invoice #', 'Outstanding Balance'];
    const rows = [
        ["Acme Corp", "INV-1001", "$1,200.00"],
        ["Beta Ltd", "INV-1002", "$850.50"],
        ["Gamma Inc", "INV-1003", "$2,500.00"],
        ["Delta LLC", "INV-1004", "$980.00"],
        ["Epsilon Co", "INV-1005", "$430.25"],
        ["Zeta Group", "INV-1006", "$1,780.00"],
        ["Eta Solutions", "INV-1007", "$2,010.75"],
        ["Theta Enterprises", "INV-1008", "$399.99"],
        ["Iota Holdings", "INV-1009", "$3,200.00"],
        ["Kappa Industries", "INV-1010", "$1,150.00"],
    ];

    const handleInvoiceClick = (value: string | number, rowIndex: number) => {
        alert(`Clicked on Invoice: ${value} (Row ${rowIndex + 1})`);
    };

    return (
        <>
            <Box>
                <ComponentHeader title="Dashboard Overview" />

                <Box
                    sx={{
                        alignSelf: "stretch",
                        flex: "1 1 0",
                        display: "flex",
                        width: "100%",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        mb: 2,
                    }}
                >
                    <Box
                        sx={{
                            pt: "20px",
                            display: 'flex',
                            flexWrap: 'wrap',
                            width: "100%",
                            gap: 2,
                            justifyContent: 'space-between',
                        }}
                    >
                        {cardData.map((card, idx) => (
                            <Box
                                key={idx}
                                sx={{
                                    flex: '1 1 0',
                                    minWidth: 207,
                                }}
                            >
                                <StatsCard {...card} />
                            </Box>
                        ))}
                    </Box>
                    <Box sx={{ pt: "20px", display: "flex", gap: 2.5, flexWrap: 'wrap', width: "100%" }}>
                        {[
                            { title: "Days Sales Outstanding (DSO)", value: "72.93", subtitle: "Last 30 Days", percentage: "+8%" },
                            { title: "Open Invoices", value: "200", subvalue: "$54,795" },
                            { title: "Closed Value", value: "4", subvalue: "$5.4M", subtitle: "Last 30 Days", percentage: "+2%" },
                            { title: "Orders on Hold", value: "20", subvalue: "$5.4M", subtitle: "Last 30 Days", percentage: "+2%" },
                            { title: "Cash Collected", value: "$5.5M", subtitle: "Last 30 Days", percentage: "+2%" },
                            { title: "Total Dues", value: "$5.8M" },
                        ].map((card, idx) => (
                            <Box
                                key={idx}
                                sx={{
                                    flex: "1 1 250px",
                                    minWidth: "282px",
                                    gap: "15px"
                                }}
                            >
                                <InformCard {...card} />
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', mb: 2, gap: 2 }}>
                <Box sx={{ display: 'flex', flex: 1, gap: 2 }}>
                    <Box sx={{ display: 'flex', flex: 1, gap: 2, flexDirection: "column" }}>
                        <Box sx={{ display: "flex", gap: 2 }}>
                            <Box component={Paper} width={"100%"} sx={{ flex: 1, borderRadius: 2 }}>
                                <EnhancedToolbar
                                    title="Top Customers"
                                    rightContent={
                                        <Box>
                                            <IconButton size="small">
                                                <OpenInNewIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton size="small">
                                                <MoreVertIcon fontSize="small" />
                                            </IconButton>   
                                        </Box>
                                    }
                                >
                                    <TopCustomerTable headers={headers} rows={rows} />
                                </EnhancedToolbar>
                            </Box>
                            <Box component={Paper} width={"100%"} sx={{ flex: 1, borderRadius: 2 }}>
                                <EnhancedToolbar
                                    title="Payment Forecast"
                                    rightContent={
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                            <CustomToggleButtonGroup />
                                            <Box>
                                                <IconButton size="small">
                                                    <OpenInNewIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton size="small">
                                                    <MoreVertIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    }
                                >
                                    <AgingChart />
                                </EnhancedToolbar>
                            </Box>
                        </Box>
                        <Box>
                            <Box component={Paper} width={"100%"} sx={{ flex: 1, borderRadius: 2, height: "auto" }}>
                                <Paper>
                                    <DaySaleChart />
                                </Paper>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ borderRadius: 2 }}>
                    <Box component={Paper} sx={{ borderRadius: 2 }}>
                        <Box
                            sx={{
                                borderTopLeftRadius: 8,
                                borderTopRightRadius: 8,
                                background: "#6941C6",
                            }}
                        >
                            <SimpleCard />
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "flex-start",
                                padding: "24px",
                                gap: "20px",
                                flexDirection: "column",
                            }}
                        >
                            <CustomToggleTaskbar />
                            <FollowUpCard />
                            <FollowUpCard />
                            <FollowUpCard />
                            <FollowUpCard />
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, gap: 2 }}>
                <AgingAnalysisChart />
                <BasicTable
                    headers={headers}
                    rows={rows}
                    title="Aging Analysis (0-30 Days)"
                    subtitle="Top Invoice Balance Overdue ($850)"
                    linkColumnIndex={1}
                    onLinkClick={handleInvoiceClick}
                />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, gap: 2, width: '100%' }}>
                <DsoChart />
                <ARChart />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, gap: 2, width: '100%' }}>
                <TeamPerformanceTable />
            </Box>
        </>
    );
};

export default Dashboard;
