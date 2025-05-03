import { Card } from "@mui/material";
import CustomToolbar from "../../components/CustomToolbar/CustomToolbar";
import PerformanceTable from "../../components/Table/PerformanceTable";

const TeamPerformanceTable = () => {
    return (
        <Card sx={{ borderRadius: 3, width: "100%", height: "100%" }}>
            <CustomToolbar
                title="Team performance overview"
            >
                <PerformanceTable />
            </CustomToolbar>
        </Card>
    );
};

export default TeamPerformanceTable;