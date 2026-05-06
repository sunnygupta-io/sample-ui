import DashboardTabs from './DashboardTabs'
import DashboardFilterBar from './DashboardFilterBar'
import './DashboardListHeader.css'
import type { FilterSet, FilterState, Tabs, ViewMode } from './dashboard-body.types'

type DashboardListHeaderProps = {
  title: string
  tabs: Tabs
  viewMode: ViewMode
  filters: FilterSet
  filterState: FilterState
  onViewChange: (mode: ViewMode) => void
  onFilterChange: (filterName: keyof FilterState, value: string) => void
}

function DashboardListHeader({
  title,
  tabs,
  viewMode,
  filters,
  filterState,
  onViewChange,
  onFilterChange,
}: DashboardListHeaderProps) {
  return (
    <header className="dashboard-header">
      <div className="header-top-row">
        <DashboardTabs tabs={tabs} viewMode={viewMode} onChange={onViewChange} />
      </div>
      <div className="header-bottom-row">
        <h1 className="page-title">{title}</h1>
        <DashboardFilterBar
          filters={filters}
          filterState={filterState}
          onChange={onFilterChange}
        />
      </div>
    </header>
  )
}

export default DashboardListHeader
