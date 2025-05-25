import { Box, IconButton } from '@mui/material'
import CustomCard from '../../components/Card/CustomCard'
import CustomToggleButtonGroup from '../../components/CustomToggle/CustomToogleButtonGroup'
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CustomBarChart from '../../components/Chart/CustomBarChart';


const AgingChart = () => {
    const data = [
        { name: "July 07", value: 17500000 },
        { name: "July 08", value: 14100000 },
        { name: "July 10", value: 12000000 },
        { name: "July 11", value: 4800000 },
        { name: "July 12", value: 10950000 },
        { name: "July 13", value: 14600000 },
        { name: "July 14", value: 1200000 },
    ];

    const formatMillions = (value: number) => {
        return `${(value / 1000000).toFixed(1)}M`;
      };

    return (
        <CustomCard
            // sx={{ height: "545px" }}
            titleAsText="Payment Forecast"
            action={
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
            mainStyle={{ padding: "16px" }}
            main={
                <CustomBarChart
                    data={data}
                    formatterFunc={formatMillions} />}
        />
    )
}

export default AgingChart