import React from 'react';
import { CheckCircle, Circle, AlertCircle, Loader2, Brain, Wrench, Zap, Target } from 'lucide-react';
import { AgentStep, AgentStatusState } from './useAgentStatus';
import './AgentStatus.css';

interface AgentStatusProps {
    statusState: AgentStatusState;
    className?: string;
}

const getStepIcon = (type: AgentStep['type'], status: AgentStep['status']) => {
    const iconProps = { size: 16, className: "step-icon" };
    
    if (status === 'completed') {
        return <CheckCircle {...iconProps} className="completed-icon" />;
    }
    
    if (status === 'active') {
        return <Loader2 {...iconProps} className="active-icon animate-spin" />;
    }
    
    if (status === 'error') {
        return <AlertCircle {...iconProps} className="error-icon" />;
    }
    
    // Default pending state - empty circle
    return <Circle {...iconProps} className="pending-icon" />;
};

const StepItem: React.FC<{ step: AgentStep; isLast: boolean }> = ({ step, isLast }) => {
    return (
        <div className={`step-item ${step.status}`}>
            <div className="step-icon-container">
                {getStepIcon(step.type, step.status)}
            </div>
            <div className="step-content">
                <div className="step-title">{step.title}</div>
                {step.description && (
                    <div className="step-description">{step.description}</div>
                )}
                {step.status === 'active' && typeof step.progress === 'number' && (
                    <div className="progress-bar-container">
                        <div 
                            className="progress-bar" 
                            style={{ width: `${step.progress}%` }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

const AgentStatus: React.FC<AgentStatusProps> = ({ statusState, className = '' }) => {
    const { steps, isActive, overallProgress } = statusState;
    
    if (steps.length === 0) {
        return null;
    }
    
    return (
        <div className={`agent-status-container ${className}`}>
            {/* Header with percentage */}
            {isActive && (
                <div className="agent-status-header">
                    <div className="status-label">
                        <span className="status-icon active"></span>
                        Agent Status
                        <span className="status-active">Active</span>
                    </div>
                    <div className="overall-progress">{Math.round(overallProgress)}%</div>
                </div>
            )}
            
            {/* Steps list as a checklist */}
            <div className="agent-status-steps">
                {steps.map((step, index) => (
                    <StepItem 
                        key={step.id} 
                        step={step} 
                        isLast={index === steps.length - 1}
                    />
                ))}
            </div>
            
            {/* Footer with summary (only shown when completed) */}
            {!isActive && steps.length > 0 && (
                <div className="agent-status-footer">
                    <span>
                        {steps.filter(s => s.status === 'completed').length} of {steps.length} steps completed
                    </span>
                </div>
            )}
        </div>
    );
};

export default AgentStatus;