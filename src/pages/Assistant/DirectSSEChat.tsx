import React, { useState } from 'react';
import { Box, Button, TextField, Paper, Typography } from '@mui/material';

const DirectSSEChat = () => {
    const [message, setMessage] = useState('');
    const [responses, setResponses] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL || 'http://localhost:8001';

    const sendMessage = async () => {
        if (!message.trim()) return;
        
        setLoading(true);
        setResponses(prev => [...prev, `User: ${message}`]);
        
        try {
            const response = await fetch(`${CHAT_API_URL}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    threadId: 'test-thread',
                    runId: 'test-run',
                    messages: [
                        { role: 'user', content: message }
                    ]
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let assistantText = '';

            if (reader) {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    
                    const chunk = decoder.decode(value);
                    const lines = chunk.split('\n');
                    
                    for (const line of lines) {
                        if (line.startsWith('data: ')) {
                            try {
                                const eventData = JSON.parse(line.slice(6));
                                console.log('Event:', eventData);
                                
                                if (eventData.type === 'TEXT_MESSAGE_CONTENT') {
                                    assistantText += eventData.delta || '';
                                    setResponses(prev => {
                                        const newResponses = [...prev];
                                        const lastIdx = newResponses.length - 1;
                                        if (newResponses[lastIdx]?.startsWith('Assistant:')) {
                                            newResponses[lastIdx] = `Assistant: ${assistantText}`;
                                        } else {
                                            newResponses.push(`Assistant: ${assistantText}`);
                                        }
                                        return newResponses;
                                    });
                                }
                            } catch (e) {
                                console.log('Parse error:', e);
                            }
                        }
                    }
                }
            }
            
            setMessage('');
        } catch (error) {
            console.error('Failed to send:', error);
            setResponses(prev => [...prev, `Error: ${error}`]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>Direct SSE Chat Test</Typography>
                
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
                        onKeyPress={(e) => e.key === 'Enter' && !loading && sendMessage()}
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

export default DirectSSEChat;
