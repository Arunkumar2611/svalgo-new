import React, { useState } from 'react';
import {
  Paper,
  Box,
  Typography,
  IconButton,
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider,
  Fab,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import FilterDramaIcon from '@mui/icons-material/FilterDrama'; // Placeholder for the kite icon
import CircleIcon from '@mui/icons-material/Circle'; // Placeholder for the green status dot
import ClosedIcon from '@mui/icons-material/Close'; // Placeholder for the red status dot
import ForumIcon from '@mui/icons-material/Forum';

// Define a basic structure for a message
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
}

const PopupAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // Start with chat closed
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Need any help?', sender: 'assistant' },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    console.log('Sending message:', inputValue);
    const newUserMessage: Message = {
      id: String(Date.now()),
      text: inputValue,
      sender: 'user',
    };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputValue('');

    setTimeout(() => {
      const assistantResponse: Message = {
        id: String(Date.now() + 1),
        text: `You said: "${newUserMessage.text}". I am a helpful assistant!`,
        sender: 'assistant',
      };
      setMessages((prevMessages) => [...prevMessages, assistantResponse]);
    }, 1000);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Chat Popup Window (conditionally rendered) */}
      {isOpen && (
        <Paper
          elevation={8}
          sx={{
            position: 'fixed',
            bottom: 24 + 56 + 16, // Position above the FAB (FAB height + margin)
            right: 24,
            width: 360,
            height: 500,
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 1300,
            boxShadow: '0px 5px 15px rgba(0,0,0,0.2)',
          }}
        >
          {/* Header */}
          <Box
            sx={{
              backgroundColor: '#5D3FD3', // Or your specific purple
              color: 'primary.contrastText',
              padding: '10px 16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6" component="div" sx={{ fontSize: '1rem', fontWeight: 'medium' }}>
              Flowone Page Assistant
            </Typography>
            <IconButton onClick={() => setIsOpen(false)} color="inherit" size="small"> {/* Header close button */}
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Content Area (CopilotKit Dev Console, Message List) */}
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#F7F9FC',
              padding: '8px',
            }}
          >
            {/* Message List */}
            <List
              sx={{
                flexGrow: 1,
                overflowY: 'auto',
                padding: '0 4px',
                '&::-webkit-scrollbar': { width: '6px' },
                '&::-webkit-scrollbar-thumb': { backgroundColor: '#ccc', borderRadius: '3px' },
                '&::-webkit-scrollbar-track': { backgroundColor: 'transparent' },
              }}
            >
              {messages.map((msg) => (
                <ListItem
                  key={msg.id}
                  sx={{
                    display: 'flex',
                    justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    p: '4px 0',
                  }}
                >
                  <Paper
                    elevation={1}
                    sx={{
                      p: '8px 12px',
                      borderRadius: msg.sender === 'user' ? '12px 12px 0 12px' : '12px 12px 12px 0',
                      backgroundColor: msg.sender === 'user' ? '#5D3FD3' : 'white',
                      color: msg.sender === 'user' ? 'primary.contrastText' : 'text.primary',
                      maxWidth: '80%',
                      wordBreak: 'break-word',
                      boxShadow: '0px 1px 2px rgba(0,0,0,0.1)',
                    }}
                  >
                    <ListItemText primary={msg.text} sx={{ m: 0, '& .MuiTypography-root': { fontSize: '0.875rem' } }} />
                  </Paper>
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Footer - Input Area */}
          <Divider />
          <Box
            component="form"
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
            sx={{
              p: '8px 12px',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'white',
            }}
          >
            <TextField
              fullWidth
              variant="standard"
              placeholder="Type a message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              multiline
              maxRows={3}
              InputProps={{ disableUnderline: true }}
              sx={{
                mr: 1,
                '& .MuiInputBase-root': { fontSize: '0.875rem', py: '6px' },
              }}
            />
            <IconButton type="submit" color="primary" disabled={inputValue.trim() === ''} sx={{ color: '#5D3FD3' }} >
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      )}

      {/* Floating Action Button to toggle chat visibility */}
      <Fab
        color="primary"
        aria-label={isOpen ? "close chat assistant" : "open chat assistant"}
        onClick={toggleChat}
        sx={{
          position: 'fixed',
          backgroundColor: '#5D3FD3',
          '&:hover': {
            backgroundColor: '#4A32B0', // Optional: A slightly darker shade for hover effect
          },
          bottom: 24,
          right: 24,
          zIndex: 1301, // Ensure FAB is above the chat window if they overlap during animation (though here chat is positioned above)
        }}
      >
        {isOpen ? <CloseIcon /> : <ForumIcon />} 
      </Fab>
    </>
  );
};

export default PopupAssistant;
