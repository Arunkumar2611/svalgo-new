// import React from "react";
// import InfoIcon from "@mui/icons-material/Info";
import { Card, Typography, Box, useTheme } from "@mui/material";
import CustomToolbar from "../../components/CustomToolbar/CustomToolbar";
import AgingChart from "../../components/Chart/AgingChart";

const AgingAnalysisChart = () => {
    const theme = useTheme();
    return (
        <Card sx={{ borderRadius: 2, width: "100%", height: "100%" }}>
            <CustomToolbar
                title="Aging Analysis"
                // subtitle="56 invoices totaling $121M"
                // icon={<InfoIcon color="primary" />}
                rightContent={
                    <Typography variant="body2">
                        56 Invoice -
                        <Box
                            component="span"
                            sx={{ color: theme.palette.primary.main, fontWeight: "600" }}
                        >
                            $121M
                        </Box>
                    </Typography>
                }
            >
                <AgingChart />
            </CustomToolbar>
        </Card>
    );
};

export default AgingAnalysisChart;
