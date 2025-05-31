import { Box, Button, Typography } from '@mui/material'

const ComponentHeader = () => {
    return (
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography sx={{ color: '#181D27', fontSize: "24px", fontFamily: 'Inter', fontWeight: '600', lineHeight: "px", wordWrap: 'break-word' }} component={"div"}>Dashboard</Typography>
            {/* <Box sx={{ display: "flex", justifyContent: "space-around", gap: 2 }}>
                <Button variant="outlined" sx={{ background: "whitesmoke", borderRadius: "8px" }}>Add widget</Button>
                <Box sx={{ justifyContent: "flex-end", alignItems: "flex-end", textAlign: "end" }}>
                    <Typography>Total AR Amount - (20 Customers)</Typography>
                    <Typography sx={{ color: "red", fontWeight: 600 }}>$5,123,124.24</Typography>
                </Box>
            </Box> */}
        </Box>
    )
}

export default ComponentHeader