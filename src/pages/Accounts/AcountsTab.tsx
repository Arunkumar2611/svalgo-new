import React from "react";
import Tabs from "../../components/Tab/Tabs";
import { Box } from "@mui/material";
import InvoiceTabs from "./Invoices/InvoiceTabs";
import PaymentsTabs from "./Payments/PaymentsTabs";
import ClaimsTable from "./Claims/ClaimsTable";
import ContactsTabs from "./Contacts/ContactsTabs";
import Activites from "./Activites/Activites";
import Notes from "./Notes/Notes";
import PromiseToPay from "./PromiseToPay/PromiseToPay";
import SalesOrder from "./SalesOrder/SalesOrder";

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

const AccountsTabs = () => {
  const [tabvalue, setTabValue] = React.useState(0);
  const tabhandleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  const tabsData = [
    { key: 0, label: "Invoices" },
    { key: 1, label: "Payments" },
    { key: 2, label: "Claims" },
    { key: 3, label: "Contacts" },
    { key: 4, label: "Activites" },
    { key: 5, label: "Notes" },
    { key: 6, label: "Documents" },
    { key: 7, label: "Promise to Pay" },
    { key: 8, label: "Sales Order" },
  ];
  return (
    <Box >
      <Box sx={{padding: "20px"}}>
        <Tabs tabs={tabsData} value={tabvalue} onChange={tabhandleChange} />
      </Box>
      <Box>
        <TabPanel value={tabvalue} index={0}>
            <InvoiceTabs />
        </TabPanel>
        <TabPanel value={tabvalue} index={1}>
          <PaymentsTabs />
        </TabPanel>
        <TabPanel value={tabvalue} index={2}>
          <ClaimsTable />
        </TabPanel>
        <TabPanel value={tabvalue} index={3}>
          <ContactsTabs />
        </TabPanel>
        <TabPanel value={tabvalue} index={4}>
          <Activites />
        </TabPanel>
        <TabPanel value={tabvalue} index={5}>
          <Notes />
        </TabPanel>
        <TabPanel value={tabvalue} index={6}>
          <Box p={2}>Documents</Box>
        </TabPanel>
        <TabPanel value={tabvalue} index={7}>
          <PromiseToPay />
        </TabPanel>
        <TabPanel value={tabvalue} index={8}>
          <SalesOrder />
        </TabPanel>
      </Box>
    </Box>
  );
};

export default AccountsTabs;
