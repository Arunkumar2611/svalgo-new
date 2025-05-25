import { Box, Grid } from '@mui/material'
import ComponentHeader from '../../components/Header/ComponentHeader'
import StatsCard from '../../components/StatsCard/StatsCard';
import InformCard from '../../components/StatsCard/InformCard';

import DsoChart from './DsoChart';
import ARChart from './ARChart';
import TopCustomerTable from './TopCustomerTable';
import AgingChart from './AgingChart';
import DaySaleChart from './DaySaleChart';
import TaskManager from './TaskManager';

const cardData = [
  { title: 'Current Balance', value: '$50K', subtitle: '5 Invoices', background: "#E3F2FD" },
  { title: 'Disputed Amount', value: '$10.2K', subtitle: '3 Invoices', background: "#FFEBEE" },
  { title: 'Overdue Balance', value: '$10.7K', subtitle: '2 Invoices', background: "#E8F5E9" },
  { title: 'Promise to Pay', value: '$740K', subtitle: '8 Invoices', background: "#FFF8E1" },
  { title: 'Pending Amount', value: '$1.71K', subtitle: '4 Invoices', background: "#E0F7FA" },
  { title: 'Sales Orders', value: '$4.1K', subtitle: '9 Invoices', background: "#FFEBEE" },
  { title: 'Collections', value: '$10.4K', subtitle: '249 Invoices', background: "#E3F2FD" },
];



const Dashboard = () => {
  return (
    <Box sx={{ padding: "20px", gap: "20px", display: "flex", flexDirection: "column" }}>
      <ComponentHeader />
      <Grid container spacing={"16px"}>
        <Grid size={12}>
          <Box
            sx={{
              // pt: "20px",
              display: 'flex',
              flexWrap: 'wrap',
              width: "100%",
              gap: "16px",
              justifyContent: 'space-between',
            }}
          >
            {cardData.map((card, idx) => (
              <Box
                key={idx}
                sx={{
                  flex: '1 1 0',
                  // minWidth: 207,
                  width: "100%"
                }}
              >
                <StatsCard {...card} />
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid size={12}>
          <Box sx={{ display: "flex", gap: "16px", flexWrap: 'wrap', width: "100%" }}>
            {[
              { title: "Days Sales Outstanding (DSO)", value: "72.93", subtitle: "Last 30 Days", percentage: "+8%", },
              { title: "Open Invoices", value: "200", subvalue: "$54,795" },
              { title: "Closed Value", value: "4", subvalue: "$5.4M", subtitle: "Last 30 Days", percentage: "+2%" },
              { title: "Orders on Hold", value: "20", subvalue: "$5.4M", subtitle: "Last 30 Days", percentage: "+2%" },
              { title: "Cash Collected", value: "$5.5M", subtitle: "Last 30 Days", percentage: "+2%" },
              { title: "Total Dues", value: "$5.8M" },
            ].map((card, idx) => (
              <Box
                key={idx}
                sx={{
                  flex: "1 1 250px",
                  minWidth: "282px",
                  gap: "16px"
                }}
              >
                <InformCard {...card} />
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid container spacing={"16px"} size={{ xs: 12, sm: 12, md: 8 }} >
          <Grid size={{ xs: 12, sm: 12, md:6 }}>
            <TopCustomerTable />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md:6 }}>
            <AgingChart />
          </Grid>
          <Grid size={12}>
            <DaySaleChart />
          </Grid>
        </Grid>

        <Grid item size={{ xs: 12, sm: 12, md: 4 }} >
          <TaskManager />
        </Grid>
        <Grid item size={{ xs: 12, sm: 12, md: 6 }}>
          <DsoChart />
        </Grid>
        <Grid item size={{ xs: 12, sm: 12, md: 6 }}>
          <ARChart />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard