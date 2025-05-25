import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    CssBaseline,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Avatar,
    InputBase,
    Paper,
    IconButton,
    useTheme,
    ListItem,
    Tooltip,
    Drawer,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/SpaceDashboard';
import TableRowsIcon from '@mui/icons-material/TableRows';
import PersonIcon from '@mui/icons-material/Person';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PaymentsIcon from '@mui/icons-material/Payments';
import GroupsIcon from '@mui/icons-material/Groups';
import AssignmentIcon from '@mui/icons-material/Assignment';
import InventoryIcon from '@mui/icons-material/Inventory';
import DescriptionIcon from '@mui/icons-material/Description';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { Outlet, Link, useLocation } from 'react-router';
import { red } from '@mui/material/colors';

const drawerWidth = 80;

const navItems = [
    { label: 'Dashboard', icon: <DashboardIcon />, link: '/' },
    { label: 'Task Manager', icon: <TableRowsIcon />, link: '/task-manager' },
    { label: 'Collector dashboard', icon: <TableRowsIcon />, link: '/collector-dashboard' },
    { label: 'Customer', icon: <PersonIcon />, link: '/customers' },
    { label: 'Invoices', icon: <ReceiptIcon />, link: '/invoices' },
    { label: 'Payments', icon: <PaymentsIcon />, link: '/payments' },
    { label: 'Collections', icon: <GroupsIcon />, link: '/collections' },
    { label: 'Claims', icon: <AssignmentIcon />, link: '/claims' },
    { label: 'Customer / Order holds', icon: <InventoryIcon />, link: '/customerOrder' },
    { label: 'Document central', icon: <DescriptionIcon />, link: '/document-central' },
    { label: 'Reports', icon: <AssessmentIcon />, link: '/reports' },
    { label: 'Smart Assistant', icon: <SmartToyIcon />, link: '/assistant' },
];

export default function App() {
    const theme = useTheme();
    const location = useLocation(); // Get the current location

    return (
        <Box sx={{ display: 'flex'}}>
            <CssBaseline />

            {/* Top AppBar */}
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    // height: "78px",
                    bgcolor: 'white',
                    color: 'black',
                    borderBottom: '1px solid #eee',
                    zIndex: theme.zIndex.drawer + 1,
                    border: '1px solid #e0e0e0',

                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="h6" fontWeight={600}>
                        Store/Company
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Paper
                            component="form"
                            sx={{
                                p: '2px 8px',
                                display: 'flex',
                                alignItems: 'center',
                                // width: 250,
                                borderRadius: 2,
                                backgroundColor: '#f9f9f9',
                            }}
                        >
                            <SearchIcon sx={{ mr: 1, color: 'gray' }} />
                            <InputBase placeholder="Search account" sx={{ flex: 1 }} />
                        </Paper>

                        <IconButton>
                            <SettingsIcon />
                        </IconButton>
                        <IconButton>
                            <NotificationsNoneIcon />
                        </IconButton>
                        <Avatar alt="User" src="https://i.pravatar.cc/300" sx={{ width: 32, height: 32 }} />
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Sidebar */}
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                    bgcolor: 'red',
                }}
            >
                <Toolbar />
                <Box sx={{
                    width: drawerWidth,
                    // padding: "12px 16px 12px 16px",
                    // gap: "2px !important",
                    display: "block",
                    flexShrink: 0,
                    // bgcolor: 'red',
                    // height: 'calc(100vh - 78px)',
                    position: 'fixed',

                    top: "78px",
                    // backgroundColor: "red"
                }}>
                    <List
                        sx={{
                            gap: "10px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        disablePadding
                        dense
                    >
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.link;
                            return (
                                <Tooltip title={item.label} placement="right" arrow>
                                    <ListItem
                                        disablePadding
                                        sx={{
                                            flexDirection: "column",
                                            // alignItems: 'center',
                                            // justifyContent: 'center',
                                            justifyContent: "start !important",
                                            // padding: '8px',
                                            gap: "2px",
                                            margin: "0px",
                                            fontStyle: "Inter",
                                            fontSize: "13px",
                                            fontWeight: 400,
                                        }}
                                    >
                                        <ListItemButton
                                            component={Link}
                                            to={item.link}
                                            sx={{
                                                width: "48px",
                                                height: "48px",
                                                backgroundColor: isActive ? "#F9F5FF" : "transparent",
                                                // border: isActive ? '2px solid #6941C6' : '2px solid transparent',
                                                borderRadius: "6px",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                textDecoration: "none",
                                                color: isActive ? "#6941C6" : "grey",
                                                "&:hover": {
                                                    backgroundColor: "#f3e8ff",
                                                },
                                            }}
                                        >
                                            {item.icon}
                                        </ListItemButton>
                                    </ListItem>
                                </Tooltip>
                            );
                        })}
                    </List>
                </Box>
            </Drawer>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    overflowY: 'auto',
                    backgroundColor: '#F5F5F5',
                    // padding: "20px",
                    overflow: "hidden",
                }}
            >
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
}

