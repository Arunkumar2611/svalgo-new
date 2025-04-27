import { useState } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { Theme } from '@mui/material/styles';
// import './App.css';
import Routes from './routes/Routes';


function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Define the theme
  const theme: Theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
    typography: {
      fontFamily: 'Roboto, Arial, sans-serif',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  );
}

export default App;
