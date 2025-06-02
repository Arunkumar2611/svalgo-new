import { Box, Grid, Tabs, Tab, TextField, MenuItem, Typography } from '@mui/material';
import { useState } from 'react';

const Notes = () => {
    const [tab, setTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };

    return (
        <Box
            sx={{
                border: '1px solid #E0E0E0',
                borderRadius: '10px',
                p: 2,
                bgcolor: '#fff',
                width: '100%',
                boxSizing: 'border-box',
            }}
        >
            <Grid container spacing={2}>
                {/* Left Section */}
                <Grid size={{ xs: 12, sm: 12, md: 4 }} >
                    <Box
                        sx={{
                            height: '100%',
                            border: '1px solid #E0E0E0',
                            borderRadius: '10px',
                            display: 'flex',
                            flexDirection: 'column',
                            p: 2,
                        }}
                    >
                        <TextField
                            placeholder="Search"
                            variant="outlined"
                            size="small"
                            fullWidth
                            InputProps={{
                                sx: {
                                    borderRadius: '8px',
                                },
                            }}
                        />
                    </Box>
                </Grid>

                {/* Right Section */}
                <Grid size={{ xs: 12, sm: 12, md: 8 }}>
                    <Box
                        sx={{
                            height: '100%',
                            border: '1px solid #E0E0E0',
                            borderRadius: '10px',
                            p: 2,
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography variant="body2" fontWeight={500} mb={0.5}>
                                    Email recipient type
                                </Typography>
                                <TextField select fullWidth size="small" defaultValue="">
                                    <MenuItem value="">Select</MenuItem>
                                    <MenuItem value="A">Client</MenuItem>
                                    <MenuItem value="B">Candidate</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography variant="body2" fontWeight={500} mb={0.5}>
                                    Type of thread
                                </Typography>
                                <TextField select fullWidth size="small" defaultValue="">
                                    <MenuItem value="">Select</MenuItem>
                                    <MenuItem value="A">Bug</MenuItem>
                                    <MenuItem value="B">Task</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography variant="body2" fontWeight={500} mb={0.5}>
                                    Priority
                                </Typography>
                                <TextField select fullWidth size="small" defaultValue="">
                                    <MenuItem value="">Select</MenuItem>
                                    <MenuItem value="High">High</MenuItem>
                                    <MenuItem value="Low">Low</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography variant="body2" fontWeight={500} mb={0.5}>
                                    Thread name
                                </Typography>
                                <TextField fullWidth size="small" placeholder="Enter name" />
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Notes;
