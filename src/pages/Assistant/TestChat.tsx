import React, { useState } from 'react';
import { Box, Button, TextField, Paper, Typography } from '@mui/material';

const TestChat = () => {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL || 'http://localhost:8001';

    const testBackend = async () => {
        setLoading(true);
        setResponse('');
        
        try {
            // Test health endpoint
            const healthResponse = await fetch(`${CHAT_API_URL}/health`);
            const healthData = await healthResponse.json();
            console.log('Health check:', healthData);
            
            // Test chat endpoint
            const chatResponse = await fetch(`${CHAT_API_URL}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    threadId: 'test-thread',
                    runId: 'test-run',
                    messages: [
                        { role: 'user', content: message || 'Hello' }
                    ]
                }),
            });

            if (!chatResponse.ok) {
                throw new Error(`HTTP error! status: ${chatResponse.status}`);
            }

            const reader = chatResponse.body?.getReader();
            const decoder = new TextDecoder();

            if (reader) {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    
                    const chunk = decoder.decode(value);
                    console.log('Received chunk:', chunk);
                    setResponse(prev => prev + chunk + '\n');
                }
            }
        } catch (error) {
            console.error('Error:', error);
            setResponse(`Error: ${error}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>Test Chat Backend</Typography>
                <TextField
                    fullWidth
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter test message"
                    sx={{ mb: 2 }}
                />
                <Button 
                    variant="contained" 
                    onClick={testBackend}
                    disabled={loading}
                >
                    {loading ? 'Testing...' : 'Test Backend'}
                </Button>
                <Box sx={{ mt: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                    <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
                        {response || 'No response yet'}
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
};

export default TestChat;
