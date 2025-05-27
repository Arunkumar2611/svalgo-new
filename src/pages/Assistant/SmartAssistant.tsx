import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    Typography,
    Paper,
    Tabs,
    Tab,
    TextField,
    IconButton,
    Avatar,
    Link,
    Icon,
    Button,
    List,
    ListItem,
    CircularProgress,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import SendIcon from '@mui/icons-material/Send';

// Message interface
interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp?: Date;
  loading?: boolean;
}

const SmartAssistant = () => {
    const [mainTabValue, setMainTabValue] = useState(0);
    const [innerTabValue, setInnerTabValue] = useState(2);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Get API base URLs from environment variables
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
    const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL || 'http://localhost:8001';
    
    // Initialize with welcome message
    useEffect(() => {
        setMessages([{
            id: 'welcome-1', 
            text: 'Hello! I\'m your AI assistant. How can I help you optimize your accounts receivable processes today?', 
            sender: 'assistant',
            timestamp: new Date()
        }]);
    }, []);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async () => {
        if (inputValue.trim() === '' || isLoading) return;

        const userMessage: ChatMessage = {
            id: String(Date.now()),
            text: inputValue.trim(),
            sender: 'user',
            timestamp: new Date(),
        };

        // Add user message immediately
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const assistantMessageId = `assistant-${Date.now()}`;
            
            // Add assistant placeholder
            setMessages((prevMessages) => [...prevMessages, {
                id: assistantMessageId,
                text: '',
                sender: 'assistant',
                timestamp: new Date(),
                loading: true,
            }]);

            // Make direct SSE request
            const response = await fetch(`${CHAT_API_URL}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    threadId: `chat-session-${Date.now()}`,
                    runId: `run-${Date.now()}`,
                    messages: [
                        { role: 'system', content: 'You are a helpful AI assistant.' },
                        { role: 'user', content: userMessage.text }
                    ]
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let assistantText = '';
            let currentMessageId = assistantMessageId;

            if (reader) {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    
                    const chunk = decoder.decode(value, { stream: true });
                    const lines = chunk.split('\n');
                    
                    for (const line of lines) {
                        if (line.startsWith('data: ')) {
                            try {
                                const eventData = JSON.parse(line.slice(6));
                                
                                if (eventData.type === 'TEXT_MESSAGE_START' && eventData.messageId) {
                                    currentMessageId = eventData.messageId;
                                } else if (eventData.type === 'TEXT_MESSAGE_CONTENT') {
                                    assistantText += eventData.delta || '';
                                    setMessages((prevMessages) => 
                                        prevMessages.map((msg) => 
                                            msg.id === assistantMessageId 
                                                ? { ...msg, text: assistantText, loading: true }
                                                : msg
                                        )
                                    );
                                } else if (eventData.type === 'TEXT_MESSAGE_END') {
                                    setMessages((prevMessages) => 
                                        prevMessages.map((msg) => 
                                            msg.id === assistantMessageId 
                                                ? { ...msg, loading: false }
                                                : msg
                                        )
                                    );
                                }
                            } catch (e) {
                                // Skip parse errors for incomplete chunks
                            }
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Failed to send message:', error);
            setMessages((prevMessages) => [...prevMessages, {
                id: `error-${Date.now()}`,
                text: `Error: ${(error as Error).message}. Please try again.`,
                sender: 'assistant',
                timestamp: new Date(),
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleMainTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setMainTabValue(newValue);
    };

    const handleInnerTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setInnerTabValue(newValue);
    };

    return (
        <Box sx={{ p: 3, backgroundColor: '#F4F6F8', minHeight: '100vh' }}>
            {/* Top Header Card */}
            <Paper sx={{ p: 3, mb: 3, borderRadius: '12px', boxShadow: '0px 4px 20px rgba(0,0,0,0.05)' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <SmartToyOutlinedIcon sx={{ fontSize: 40, color: '#5D3FD3', mr: 2 }} />
                    <Typography variant="h5" component="h1" fontWeight="bold">
                        AI Collection Assistant
                    </Typography>
                </Box>
                <Typography variant="body1" color="text.secondary">
                    Leverage advanced AI to optimize your collection process, predict payment behaviors, and generate personalized collection strategies for each customer segment.
                </Typography>
            </Paper>

            {/* Main Tabs */}
            <Paper sx={{ mb: 3, borderRadius: '12px', boxShadow: '0px 4px 20px rgba(0,0,0,0.05)' }}>
                <Tabs
                    value={mainTabValue}
                    onChange={handleMainTabChange}
                    indicatorColor="secondary"
                    textColor="secondary"
                    sx={{
                        '& .MuiTabs-flexContainer': {
                            justifyContent: 'flex-start',
                        },
                        '& .MuiTab-root': {
                            textTransform: 'none',
                            fontWeight: '600',
                            fontSize: '1rem',
                            py: 1.5,
                            px:3,
                            color: 'text.secondary',
                            '&.Mui-selected': {
                                color: 'common.white',
                                backgroundColor: '#5D3FD3',
                                borderRadius: '8px 8px 0 0',
                            },
                        },
                        '& .MuiTabs-indicator': {
                            display: 'none',
                        },
                        borderBottom: 1,
                        borderColor: 'divider'
                    }}
                >
                    <Tab label="AI Assistant" />
                    <Tab label="Schedule Calls" />
                    <Tab label="Scheduled Calls" />
                </Tabs>
            </Paper>

            {/* Content based on Main Tab */}
            {mainTabValue === 0 && (
                <Paper sx={{ p: 0, borderRadius: '12px', boxShadow: '0px 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                    {/* Inner Header */}
                    <Box sx={{ p: 2.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: 1, borderColor: 'divider' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <SmartToyOutlinedIcon sx={{ fontSize: 28, color: '#5D3FD3', mr: 1.5 }} />
                            <Box>
                                <Typography variant="h6" component="h2" fontWeight="600">
                                    AI Collection Assistant
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Powered by Flowone AI to optimize your collection strategies using machine learning and behavioral analysis
                                </Typography>
                            </Box>
                        </Box>
                        <IconButton>
                            <SettingsIcon />
                        </IconButton>
                    </Box>

                    {/* Inner Tabs */}
                    <Box sx={{ px: 2.5, pt: 2, borderBottom: 1, borderColor: 'divider', backgroundColor: '#F9FAFB' }}>
                        <Tabs
                            value={innerTabValue}
                            onChange={handleInnerTabChange}
                            indicatorColor="secondary"
                            sx={{
                                minHeight: 'auto',
                                '& .MuiTab-root': {
                                    textTransform: 'none',
                                    fontWeight: '500',
                                    fontSize: '0.875rem',
                                    py: 1,
                                    px: 2,
                                    minHeight: 'auto',
                                    color: 'text.secondary',
                                    borderRadius: '6px 6px 0 0',
                                    mr: 0.5,
                                    '&.Mui-selected': {
                                        color: '#5D3FD3',
                                        backgroundColor: 'white',
                                        border: 1,
                                        borderColor: 'divider',
                                        borderBottomColor: 'white',
                                        marginBottom: '-1px',
                                    },
                                    '&:not(.Mui-selected):hover': {
                                        backgroundColor: 'action.hover'
                                    }
                                },
                                '& .MuiTabs-indicator': {
                                    backgroundColor: '#5D3FD3',
                                    height: '3px'
                                },
                            }}
                        >
                            <Tab label="Suggested Actions" />
                            <Tab label="AI Insights" />
                            <Tab label="Chat Assistant" />
                        </Tabs>
                    </Box>

                    {/* Content based on Inner Tab */}
                    {innerTabValue === 2 && ( // Chat Assistant
                        <Box sx={{ p: 2.5, display: 'flex', flexDirection: 'column', height: '500px' }}>
                            <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2, pr: 1 }}>
                                {messages.map((message) => (
                                    <Box 
                                        key={message.id} 
                                        sx={{ 
                                            display: 'flex', 
                                            alignItems: 'flex-start', 
                                            mb: 2,
                                            flexDirection: message.sender === 'user' ? 'row-reverse' : 'row'
                                        }}
                                    >
                                        <Avatar sx={{ 
                                            bgcolor: message.sender === 'user' ? '#2E7D32' : '#5D3FD3', 
                                            color: 'white', 
                                            width: 32, 
                                            height: 32, 
                                            mx: 1.5, 
                                            mt: 0.5 
                                        }}>
                                            {message.sender === 'user' ? 
                                                message.text.charAt(0).toUpperCase() :
                                                <SmartToyOutlinedIcon fontSize="small" />
                                            }
                                        </Avatar>
                                        <Paper sx={{ 
                                            p: 1.5, 
                                            borderRadius: '12px', 
                                            bgcolor: message.sender === 'user' ? '#E8F5E8' : '#5D3FD3', 
                                            maxWidth: '75%',
                                            position: 'relative'
                                        }}>
                                            <Typography 
                                                variant="body2" 
                                                sx={{ 
                                                    color: message.sender === 'user' ? '#1B5E20' : 'white',
                                                    whiteSpace: 'pre-wrap',
                                                    wordBreak: 'break-word'
                                                }}
                                            >
                                                {message.text}
                                            </Typography>
                                            {message.loading && (
                                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                                    <CircularProgress 
                                                        size={16} 
                                                        sx={{ 
                                                            color: message.sender === 'user' ? '#2E7D32' : 'white',
                                                            mr: 1 
                                                        }} 
                                                    />
                                                    <Typography 
                                                        variant="caption" 
                                                        sx={{ 
                                                            color: message.sender === 'user' ? '#2E7D32' : 'rgba(255,255,255,0.7)',
                                                            fontStyle: 'italic'
                                                        }}
                                                    >
                                                        Thinking...
                                                    </Typography>
                                                </Box>
                                            )}
                                            {message.timestamp && (
                                                <Typography 
                                                    variant="caption" 
                                                    sx={{ 
                                                        color: message.sender === 'user' ? 'rgba(27,94,32,0.6)' : 'rgba(255,255,255,0.6)',
                                                        display: 'block',
                                                        mt: 0.5,
                                                        fontSize: '0.7rem'
                                                    }}
                                                >
                                                    {message.timestamp.toLocaleTimeString()}
                                                </Typography>
                                            )}
                                        </Paper>
                                    </Box>
                                ))}
                                <div ref={messagesEndRef} />
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', borderTop: 1, borderColor: 'divider', pt: 2 }}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    placeholder="Ask about collection strategies, payment trends..."
                                    size="small"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSendMessage();
                                        }
                                    }}
                                    disabled={isLoading}
                                    sx={{
                                        mr: 1,
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '8px',
                                            backgroundColor: 'white',
                                        }
                                    }}
                                />
                                <IconButton 
                                    onClick={handleSendMessage}
                                    disabled={isLoading || inputValue.trim() === ''}
                                    sx={{ 
                                        color: 'white', 
                                        bgcolor: '#5D3FD3', 
                                        borderRadius: '8px', 
                                        '&:hover': { bgcolor: '#4B2F9D', color: 'white' },
                                        '&:disabled': { bgcolor: '#ccc', color: '#666' }
                                    }}
                                >
                                    <SendIcon />
                                </IconButton>
                            </Box>
                        </Box>
                    )}
                    {innerTabValue === 0 && ( // Suggested Actions
                        <Box sx={{ p: 2.5 }}>
                            <Typography>Suggested Actions Content</Typography>
                        </Box>
                    )}
                    {innerTabValue === 1 && ( // AI Insights
                        <Box sx={{ p: 2.5 }}>
                            <Typography>AI Insights Content</Typography>
                        </Box>
                    )}

                    {/* Footer for Chat Assistant Card */}
                    <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: 1, borderColor: 'divider', backgroundColor: '#F9FAFB' }}>
                        <Typography variant="caption" color="text.secondary">
                            Powered by Flowone AI
                        </Typography>
                        <Link href="#" variant="caption" fontWeight="bold" sx={{textDecoration: 'none'}}>
                            Full AI Dashboard
                        </Link>
                    </Box>
                </Paper>
            )}
            {mainTabValue === 1 && (
                <Paper sx={{ p: 3, borderRadius: '12px', boxShadow: '0px 4px 20px rgba(0,0,0,0.05)' }}>
                    <Typography variant="h6">Schedule Calls Content</Typography>
                    {/* Add content for Schedule Calls tab here */}
                </Paper>
            )}
            {mainTabValue === 2 && (
                <Paper sx={{ p: 3, borderRadius: '12px', boxShadow: '0px 4px 20px rgba(0,0,0,0.05)' }}>
                    <Typography variant="h6">Scheduled Calls Content</Typography>
                    {/* Add content for Scheduled Calls tab here */}
                </Paper>
            )}
        </Box>
    );
};

export default SmartAssistant;
