import { Box, SxProps, Tab } from "@mui/material";
import { StyledTabs } from "./Styledtab";

interface TabItem {
  key: any;
  label: any;
  chip?: any;
  value?: any;
}

interface TabComponentProps {
  tabs: TabItem[];
  value: string | number;
  onChange: any;
//   onChange: () => void;
  orientation?: "horizontal" | "vertical";
  sx?: SxProps;
  layered?: boolean
}

const Tabs: React.FC<TabComponentProps> = ({ tabs, value, onChange, orientation = "horizontal", sx, }) => {
  const hasChip = tabs?.some(tab => tab?.chip);
  const selectedTab = tabs?.find(tab => (tab?.value ?? tab?.key) === value);
  const labelText = typeof selectedTab?.label === "string" ? selectedTab?.label : "";
  const labelLength = labelText?.length; 
  
  const left = labelLength <= 4 ? -10 : labelLength <= 10 ? -7 : -8;
  const width = labelLength <= 4 ? 0.4 : labelLength <= 10 ? 0.6 : 0.5;
  
  return (
    <>
    
    <StyledTabs
      sx={{ mt: 0.5 , ...sx}}
      orientation={orientation}
      variant="scrollable"
      value={value}
      onChange={onChange}
      aria-label="Dynamic Tabs"
      {...(hasChip ===true
        ? { left, width }
        : {})}
      >
      {tabs?.map(({ key, label, chip, value }) => (
        <Tab
          key={key}
          value={value ?? key}
          label={
            <Box display="flex" alignItems="center" gap={1}>
              {label}
              {chip && chip}
            </Box>
          }

          {...a11yProps(key)}
        />
      ))}
    </StyledTabs>
    </>
  );
};

const a11yProps = (index: number) => ({
  id: `tab-${index}`,
  "aria-controls": `tabpanel-${index}`,
});

export default Tabs;
