import ConversationDetails from './ConversationDetails';
import ConversationSidebar from './ConversationSidebar';
import detailsData from '../data/ConversationDetails.sample.json';
import sidebarData from '../data/ConversationSidebar.sample.json';
import feedbackRulesData from '../data/FeedbackRules.sample.json';
import './ConversationHistory.css';

interface ConversationHistoryProps {
  onBack?: () => void;
  mode?: 'summary' | 'feedback';
}

const ConversationHistory = ({ onBack, mode = 'summary' }: ConversationHistoryProps) => {
  const handleBack = () => {
    onBack?.();
  };

  const isFeedback = mode === 'feedback';
  const displayData = isFeedback ? feedbackRulesData : detailsData;

  return (
    <div className={`conversation-history-container ${isFeedback ? 'no-sidebar' : ''}`}>
      <ConversationDetails data={displayData} onBack={handleBack} />
      {!isFeedback && <ConversationSidebar data={sidebarData} />}
    </div>
  );
};

export default ConversationHistory;
