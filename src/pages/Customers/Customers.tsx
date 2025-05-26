import { useState } from 'react';
import { Box, Card } from '@mui/material'
import CustomerComponentHeader from './CustomerComponentHeader';
import CustomerInsightMenu from './CustomerInsightMenu';
import CustomerTable from './CustomerTable';

const Customers = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
  const handleRightDrawerClick = () => {
    setRightDrawerOpen(!rightDrawerOpen);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        paddingBottom: "16px",
      }}
    >
      <CustomerComponentHeader
        title="Customer"
        handleClick={handleRightDrawerClick}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 3,
          paddingRight: "16px",
        }}
      >
        <CustomerInsightMenu drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
      <Box
          sx={{
            flexGrow: 1,
            background: "#fff",
            borderRadius: "10px",
            // p: 2,
            overflowX: "auto",
          }}
        >
          <Card elevation={0} sx={{borderRadius: "10px"}}>
            <CustomerTable />
          </Card>
        </Box>
      </Box>
    </Box>
  )
}

export default Customers