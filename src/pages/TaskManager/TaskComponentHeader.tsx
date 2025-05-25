import { Box, Button, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';

interface TaskComponentHeaderProps {
  title: string;
  handleClick: () => void;
}

const TaskComponentHeader = ({ title, handleClick }: TaskComponentHeaderProps) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography  sx={{ color: '#181D27',fontSize:24, fontWeight: 600, wordWrap: 'break-word' }}>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button onClick={handleClick} startIcon={ <Add className='iconBtnCss' />} variant="outlined" size="small" sx={{ background: 'whitesmoke',color:'#414651' ,borderRadius: 1.5 ,borderColor:'#414651' }}>
          Add widget
        </Button>
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="caption">Total AR Amount - (20 Customers)</Typography>
          <Typography variant="caption" sx={{ color: 'red', fontWeight: 600 ,display:'block' }}>
            $5,123,124.24
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default TaskComponentHeader;