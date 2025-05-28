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
    CircularProgress,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import SendIcon from '@mui/icons-material/Send';
import { HttpAgent } from '@ag-ui/client';
import { AgentStatus, useAgentStatus } from '../../components/AgentStatus';

// Message interface for AG-UI compatibility
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
    const [agent, setAgent] = useState<HttpAgent | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    
    // Initialize AgentStatus hook for visual status tracking
    const { 
        statusState, 
        handleAgentEvent: handleStatusEvent, 
        reset: resetStatus,
        updateOverallProgress 
    } = useAgentStatus();

    // Get API base URLs from environment variables
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
    const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL || 'http://localhost:8001';

    // Initialize AG-UI HttpAgent for Chat Assistant
    useEffect(() => {
        const initializeChatAgent = async () => {
            try {
                console.log('🚀 Initializing Chat Assistant AG-UI HttpAgent...');
                
                // First, check if the backend is accessible
                try {
                    const healthResponse = await fetch(`${CHAT_API_URL}/health`);
                    const healthData = await healthResponse.json();
                    console.log('✅ Backend health check:', healthData);
                } catch (healthError) {
                    console.error('❌ Backend health check failed:', healthError);
                    console.error('Make sure the backend is running on', CHAT_API_URL);
                }
                
                const agentInstance = new HttpAgent({
                    url: `${CHAT_API_URL}/api/chat`, // Chat service endpoint
                    agentId: "enhanced-chat-assistant",
                    threadId: `chat-session-${Date.now()}`,
                });
                
                console.log('🔧 Creating HttpAgent with URL:', `${CHAT_API_URL}/api/chat`);

                agentInstance.messages = [
                    {
                        id: "system-1",
                        role: "system",
                        content: "You are an enhanced AI assistant with full agentic capabilities. Help users with various tasks and show your thinking process.",
                    }
                ];

                setAgent(agentInstance);
                console.log('✅ Chat Assistant AG-UI HttpAgent initialized');
                
                // Add initial welcome message to state
                setMessages([{
                    id: 'welcome-1', 
                    text: 'Hello! I\'m your AI assistant. How can I help you optimize your accounts receivable processes today?', 
                    sender: 'assistant',
                    timestamp: new Date()
                }]);
                
            } catch (error) {
                console.error('❌ Failed to initialize Chat Assistant AG-UI HttpAgent:', error);
            }
        };

        initializeChatAgent();
    }, [CHAT_API_URL]);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async () => {
        if (inputValue.trim() === '' || !agent || isLoading) return;

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
        
        // Reset agent status for new conversation
        console.log('🔄 Resetting agent status for new conversation');
        resetStatus();

        // Add user message to agent history
        agent.messages.push({
            id: userMessage.id,
            role: "user",
            content: userMessage.text,
        });

        try {
            console.log('🚀 Starting AG-UI agent run...');
            console.log('Agent configuration:', {
                url: agent.url,
                threadId: agent.threadId,
                messages: agent.messages
            });
            
            // Add a custom processing event to show in the status
            const processingStartEvent = {
                type: 'CUSTOM',
                name: 'processing_started',
                description: 'Starting to process your request',
                timestamp: new Date()
            };
            handleStatusEvent(processingStartEvent);
            
            // Test backend directly to see what it's sending
            console.log('🔍 Testing backend directly...');
            try {
                const testResponse = await fetch(agent.url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'text/event-stream'
                    },
                    body: JSON.stringify({
                        threadId: agent.threadId,
                        runId: `test-${Date.now()}`,
                        messages: agent.messages,
                        tools: [],
                        context: []
                    })
                });
                
                console.log('🌐 Backend response status:', testResponse.status);
                console.log('🌐 Backend response headers:', Object.fromEntries(testResponse.headers.entries()));
                
                if (testResponse.body) {
                    const reader = testResponse.body.getReader();
                    let chunk;
                    let rawData = '';
                    let chunkCount = 0;
                    
                    while (!(chunk = await reader.read()).done && chunkCount < 5) { // Limit to first 5 chunks
                        const text = new TextDecoder().decode(chunk.value);
                        rawData += text;
                        console.log(`📦 Raw SSE chunk ${chunkCount + 1}:`, text);
                        chunkCount++;
                    }
                    
                    console.log('📊 Complete raw SSE data (first 5 chunks):', rawData);
                }
            } catch (testError) {
                console.error('❌ Backend test failed:', testError);
            }
            
            // Create assistant message placeholder
            const assistantMessageId = `assistant-${Date.now()}`;
            const assistantMessage: ChatMessage = {
                id: assistantMessageId,
                text: '',
                sender: 'assistant',
                timestamp: new Date(),
                loading: true,
            };

            // Add assistant placeholder
            setMessages((prevMessages) => [...prevMessages, assistantMessage]);

            // Start AG-UI agent run using legacy method (same as PopupAssistant)
            const subscription = agent.legacy_to_be_removed_runAgentBridged({
                runId: `run-${Date.now()}`,
                tools: [],
                context: []
            }).subscribe({
                next: (event: any) => {
                    console.log('📨 AG-UI Event received:', event.type, event);
                    
                    // Enhanced validation and error handling
                    if (!event || typeof event !== 'object') {
                        console.warn('⚠️ Skipping invalid event (not an object):', event);
                        return;
                    }
                    
                    if (!event.type || event.type === '' || typeof event.type !== 'string') {
                        console.warn('⚠️ Skipping malformed event with invalid type:', event);
                        return;
                    }
                    
                    // Validate required fields based on event type
                    if (event.type.includes('MESSAGE') && !event.messageId) {
                        console.warn('⚠️ Message event missing messageId:', event);
                        // Try to add a fallback messageId
                        event.messageId = assistantMessageId;
                    }
                    
                    if (event.type.includes('TOOL_CALL') && !event.toolCallId) {
                        console.warn('⚠️ Tool call event missing toolCallId:', event);
                        return;
                    }
                    
                    try {
                        handleChatEvent(event, assistantMessageId);
                    } catch (eventError) {
                        console.error('❌ Error handling event:', eventError, event);
                    }
                },
                error: (error: any) => {
                    console.error('❌ AG-UI Stream Error:', error);
                    
                    // Enhanced error logging for different error types
                    if (error.name === 'ZodError' || error.code === 'invalid_union_discriminator') {
                        console.error('🚨 ZodError Details:', {
                            name: error.name,
                            code: error.code,
                            message: error.message,
                            issues: error.issues,
                            received: error.received,
                            path: error.path
                        });
                        console.error('💡 This indicates a schema validation error. The backend event structure doesn\'t match the expected AG-UI format.');
                        
                        // Try to extract useful information from the error
                        if (error.issues && Array.isArray(error.issues)) {
                            error.issues.forEach((issue: any, index: number) => {
                                console.error(`🔍 Issue ${index + 1}:`, {
                                    code: issue.code,
                                    path: issue.path,
                                    message: issue.message,
                                    received: issue.received
                                });
                            });
                        }
                    } else if (error.name === 'TypeError') {
                        console.error('🚨 TypeError - likely a data structure issue:', error.message);
                    } else if (error.name === 'SyntaxError') {
                        console.error('🚨 SyntaxError - likely malformed JSON:', error.message);
                    } else {
                        console.error('🚨 Unknown error type:', error);
                    }
                    
                    handleChatError(assistantMessageId, error);
                    setIsLoading(false);
                },
                complete: () => {
                    console.log('✅ AG-UI stream completed');
                    
                    // Add a custom processing completion event
                    const processingCompletedEvent = {
                        type: 'CUSTOM',
                        name: 'processing_completed',
                        description: 'Successfully processed your request',
                        timestamp: new Date()
                    };
                    handleStatusEvent(processingCompletedEvent);
                    
                    setIsLoading(false);
                    // Ensure loading state is cleared
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

            console.log('🔗 AG-UI subscription established');

        } catch (error) {
            console.error('🚨 Failed to send message via AG-UI:', error);
            handleChatError(`assistant-${Date.now()}`, error);
            setIsLoading(false);
        }
    };

    const handleChatEvent = (event: any, assistantMessageId: string) => {
        console.log('📨 Received AG-UI Event:', event.type, event);
        
        // Pass event to AgentStatus for visual status tracking
        try {
            console.log('✅ Updating agent status with event:', event.type);
            handleStatusEvent(event);
        } catch (statusError) {
            console.error('❌ Error updating agent status:', statusError);
        }
        
        // Use the messageId from the event if available, otherwise use the provided one
        const messageId = event.messageId || assistantMessageId;
        
        // Process event for chat UI
        switch (event.type) {
            case "RUN_STARTED":
            case "RunStarted":
                console.log('🚀 Chat Assistant run started');
                break;
                
            case "STEP_STARTED":
            case "StepStarted":
                console.log('⚡ Step started:', event.stepName || 'Unknown step');
                // Make sure step is reflected in status
                if (event.stepName) {
                    // Handle custom steps more explicitly to ensure they show in the UI
                    const customEvent = {
                        ...event,
                        type: 'STEP_STARTED',
                        name: event.stepName,
                        description: `Processing ${event.stepName}`
                    };
                    handleStatusEvent(customEvent);
                }
                break;
                
            case "STEP_FINISHED":
            case "StepFinished":
                console.log('✅ Step finished:', event.stepName || 'Unknown step');
                // Make sure step completion is reflected in status
                if (event.stepName) {
                    const customEvent = {
                        ...event,
                        type: 'STEP_FINISHED',
                        name: event.stepName,
                        status: 'completed'
                    };
                    handleStatusEvent(customEvent);
                }
                break;
                
            case "TEXT_MESSAGE_START":
            case "TextMessageStart":
                console.log('📝 Chat message start for:', messageId);
                // Make sure message generation is properly reflected with enhanced details
                handleStatusEvent({
                    ...event,
                    type: 'TEXT_MESSAGE_START',
                    name: 'Generating Response',
                    description: 'Assistant is preparing response',
                    status: 'active',
                    progress: 0
                });
                
                // Update our placeholder message with the actual messageId from the event
                setMessages((prevMessages) => {
                    // Check if we already have a placeholder
                    const hasPlaceholder = prevMessages.some(msg => 
                        msg.id === assistantMessageId || msg.id === messageId
                    );
                    
                    if (hasPlaceholder && messageId !== assistantMessageId) {
                        // Update the placeholder ID to match the event messageId
                        return prevMessages.map(msg => 
                            msg.id === assistantMessageId 
                                ? { ...msg, id: messageId }
                                : msg
                        );
                    } else if (!hasPlaceholder) {
                        // Create a new message if none exists
                        return [...prevMessages, {
                            id: messageId,
                            text: '',
                            sender: 'assistant',
                            timestamp: new Date(),
                            loading: true
                        }];
                    }
                    return prevMessages;
                });
                break;
                
            case "TEXT_MESSAGE_CONTENT":
            case "TextMessageContent":
                const delta = event.delta || event.content || "";
                console.log('📄 Received content delta:', delta);
                
                // Update progress in the status
                if (delta) {
                    // Calculate approximate progress based on delta length
                    // This is just an estimation since we don't know the total length
                    const progressIncrement = Math.min(10, delta.length / 10); // Max 10% per chunk
                    
                    handleStatusEvent({
                        ...event,
                        type: 'TEXT_MESSAGE_PROGRESS',
                        name: 'Response Progress',
                        description: 'Generating assistant response',
                        status: 'active',
                        progress: progressIncrement
                    });
                    
                    setMessages((prevMessages) => 
                        prevMessages.map((msg) => 
                            msg.id === messageId || msg.id === assistantMessageId
                                ? { ...msg, text: (msg.text || '') + delta, loading: true }
                                : msg
                        )
                    );
                }
                break;
                
            case "TEXT_MESSAGE_END":
            case "TextMessageEnd":
                console.log('✅ Chat message completed for:', messageId);
                
                // Mark message generation as completed
                handleStatusEvent({
                    ...event,
                    type: 'TEXT_MESSAGE_END',
                    name: 'Response Complete',
                    description: 'Assistant has completed the response',
                    status: 'completed',
                    progress: 100
                });
                
                setMessages((prevMessages) => 
                    prevMessages.map((msg) => 
                        msg.id === messageId || msg.id === assistantMessageId
                            ? { ...msg, loading: false }
                            : msg
                    )
                );
                break;
                
            case "TOOL_CALL_START":
            case "ToolCallStart":
                console.log('🔧 Tool call started:', event.toolCallName || event.toolName);
                // Make sure tool call is reflected in status with enhanced details
                const toolName = event.toolCallName || event.toolName || 'Unknown Tool';
                const enhancedToolStartEvent = {
                    ...event,
                    type: 'TOOL_CALL_START',
                    name: toolName,
                    description: `Executing ${toolName}`,
                    details: event.args || event.arguments || {}
                };
                handleStatusEvent(enhancedToolStartEvent);
                break;
                
            case "TOOL_CALL_END":
            case "ToolCallEnd":
                console.log('🔧 Tool call finished:', event.result);
                // Make sure tool call completion is reflected in status
                const enhancedToolEndEvent = {
                    ...event,
                    type: 'TOOL_CALL_END',
                    status: 'completed',
                    details: event.result || {}
                };
                handleStatusEvent(enhancedToolEndEvent);
                break;
                
            case "STATE_UPDATE":
            case "StateUpdate":
                console.log('🔄 State update:', event.key, event.value);
                // Enhance state update event
                const enhancedStateEvent = {
                    ...event,
                    type: 'STATE_UPDATE',
                    name: `Update: ${event.key || 'state'}`,
                    description: `Updated ${event.key || 'system state'}`,
                    details: { key: event.key, value: event.value }
                };
                handleStatusEvent(enhancedStateEvent);
                break;
                
            case "CUSTOM":
            case "Custom":
                console.log('🎯 Custom event:', event.name, event.description);
                // Make sure custom events are properly reflected
                handleStatusEvent({
                    ...event,
                    type: 'CUSTOM',
                    title: event.name || 'Custom Event',
                    description: event.description || '',
                    details: event.value || event.details || {}
                });
                break;
                
            case "RUN_FINISHED":
            case "RunFinished":
                console.log('🎉 Chat Assistant run finished');
                // Add a final completion step if not already present
                handleStatusEvent({
                    ...event,
                    type: 'RUN_FINISHED',
                    name: 'Task Completed',
                    description: 'AI assistant has completed processing your request',
                    status: 'completed'
                });
                setIsLoading(false);
                // Ensure any remaining loading states are cleared
                setMessages((prevMessages) => 
                    prevMessages.map((msg) => ({ ...msg, loading: false }))
                );
                break;
                
            case "RUN_ERROR":
            case "RunError":
                console.error('❌ Chat Assistant run error:', event);
                // Make sure errors are properly reflected
                handleStatusEvent({
                    ...event,
                    type: 'RUN_ERROR',
                    name: 'Error',
                    description: event.message || 'An unexpected error occurred',
                    status: 'error',
                    details: event.message || 'Unknown error'
                });
                handleChatError(assistantMessageId, event);
                break;
                
            default:
                console.log('🔍 Unknown chat event:', event.type, event);
                
                // Enhanced fallback handling for unexpected event formats
                try {
                    // Try to extract content from various possible fields
                    const content = event.delta || event.content || event.text || event.message || '';
                    const eventMessageId = event.messageId || event.id || messageId || assistantMessageId;
                    
                    if (content && typeof content === 'string' && content.trim()) {
                        console.log('📝 Extracting content from unknown event:', content);
                        setMessages((prevMessages) =>
                            prevMessages.map((msg) =>
                                msg.id === eventMessageId || msg.id === assistantMessageId
                                    ? { ...msg, text: (msg.text || '') + content, loading: true }
                                    : msg
                            )
                        );
                    } else if (event.type && event.type.includes('ERROR')) {
                        // Handle error events
                        const errorMessage = event.message || event.error || 'Unknown error occurred';
                        handleChatError(assistantMessageId, { message: errorMessage });
                    } else {
                        console.log('🤷 No actionable content found in unknown event');
                    }
                } catch (fallbackError) {
                    console.error('❌ Error in fallback event handling:', fallbackError);
                }
        }
    };

    const handleChatError = (messageId: string, error: any) => {
        console.error('🚨 Chat error for message:', messageId, error);
        
        const errorMessage = error?.message || error?.error || 'I encountered an error. Please try again.';
        
        // Add error to agent status with clear error styling
        handleStatusEvent({
            type: 'ERROR',
            name: 'Chat Error',
            description: errorMessage,
            status: 'error',
            details: error,
            timestamp: new Date()
        });
        
        // Make sure any active steps show as errors
        Array.from(Object.entries(error || {})).forEach(([key, value]) => {
            // Add detailed error info for debugging
            handleStatusEvent({
                type: 'CUSTOM',
                name: `Error Detail: ${key}`,
                description: String(value),
                status: 'error',
                timestamp: new Date()
            });
        });
        
        setMessages((prevMessages) => {
            // Find existing message or create new error message
            const existingMessageIndex = prevMessages.findIndex(msg => msg.id === messageId);
            
            if (existingMessageIndex >= 0) {
                // Update existing message
                const updatedMessages = [...prevMessages];
                updatedMessages[existingMessageIndex] = {
                    ...updatedMessages[existingMessageIndex],
                    text: `❌ ${errorMessage}`,
                    loading: false
                };
                return updatedMessages;
            } else {
                // Create new error message
                return [...prevMessages, {
                    id: messageId,
                    text: `❌ ${errorMessage}`,
                    sender: 'assistant',
                    timestamp: new Date(),
                    loading: false
                }];
            }
        });
        
        setIsLoading(false);
    };

    // Handle timeout
    const handleTimeout = (messageId: string) => {
        setIsLoading(false);
        
        // Add timeout to agent status
        handleStatusEvent({
            type: 'ERROR',
            name: 'Request Timeout',
            description: 'The request took too long to complete',
            status: 'error',
            details: { message: 'Request timed out after 30 seconds' },
            timestamp: new Date()
        });
        
        setMessages((prevMessages) =>
            prevMessages.map((msg) =>
                msg.id === messageId
                    ? { ...msg, text: msg.text || 'Request timed out. Please try again.', loading: false }
                    : msg
            )
        );
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
            <Paper sx={{ p: 3, mb: 3, borderRadius: '12px', boxShadow: '0px 4px 20px rgba(0,0,0,0.05)', background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 2%, rgba(255,255,255,0.3) 6%, rgba(255,255,255,0.0) 15%), white' }}>
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
            <Paper sx={{ mb: 3, borderRadius: '12px', boxShadow: '0px 4px 20px rgba(0,0,0,0.05)', background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 2%, rgba(255,255,255,0.3) 6%, rgba(255,255,255,0.0) 15%), white' }}>
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
                            display: 'none', // Hiding default indicator, selection is shown by tab background
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
                <Paper sx={{ p: 0, borderRadius: '12px', boxShadow: '0px 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden', background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 2%, rgba(255,255,255,0.3) 6%, rgba(255,255,255,0.0) 15%), white' }}>
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
                                        marginBottom: '-1px', // to make selected tab overlap the bottom border
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

                    {/* Chat Assistant Content */}
                    {innerTabValue === 2 && ( // Chat Assistant
                        <Box sx={{ p: 2.5, display: 'flex', flexDirection: 'column', height: '500px' }}>
                            <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2, pr: 1 }}>
                                {/* Agent Status Display - Always show when there are steps */}
                                {/* Agent Status Display - Always show the checklist when there are steps */}
                                <Box sx={{ 
                                    mb: 2, 
                                    display: statusState.steps.length > 0 ? 'block' : 'none',
                                    maxWidth: '100%',
                                    width: '100%',
                                    overflow: 'visible'
                                }}>
                                    <AgentStatus statusState={statusState} />
                                </Box>
                                {messages.map((message) => (
                                    <Box
                                        key={message.id}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                                            mb: 2,
                                            alignItems: 'flex-start'
                                        }}
                                    >
                                        <Avatar sx={{
                                            width: 32,
                                            height: 32,
                                            mr: message.sender === 'user' ? 0 : 1,
                                            ml: message.sender === 'user' ? 1 : 0,
                                            order: message.sender === 'user' ? 2 : 1,
                                            bgcolor: message.sender === 'user' ? '#5D3FD3' : '#E3F2FD',
                                            color: message.sender === 'user' ? 'white' : '#1976D2',
                                            fontSize: '0.875rem'
                                        }}>
                                            {message.sender === 'user' ? 'U' : 'AI'}
                                        </Avatar>
                                        <Paper sx={{
                                            p: 2,
                                            maxWidth: '70%',
                                            bgcolor: message.sender === 'user' ? '#5D3FD3' : '#F5F5F5',
                                            color: message.sender === 'user' ? 'white' : 'text.primary',
                                            borderRadius: message.sender === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                                            order: message.sender === 'user' ? 1 : 2
                                        }}>
                                            <Typography
                                                variant="body2"
                                                sx={{
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
                                                            mr: 1,
                                                            color: message.sender === 'user' ? 'white' : '#5D3FD3'
                                                        }}
                                                    />
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            color: message.sender === 'user' ? 'rgba(255,255,255,0.7)' : 'text.secondary'
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
                                                        display: 'block',
                                                        mt: 0.5,
                                                        color: message.sender === 'user' ? 'rgba(255,255,255,0.7)' : 'text.secondary'
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
                                    placeholder="Ask me anything about your accounts receivable..."
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    disabled={isLoading}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSendMessage();
                                        }
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '20px',
                                        }
                                    }}
                                />
                                <IconButton
                                    onClick={handleSendMessage}
                                    disabled={isLoading || inputValue.trim() === ''}
                                    sx={{
                                        ml: 1,
                                        bgcolor: '#5D3FD3',
                                        color: 'white',
                                        '&:hover': {
                                            bgcolor: '#4A2FB8'
                                        },
                                        '&:disabled': {
                                            bgcolor: 'action.disabled'
                                        }
                                    }}
                                >
                                    <SendIcon />
                                </IconButton>
                            </Box>
                        </Box>
                    )}

                    {/* Footer */}
                    <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: 1, borderColor: 'divider', backgroundColor: '#F9FAFB' }}>
                        <Typography variant="caption" color="text.secondary">
                            Powered by Flowone AI
                        </Typography>
                    </Box>
                </Paper>
            )}

            {mainTabValue === 1 && (
                <Paper sx={{ p: 3, borderRadius: '12px', boxShadow: '0px 4px 20px rgba(0,0,0,0.05)', background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 2%, rgba(255,255,255,0.3) 6%, rgba(255,255,255,0.0) 15%), white' }}>
                    <Typography variant="h6">Schedule Calls</Typography>
                </Paper>
            )}

            {mainTabValue === 2 && (
                <Paper sx={{ p: 3, borderRadius: '12px', boxShadow: '0px 4px 20px rgba(0,0,0,0.05)', background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 2%, rgba(255,255,255,0.3) 6%, rgba(255,255,255,0.0) 15%), white' }}>
                    <Typography variant="h6">Scheduled Calls</Typography>
                </Paper>
            )}
        </Box>
    );
};

export default SmartAssistant;
