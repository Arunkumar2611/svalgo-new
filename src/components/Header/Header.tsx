import * as React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import { AppBar, Avatar, Box, IconButton, Toolbar, Typography, Menu, MenuItem, Divider, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import Image from '../Image/Image';
// import HeaderIcons from './HeaderIcons';
// import ServicesIconList from './ServicesIconList';

interface HeaderProps {
    openSidebar?: boolean;
}

export default function Header({ openSidebar }: HeaderProps) {
    const theme = useTheme();
    const navigate = useNavigate();

    const companyInformation = { companyName: 'Your Company Name' }; // Replace with actual data
    const companyLogo = ''; // Replace with actual logo URL
    const currentUserName = 'John Doe'; // Replace with actual user name

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <div className="custom-menu nav_main__menu">
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <AppBar
                    position="fixed"
                    elevation={0}
                    sx={{
                        width: '100%',
                        zIndex: '1100',
                        height: '55px',
                        maxHeight: '55px',
                        background: '#fff',
                        transition: theme.transitions.create(['margin', 'width'], {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.leavingScreen,
                        }),
                        ...(typeof openSidebar === 'undefined' && { width: '100%' }),
                    }}
                >
                    <Toolbar
                        sx={{
                            backgroundColor: theme.palette.primary.light,
                            color: theme.palette.primary.main,
                            pl: '12px',
                            minHeight: '55px !important',
                            justifyContent: 'space-between',
                            width: '98%',
                        }}
                    >
                        <Box display={'flex'}>
                            {companyLogo && <Image alt="logo" src={companyLogo} sx={{ width: '30px' }} />}
                            <Typography
                                variant="body1"
                                title={companyInformation.companyName}
                                className="textOverflow"
                                sx={{ textTransform: 'capitalize', color: '#000', fontSize: '17px', pl: 2 }}
                            >
                                {companyInformation.companyName}
                            </Typography>
                        </Box>

                        <Stack gap={1} direction={'row'} alignItems={'center'}>
                            {/* <HeaderIcons /> */}
                            {/* <ServicesIconList /> */}

                            <IconButton
                                size="small"
                                edge="end"
                                color="inherit"
                                aria-label="open drawer"
                                sx={{
                                    p: 0.65,
                                    borderRadius: '50px !important',
                                    '&:hover': {
                                        backgroundColor: '#eee',
                                    },
                                }}
                            >
                                <Avatar
                                    sx={{
                                        width: '25px',
                                        height: '25px',
                                        fontSize: '.8rem',
                                        textTransform: 'capitalize',
                                        color: '#000',
                                        background: theme.palette.primary.main,
                                    }}
                                >
                                    {currentUserName[0]}
                                </Avatar>
                            </IconButton>
                        </Stack>

                        <Menu
                            id="basic-menu"
                            className="profile--menu"
                            open={false} // Menu is not functional in this simplified version
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <Typography
                                className="subtitle--font"
                                gutterBottom
                                sx={{ px: 2, color: 'var(--subtitle-font)' }}
                            >
                                Account
                            </Typography>
                            <MenuItem sx={{ gap: 1 }}>
                                <Avatar
                                    sx={{
                                        width: '25px',
                                        height: '25px',
                                        fontSize: '.8rem',
                                        textTransform: 'capitalize',
                                        color: theme.palette.primary.light,
                                        background: theme.palette.primary.main,
                                    }}
                                >
                                    {currentUserName[0]}
                                </Avatar>
                                <Typography
                                    variant="caption"
                                    title={currentUserName}
                                    className="textOverflow"
                                    sx={{ textTransform: 'capitalize', color: '#000', fontSize: '13px' }}
                                >
                                    {currentUserName}
                                </Typography>
                            </MenuItem>
                            <Divider sx={{ my: '4px !important' }} />
                            <MenuItem onClick={handleLogout}>
                                <LogoutIcon sx={{ fontSize: '1rem', marginRight: '8px' }} /> Logout
                            </MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
}
