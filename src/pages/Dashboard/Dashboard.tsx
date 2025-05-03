import { Box } from "@mui/material";
import StatsCard from "../../components/StatsCard/StatsCard";
import BasicTable from "../../components/Table/BasicTable";
import AgingAnalysisChart from "./AgingAnalysisChart";
import DsoChart from "./DsoChart";
import ARChart from "./ARChart";
import PerformanceTable from "../../components/Table/PerformanceTable";
import TeamPerformanceTable from "./TeamPerformanceTable";
import OverdueCustomers from "./OverdueCustomers";

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
                sx={{
                    width: "100%",
                    // height: "100vh",
                    // background: "red",
                    overflow: "hidden",
                    display: "inline-flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                }}
            >
                <Box
                    sx={{
                        alignSelf: "stretch",
                        flex: "1 1 0",
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        gap: 2,
                    }}
                >
                    <Box
                        sx={{
                            alignSelf: "stretch",
                            display: "inline-flex",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            gap: 2.5,
                        }}
                    >
                        <Box sx={{ width: "100%", display: "flex", gap: 2.5 }}>
                            <StatsCard title="Balance" value="$436.14K" percentage="+20%" />
                            <StatsCard title="AR balance" value="29" percentage="+20%" />
                            <StatsCard title="Overdue" value="2,671" percentage="+20%" showLink />
                            <StatsCard title="Total net exposure" value="2,671" percentage="+20%" />
                            <StatsCard title="Total credit limit" value="2,671" percentage="+20%" />
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, gap: 2, width: '100%' }}>
                <OverdueCustomers />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, gap: 2, width: '100%' }}>
                <TeamPerformanceTable />
            </Box>

        </>
    );
};

export default Dashboard;
