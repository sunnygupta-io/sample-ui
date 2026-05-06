import ConversationDetails from './ConversationDetails';
import ConversationSidebar from './ConversationSidebar';
import detailsData from '../data/ConversationDetails.sample.json';
import sidebarData from '../data/ConversationSidebar.sample.json';
import './ConversationHistory.css';

interface ConversationHistoryProps {
  onBack?: () => void;
}

const ConversationHistory = ({ onBack }: ConversationHistoryProps) => {
  const handleBack = () => {
    onBack?.();
  };

  return (
    <div className="conversation-history-container">
      <ConversationDetails data={detailsData} onBack={handleBack} />
      <ConversationSidebar data={sidebarData} />
    </div>
  );
};

export default ConversationHistory;
