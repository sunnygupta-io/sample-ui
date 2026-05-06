import CustomDropdown from './CustomDropdown'
import type { FilterSet, FilterState } from './dashboard-body.types'
import './DashboardFilterBar.css'

type DashboardFilterBarProps = {
  filters: FilterSet
  filterState: FilterState
  onChange: (filterName: keyof FilterState, value: string) => void
}

function DashboardFilterBar({ filters, filterState, onChange }: DashboardFilterBarProps) {
  return (
    <section className="filters-row" aria-label="Filters">
      <CustomDropdown
        options={filters.brands}
        value={filterState.brand}
        onChange={(val) => onChange('brand', val)}
      />

      <CustomDropdown
        options={filters.personas}
        value={filterState.persona}
        onChange={(val) => onChange('persona', val)}
      />

      <CustomDropdown
        options={filters.territories}
        value={filterState.territory}
        onChange={(val) => onChange('territory', val)}
      />
    </section>
  )
}

export default DashboardFilterBar
