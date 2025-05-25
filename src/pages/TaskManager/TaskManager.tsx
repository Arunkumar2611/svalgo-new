import { Box, Card, Grid } from "@mui/material";
import InformCard from "../../components/StatsCard/InformCard";
import TaskComponentHeader from "./TaskComponentHeader";
import TaskStatsCard from "./TaskStatsCard";
import TaskTabs from "./TaskTabs";
import '../../App.css';
const cardData = [
  { title: "Total Task", value: "120" },
  { title: "Task Completed Today", value: "72" },
  { title: "Tasks Completed Past 7 Days", value: "48" },
  { title: "Tasks Overdue", value: "18" },
  { title: "Successful PTP Executed", value: "48" },
  { title: "Due On Today", value: "0" },
];

const topCard = [
  {
    title: "Current",
    value: "72.93",
    subtitle: "5 Invoices",
    percentage: "+8%",
    icon: false,
    background: "#F0F9FF",
    percentageColor: "#067647",
  },
  {
    title: "Past Dues",
    value: "200",
    subtitle: "5 Invoices",
    percentage: "+8%",
    icon: false,
    background: "#FEF3F2",
    percentageColor: "#067647",
  },
  {
    title: "Collection",
    value: "4",
    subtitle: "249 Invoices",
    percentage: "+2%",
    icon: false,
    background: "#F9F5FF",
    percentageColor: "#067647",
  },
  {
    title: "Pending",
    value: "20",
    subtitle: "5 Invoices",
    percentage: "+2%",
    icon: false,
    background: "#FFFAEB",
    percentageColor: "#B42318",
  },
];

const TaskManager = () => {
  const handleClick = () => {};
  return (
    <Box sx={{padding: "16px"}}>
      <TaskComponentHeader title="Task Manager" handleClick={handleClick} />
      <Box
        sx={{
          pt: "20px",
          display: "flex",
          gap: 2.5,
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        {topCard?.map((card, idx) => (
          <Box
            key={idx}
            sx={{
              flex: "1 1 250px",
              minWidth: "282px",
              gap: "15px",
            }}
          >
            <InformCard {...card} />
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          pt: "20px",
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          gap: 2,
          justifyContent: "space-between",
        }}
      >
        {cardData?.map((card, idx) => (
          <Box
            key={idx}
            sx={{
              flex: "1 1 0",
              minWidth: 207,
            }}
          >
            <TaskStatsCard {...card} />
          </Box>
        ))}
      </Box>
        <Grid container mt={'20px'}>
          <Grid size={{xs:12}}>
            <Card variant="outlined" sx={{ borderRadius: "16px" }}>
              <TaskTabs />
            </Card>
          </Grid>
        </Grid>
    </Box>
  );
};

export default TaskManager;
