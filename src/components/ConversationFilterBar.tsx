import type { FilterSet, FilterState } from './conversation-body.types'
import './ConversationFilterBar.css'

type ConversationFilterBarProps = {
  filters: FilterSet
  filterState: FilterState
  onChange: (filterName: keyof FilterState, value: string) => void
}

function ConversationFilterBar({ filters, filterState, onChange }: ConversationFilterBarProps) {
  return (
    <section className="filters-row" aria-label="Filters">
      <select
        value={filterState.brand}
        onChange={(event) => onChange('brand', event.target.value)}
      >
        {filters.brands.map((brand) => (
          <option value={brand} key={brand}>
            {brand}
          </option>
        ))}
      </select>

      <select
        value={filterState.persona}
        onChange={(event) => onChange('persona', event.target.value)}
      >
        {filters.personas.map((persona) => (
          <option value={persona} key={persona}>
            {persona}
          </option>
        ))}
      </select>

      <select
        value={filterState.territory}
        onChange={(event) => onChange('territory', event.target.value)}
      >
        {filters.territories.map((territory) => (
          <option value={territory} key={territory}>
            {territory}
          </option>
        ))}
      </select>
    </section>
  )
}

export default ConversationFilterBar
