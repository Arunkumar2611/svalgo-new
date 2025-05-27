import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Paper, Typography } from '@mui/material';
import { HttpAgent } from '@ag-ui/client';

const MinimalChat = () => {
    const [message, setMessage] = useState('');
    const [responses, setResponses] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [agent, setAgent] = useState<HttpAgent | null>(null);
    const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL || 'http://localhost:8001';

    useEffect(() => {
        // Initialize agent
        const agentInstance = new HttpAgent({
            url: `${CHAT_API_URL}/api/chat`,
            agentId: "test-agent",
            threadId: "test-thread",
        });
        
        // Add initial message
        agentInstance.messages = [
            {
                id: "system-1",
                role: "system",
                content: "You are a helpful assistant.",
            }
        ];
        
        setAgent(agentInstance);
        console.log('Agent initialized:', agentInstance);
    }, [CHAT_API_URL]);

    const sendMessage = async () => {
        if (!agent || !message.trim()) return;
        
        setLoading(true);
        setResponses(prev => [...prev, `User: ${message}`]);
        
        // Add user message to agent
        agent.messages.push({
            id: `user-${Date.now()}`,
            role: "user",
            content: message,
        });
        
        try {
            const subscription = agent.runAgent({
                runId: `run-${Date.now()}`,
                tools: [],
                context: []
            }).subscribe({
                next: (event) => {
                    console.log('Event:', event);
                    
                    if (event.type === 'TEXT_MESSAGE_CONTENT') {
                        setResponses(prev => {
                            const newResponses = [...prev];
                            if (newResponses[newResponses.length - 1]?.startsWith('Assistant:')) {
                                newResponses[newResponses.length - 1] += event.delta;
                            } else {
                                newResponses.push(`Assistant: ${event.delta}`);
                            }
                            return newResponses;
                        });
                    }
                },
                error: (error) => {
                    console.error('Error:', error);
                    setResponses(prev => [...prev, `Error: ${error.message}`]);
                    setLoading(false);
                },
                complete: () => {
                    console.log('Complete');
                    setLoading(false);
                }
            });
            
            setMessage('');
        } catch (error) {
            console.error('Failed to send:', error);
            setResponses(prev => [...prev, `Error: ${error}`]);
            setLoading(false);
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>Minimal AG-UI Chat Test</Typography>
                
                <Box sx={{ mb: 2, maxHeight: 300, overflow: 'auto', p: 2, bgcolor: '#f5f5f5' }}>
                    {responses.map((resp, idx) => (
                        <Typography key={idx} variant="body2" sx={{ mb: 1 }}>
                            {resp}
                        </Typography>
                    ))}
                </Box>
                
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                        fullWidth
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        disabled={loading}
                    />
                    <Button 
                        variant="contained" 
                        onClick={sendMessage}
                        disabled={loading || !message.trim()}
                    >
                        Send
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default MinimalChat;
