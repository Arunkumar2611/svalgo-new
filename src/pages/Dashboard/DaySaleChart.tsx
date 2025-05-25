import { Button, ButtonGroup } from "@mui/material";
import CustomCard from "../../components/Card/CustomCard";
import CustomLineChart from "../../components/Chart/CustomLineChart";

const DaySaleChart = () => {
    const data = [
        {
            date: "Nov 01, 2024",
            dso: 70,
            currentDso: 45,
            overdueDso: 30,
            overdue: 25,
        },
        {
            date: "Nov 08, 2024",
            dso: 50,
            currentDso: 43,
            overdueDso: 25,
            overdue: 20,
        },
        {
            date: "Nov 15, 2024",
            dso: 65,
            currentDso: 65,
            overdueDso: 35,
            overdue: 30,
        },
        {
            date: "Nov 22, 2024",
            dso: 40,
            currentDso: 50,
            overdueDso: 20,
            overdue: 22,
        },
        {
            date: "Nov 29, 2024",
            dso: 30,
            currentDso: 55,
            overdueDso: 40,
            overdue: 33,
        },
        {
            date: "Dec 06, 2024",
            dso: 80,
            currentDso: 48,
            overdueDso: 35,
            overdue: 27,
        },
    ];

    const lines = [
        { dataKey: "dso", stroke: "#885FFF", label: "DSO" },
        { dataKey: "currentDso", stroke: "#20C997", label: "Current DSO", highlightDotOnDate: "Nov 29, 2024" },
        { dataKey: "overdueDso", stroke: "#F97316", label: "Overdue DSO" },
        { dataKey: "overdue", stroke: "#FACC15", label: "Overdue" },
    ];

    const DaySaleActionItem = (
        <ButtonGroup variant="outlined" size="small">
            <Button>3M</Button>
            <Button variant="contained">6M</Button>
            <Button>1Y</Button>
        </ButtonGroup>
    );

    return (
        <CustomCard
            // sx={{ height: "545px" }}
            titleAsText="Day sales outstanding"
            action={DaySaleActionItem}
            mainStyle={{ padding: "16px" }}
            main={<CustomLineChart data={data}
                lines={lines}
                referenceLineDate="Nov 29, 2024"
                referenceLineColor="#B3F262"
            />}
        />
    );
};

export default DaySaleChart;
