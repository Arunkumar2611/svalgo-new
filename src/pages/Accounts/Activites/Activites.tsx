import React, { useState } from 'react';
import { FormControlLabel, Switch, Stack, Box } from '@mui/material';

const Activites = () => {
    const [state, setState] = useState({
        callLogs: true,
        emails: false,
        sms: true,
        voiceMessage: true,
        whatsapp: true,
    });

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };
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
                    // padding: "20px",
                    borderTop: "1px solid #E0E0E0",
                    borderTopLeftRadius: "10px",
                }}
            >
                <Box sx={{ p: "20px" }}>
                    <Stack direction="row" spacing={4} alignItems="center">
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={state.callLogs}
                                    onChange={handleChange}
                                    name="callLogs"
                                    color="primary"
                                />
                            }
                            label="Call logs"
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={state.emails}
                                    onChange={handleChange}
                                    name="emails"
                                    color="primary"
                                />
                            }
                            label="Emails"
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={state.sms}
                                    onChange={handleChange}
                                    name="sms"
                                    color="primary"
                                />
                            }
                            label="SMS"
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={state.voiceMessage}
                                    onChange={handleChange}
                                    name="voiceMessage"
                                    color="primary"
                                />
                            }
                            label="Voice message"
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={state.whatsapp}
                                    onChange={handleChange}
                                    name="whatsapp"
                                    color="primary"
                                />
                            }
                            label="WhatsApp"
                        />
                    </Stack>
                </Box>
                <Box
                    sx={{
                        p: "20px",
                        height: "100%",
                        borderTop: "1px solid #E0E0E0",
                        borderTopLeftRadius: "10px",
                    }}
                >
                    d
                </Box>
            </Box>
        </Box>
    )
}

export default Activites