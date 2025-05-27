import React, { useState, useEffect, useRef } from 'react';
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
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';
import CircleIcon from '@mui/icons-material/Circle';
import VoiceChatIcon from '@mui/icons-material/VoiceChat';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import AddIcon from '@mui/icons-material/Add';
import { HttpAgent } from '@ag-ui/client';
import { useLocation } from 'react-router';

// TypeScript interface for Speech Recognition
interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

// Define AG-UI compatible message structure
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp?: Date;
  loading?: boolean;
}

// Page context mapping for different routes
const getPageContext = (pathname: string): string => {
  switch (pathname) {
    case '/':
      return 'dashboard';
    default:
      return 'dashboard'; // Default to dashboard for now
  }
};

const PopupAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [agent, setAgent] = useState<HttpAgent | null>(null);
  const [isListening, setIsListening] = useState(false);
  const location = useLocation();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get API base URL from environment variables
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

  // Initialize AG-UI HttpAgent
  useEffect(() => {
    const pageContext = getPageContext(location.pathname);
    
    // Test backend connectivity first
    fetch(`${API_BASE_URL}/health`)
      .then(response => response.json())
      .then(data => {
        console.log('🏥 Backend health check:', data);
        if (data.status === 'healthy') {
          console.log('✅ Backend is connected and healthy - Version:', data.version);
          
          // Create new HttpAgent instance
          const agentInstance = new HttpAgent({
            url: `${API_BASE_URL}/api/awp`, // Backend endpoint
            agentId: "receivables-assistant",
            threadId: `${pageContext}-session-${Date.now()}`,
          });

          // Initialize with system message based on current page
          const systemMessage = getSystemMessage(pageContext);
          agentInstance.messages = [
            {
              id: "system",
              role: "system",
              content: systemMessage,
            }
          ];

          setAgent(agentInstance);
          console.log('🤖 AG-UI HttpAgent initialized for context:', pageContext);
        }
      })
      .catch(error => {
        console.error('❌ Backend health check failed:', error);
        console.log('⚠️ Will create HttpAgent anyway for fallback handling');
        
        // Still create agent for fallback handling
        const agentInstance = new HttpAgent({
          url: `${API_BASE_URL}/api/awp`,
          agentId: "receivables-assistant", 
          threadId: `${pageContext}-session-${Date.now()}`,
        });

        const systemMessage = getSystemMessage(pageContext);
        agentInstance.messages = [
          {
            id: "system",
            role: "system", 
            content: systemMessage,
          }
        ];

        setAgent(agentInstance);
      });

  }, [location.pathname]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Get system message based on page context
  const getSystemMessage = (pageContext: string): string => {
    const baseMessage = "You are an Accounts Receivables AI assistant helping users with their financial operations.";
    
    switch (pageContext) {
      case 'dashboard':
        return `${baseMessage} The user is currently viewing the Dashboard page with AR metrics, aging reports, and key performance indicators. Help them understand their receivables overview, trends, and actionable insights.`;
      case 'customers':
        return `${baseMessage} The user is on the Customers page. Help them with customer information, account status, payment history, and customer-related receivables queries.`;
      case 'invoices':
        return `${baseMessage} The user is viewing the Invoices page. Assist with invoice status, aging, disputes, and invoice management tasks.`;
      case 'payments':
        return `${baseMessage} The user is on the Payments page. Help with payment processing, tracking, reconciliation, and payment-related inquiries.`;
      case 'collections':
        return `${baseMessage} The user is viewing Collections. Assist with collection strategies, overdue accounts, and collection activities.`;
      default:
        return `${baseMessage} Provide general assistance with accounts receivables processes and answer user questions.`;
    }
  };

  // Speech Recognition functionality
  const startListening = () => {
    // Check if browser supports speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      console.warn('Speech recognition not supported in this browser');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    setIsListening(true);

    recognition.onstart = () => {
      console.log('🎤 Speech recognition started');
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      console.log('🎤 Speech recognized:', transcript);
      setInputValue(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error('🎤 Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      console.log('🎤 Speech recognition ended');
      setIsListening(false);
    };

    recognition.start();
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === '' || !agent || isLoading) return;

    const userMessage: Message = {
      id: String(Date.now()),
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    // Add user message to chat
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Add user message to agent history
    agent.messages.push({
      id: userMessage.id,
      role: "user",
      content: userMessage.text,
    });

    try {
      // Test backend connectivity first
      const healthResponse = await fetch(`${API_BASE_URL}/health`);
      if (!healthResponse.ok) {
        throw new Error('Backend health check failed');
      }
      console.log('✅ Backend connectivity confirmed');

      // Create assistant message placeholder
      const assistantMessageId = `assistant-${Date.now()}`;
      let assistantMessage: Message = {
        id: assistantMessageId,
        text: '',
        sender: 'assistant',
        timestamp: new Date(),
        loading: true,
      };

      setMessages((prevMessages) => [...prevMessages, assistantMessage]);

      // Start AG-UI agent run with HttpAgent
      const subscription = agent.legacy_to_be_removed_runAgentBridged({
        runId: `run-${Date.now()}`,
        tools: [],
        context: []
      }).subscribe({
        next: (event: any) => {
          console.log('📨 AG-UI Event received:', event);
          handleAgentEvent(event, assistantMessageId);
        },
        error: (error: any) => {
          console.error('❌ AG-UI HttpAgent Error:', error);
          handleConnectionError(assistantMessageId, error);
        },
        complete: () => {
          console.log('✅ AG-UI stream completed successfully');
          setIsLoading(false);
          setMessages((prevMessages) => 
            prevMessages.map((msg) => 
              msg.id === assistantMessageId 
                ? { ...msg, loading: false }
                : msg
            )
          );
        }
      });

      // Set timeout to prevent hanging
      setTimeout(() => {
        if (isLoading) {
          console.warn('⏰ AG-UI stream timeout, cleaning up...');
          subscription.unsubscribe();
          handleTimeout(assistantMessageId);
        }
      }, 30000);

    } catch (error) {
      console.error('🚨 Failed to send message via AG-UI HttpAgent:', error);
      const assistantMessageId = `assistant-${Date.now()}`;
      setMessages((prevMessages) => [...prevMessages, {
        id: assistantMessageId,
        text: '',
        sender: 'assistant',
        timestamp: new Date(),
        loading: true,
      }]);
      handleConnectionError(assistantMessageId, error);
    }
  };

  // Handle connection errors with fallback responses
  const handleConnectionError = (messageId: string, error: any) => {
    console.error('Connection error:', error);
    const pageContext = getPageContext(location.pathname);
    
    // Check if it's a real connection error vs other issues
    const isConnectionError = error.message?.includes('Failed to fetch') || 
                             error.message?.includes('Network request failed') ||
                             error.message?.includes('Connection refused') ||
                             error.name === 'TypeError';
    
    let fallbackMessage = '';

    if (isConnectionError) {
      // Show connection-specific message
      switch (pageContext) {
        case 'dashboard':
          fallbackMessage = 'Unable to connect to the AR service. As your Dashboard Assistant, I can help you understand AR metrics, aging reports, and KPIs once the connection is restored. Please try again in a moment.';
          break;
        case 'customers':
          fallbackMessage = 'AR service connection issue. For the Customers page, I normally help with customer information, account status, and payment history. Please check the service status and try again.';
          break;
        case 'invoices':
          fallbackMessage = 'Cannot reach the AR service. I would typically assist with invoice status, disputes, and billing processes. Please verify the service is running and retry.';
          break;
        case 'payments':
          fallbackMessage = 'Connection to payments service failed. I usually help with payment processing, reconciliation, and cash flow analysis. Please try again once the service is available.';
          break;
        case 'collections':
          fallbackMessage = 'Collections service unavailable. I normally provide collection strategies and overdue account management. Please check the service status and retry.';
          break;
        default:
          fallbackMessage = 'Unable to connect to the AR backend service. Please verify the backend is running on localhost:8000 and try again. I\'m designed to help with all your Accounts Receivables operations.';
      }
    } else {
      // Show processing error message
      fallbackMessage = `I encountered an issue processing your request: ${error.message}. Please try rephrasing your question or try again in a moment.`;
    }

    setMessages((prevMessages) => 
      prevMessages.map((msg) => 
        msg.id === messageId 
          ? { ...msg, text: fallbackMessage, loading: false }
          : msg
      )
    );
    setIsLoading(false);
  };

  // Handle timeout
  const handleTimeout = (messageId: string) => {
    setIsLoading(false);
    setMessages((prevMessages) => 
      prevMessages.map((msg) => 
        msg.id === messageId 
          ? { ...msg, text: msg.text || 'Request timed out. Please try again.', loading: false }
          : msg
      )
    );
  };

  // Handle AG-UI events and update messages
  const handleAgentEvent = (event: any, messageId: string) => {
    console.log('AG-UI Event received:', event);
    
    switch (event.type) {
      case "RUN_STARTED":
      case "RunStarted":
        console.log('Agent run started:', event);
        break;
        
      case "TEXT_MESSAGE_START":
      case "TextMessageStart":
        console.log('Text message start:', event);
        // Ensure message exists for streaming
        setMessages((prevMessages) => 
          prevMessages.map((msg) => 
            msg.id === messageId 
              ? { ...msg, loading: true, text: msg.text || '' }
              : msg
          )
        );
        break;
        
      case "TEXT_MESSAGE_CONTENT":  
      case "TextMessageContent":
        console.log('Text message content:', event);
        const delta = event.delta || event.content || "";
        if (delta) {
          setMessages((prevMessages) => 
            prevMessages.map((msg) => 
              msg.id === messageId 
                ? { ...msg, text: (msg.text || '') + delta, loading: true }
                : msg
            )
          );
        }
        break;
        
      case "TEXT_MESSAGE_END":
      case "TextMessageEnd":
        console.log('Text message end:', event);
        setMessages((prevMessages) => 
          prevMessages.map((msg) => 
            msg.id === messageId 
              ? { ...msg, loading: false }
              : msg
          )
        );
        break;
        
      case "RUN_FINISHED":
      case "RunFinished":
        console.log('Agent run finished:', event);
        setIsLoading(false);
        break;
        
      case "RUN_ERROR":
      case "RunError":
        console.error('Agent error:', event);
        const errorMsg = event.message || event.error || "An error occurred during processing";
        setMessages((prevMessages) => 
          prevMessages.map((msg) => 
            msg.id === messageId 
              ? { ...msg, text: `Error: ${errorMsg}`, loading: false }
              : msg
          )
        );
        setIsLoading(false);
        break;
        
      default:
        console.log('Unknown event type:', event.type, event);
        // Try to handle as content event for backward compatibility
        if (event.delta || event.content) {
          const content = event.delta || event.content;
          setMessages((prevMessages) => 
            prevMessages.map((msg) => 
              msg.id === messageId 
                ? { ...msg, text: (msg.text || '') + content, loading: true }
                : msg
            )
          );
        }
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleNewChat = () => {
    setMessages([]);
    setInputValue('');
    console.log('🔄 Started new chat session');
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
              backgroundColor: '#5D3FD3',
              color: 'primary.contrastText',
              padding: '12px 16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6" component="div" sx={{ fontSize: '1.1rem', fontWeight: 'medium' }}>
                Ari
              </Typography>
              <Box sx={{ ml: 1, display: 'flex', alignItems: 'center' }}>
                <CircleIcon sx={{ fontSize: '8px', color: agent ? '#4CAF50' : '#F44336', mr: 0.5 }} />
                <Typography variant="caption" sx={{ fontSize: '0.75rem', opacity: 0.8 }}>
                  {getPageContext(location.pathname)}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton 
                onClick={handleNewChat} 
                color="inherit" 
                size="small"
                title="New Chat"
                sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}
              >
                <AddIcon fontSize="small" />
              </IconButton>
              <IconButton onClick={() => setIsOpen(false)} color="inherit" size="small">
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          {/* Content Area */}
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#F7F9FC',
              padding: '16px 0',
            }}
          >
            {/* Date Separator */}
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <Typography 
                variant="caption" 
                sx={{ 
                  backgroundColor: '#E3F2FD', 
                  padding: '4px 12px', 
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  color: '#666'
                }}
              >
                {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </Typography>
            </Box>

            {/* Welcome Message */}
            {messages.length === 0 && (
              <Box sx={{ px: 2, mb: 2 }}>
                <Box
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    padding: '16px',
                    boxShadow: '0px 1px 3px rgba(0,0,0,0.1)',
                  }}
                >
                  <Typography sx={{ fontSize: '1rem', mb: 2 }}>
                    👋 Hey there! I'm Ari, your AR assistant.
                  </Typography>
                  <Typography sx={{ fontSize: '0.9rem', color: '#666', mb: 3 }}>
                    I'm here to help you with your {getPageContext(location.pathname)} insights.
                  </Typography>
                  
                  {/* Action Buttons */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box
                      sx={{
                        border: '1px solid #E0E0E0',
                        borderRadius: '24px',
                        padding: '12px 16px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        '&:hover': { backgroundColor: '#F5F5F5' }
                      }}
                      onClick={() => setInputValue('Show me my AR summary')}
                    >
                      <Typography sx={{ fontSize: '0.9rem' }}>View AR Summary</Typography>
                    </Box>
                    <Box
                      sx={{
                        border: '1px solid #E0E0E0',
                        borderRadius: '24px',
                        padding: '12px 16px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        '&:hover': { backgroundColor: '#F5F5F5' }
                      }}
                      onClick={() => setInputValue('What are my overdue invoices?')}
                    >
                      <Typography sx={{ fontSize: '0.9rem' }}>Check Overdue Items</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}
            {/* Message List */}
            {messages.length > 0 && (
              <List
                sx={{
                  flexGrow: 1,
                  overflowY: 'auto',
                  maxHeight: '300px',
                  padding: '0 16px',
                  '&::-webkit-scrollbar': { width: '4px' },
                  '&::-webkit-scrollbar-thumb': { backgroundColor: '#ccc', borderRadius: '2px' },
                  '&::-webkit-scrollbar-track': { backgroundColor: 'transparent' },
                }}
              >
                {messages.map((msg) => (
                  <ListItem
                    key={msg.id}
                    sx={{
                      display: 'flex',
                      justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                      p: '6px 0',
                    }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        p: '12px 16px',
                        borderRadius: msg.sender === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                        backgroundColor: msg.sender === 'user' ? '#5D3FD3' : 'white',
                        color: msg.sender === 'user' ? 'white' : 'text.primary',
                        maxWidth: '85%',
                        wordBreak: 'break-word',
                        boxShadow: '0px 1px 3px rgba(0,0,0,0.1)',
                        border: msg.sender === 'assistant' ? '1px solid #E0E0E0' : 'none',
                      }}
                    >
                      <ListItemText 
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography sx={{ fontSize: '0.9rem', flexGrow: 1, lineHeight: 1.4 }}>
                              {msg.text || (msg.loading ? 'Ari is typing...' : '')}
                            </Typography>
                            {msg.loading && (
                              <CircularProgress 
                                size={12} 
                                sx={{ ml: 1, color: msg.sender === 'user' ? 'white' : '#5D3FD3' }} 
                              />
                            )}
                          </Box>
                        } 
                        sx={{ m: 0 }} 
                      />
                    </Paper>
                  </ListItem>
                ))}
                <div ref={messagesEndRef} />
              </List>
            )}
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
              placeholder={isLoading ? "Processing..." : "Ask about your accounts receivables..."}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              multiline
              maxRows={3}
              disabled={isLoading}
              InputProps={{ disableUnderline: true }}
              sx={{
                mr: 1,
                '& .MuiInputBase-root': { fontSize: '0.875rem', py: '6px' },
              }}
            />
            <IconButton 
              onClick={startListening}
              disabled={isLoading || isListening}
              sx={{ 
                color: isListening ? '#f44336' : '#5D3FD3',
                mr: 1
              }}
              title={isListening ? "Listening..." : "Voice input"}
            >
              {isListening ? <MicOffIcon /> : <MicIcon />}
            </IconButton>
            <IconButton 
              type="submit" 
              onClick={handleSendMessage}
              color="primary" 
              disabled={inputValue.trim() === '' || isLoading} 
              sx={{ color: '#5D3FD3' }}
            >
              {isLoading ? <CircularProgress size={20} /> : <SendIcon />}
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
        {isOpen ? <ExpandMoreIcon /> : <VoiceChatIcon />} 
      </Fab>
    </>
  );
};

export default PopupAssistant;