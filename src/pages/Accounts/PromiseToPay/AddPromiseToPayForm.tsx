import React from 'react';
import {
    Grid,
    Box,
    TextField,
    Typography,
    MenuItem,
    InputLabel,
    FormControl,
    Select,
    Button,
    Paper,
    IconButton,
    FormLabel,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import { Upload as UploadIcon } from 'lucide-react';
import { StyledTextField } from '../../../components/TextField/StyledTextField';
import { StyledSelect } from '../../../components/Select/StyledSelect';
import InvoiceReference from './InvoiceReference';

const AddPromiseToPayForm = () => {
    return (
        <Box >
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <FormLabel>Payable contacts</FormLabel>
                        <StyledSelect size="small" fullWidth>
                            <MenuItem value="Assign to">Assign to</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </StyledSelect>
                    </Grid>

                    {/* <Grid size={{ xs: 12, sm: 6 }}>
                        <FormLabel>Task name</FormLabel>
                        <StyledTextField
                            fullWidth
                            defaultValue="Send notice"
                            variant="outlined"
                        />
                    </Grid> */}

                    <Grid size={{ xs: 12, sm: 6 }}>
                        <FormLabel>Invoice number</FormLabel>
                        <StyledSelect size="small" fullWidth>
                            <MenuItem value="Assign to">Assign to</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </StyledSelect>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                        <FormLabel>Credit control team</FormLabel>
                        <StyledSelect size="small" fullWidth>
                            <MenuItem value="Assign to">Assign to</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </StyledSelect>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                        <FormLabel>Payment Plan</FormLabel>
                        <StyledSelect size="small" fullWidth>
                            <MenuItem value="Assign to">Assign to</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </StyledSelect>
                    </Grid>



                    <Grid size={{ xs: 12, sm: 6 }}>
                        <FormLabel>Payment Method</FormLabel>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker defaultValue={dayjs('2022-04-17')}
                                slotProps={{ textField: { size: 'small', fullWidth: true } }}
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                        <FormLabel>Payment Method</FormLabel>
                        <StyledSelect size="small" fullWidth>
                            <MenuItem value="Assign to">Assign to</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </StyledSelect>
                    </Grid>
                </Grid>
            </Paper>

            <Box mt={3}>
                <Paper variant="outlined" sx={{ borderRadius: 3 }}>
                    <InvoiceReference />
                </Paper>
            </Box>

            <Box mt={3}>
                <Box
                    sx={{
                        borderRadius: 2, // outer rounded
                        border: '1px solid #e0e0e0',
                        // p: 2,
                    }}
                >
                    <Typography variant="subtitle1" fontWeight={600} sx={{ p: 2, }}>
                        Notes
                    </Typography>

                    <Box
                        sx={{
                            borderRadius: 2, // inner rounded (same as outer for visual match)
                            border: '1px solid #e0e0e0',
                            p: 1.5,
                        }}
                    >
                        <Box
                            sx={{
                                borderRadius: 2, // inner rounded (same as outer for visual match)
                                border: '1px solid #e0e0e0',
                                p: 1.5,
                            }}
                        >
                            <TextField
                                placeholder="Type here d"
                                multiline
                                minRows={5}
                                fullWidth
                                variant="standard"
                                InputProps={{
                                    disableUnderline: true,
                                    sx: { fontSize: '0.95rem', },
                                }}
                            />
                        </Box>
                    </Box>
                </Box>

            </Box>

            <Box mt={3}>

                <Box
                    sx={{
                        borderRadius: 2, // outer rounded
                        border: '1px solid #e0e0e0',
                        // p: 2,
                    }}
                >
                    <Typography variant="subtitle1" fontWeight={600} p={2} gutterBottom>
                        Attachment
                    </Typography>

                    <Box
                        sx={{
                            borderRadius: 2, // inner rounded (same as outer for visual match)
                            border: '1px solid #e0e0e0',
                            p: 1.5,
                        }}
                    >
                        <Paper
                            variant="outlined"
                            sx={{
                                borderRadius: 3,
                                textAlign: 'center',
                                py: 4,
                                px: 2,
                                color: 'text.secondary',
                                borderStyle: 'dashed',
                            }}
                        >
                            <IconButton>
                                <UploadIcon size={32} />
                            </IconButton>
                            <Typography>
                                <span style={{ color: '#7E22CE', fontWeight: 500, cursor: 'pointer' }}>Click to upload</span> or drag and drop
                            </Typography>
                            <Typography variant="caption">
                                File must be .pdf, .docx, .png, .jpeg, .jpg, .tiff
                            </Typography>
                        </Paper>
                    </Box>
                </Box>

            </Box>
        </Box>
    );
};

export default AddPromiseToPayForm;
