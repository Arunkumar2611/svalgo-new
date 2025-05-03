import React from "react";
import { Box, Card, Typography, Divider } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import OpenInFullOutlinedIcon from "@mui/icons-material/OpenInFullOutlined";
import CustomToolbar from "../../components/CustomToolbar/CustomToolbar";

const customers = [
  {
    name: "IronClad Fabrications",
    account: "AC#34567",
    amount: "$15,000",
    due: "95 days",
  },
  {
    name: "Summit enterprises",
    account: "AC#36767",
    amount: "$37,000",
    due: "95 days",
  },
  {
    name: "Industrial dynamics",
    account: "AC#56567",
    amount: "$26,000",
    due: "95 days",
  },
  {
    name: "Global engineering solutions",
    account: "AC#56567",
    amount: "$22,000",
    due: "95 days",
  },
  {
    name: "Apex manufacturing",
    account: "AC#56567",
    amount: "$18,000",
    due: "95 days",
  },
  {
    name: "QuantumLogic technology",
    account: "AC#56567",
    amount: "$15,000",
    due: "95 days",
  },
  {
    name: "DataSphere innovations",
    account: "AC#56567",
    amount: "$14,000",
    due: "95 days",
  },
  {
    name: "CodeWave labs",
    account: "AC#56567",
    amount: "$14,000",
    due: "95 days",
  },
  {
    name: "SoftWave solutions",
    account: "AC#56567",
    amount: "$13,000",
    due: "95 days",
  },
];

const OverdueCustomers: React.FC = () => {
  return (
    <Card sx={{ borderRadius: 2, boxShadow: 1, width: "40%" }}>
      <CustomToolbar
        title="Top overdue customer by days"
        subtitle={
          <Box display="flex" alignItems="center" gap={0.5}>
            <Typography fontSize={14} fontWeight={500} color="text.secondary">
              Threshold
            </Typography>
            <Typography fontSize={14} fontWeight={600}>
              $10,850
            </Typography>
            <InfoOutlinedIcon
              fontSize="small"
              sx={{ color: "text.disabled", ml: 0.5 }}
            />
          </Box>
        }
        rightContent={
          <>
            <Typography variant="body2" color="text.secondary">
              All
            </Typography>
            <TuneOutlinedIcon
              fontSize="small"
              sx={{ color: "text.secondary" }}
            />
          </>
        }
        icon={
          <OpenInFullOutlinedIcon
            fontSize="small"
            sx={{ color: "text.secondary" }}
          />
        }
      >
        {customers.map((cust, index) => (
          <Box key={index} mb={index !== customers.length - 1 ? 2 : 0}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography fontWeight={500} fontSize={14}>
                  {cust.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {cust.account}
                </Typography>
              </Box>
              <Box textAlign="left">
                <Typography fontWeight={600} fontSize={14} color="green">
                  {cust.amount}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Due : {cust.due}
                </Typography>
              </Box>
            </Box>
            {index !== customers.length - 1 && <Divider sx={{ mt: 2 }} />}
          </Box>
        ))}
      </CustomToolbar>
    </Card>
  );
};

export default OverdueCustomers;
