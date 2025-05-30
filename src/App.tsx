import { useState } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { Theme } from '@mui/material/styles';
import './App.css';
import Routes from './routes/Routes';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [darkMode] = useState(false);

  // Define the theme
  const theme: Theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
    typography: {
      fontFamily: 'inter',
    },
  });

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
