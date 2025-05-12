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
    { title: 'Current', value: '$50K', subtitle: '5 Invoices' },
    { title: 'Disputes', value: '$10.2K', subtitle: '3 Invoices' },
    { title: 'Overdue', value: '$10.7K', subtitle: '2 Invoices' },
    { title: 'Promise to Pay', value: '$740K', subtitle: '8 Invoices' },
    { title: 'Pending', value: '$1.71K', subtitle: '4 Invoices' },
    { title: 'Sales Order', value: '$4.1K', subtitle: '9 Invoices' },
    { title: 'Collection', value: '$10.4K', subtitle: '249 Invoices' },
];

const Dashboard = () => {


    const headers = ['Customer name', 'Invoice #', 'Outstanding balance'];
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
        alert(`Clicked on invoice: ${value} (row ${rowIndex + 1})`);
    };

    return (
        <>
            <Box
                // sx={{
                //     width: "100%",
                //     // height: "100vh",
                //     // background: "red",
                //     overflow: "hidden",
                //     display: "inline-flex",
                //     flexDirection: "column",
                //     justifyContent: "flex-start",
                //     alignItems: "flex-start",
                // }}
            >
                    <ComponentHeader />

                <Box
                    sx={{
                        alignSelf: "stretch",
                        flex: "1 1 0",
                        // p: 2,
                        display: "flex",
                        width: "100%",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        // gap: 2,
                        mb: 2,
                        // mt: 2
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
                            { title: "DSO", value: "72.93", subtitle: "from last 30 days", percentage: "+8%" },
                            { title: "Open invoice", value: "200", subvalue: "$54,795" },
                            { title: "Closed value", value: "4", subvalue: "$5.4M", subtitle: "from last 30 days", percentage: "+2%" },
                            { title: "Order in hold", value: "20", subvalue: "$5.4M", subtitle: "from last 30 days", percentage: "+2%" },
                            { title: "Cash collected", value: "$5.5M", subtitle: "from last 30 days", percentage: "+2%" },
                            { title: "Total dues", value: "$5.8M" },
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

            </Box >
            <Box sx={{ display: 'flex', mb: 2, gap: 2 }}>
                {/* ---- first box contain two boxes  ------- */}
                <Box sx={{ display: 'flex', flex: 1, gap: 2, }}>
                    <Box
                        // sx={{ background: "red", display: 'inline-flex', mb: 2, gap: 2,  }}
                        sx={{ display: 'flex', flex: 1, gap: 2, flexDirection: "column" }}
                    >
                        <Box sx={{ display: "flex", gap: 2 }}>
                            <Box component={Paper}
                                width={"100%"}
                                // height={"äuto"}
                                sx={{ flex: 1, borderRadius: 2 }}
                            >
                                <Paper>
                                    <EnhancedToolbar
                                        title={<CustomToggle />}
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
                                </Paper>
                            </Box>
                            <Box component={Paper}
                                width={"100%"}
                                sx={{ flex: 1, borderRadius: 2 }}
                            >
                                <EnhancedToolbar
                                    title={"Payment forcast"}
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
                            <Box component={Paper}
                                width={"100%"}

                                sx={{ flex: 1, borderRadius: 2, height: "auto", background: "red" }}
                            >

                                <Paper>
                                    <DaySaleChart />
                                </Paper>
                            </Box>

                        </Box>

                    </Box>


                </Box>
                {/* ------ second box contain 1 box which should be in right align   ------- */}
                <Box sx={{ borderRadius: 2 }}>
                    <Box component={Paper} sx={{ borderRadius: 2 }}>
                        <Box
                            sx={{
                                borderTopLeftRadius: 8,
                                borderTopRightRadius: 8,
                                background: "#6941C6",
                                //   width: "100%",
                                //   height: "100%",
                                // padding: "24px",
                                //   justifyContent: "flex-start",
                                //   alignItems: "flex-start",
                                // gap: "20px",
                                //   display: "inline-flex",
                            }}
                        >
                            <SimpleCard />
                        </Box>
                        <Box
                            sx={{
                                // backgroundColor: "cornflowerblue",
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "flex-start",
                                padding: "24px",
                                gap: "20px",
                                alignItems: "flex-start",
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
                <BasicTable headers={headers} rows={rows} title="0-30 days"
                    subtitle="Top invoice balance overdue ($850)"
                    linkColumnIndex={1} // Invoice # column
                    onLinkClick={handleInvoiceClick}
                />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, gap: 2, width: '100%' }}>
                <DsoChart />
                <ARChart />
            </Box>
            {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, gap: 2, width: '100%' }}>
                <OverdueCustomers />
            </Box> */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, gap: 2, width: '100%' }}>
                <TeamPerformanceTable />
            </Box>

        </>
    );
};

export default Dashboard;
