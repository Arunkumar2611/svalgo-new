import { Card } from '@mui/material'
import CustomToolbar from '../../components/CustomToolbar/CustomToolbar'
import DSOTrendsChart from '../../components/Chart/DSOTrendsChart'

const DsoChart = () => {
    return (
        <Card sx={{ borderRadius: 3, width: "60%", height: "100%" }}>
            <CustomToolbar title="DSO trends">
                <DSOTrendsChart />
            </CustomToolbar>
        </Card>
    )
}

export default DsoChart