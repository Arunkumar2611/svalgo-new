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
import { Outlet, Link, useLocation } from 'react-router'; // Import useLocation

const drawerWidth = 110;

const navItems = [
    { label: 'Dashboard', icon: <DashboardIcon />, link: '/' },
    { label: 'Collector dashboard', icon: <TableRowsIcon />, link: '/collector-dashboard' },
    { label: 'Customer', icon: <PersonIcon />, link: '/customers' },
    { label: 'Invoices', icon: <ReceiptIcon />, link: '/invoices' },
    { label: 'Payments', icon: <PaymentsIcon />, link: '/payments' },
    { label: 'Collections', icon: <GroupsIcon />, link: '/collections' },
    { label: 'Claims', icon: <AssignmentIcon />, link: '/claims' },
    { label: 'Customer / Order holds', icon: <InventoryIcon />, link: '/customerOrder' },
    { label: 'Document central', icon: <DescriptionIcon />, link: '/document-central' },
    { label: 'Reports', icon: <AssessmentIcon />, link: '/reports' },
];

export default function App() {
    const theme = useTheme();
    const location = useLocation(); // Get the current location

    return (
        <>
            <CssBaseline />

            {/* Top AppBar */}
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    bgcolor: 'white',
                    color: 'black',
                    borderBottom: '1px solid #eee',
                    zIndex: theme.zIndex.drawer + 1,
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
                                width: 250,
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
            <Box
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    bgcolor: 'white',
                    height: 'calc(100vh - 64px)', // Adjust height to account for the AppBar
                    position: 'fixed',
                    top: 64, // Offset for the AppBar
                    borderRight: '1px solid #eee',
                    overflowY: 'auto', // Enable scrolling for the sidebar
                    overflow: 'overlay', // Prevent scrollbar from affecting layout
                    pt: 2,
                }}
            >
                <List disablePadding dense>
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.link; // Check if the current route matches the item's link
                        return (
                            <Box key={item.label} sx={{ px: 2, py: 0.5 }}>
                                <ListItemButton
                                    component={Link} // Use Link as the component
                                    to={item.link}
                                    sx={{
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        borderRadius: 2,
                                        mx: 1, // Fixed horizontal margin for consistent spacing
                                        px: 2, // Add horizontal padding for consistent spacing
                                        py: 1,
                                        bgcolor: isActive ? 'rgba(104, 58, 183, 0.1)' : 'transparent',
                                        '&:hover': {
                                            bgcolor: 'rgba(104, 58, 183, 0.1)',
                                        },
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 'auto',
                                            color: isActive ? '#693ab7' : 'grey',
                                        }}
                                    >
                                        {item.icon}
                                    </ListItemIcon>
                                </ListItemButton>

                                <ListItemText
                                    primary={item.label}
                                    sx={{
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                    }}
                                    primaryTypographyProps={{
                                        fontSize: 12,
                                        fontWeight: isActive ? 600 : 400,
                                        color: isActive ? '#693ab7' : 'grey',
                                    }}
                                />
                            </Box>
                        );
                    })}
                </List>
            </Box>

            {/* Main Content Area */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    ml: `${drawerWidth}px`,
                    p: 3,
                    pt: 10,
                    height: `calc(100vh - 64px)`,
                    overflowY: 'auto',
                    backgroundColor: '#fafafa',
                }}
            >
                <Outlet />
            </Box>
        </>
    );
}

