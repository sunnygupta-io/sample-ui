import React from 'react';
import './ConversationDetails.css';

interface Metric {
  label: string;
  value: string;
  isHighlight?: boolean;
}

interface ContentBlock {
  heading: string;
  paragraphs: string[];
}

interface ConversationDetailsData {
  id: string;
  satisfactionStatus: string;
  subtitle: string;
  metrics: Metric[];
  content: ContentBlock[];
}

interface ConversationDetailsProps {
  data: ConversationDetailsData;
  onBack: () => void;
}

const ConversationDetails: React.FC<ConversationDetailsProps> = ({ data, onBack }) => {
  return (
    <div className="conversation-details">
      {/* Breadcrumb Navigation */}
      <div className="breadcrumb">
        <span className="back-action" onClick={onBack}>
          &larr; Back to Dashboard / Conversation Details
        </span>
      </div>

      {/* Top Details Card */}
      <div className="top-card">
        <div className="details-header">
          <div className="title-row">
            <h1>{data.id}</h1>
            {data.satisfactionStatus && (
              <span className="status-pill">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                </svg>
                {data.satisfactionStatus}
              </span>
            )}
          </div>
          <p className="subtitle">{data.subtitle}</p>
        </div>

        <div className="metrics-grid">
          {data.metrics.map((metric, index) => (
            <div key={index} className={`metric-item ${metric.isHighlight ? 'highlight' : ''}`}>
              <span className="metric-value">{metric.value}</span>
              <span className="metric-label">{metric.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Content Section */}
      <div className="content-section">
        {data.content.map((block, index) => (
          <div key={index} className="content-block">
            <h2>{block.heading}</h2>
            {block.paragraphs.map((para, pIndex) => (
              <p key={pIndex}>{para}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversationDetails;