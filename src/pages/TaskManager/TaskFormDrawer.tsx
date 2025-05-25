import React from "react";
import CustomDrawer from "../../components/Drawer/Drawer";
import { Box, IconButton } from "@mui/material";
import TaskForm from "./TaskForm";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";

const TaskFormDrawer = ({ toggleOpen }: any) => {
  return (
    <CustomDrawer
      drawerTitle={"Create a task"}
      toggleDrawer={toggleOpen}
      isArrow
      size="md"
      headerAction={
        <IconButton size="small" sx={{mr:2}}>
          <OpenInFullIcon sx={{ color: "#A4A7AE",fontSize:'20px' }} />
        </IconButton>
      }
    >
      <Box>
        <TaskForm toggleOpen={toggleOpen} />
      </Box>
    </CustomDrawer>
  );
};

export default TaskFormDrawer;
