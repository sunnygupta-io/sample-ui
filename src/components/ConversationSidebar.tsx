import { useState } from 'react';
import './ConversationSidebar.css';

type Tab = 'overview' | 'metadata' | 'feedback';

interface ConversationSidebarData {
  overview: {
    conversationId: string;
    brand: string;
    targetPersona: string;
    userFeedback: { status: string; type: string };
    resolutionStatus: { status: string; type: string };
    timeline: { started: string; lastActivity: string };
  };
  metadata: {
    systemInformation: { label: string; value: string }[];
  };
  feedback: {
    status: string;
    message: string;
  };
}

interface ConversationSidebarProps {
  data: ConversationSidebarData;
}

const ConversationSidebar: React.FC<ConversationSidebarProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const renderOverview = () => (
    <div className="sidebar-content">
      <h3>Conversation Details</h3>
      
      <div className="info-card">
        <div className="info-card-header">Conversation ID</div>
        <div className="info-card-value">
          {data.overview.conversationId}
          <svg className="copy-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        </div>
      </div>
      
      <div className="info-card">
        <div className="info-card-header">Brand</div>
        <div className="info-card-value">{data.overview.brand}</div>
      </div>
      
      <div className="info-card">
        <div className="info-card-header">Target Persona</div>
        <div className="info-card-value">{data.overview.targetPersona}</div>
      </div>
      
      <div className={`info-card ${data.overview.userFeedback.type}`}>
        <div className="info-card-header">User Feedback</div>
        <div className="info-card-value">
          {data.overview.userFeedback.type === 'warning' && (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          )}
          {data.overview.userFeedback.status}
        </div>
      </div>
      
      <div className={`info-card ${data.overview.resolutionStatus.type}`}>
        <div className="info-card-header">Resolution Status</div>
        <div className="info-card-value">
          {data.overview.resolutionStatus.type === 'warning' && (
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
               <circle cx="12" cy="12" r="10"></circle>
               <line x1="12" y1="8" x2="12" y2="12"></line>
               <line x1="12" y1="16" x2="12.01" y2="16"></line>
             </svg>
          )}
          {data.overview.resolutionStatus.status}
        </div>
      </div>

      <div className="timeline">
        <h3>Timeline</h3>
        <div className="timeline-item">
          <div className="timeline-dot blue"></div>
          <div className="timeline-content">
            <span className="timeline-label">Started</span>
            <span className="timeline-time">{data.overview.timeline.started}</span>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-dot green"></div>
          <div className="timeline-content">
            <span className="timeline-label">Last Activity</span>
            <span className="timeline-time">{data.overview.timeline.lastActivity}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMetadata = () => (
    <div className="sidebar-content">
      <h3>System Information</h3>
      {data.metadata.systemInformation.map((info, idx) => (
        <div key={idx} className="info-card">
          <div className="info-card-header">{info.label}</div>
          {/* Use a monospace style class if the value looks like a system path/agent */}
          <div className={`info-card-value ${info.value.includes('/') || info.value.includes('v2.') ? 'mono' : ''}`}>
            {info.value}
          </div>
        </div>
      ))}
    </div>
  );

  const renderFeedback = () => (
    <div className="sidebar-content">
      <h3>User Feedback</h3>
      <div className="feedback-status">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
        </svg>
        {data.feedback.status}
      </div>
      <p className="feedback-message">{data.feedback.message}</p>
      
      <div className="feedback-textarea-container">
        <label className="feedback-textarea-label">Add super user feedback.</label>
        <textarea className="feedback-textarea" placeholder="Enter your feedback here..."></textarea>
      </div>
      
      <div className="feedback-actions">
        <button className="btn btn-primary">Submit</button>
        <button className="btn btn-primary">Reset</button>
      </div>
    </div>
  );

  return (
    <aside className="conversation-sidebar">
      <div className="sidebar-tabs">
        <button 
          className={`sidebar-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`sidebar-tab ${activeTab === 'metadata' ? 'active' : ''}`}
          onClick={() => setActiveTab('metadata')}
        >
          Metadata
        </button>
        <button 
          className={`sidebar-tab ${activeTab === 'feedback' ? 'active' : ''}`}
          onClick={() => setActiveTab('feedback')}
        >
          Feedback
        </button>
      </div>
      
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'metadata' && renderMetadata()}
      {activeTab === 'feedback' && renderFeedback()}
    </aside>
  );
};

export default ConversationSidebar;