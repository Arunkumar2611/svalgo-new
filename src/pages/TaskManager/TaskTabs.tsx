import React from "react";
import Tabs from "../../components/Tab/Tabs";
import { Box } from "@mui/material";
import TaskTable from "./TaskTable";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`horizontal-tabpanel-${index}`}
      aria-labelledby={`horizontal-tab-${index}`}
      {...other}
      style={{
        height: "100%",
        overflowY: "auto",
      }}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const TaskTabs = () => {
  const [tabvalue, setTabValue] = React.useState(0);
  const tabhandleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  const tabsData = [
    { key: 0, label: "Tasks" },
    { key: 1, label: "Insights" },
    { key: 2, label: "Recent activities" },
  ];
  return (
    <Box>
      <Box p={3}>
        <Tabs tabs={tabsData} value={tabvalue} onChange={tabhandleChange} />
      </Box>
      <Box>
        <TabPanel value={tabvalue} index={0}>
          <TaskTable />
        </TabPanel>
        <TabPanel value={tabvalue} index={1}>
          <Box p={2}>Insights</Box>
        </TabPanel>
        <TabPanel value={tabvalue} index={2}>
          <Box p={2}>Recent activities</Box>
        </TabPanel>
      </Box>
    </Box>
  );
};

export default TaskTabs;
