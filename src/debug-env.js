// Add this at the beginning of the SmartAssistant component
console.log('Environment check:', {
    VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
    VITE_CHAT_API_URL: import.meta.env.VITE_CHAT_API_URL,
    API_BASE_URL,
    CHAT_API_URL,
});
