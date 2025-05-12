import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Box } from '@mui/material';

export default function CustomToggleButtonGroup() {
    const [alignment, setAlignment] = React.useState('web');

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);
    };

    return (
        <Box>
            <ToggleButtonGroup
                size="small"
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
                
            >
                <ToggleButton sx={{padding: "10px"}} value="web">7D</ToggleButton>
                <ToggleButton sx={{padding: "10px"}} value="android">35D</ToggleButton>
                <ToggleButton sx={{padding: "10px"}} value="ios">65D</ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
}
