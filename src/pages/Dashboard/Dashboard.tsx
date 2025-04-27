import React from "react";
import { Grid, Box } from "@mui/material";
import SplitMetricCard from "../../components/MetricCard/CombinedMetricCard";
import MetricCard from "../../components/MetricCard/MetricCard";

const Dashboard = () => {
    const metrics = [
        {
            type: "split",
            data: [
                { label: "DSO average", value: "33 Days", isNegative: true },
                { label: "CEI", value: "-914.1%", isNegative: true }
            ]
        },
        { label: "Balance", value: "$436.14K", percentage: "+20%", isNegative: false },
        { label: "AR balance", value: "29", percentage: "+20%", isNegative: false },
        { label: "Overdue", value: "2,671", percentage: "+20%", isNegative: false },
        { label: "Total net exposure", value: "82%", percentage: "+20%", isNegative: false },
        { label: "Total credit limit", value: "82%", percentage: "+20%", isNegative: false }
    ];

    return (
        <Box p={3}>
            <Grid container spacing={2}>
                {metrics.map((metric, index) =>
                    metric.type === "split" ? (
                        <Grid item key={index} xs={12} sm={6} md={4} lg={Math.floor(12 / metrics.length)}>
                            <SplitMetricCard metrics={metric.data} />
                        </Grid>
                    ) : (
                        <Grid
                            item
                            key={index}
                            xs={12}
                            sm={6}
                            md={4}
                            lg={Math.floor(12 / metrics.length)}
                            sx={{ minWidth: 200 }} // Set a fixed minimum width
                        >
                            <MetricCard {...metric} />
                        </Grid>
                    )
                )}
            </Grid>
        </Box>
    );
};

export default Dashboard;
