import React from "react";
import { Box, Typography, Chip, Checkbox, IconButton } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const FollowUpCard = () => {
    return (
        <Box
            sx={{
                width: "auto",
                height: "100%",
                padding: "24px",
                backgroundColor: "white",
                boxShadow: "0px 1px 2px rgba(10, 12.67, 18, 0.05)",
                borderRadius: "12px",
                border: "1px solid #E9EAEB",
                display: "inline-flex",
                justifyContent: "flex-start",
                overflow: "hidden",
                alignItems: "flex-start",
                gap: "16px",
            }}
        >
            <Box
                sx={{
                    flex: "1 1 0",
                    display: "inline-flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: "16px",
                }}
            >
                {/* Date */}
                <Box
                    sx={{
                        alignSelf: "stretch",
                        display: "inline-flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "16px",
                    }}
                >
                    <Typography
                        sx={{
                            flex: "1 1 0",
                            color: "#181D27",
                            fontSize: "14px",
                            fontFamily: "Inter",
                            fontWeight: 600,
                            lineHeight: "20px",
                            wordWrap: "break-word",
                        }}
                    >
                        Aug 11 2025
                    </Typography>
                </Box>

                {/* Title and Chip */}
                <Box
                    sx={{
                        alignSelf: "stretch",
                        display: "inline-flex",
                        justifyContent: "flex-start",
                        alignItems: "flex-end",
                        gap: "16px",
                    }}
                >
                    <Box
                        sx={{
                            flex: "1 1 0",
                            display: "inline-flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            gap: "8px",
                        }}
                    >
                        <Box
                            sx={{
                                alignSelf: "stretch",
                                display: "inline-flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                gap: "16px",
                            }}
                        >
                            <Typography
                                sx={{
                                    flex: "1 1 0",
                                    color: "#181D27",
                                    fontSize: "18px",
                                    fontFamily: "Inter",
                                    fontWeight: 600,
                                    lineHeight: "28px",
                                    wordWrap: "break-word",
                                }}
                            >
                                Kimberly-Clark
                            </Typography>
                            <Box
                                sx={{
                                    padding: "4px 12px",
                                    backgroundColor: "#FEF3F2",
                                    borderRadius: "16px",
                                    border: "1px solid #FECDCA",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: "#B42318",
                                        fontSize: "14px",
                                        fontFamily: "Inter",
                                        fontWeight: 500,
                                        lineHeight: "20px",
                                        textAlign: "center",
                                    }}
                                >
                                    A1
                                </Typography>
                            </Box>
                        </Box>

                        {/* Account Number */}
                        <Box
                            sx={{
                                alignSelf: "stretch",
                                display: "inline-flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                gap: "8px",
                            }}
                        >
                            <Typography
                                sx={{
                                    flex: "1 1 0",
                                    color: "#717680",
                                    fontSize: "14px",
                                    fontFamily: "Inter",
                                    fontWeight: 600,
                                    lineHeight: "20px",
                                    wordWrap: "break-word",
                                }}
                            >
                                AC#3456
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                {/* Follow-up Row */}
                <Box
                    sx={{
                        alignSelf: "stretch",
                        display: "inline-flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: "12px",
                    }}
                >
                    <Checkbox
                        sx={{
                            width: "24px",
                            height: "24px",
                            borderRadius: "8px",
                            // border: '1px solid #CFD3D4',
                            padding: 0,
                        }}
                    />
                    <Typography
                        sx={{
                            color: "#717680",
                            fontSize: "16px",
                            fontFamily: "Inter",
                            fontWeight: 600,
                            lineHeight: "24px",
                            wordWrap: "break-word",
                        }}
                    >
                        Follow-up call with Kimberly-Clark
                    </Typography>
                    <PhoneIcon sx={{ width: "24px", height: "24px", color: "#A4A7AE" }} />
                </Box>
            </Box>

            {/* Three Dots Menu Icon */}
            <Box
                sx={{
                    display: "inline-flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                }}
            >
                <IconButton sx={{ padding: 0 }}>
                    <MoreVertIcon
                        sx={{ width: "20px", height: "20px", color: "#A4A7AE" }}
                    />
                </IconButton>
            </Box>
        </Box>
    );
};

export default FollowUpCard;
