import ConversationTabs from './ConversationTabs'
import ConversationFilterBar from './ConversationFilterBar'
import './ConversationListHeader.css'
import type { FilterSet, FilterState, Tabs, ViewMode } from './conversation-body.types'

type ConversationListHeaderProps = {
  title: string
  tabs: Tabs
  viewMode: ViewMode
  filters: FilterSet
  filterState: FilterState
  onViewChange: (mode: ViewMode) => void
  onFilterChange: (filterName: keyof FilterState, value: string) => void
}

function ConversationListHeader({
  title,
  tabs,
  viewMode,
  filters,
  filterState,
  onViewChange,
  onFilterChange,
}: ConversationListHeaderProps) {
  return (
    <header className="conversation-header">
      <section className="toolbar-row toolbar-row--top">
        <span aria-hidden="true" />
        <ConversationTabs tabs={tabs} viewMode={viewMode} onChange={onViewChange} />
      </section>
      <section className="toolbar-row toolbar-row--bottom">
        <h1>{title}</h1>
        <ConversationFilterBar
          filters={filters}
          filterState={filterState}
          onChange={onFilterChange}
        />
      </section>
    </header>
  )
}

export default ConversationListHeader
