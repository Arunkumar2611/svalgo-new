import React, { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import Tabs from "../../../components/Tab/Tabs";

import BusinessContactTable from "./BusinessContacts/BusinessContactsTable";
import ApayContactsTable from "./ApayContacts/ApayContactsTable";
import PayableContactsTable from "./PayableContacts/PayableContactsTable";

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
      style={{ height: "100%", overflowY: "auto" }}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const ContactsTabs = () => {
  const [tabvalue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);

  const tabhandleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setLoading(true);
    setTabValue(newValue);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulate 1 second delay

    return () => clearTimeout(timeout);
  }, [tabvalue]);

  const tabsData = [
    { key: 0, label: "Business Contacts" },
    { key: 1, label: "Apay Contacts" },
    { key: 3, label: "Payable Contacts" },
  ];

  return (
    <Box
      sx={{
        padding: "0px",
        outline: "1px #E0E0E0 solid",
        outlineOffset: "0px",
        borderRadius: "10px",
      }}
    >
      <Box
        sx={{
          padding: "20px",
          borderTop: "1px solid #E0E0E0",
          borderTopLeftRadius: "10px",
        }}
      >
        <Tabs tabs={tabsData} value={tabvalue} onChange={tabhandleChange} />
      </Box>

      <Box p={2} sx={{ minHeight: "300px" }}>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              minHeight: "200px",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <TabPanel value={tabvalue} index={0}>
              <BusinessContactTable />
            </TabPanel>
            <TabPanel value={tabvalue} index={1}>
              <ApayContactsTable />
            </TabPanel>
            <TabPanel value={tabvalue} index={1}>
              <PayableContactsTable />
            </TabPanel>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ContactsTabs;
