import * as React from 'react';
import {
    Toolbar,
    ColumnsPanelTrigger,
    FilterPanelTrigger,
} from '@mui/x-data-grid';
import {
    Box,
    IconButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import Menu from '@mui/material/Menu';
import Badge from '@mui/material/Badge';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import FilterListIcon from '@mui/icons-material/FilterList';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';

interface CustomGridToolbarProps {
    title: string;
    onFilterClick?: () => void;
    onExportClick?: () => void;
    onDensityClick: (mode: 'comfortable' | 'standard' | 'compact') => void;
    density: 'comfortable' | 'standard' | 'compact';
    onExport: (format: 'excel' | 'pdf') => void;
}

const CustomGridToolbar: React.FC<CustomGridToolbarProps> = ({ title, onFilterClick, onExportClick, onDensityClick, density, onExport, children }) => {
    const [densityMenuAnchor, setDensityMenuAnchor] = React.useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [exportAnchorEl, setExportAnchorEl] = React.useState(null);

    const [searchValue, setSearchValue] = React.useState('');
    const open = Boolean(anchorEl);
    const densityMenuOpen = Boolean(densityMenuAnchor);
    const openExport = Boolean(exportAnchorEl);

    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => {
        setAnchorEl(null);
        setDensityMenuAnchor(null);
        setExportAnchorEl(null);
    }

    return (
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, py: 2, px: 3 }}>
            <Box sx={{display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center"}}>
                <Typography variant="subtitle1" fontWeight="bold">
                    {title}
                </Typography>
                <Box>{children}</Box>
            </Box>


            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <TextField
                    size="small"
                    placeholder="Search…"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon fontSize="small" />
                            </InputAdornment>
                        ),
                        endAdornment: searchValue && (
                            <InputAdornment position="end">
                                <IconButton size="small" onClick={() => setSearchValue('')}>
                                    <CancelIcon fontSize="small" />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <IconButton onClick={handleMenuOpen}>
                    <MoreVertIcon />
                </IconButton>

                <Menu
                    dense
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <FilterPanelTrigger
                        render={(props, state) => (
                            <MenuItem dense  {...props} onClick={(e) => {
                                props.onClick?.(e);
                                handleMenuClose();
                            }}>
                                <ListItemIcon>
                                    <Badge badgeContent={state.filterCount} color="primary" variant="dot">
                                        <FilterListIcon fontSize="small" />
                                    </Badge>
                                </ListItemIcon>
                                <ListItemText primary="Filters" />
                            </MenuItem>
                        )}
                    />


                    <ColumnsPanelTrigger
                        render={(props, state) => (
                            <MenuItem dense  {...props} onClick={(e) => {
                                props.onClick?.(e);
                                handleMenuClose();
                            }}>
                                <ListItemIcon>
                                    <ViewColumnIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary="Columns" />
                            </MenuItem>
                        )}
                    />

                    <MenuItem dense onClick={(e) => setDensityMenuAnchor(e.currentTarget)}>
                        <ListItemIcon>
                            <DensityMediumIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Density" />
                    </MenuItem>

                    <MenuItem dense onClick={(e) => setExportAnchorEl(e.currentTarget)}>
                        <ListItemIcon>
                            <FileDownloadIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Export" />
                    </MenuItem>
                </Menu>

                <Menu
                    anchorEl={densityMenuAnchor}
                    open={densityMenuOpen}
                    onClose={() => setDensityMenuAnchor(null)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                >
                    {['comfortable', 'standard', 'compact'].map((mode) => (
                        <MenuItem
                            dense
                            key={mode}
                            selected={density === mode}
                            onClick={() => {
                                onDensityClick(mode);
                                handleMenuClose();
                            }}
                        >
                            <ListItemText primary={mode.charAt(0).toUpperCase() + mode.slice(1)} />
                        </MenuItem>
                    ))}
                </Menu>

                <Menu
                    anchorEl={exportAnchorEl}
                    open={openExport}
                    onClose={handleMenuClose}
                    dense
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                >
                    <MenuItem dense onClick={() => { onExport('excel'); handleMenuClose(); }}>
                        Export as Excel
                    </MenuItem>
                    <MenuItem dense onClick={() => { onExport('pdf'); handleMenuClose(); }}>
                        Export as PDF
                    </MenuItem>
                </Menu>
            </div>
        </Toolbar>
    );
}

export default CustomGridToolbar