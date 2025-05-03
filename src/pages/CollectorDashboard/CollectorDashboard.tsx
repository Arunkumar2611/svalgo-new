import { Box, Grid, Typography } from '@mui/material'
import StatsCard from '../../components/StatsCard/StatsCard';

const CollectorDashboard = () => {

    const statsData = [
        { label: 'Current', value: '$0', subValue: '0 Invoices', backgroundColor: '#f2faff' },
        { label: 'Claims', value: '$4.08', subValue: '4 claims', backgroundColor: '#f6f8fc' },
        { label: 'Overdue', value: '$432.5K', subValue: '54 Invoices', backgroundColor: '#f2f6ff' },
        { label: 'Promise to pay', value: '$0', subValue: '0 Invoices', backgroundColor: '#ecfff2' },
        { label: 'Pending', value: '$0', subValue: '0 Invoices', backgroundColor: '#fff8e1' },
        { label: 'Sales order', value: '$14.5K', subValue: '0', backgroundColor: '#e5fbff' },
        { label: 'Paid', value: '$14.5K', subValue: '9 Invoices', backgroundColor: '#e9fcee' },
        { label: 'Collection', value: '$304.5K', subValue: '49 Invoices', backgroundColor: '#fbf2ff' },
    ];


    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Grid container>
                    <Grid item><Typography variant="h4" fontSize={30} fontWeight={600}>Collector Dashboard</Typography></Grid>
                </Grid>
            </Box>

            <StatsCard title="Balance" value="$436.14K" percentage="+20%"  />
        </Box>
    )
}

export default CollectorDashboard