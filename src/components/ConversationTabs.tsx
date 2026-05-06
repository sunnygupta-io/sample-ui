import type { Tabs, ViewMode } from './conversation-body.types'
import './ConversationTabs.css'

type ConversationTabsProps = {
  tabs: Tabs
  viewMode: ViewMode
  onChange: (mode: ViewMode) => void
}

function ConversationTabs({ tabs, viewMode, onChange }: ConversationTabsProps) {
  return (
    <div className="mode-toggle" role="tablist" aria-label="Views">
      <button
        className={viewMode === 'generatedSummaries' ? 'active' : ''}
        type="button"
        role="tab"
        aria-selected={viewMode === 'generatedSummaries'}
        onClick={() => onChange('generatedSummaries')}
      >
        {tabs.generatedSummaries}
      </button>
      <button
        className={viewMode === 'feedbackCollected' ? 'active' : ''}
        type="button"
        role="tab"
        aria-selected={viewMode === 'feedbackCollected'}
        onClick={() => onChange('feedbackCollected')}
      >
        {tabs.feedbackCollected}
      </button>
    </div>
  )
}

export default ConversationTabs
