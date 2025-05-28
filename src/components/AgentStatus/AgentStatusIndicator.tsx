import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Paper,
    Chip,
    LinearProgress,
    Fade,
    Collapse,
    IconButton,
    Avatar,
    Divider,
    Stack
} from '@mui/material';
import {
    Psychology as ThinkingIcon,
    Build as ToolIcon,
    CheckCircle as CompleteIcon,
    Error as ErrorIcon,
    ExpandMore as ExpandIcon,
    ExpandLess as CollapseIcon,
    AutoAwesome as SparkleIcon,
    Timeline as ProcessIcon
} from '@mui/icons-material';
import { keyframes } from '@mui/system';

// Animation keyframes
const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

interface AgentStep {
    id: string;
    type: 'thinking' | 'tool_call' | 'processing' | 'complete' | 'error';
    title: string;
    description?: string;
    status: 'active' | 'completed' | 'error' | 'pending';
    timestamp: Date;
    details?: any;
    progress?: number;
}

interface AgentStatusIndicatorProps {
    steps: AgentStep[];
    currentStep?: string;
    isActive: boolean;
    onStepClick?: (stepId: string) => void;
}

const AgentStatusIndicator: React.FC<AgentStatusIndicatorProps> = ({
    steps,
    currentStep,
    isActive,
    onStepClick
}) => {
    const [expandedSteps, setExpandedSteps] = useState<Set<string>>(new Set());
    const [visibleSteps, setVisibleSteps] = useState<string[]>([]);

    // Animate steps appearing
    useEffect(() => {
        steps.forEach((step, index) => {
            setTimeout(() => {
                setVisibleSteps(prev => [...prev, step.id]);
            }, index * 200);
        });
    }, [steps]);

    const toggleStepExpansion = (stepId: string) => {
        setExpandedSteps(prev => {
            const newSet = new Set(prev);
            if (newSet.has(stepId)) {
                newSet.delete(stepId);
            } else {
                newSet.add(stepId);
            }
            return newSet;
        });
    };

    const getStepIcon = (step: AgentStep) => {
        switch (step.type) {
            case 'thinking':
                return <ThinkingIcon />;
            case 'tool_call':
                return <ToolIcon />;
            case 'processing':
                return <ProcessIcon />;
            case 'complete':
                return <CompleteIcon />;
            case 'error':
                return <ErrorIcon />;
            default:
                return <SparkleIcon />;
        }
    };

    const getStepColor = (step: AgentStep) => {
        switch (step.status) {
            case 'active':
                return '#2196F3';
            case 'completed':
                return '#4CAF50';
            case 'error':
                return '#F44336';
            case 'pending':
                return '#9E9E9E';
            default:
                return '#9E9E9E';
        }
    };

    const getStatusChip = (step: AgentStep) => {
        const color = getStepColor(step);
        const isCurrentStep = currentStep === step.id;
        
        return (
            <Chip
                size="small"
                label={step.status.charAt(0).toUpperCase() + step.status.slice(1)}
                sx={{
                    bgcolor: color,
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '0.75rem',
                    animation: isCurrentStep && step.status === 'active' ? `${pulse} 2s infinite` : 'none',
                    '& .MuiChip-label': {
                        px: 1
                    }
                }}
            />
        );
    };

    if (!isActive && steps.length === 0) {
        return null;
    }

    return (
        <Paper
            elevation={3}
            sx={{
                p: 2,
                mb: 2,
                borderRadius: 3,
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                border: '1px solid rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                animation: `${fadeInUp} 0.5s ease-out`
            }}
        >
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar
                    sx={{
                        bgcolor: isActive ? '#2196F3' : '#4CAF50',
                        mr: 2,
                        animation: isActive ? `${pulse} 2s infinite` : 'none'
                    }}
                >
                    <SparkleIcon />
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1a1a1a' }}>
                        AI Agent Status
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {isActive ? 'Processing your request...' : 'Task completed'}
                    </Typography>
                </Box>
                {isActive && (
                    <Box sx={{ 
                        width: 60, 
                        height: 4, 
                        borderRadius: 2, 
                        overflow: 'hidden',
                        background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                        backgroundSize: '200px 100%',
                        animation: `${shimmer} 2s infinite linear`
                    }} />
                )}
            </Box>

            {/* Steps */}
            <Stack spacing={1}>
                {steps.map((step, index) => {
                    const isVisible = visibleSteps.includes(step.id);
                    const isExpanded = expandedSteps.has(step.id);
                    const isCurrentStep = currentStep === step.id;
                    
                    return (
                        <Fade key={step.id} in={isVisible} timeout={500}>
                            <Paper
                                elevation={isCurrentStep ? 4 : 1}
                                sx={{
                                    p: 2,
                                    borderRadius: 2,
                                    bgcolor: isCurrentStep ? 'rgba(33, 150, 243, 0.05)' : 'white',
                                    border: isCurrentStep ? '2px solid #2196F3' : '1px solid rgba(0,0,0,0.1)',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        elevation: 3,
                                        transform: 'translateY(-2px)'
                                    }
                                }}
                                onClick={() => onStepClick?.(step.id)}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                                        <Avatar
                                            sx={{
                                                bgcolor: getStepColor(step),
                                                mr: 2,
                                                width: 32,
                                                height: 32,
                                                animation: step.status === 'active' ? `${pulse} 2s infinite` : 'none'
                                            }}
                                        >
                                            {getStepIcon(step)}
                                        </Avatar>
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                                                    {step.title}
                                                </Typography>
                                                {getStatusChip(step)}
                                            </Box>
                                            {step.description && (
                                                <Typography variant="body2" color="text.secondary">
                                                    {step.description}
                                                </Typography>
                                            )}
                                            {step.progress !== undefined && step.status === 'active' && (
                                                <Box sx={{ mt: 1 }}>
                                                    <LinearProgress
                                                        variant="determinate"
                                                        value={step.progress}
                                                        sx={{
                                                            height: 6,
                                                            borderRadius: 3,
                                                            bgcolor: 'rgba(0,0,0,0.1)',
                                                            '& .MuiLinearProgress-bar': {
                                                                borderRadius: 3,
                                                                bgcolor: getStepColor(step)
                                                            }
                                                        }}
                                                    />
                                                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                                                        {Math.round(step.progress)}% complete
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Box>
                                    </Box>
                                    
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography variant="caption" color="text.secondary">
                                            {step.timestamp.toLocaleTimeString()}
                                        </Typography>
                                        {step.details && (
                                            <IconButton
                                                size="small"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleStepExpansion(step.id);
                                                }}
                                            >
                                                {isExpanded ? <CollapseIcon /> : <ExpandIcon />}
                                            </IconButton>
                                        )}
                                    </Box>
                                </Box>

                                {/* Expandable Details */}
                                {step.details && (
                                    <Collapse in={isExpanded}>
                                        <Divider sx={{ my: 2 }} />
                                        <Box sx={{ pl: 6 }}>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>Details:</strong>
                                            </Typography>
                                            <Box
                                                component="pre"
                                                sx={{
                                                    mt: 1,
                                                    p: 2,
                                                    bgcolor: 'rgba(0,0,0,0.05)',
                                                    borderRadius: 1,
                                                    fontSize: '0.75rem',
                                                    overflow: 'auto',
                                                    maxHeight: 200,
                                                    fontFamily: 'monospace'
                                                }}
                                            >
                                                {typeof step.details === 'string' 
                                                    ? step.details 
                                                    : JSON.stringify(step.details, null, 2)
                                                }
                                            </Box>
                                        </Box>
                                    </Collapse>
                                )}
                            </Paper>
                        </Fade>
                    );
                })}
            </Stack>

            {/* Overall Progress */}
            {isActive && steps.length > 0 && (
                <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid rgba(0,0,0,0.1)' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            Overall Progress
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {steps.filter(s => s.status === 'completed').length} / {steps.length} steps
                        </Typography>
                    </Box>
                    <LinearProgress
                        variant="determinate"
                        value={(steps.filter(s => s.status === 'completed').length / steps.length) * 100}
                        sx={{
                            height: 8,
                            borderRadius: 4,
                            bgcolor: 'rgba(0,0,0,0.1)',
                            '& .MuiLinearProgress-bar': {
                                borderRadius: 4,
                                background: 'linear-gradient(90deg, #2196F3, #21CBF3)'
                            }
                        }}
                    />
                </Box>
            )}
        </Paper>
    );
};

export default AgentStatusIndicator;