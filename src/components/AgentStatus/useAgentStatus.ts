import { useState, useCallback, useRef } from 'react';

export interface AgentStep {
    id: string;
    type: 'thinking' | 'tool_call' | 'processing' | 'complete' | 'error' | 'intent_classification' | 'state_update';
    title: string;
    description?: string;
    status: 'active' | 'completed' | 'error' | 'pending';
    timestamp: Date;
    details?: any;
    progress?: number;
}

export interface AgentStatusState {
    steps: AgentStep[];
    currentStep?: string;
    isActive: boolean;
    overallProgress: number;
}

// Predefined step titles for common events
const STEP_TITLES = {
    THINKING: 'Analyzing your request',
    PROCESSING: 'Processing information',
    TOOL_CALL: 'Using external tools',
    CONTENT_GEN: 'Generating response',
    LOOKUP: 'Looking up information',
    PLAN: 'Planning next steps',
    FETCH: 'Fetching data',
    VERIFY: 'Verifying information',
    CLASSIFY: 'Classifying request type',
    RESEARCH: 'Researching topic',
    SUMMARIZE: 'Summarizing findings'
};

export const useAgentStatus = () => {
    const [statusState, setStatusState] = useState<AgentStatusState>({
        steps: [],
        currentStep: undefined,
        isActive: false,
        overallProgress: 0
    });
    
    const stepIdCounter = useRef(0);
    const activeSteps = useRef<Map<string, string>>(new Map()); // Maps event types to step IDs

    // Define updateOverallProgress outside handleAgentEvent so it's accessible to all functions
    const updateOverallProgress = useCallback(() => {
        setStatusState(prev => {
            const completedSteps = prev.steps.filter(s => s.status === 'completed').length;
            const totalSteps = prev.steps.length;
            const activeStepsProgress = prev.steps
                .filter(s => s.status === 'active' && typeof s.progress === 'number')
                .reduce((acc, step) => acc + (step.progress || 0), 0);
            
            const activeStepsCount = prev.steps.filter(s => s.status === 'active').length;
            
            // Calculate progress as a percentage of completed steps plus progress of active steps
            const progress = totalSteps > 0 
                ? ((completedSteps / totalSteps) * 100) + 
                  ((activeStepsProgress / (activeStepsCount || 1)) / totalSteps)
                : 0;
            
            return {
                ...prev,
                overallProgress: Math.min(99, progress) // Never reach 100% until explicitly finished
            };
        });
    }, []);
    
    // Map event types to meaningful checklist items
    const getTaskTitle = useCallback((eventType: string, eventDetails: any = {}): string => {
        const type = eventType.toLowerCase();
        
        if (type.includes('thinking') || type.includes('text_message_start')) {
            return STEP_TITLES.THINKING;
        } else if (type.includes('tool_call') || type.includes('tool')) {
            const toolName = eventDetails.toolName || eventDetails.toolCallName || 'external tool';
            return `Using ${toolName}`;
        } else if (type.includes('process')) {
            return STEP_TITLES.PROCESSING;
        } else if (type.includes('plan')) {
            return STEP_TITLES.PLAN;
        } else if (type.includes('fetch') || type.includes('lookup')) {
            return STEP_TITLES.FETCH;
        } else if (type.includes('verify')) {
            return STEP_TITLES.VERIFY;
        } else if (type.includes('classify') || type.includes('intent')) {
            return STEP_TITLES.CLASSIFY;
        } else if (type.includes('research')) {
            return STEP_TITLES.RESEARCH;
        } else if (type.includes('content') || type.includes('response')) {
            return STEP_TITLES.CONTENT_GEN;
        } else if (type.includes('summarize')) {
            return STEP_TITLES.SUMMARIZE;
        }
        
        // Default case
        return `Processing ${eventType.replace(/_/g, ' ').toLowerCase()}`;
    }, []);

    const generateStepId = () => {
        stepIdCounter.current += 1;
        return `step-${stepIdCounter.current}`;
    };

    const addStep = useCallback((step: Omit<AgentStep, 'id' | 'timestamp'>) => {
        const newStep: AgentStep = {
            ...step,
            id: generateStepId(),
            timestamp: new Date()
        };

        setStatusState(prev => {
            // Check if a similar step already exists (avoid duplicates)
            const hasSimilarStep = prev.steps.some(s => 
                s.title === step.title && 
                s.status !== 'completed' && 
                s.status !== 'error'
            );
            
            if (hasSimilarStep) {
                return prev;
            }
            
            return {
                ...prev,
                steps: [...prev.steps, newStep],
                currentStep: newStep.status === 'active' ? newStep.id : prev.currentStep,
                isActive: true
            };
        });

        return newStep.id;
    }, []);

    const updateStep = useCallback((stepId: string, updates: Partial<AgentStep>) => {
        setStatusState(prev => ({
            ...prev,
            steps: prev.steps.map(step => 
                step.id === stepId 
                    ? { ...step, ...updates, timestamp: new Date() }
                    : step
            ),
            currentStep: updates.status === 'completed' || updates.status === 'error' 
                ? undefined 
                : prev.currentStep
        }));
    }, []);

    const completeStep = useCallback((stepId: string, details?: any) => {
        updateStep(stepId, { 
            status: 'completed', 
            details,
            progress: 100
        });
    }, [updateStep]);

    const errorStep = useCallback((stepId: string, error: any) => {
        updateStep(stepId, { 
            status: 'error', 
            details: error,
            description: typeof error === 'string' ? error : error?.message || 'An error occurred'
        });
    }, [updateStep]);

    const setProgress = useCallback((stepId: string, progress: number) => {
        updateStep(stepId, { progress: Math.min(100, Math.max(0, progress)) });
    }, [updateStep]);

    const reset = useCallback(() => {
        setStatusState({
            steps: [],
            currentStep: undefined,
            isActive: false,
            overallProgress: 0
        });
        activeSteps.current.clear();
        stepIdCounter.current = 0;
    }, []);

    const finish = useCallback(() => {
        setStatusState(prev => {
            const updatedSteps = prev.steps.map(step => 
                step.status === 'active' || step.status === 'pending'
                    ? { ...step, status: 'completed' as const, progress: 100 }
                    : step
            );
            
            return {
                ...prev,
                steps: updatedSteps,
                currentStep: undefined,
                isActive: false,
                overallProgress: 100
            };
        });
    }, []);

    // AG-UI Event Handlers
    const handleAgentEvent = useCallback((event: any) => {
        console.log('🎯 Processing AG-UI event for status:', event.type, event);
        
        // Helper function to find or create a step by event name/type
        const findOrCreateStep = (type: string, details: any = {}) => {
            // See if we already have a step for this type
            const existingStepId = activeSteps.current.get(type.toLowerCase());
            if (existingStepId) {
                return existingStepId;
            }
            
            // Create a new step
            const title = getTaskTitle(type, details);
            const description = details.description || `Processing ${type.replace(/_/g, ' ').toLowerCase()}`;
            
            const stepId = addStep({
                type: 'processing',
                title,
                description,
                status: 'active',
                progress: 10
            });
            
            activeSteps.current.set(type.toLowerCase(), stepId);
            return stepId;
        };
        
        // Normalize event type
        const eventType = event.type || '';
        
        // Based on specific event types, create or update steps in a checklist style
        switch (eventType.toUpperCase()) {
            case 'RUN_STARTED':
            case 'RUNSTARTED':
                reset();
                findOrCreateStep('processing_started', { description: 'Starting to process your request' });
                updateOverallProgress();
                break;
                
            case 'STEP_STARTED':
            case 'STEPSTARTED':
                const stepName = event.stepName || event.name || 'Processing Step';
                findOrCreateStep(stepName, { description: `Working on ${stepName}` });
                updateOverallProgress();
                break;
                
            case 'STEP_FINISHED':
            case 'STEPFINISHED':
                const stepToComplete = event.stepName || event.name || 'Processing Step';
                const stepId = activeSteps.current.get(stepToComplete.toLowerCase());
                if (stepId) {
                    setProgress(stepId, 100);
                    setTimeout(() => {
                        completeStep(stepId);
                        activeSteps.current.delete(stepToComplete.toLowerCase());
                        updateOverallProgress();
                    }, 300);
                }
                break;
                
            case 'TOOL_CALL_START':
            case 'TOOLCALLSTART':
                const toolName = event.toolCallName || event.toolName || 'Tool';
                const toolStepId = findOrCreateStep(`tool_${toolName.toLowerCase()}`, { 
                    toolName, 
                    description: `Using ${toolName} to process your request` 
                });
                
                setProgress(toolStepId, 20);
                updateOverallProgress();
                break;
                
            case 'TOOL_CALL_END':
            case 'TOOLCALLEND':
                const toolToComplete = event.toolCallName || event.toolName || 'tool';
                const toolCompletionId = activeSteps.current.get(`tool_${toolToComplete.toLowerCase()}`);
                
                if (toolCompletionId) {
                    setProgress(toolCompletionId, 100);
                    setTimeout(() => {
                        completeStep(toolCompletionId, event.result || event.output);
                        activeSteps.current.delete(`tool_${toolToComplete.toLowerCase()}`);
                        updateOverallProgress();
                    }, 300);
                }
                break;
                
            case 'TEXT_MESSAGE_START':
            case 'TEXTMESSAGESTART':
                const responseStepId = findOrCreateStep('generating_response', { 
                    description: 'Creating a response to your query' 
                });
                setProgress(responseStepId, 10);
                updateOverallProgress();
                break;
                
            case 'TEXT_MESSAGE_CONTENT':
            case 'TEXTMESSAGECONTENT':
                const messageStepId = activeSteps.current.get('generating_response');
                if (messageStepId) {
                    // Gradually increase progress with each content chunk
                    const delta = event.delta || event.content || '';
                    setStatusState(prev => {
                        const messageStep = prev.steps.find(s => s.id === messageStepId);
                        if (messageStep && messageStep.status === 'active') {
                            const currentProgress = messageStep.progress || 0;
                            const increment = Math.min(20, delta.length / 20);
                            const newProgress = Math.min(90, currentProgress + increment);
                            setProgress(messageStepId, newProgress);
                        }
                        return prev;
                    });
                    updateOverallProgress();
                }
                break;
                
            case 'TEXT_MESSAGE_END':
            case 'TEXTMESSAGEEND':
                const responseCompletionId = activeSteps.current.get('generating_response');
                if (responseCompletionId) {
                    setProgress(responseCompletionId, 100);
                    setTimeout(() => {
                        completeStep(responseCompletionId);
                        activeSteps.current.delete('generating_response');
                        updateOverallProgress();
                    }, 300);
                }
                break;
                
            case 'STATE_SNAPSHOT':
            case 'STATE_DELTA':
            case 'STATESNAPSHOT':
            case 'STATEDELTA':
                // Handle state events as informational updates
                // Extract meaningful state info to display in the UI
                const stateData = event.state || event.delta || {};
                const stateStep = stateData.step || 'system_state';
                const stateDesc = stateData.processing_stage || '';
                
                if (stateStep && stateStep !== 'starting' && stateStep !== 'complete') {
                    // Only create steps for meaningful state changes
                    const stateStepId = findOrCreateStep(`state_${stateStep}`, { 
                        description: stateDesc || `Processing ${stateStep.replace(/_/g, ' ')}` 
                    });
                    
                    // If this is a completion state, mark as complete
                    if (stateStep.includes('complete')) {
                        setProgress(stateStepId, 100);
                        setTimeout(() => {
                            completeStep(stateStepId);
                            activeSteps.current.delete(`state_${stateStep}`);
                            updateOverallProgress();
                        }, 300);
                    } else {
                        // Otherwise just update progress
                        setProgress(stateStepId, 50);
                        updateOverallProgress();
                    }
                }
                break;
                
            case 'RUN_FINISHED':
            case 'RUNFINISHED':
                // Mark all active steps as completed
                for (const [key, stepId] of activeSteps.current.entries()) {
                    setProgress(stepId, 100);
                    completeStep(stepId);
                }
                activeSteps.current.clear();
                
                // Add a final completed step
                addStep({
                    type: 'complete',
                    title: 'Processing completed',
                    description: 'Your request has been fully processed',
                    status: 'completed',
                    progress: 100
                });
                
                setStatusState(prev => ({
                    ...prev,
                    isActive: false,
                    overallProgress: 100
                }));
                break;
                
            case 'RUN_ERROR':
            case 'RUNERROR':
                // Add an error step
                const errorStepId = addStep({
                    type: 'error',
                    title: 'Error occurred',
                    description: event.message || 'An unexpected error occurred',
                    status: 'error',
                    details: event
                });
                
                // Mark all active steps as errored
                for (const [key, stepId] of activeSteps.current.entries()) {
                    errorStep(stepId, { message: 'Process interrupted by error' });
                }
                activeSteps.current.clear();
                
                setStatusState(prev => ({
                    ...prev,
                    isActive: false
                }));
                break;
                
            case 'CUSTOM':
            case 'CUSTOM_EVENT':
                const customEventName = event.name || 'custom_event';
                const customEventDesc = event.description || event.value || '';
                
                // Handle known custom events in a checklist style
                if (customEventName.toLowerCase().includes('start')) {
                    // Starting a custom process
                    const customStepId = findOrCreateStep(customEventName, { 
                        description: customEventDesc || `Processing ${customEventName}` 
                    });
                    setProgress(customStepId, 20);
                    updateOverallProgress();
                } else if (customEventName.toLowerCase().includes('finish') || 
                          customEventName.toLowerCase().includes('complete') ||
                          customEventName.toLowerCase().includes('end')) {
                    // Completing a custom process
                    // Extract the base step name by removing finish/complete/end suffix
                    const baseStepName = customEventName.toLowerCase()
                        .replace(/finish(ed)?|complete(d)?|end(ed)?/i, '')
                        .trim();
                    
                    // Look for any active step that contains this base name
                    for (const [key, stepId] of activeSteps.current.entries()) {
                        if (key.includes(baseStepName)) {
                            setProgress(stepId, 100);
                            setTimeout(() => {
                                completeStep(stepId, event.value);
                                activeSteps.current.delete(key);
                                updateOverallProgress();
                            }, 300);
                            break;
                        }
                    }
                } else {
                    // Generic custom event, just add as completed
                    addStep({
                        type: 'processing',
                        title: customEventName,
                        description: customEventDesc || `Processed ${customEventName}`,
                        status: 'completed',
                        details: event.value
                    });
                    updateOverallProgress();
                }
                break;
                
            default:
                // For unknown events, try to extract meaningful information
                // and add an appropriate step
                const eventName = eventType.toLowerCase();
                
                if (eventName.includes('start') || eventName.includes('begin')) {
                    findOrCreateStep(eventName, event);
                    updateOverallProgress();
                } else if (eventName.includes('finish') || eventName.includes('complete') || eventName.includes('end')) {
                    // Try to find a matching "start" step
                    const baseEventName = eventName
                        .replace(/finish(ed)?|complete(d)?|end(ed)?/i, 'start')
                        .trim();
                    
                    // Look for any step that might match
                    for (const [key, stepId] of activeSteps.current.entries()) {
                        if (key.includes(baseEventName) || baseEventName.includes(key)) {
                            setProgress(stepId, 100);
                            setTimeout(() => {
                                completeStep(stepId);
                                activeSteps.current.delete(key);
                                updateOverallProgress();
                            }, 300);
                            break;
                        }
                    }
                } else if (eventName.includes('progress') || eventName.includes('update')) {
                    // This is a progress update for some ongoing process
                    // Try to find any active step to update
                    if (activeSteps.current.size > 0) {
                        const [lastKey, lastStepId] = Array.from(activeSteps.current.entries()).pop()!;
                        const progress = event.progress || Math.floor(Math.random() * 30) + 50; // Random progress 50-80%
                        setProgress(lastStepId, progress);
                        updateOverallProgress();
                    }
                }
                break;
        }
    }, [addStep, completeStep, errorStep, setProgress, reset, updateOverallProgress, getTaskTitle]);

    return {
        statusState,
        handleAgentEvent,
        reset,
        finish,
        addStep,
        updateStep,
        completeStep,
        errorStep,
        setProgress,
        updateOverallProgress
    };
};

export default useAgentStatus;