import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import { Box, Typography } from '@mui/material'

const SimpleCard = () => {
    return (
        <Box
            sx={{
                backgroundColor: "#6941C6",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                padding: "24px",
                gap: "20px",
                alignItems: "flex-start",
                borderRadius: 2
            }}
        >
            <Box
                sx={{
                    flex: "1 1 0",
                    alignSelf: "stretch",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    gap: "2px",
                    display: "inline-flex",
                }}
            >
                <Typography
                    style={{
                        alignSelf: "stretch",
                        color: "white",
                        fontSize: "18px",
                        fontFamily: "Inter",
                        fontWeight: "600",
                        lineHeight: "28px",
                        wordWrap: "break-word",
                    }}
                >
                    Task manager
                </Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Typography
                    sx={{
                        color: "white",
                        fontSize: "14px",
                        fontFamily: "Inter",
                        fontWeight: 400,
                        lineHeight: "20px",
                        wordWrap: "break-word",
                    }}
                >
                    Sort
                </Typography>
                <Box
                    sx={{
                        width: "20px",
                        height: "20px",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    <UnfoldMoreIcon />
                </Box>
            </Box>
        </Box>
    )
}

export default SimpleCard