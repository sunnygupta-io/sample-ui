import type { Tabs, ViewMode } from './dashboard-body.types'
import './DashboardTabs.css'

type DashboardTabsProps = {
  tabs: Tabs
  viewMode: ViewMode
  onChange: (mode: ViewMode) => void
}

function DashboardTabs({ tabs, viewMode, onChange }: DashboardTabsProps) {
  return (
    <div className="tabs-container">
      <div className="tabs-pill-wrapper" role="tablist" aria-label="Views">
        <button
          className={`tab-pill ${viewMode === 'generatedSummaries' ? 'active' : ''}`}
          type="button"
          role="tab"
          aria-selected={viewMode === 'generatedSummaries'}
          onClick={() => onChange('generatedSummaries')}
        >
          {tabs.generatedSummaries}
        </button>
        <button
          className={`tab-pill ${viewMode === 'feedbackCollected' ? 'active' : ''}`}
          type="button"
          role="tab"
          aria-selected={viewMode === 'feedbackCollected'}
          onClick={() => onChange('feedbackCollected')}
        >
          {tabs.feedbackCollected}
        </button>
      </div>
    </div>
  )
}

export default DashboardTabs
