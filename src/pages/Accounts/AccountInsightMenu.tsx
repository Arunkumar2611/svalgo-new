import {
    Box,
    Typography,
    IconButton,
    useMediaQuery
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ClientCard from "./LeftMenuItems/ClientCard";
import CreditSummaryCard from "./LeftMenuItems/CreditSummaryCard";

interface AccountInsightMenuProps {
    drawerOpen: boolean;
    setDrawerOpen: (open: boolean) => void;
}

const AccountInsightMenu: React.FC<AccountInsightMenuProps> = ({ drawerOpen, setDrawerOpen }) => {
    const isMobile = useMediaQuery("(max-width:600px)");

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
                background: "white",
                borderTopRightRadius: "10px",
                borderRight: "2px solid #eee",
            }}
        >
            <Box sx={{ padding: "12px", overflow: "hidden" }}>
                <Box
                    sx={{
                        position: "absolute",
                        top: 10,
                        left: drawerOpen
                            ? isMobile
                                ? "calc(100vw - 20px)"
                                : "368px"
                            : "7px",
                        zIndex: 4,
                        transition: "left 0.3s ease-in-out",
                    }}
                >
                    <IconButton
                        size="small"
                        onClick={() => setDrawerOpen(!drawerOpen)}
                        sx={{
                            bgcolor: "#fff",
                            boxShadow: 1,
                            "&:hover": { bgcolor: "#eee" },
                        }}
                    >
                        {drawerOpen ? (
                            <ArrowBackIosIcon fontSize="small" />
                        ) : (
                            <ArrowForwardIosIcon fontSize="small" />
                        )}
                    </IconButton>
                </Box>

                <Box
                    sx={{
                        position: "relative",
                        width: drawerOpen ? (isMobile ? "100vw" : 360) : 0,
                        transition: "width 0.3s ease-in-out",
                        overflowX: "hidden",
                        height: "calc(100vh - 10px)",
                        // height: "100vh",
                        background: "#fff",
                        borderTopRightRadius: 2,
                        zIndex: 2,
                    }}
                >
                    {drawerOpen && (
                        <Box
                            sx={{
                                p: 2,
                                height: "100%",
                                overflowY: "auto",
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                                scrollbarWidth: "none",
                                "&::-webkit-scrollbar": {
                                    display: "none",
                                },
                            }}
                        >
                            {/* <Typography variant="h6" fontWeight={600}>
                                Insight
                            </Typography> */}
                            <Box>
                            <ClientCard
                                title="Advanced Biotech and Pharmaceutical Research Organization"
                                account="2324323423"
                                contact="Ethan Samuvel"
                                phone="808-456-0987"
                                lastReview="$50 K"
                                nextReview="$10 K"
                                avatars={[
                                    'https://randomuser.me/api/portraits/women/44.jpg',
                                    'https://randomuser.me/api/portraits/men/45.jpg',
                                    'https://randomuser.me/api/portraits/women/46.jpg',
                                    'https://randomuser.me/api/portraits/women/47.jpg',
                                ]}
                            />
                            </Box>
                            <CreditSummaryCard />
                            <CreditSummaryCard />
                            <CreditSummaryCard />
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    )
}

export default AccountInsightMenu