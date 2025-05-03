// import React from "react";
import { Card } from "@mui/material";
import CustomToolbar from "../../components/CustomToolbar/CustomToolbar";
import AROutstandingChart from "../../components/Chart/AROutstandingChart";

const ARChart = () => {
    return (
        <Card sx={{ borderRadius: 3, width: "40%", height: "100%" }}>
            <CustomToolbar
                title="AR Outstanding in %"
            >
                <AROutstandingChart />
            </CustomToolbar>
        </Card>
    );
};

export default ARChart;
