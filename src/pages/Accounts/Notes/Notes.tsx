import { Box, Grid } from '@mui/material'

const Notes = () => {
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
                    borderTopRightRadius: "10px",
                }}
            >
                
                <Box
                    sx={{
                        // p: "20px",
                        // height: "100%",
                        // border: "1px solid #E0E0E0",
                        // borderRadius: "10px",
                    }}
                >
                    <Grid container gap={"20px"} >
                        <Grid item xs={12} sm={6}>abc</Grid>
                        <Grid item xs={12} sm={6}>abc</Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    )
}

export default Notes