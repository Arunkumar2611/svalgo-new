import { useState } from 'react';
import { Box, Card } from '@mui/material'
import AccountsHeader from './AccountsHeader';
import AccountInsightMenu from './AccountInsightMenu';
import AccountsTabs from './AcountsTab';

const Accounts = () => {
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
      <AccountsHeader
        title="Customer / Order holds"
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
        <AccountInsightMenu drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
      <Box
          sx={{
            flexGrow: 1,
            background: "#fff",
            borderRadius: "10px",
            // p: 2,
            overflowX: "auto",
          }}
        >
          <Card elevation={0} sx={{border: "1px solid #E0E0E0", borderRadius: "10px",}}>
            <AccountsTabs />
          </Card>
        </Box>
      </Box>
      
    </Box>
  )
}

export default Accounts