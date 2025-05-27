import { Box, Typography } from "@mui/material";
import CustomCard from "../../components/Card/CustomCard";
import CustomToggleTaskbar from "../../components/CustomToggle/CustomToggleTaskbar";
import FollowUpCard from "../../components/StatsCard/FollowUpCard";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";

const TaskManager = () => {

  const TaskmanagerActionItem = (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          color: "white", fontFamily: "Inter",
          fontWeight: 600,
          fontSize: "18px",
          lineHeight: "28px",
          letterSpacing: 0,
        }}
      >
        Sort
      </Typography>
      <Box
        sx={{
          width: "20px",
          height: "20px",
          position: "relative",
          overflow: "hidden",
          color:"white"
        }}
      >
        <UnfoldMoreIcon />
      </Box>
    </Box>
  )


  return (
    <CustomCard
      // titleAsText="Task manager"
      titleAsComponent={
        <Typography
          sx={{
            color: "white", fontFamily: "Inter",
            fontWeight: 600,
            fontSize: "18px",
            lineHeight: "28px",
            letterSpacing: 0,
          }}
        >Task Manager</Typography>}
      action={TaskmanagerActionItem}
      headerBgColor="#6941C6"
      main={
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            padding: "24px",
            gap: "20px",
            flexDirection: "column",
          }}
        >
          <CustomToggleTaskbar />
          <FollowUpCard />
          <FollowUpCard />
          <FollowUpCard />
          <FollowUpCard />
        </Box>
      }
    />
  );
};


export default TaskManager