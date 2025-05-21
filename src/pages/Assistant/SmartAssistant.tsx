import React, { useState } from 'react';
    import {
        Box,
        Typography,
        Paper,
        Tabs,
        Tab,
        TextField,
        IconButton,
        Avatar,
        Link,
        Icon,
        Button,
    } from '@mui/material';
    import SettingsIcon from '@mui/icons-material/Settings';
    import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined'; // Placeholder for AI icon
    import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined'; // Placeholder for chat icon
    import SendIcon from '@mui/icons-material/Send'; // Send icon

    const SmartAssistant = () => {
        const [mainTabValue, setMainTabValue] = useState(0);
        const [innerTabValue, setInnerTabValue] = useState(2); // Default to Chat Assistant

        const handleMainTabChange = (event: React.SyntheticEvent, newValue: number) => {
            setMainTabValue(newValue);
        };

        const handleInnerTabChange = (event: React.SyntheticEvent, newValue: number) => {
            setInnerTabValue(newValue);
        };

        return (
            <Box sx={{ p: 3, backgroundColor: '#F4F6F8', minHeight: '100vh' }}>
                {/* Top Header Card */}
                <Paper sx={{ p: 3, mb: 3, borderRadius: '12px', boxShadow: '0px 4px 20px rgba(0,0,0,0.05)', background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 2%, rgba(255,255,255,0.3) 6%, rgba(255,255,255,0.0) 15%), white' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <SmartToyOutlinedIcon sx={{ fontSize: 40, color: '#5D3FD3', mr: 2 }} />
                        <Typography variant="h5" component="h1" fontWeight="bold">
                            AI Collection Assistant
                        </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary">
                        Leverage advanced AI to optimize your collection process, predict payment behaviors, and generate personalized collection strategies for each customer segment.
                    </Typography>
                </Paper>

                {/* Main Tabs */}
                <Paper sx={{ mb: 3, borderRadius: '12px', boxShadow: '0px 4px 20px rgba(0,0,0,0.05)', background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 2%, rgba(255,255,255,0.3) 6%, rgba(255,255,255,0.0) 15%), white' }}>
                    <Tabs
                        value={mainTabValue}
                        onChange={handleMainTabChange}
                        indicatorColor="secondary"
                        textColor="secondary"
                        sx={{
                            '& .MuiTabs-flexContainer': {
                                justifyContent: 'flex-start',
                            },
                            '& .MuiTab-root': {
                                textTransform: 'none',
                                fontWeight: '600',
                                fontSize: '1rem',
                                py: 1.5,
                                px:3,
                                color: 'text.secondary',
                                '&.Mui-selected': {
                                    color: 'common.white',
                                    backgroundColor: '#5D3FD3',
                                    borderRadius: '8px 8px 0 0',
                                },
                            },
                            '& .MuiTabs-indicator': {
                                display: 'none', // Hiding default indicator, selection is shown by tab background
                            },
                            borderBottom: 1,
                            borderColor: 'divider'
                        }}
                    >
                        <Tab label="AI Assistant" />
                        <Tab label="Schedule Calls" />
                        <Tab label="Scheduled Calls" />
                    </Tabs>
                </Paper>

                {/* Content based on Main Tab */}
                {mainTabValue === 0 && (
                    <Paper sx={{ p: 0, borderRadius: '12px', boxShadow: '0px 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden', background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 2%, rgba(255,255,255,0.3) 6%, rgba(255,255,255,0.0) 15%), white' }}>
                        {/* Inner Header */}
                        <Box sx={{ p: 2.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: 1, borderColor: 'divider' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <SmartToyOutlinedIcon sx={{ fontSize: 28, color: '#5D3FD3', mr: 1.5 }} />
                                <Box>
                                    <Typography variant="h6" component="h2" fontWeight="600">
                                        AI Collection Assistant
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        Powered by Flowone AI to optimize your collection strategies using machine learning and behavioral analysis
                                    </Typography>
                                </Box>
                            </Box>
                            <IconButton>
                                <SettingsIcon />
                            </IconButton>
                        </Box>

                        {/* Inner Tabs */}
                        <Box sx={{ px: 2.5, pt: 2, borderBottom: 1, borderColor: 'divider', backgroundColor: '#F9FAFB' }}>
                            <Tabs
                                value={innerTabValue}
                                onChange={handleInnerTabChange}
                                indicatorColor="secondary"
                                sx={{
                                    minHeight: 'auto',
                                    '& .MuiTab-root': {
                                        textTransform: 'none',
                                        fontWeight: '500',
                                        fontSize: '0.875rem',
                                        py: 1,
                                        px: 2,
                                        minHeight: 'auto',
                                        color: 'text.secondary',
                                        borderRadius: '6px 6px 0 0',
                                        mr: 0.5,
                                        '&.Mui-selected': {
                                            color: '#5D3FD3',
                                            backgroundColor: 'white',
                                            border: 1,
                                            borderColor: 'divider',
                                            borderBottomColor: 'white',
                                            marginBottom: '-1px', // to make selected tab overlap the bottom border
                                        },
                                        '&:not(.Mui-selected):hover': {
                                            backgroundColor: 'action.hover'
                                        }
                                    },
                                    '& .MuiTabs-indicator': {
                                        backgroundColor: '#5D3FD3',
                                        height: '3px'
                                    },
                                }}
                            >
                                <Tab label="Suggested Actions" />
                                <Tab label="AI Insights" />
                                <Tab label="Chat Assistant" />
                            </Tabs>
                        </Box>

                        {/* Content based on Inner Tab */}
                        {innerTabValue === 2 && ( // Chat Assistant
                            <Box sx={{ p: 2.5, display: 'flex', flexDirection: 'column', height: '400px' /* Adjust height as needed */ }}>
                                <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                                        <Avatar sx={{ bgcolor: '#5D3FD3', color: 'white', width: 32, height: 32, mr: 1.5, mt: 0.5 }}>
                                            <SmartToyOutlinedIcon fontSize="small" />
                                        </Avatar>
                                        <Paper sx={{ p: 1.5, borderRadius: '8px', bgcolor: '#5D3FD3', maxWidth: '70%' }}>
                                            <Typography variant="body2" sx={{ color: 'common.white' }}>
                                                How can I help you optimize your accounts receivable processes today?
                                            </Typography>
                                        </Paper>
                                    </Box>
                                    {/* Add more chat messages here if needed */}
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', borderTop: 1, borderColor: 'divider', pt: 2 }}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        placeholder="Ask about collection strategies, payment trends..."
                                        size="small"
                                        sx={{
                                            mr: 1,
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '8px',
                                                backgroundColor: 'white',
                                            }
                                        }}
                                    />
                                    <IconButton sx={{ color: 'white', bgcolor: '#5D3FD3', borderRadius: '8px', '&:hover': { bgcolor: '#4B2F9D', color: 'white' } }}>
                                        <SendIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        )}
                        {innerTabValue === 0 && ( // Suggested Actions
                            <Box sx={{ p: 2.5 }}>
                                <Typography>Suggested Actions Content</Typography>
                            </Box>
                        )}
                        {innerTabValue === 1 && ( // AI Insights
                            <Box sx={{ p: 2.5 }}>
                                <Typography>AI Insights Content</Typography>
                            </Box>
                        )}


                        {/* Footer for Chat Assistant Card */}
                        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: 1, borderColor: 'divider', backgroundColor: '#F9FAFB' }}>
                            <Typography variant="caption" color="text.secondary">
                                Powered by Flowone AI
                            </Typography>
                            <Link href="#" variant="caption" fontWeight="bold" sx={{textDecoration: 'none'}}>
                                Full AI Dashboard
                            </Link>
                        </Box>
                    </Paper>
                )}
                {mainTabValue === 1 && (
                    <Paper sx={{ p: 3, borderRadius: '12px', boxShadow: '0px 4px 20px rgba(0,0,0,0.05)', background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 2%, rgba(255,255,255,0.3) 6%, rgba(255,255,255,0.0) 15%), white' }}>
                        <Typography variant="h6">Schedule Calls Content</Typography>
                        {/* Add content for Schedule Calls tab here */}
                    </Paper>
                )}
                {mainTabValue === 2 && (
                    <Paper sx={{ p: 3, borderRadius: '12px', boxShadow: '0px 4px 20px rgba(0,0,0,0.05)', background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 2%, rgba(255,255,255,0.3) 6%, rgba(255,255,255,0.0) 15%), white' }}>
                        <Typography variant="h6">Scheduled Calls Content</Typography>
                        {/* Add content for Scheduled Calls tab here */}
                    </Paper>
                )}
            </Box>
        );
    };

    export default SmartAssistant;