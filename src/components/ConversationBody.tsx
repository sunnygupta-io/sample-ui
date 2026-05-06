import { useMemo, useState } from 'react'
import sampleData from '../data/GeneralizedSummaries.sample.json'
import './ConversationBody.css'
import ConversationListHeader from './ConversationListHeader'
import FeedbackList from './FeedbackList'
import SummaryList from './SummaryList'
import type {
  ConversationBodyData,
  FeedbackRow,
  FilterState,
  SummaryRow,
  ViewMode,
} from './conversation-body.types'

const data = sampleData as ConversationBodyData

function ConversationBody() {
  const [viewMode, setViewMode] = useState<ViewMode>('generatedSummaries')
  const [filterState, setFilterState] = useState<FilterState>({
    brand: data.filters.brands[0],
    persona: data.filters.personas[0],
    territory: data.filters.territories[0],
  })

  const filteredSummaryRows = useMemo(() => {
    return data.generatedSummaries.rows.filter((row) => matchesFilters(row, filterState, data))
  }, [filterState])

  const filteredFeedbackRows = useMemo(() => {
    return data.feedbackCollected.rows.filter((row) => matchesFilters(row, filterState, data))
  }, [filterState])

  const updateFilter = (filterName: keyof FilterState, value: string) => {
    setFilterState((previous) => ({ ...previous, [filterName]: value }))
  }

  return (
    <main className="conversation-body">
      <ConversationListHeader
        title={data.title}
        tabs={data.tabs}
        viewMode={viewMode}
        filters={data.filters}
        filterState={filterState}
        onViewChange={setViewMode}
        onFilterChange={updateFilter}
      />

      <section className="content-grid">
        {viewMode === 'generatedSummaries' ? (
          <SummaryList columns={data.generatedSummaries.columns} rows={filteredSummaryRows} />
        ) : (
          <FeedbackList columns={data.feedbackCollected.columns} rows={filteredFeedbackRows} />
        )}
      </section>
    </main>
  )
}

function matchesFilters(
  row: SummaryRow | FeedbackRow,
  filterState: FilterState,
  dataSet: ConversationBodyData,
) {
  const brandMatch =
    filterState.brand === dataSet.filters.brands[0] || row.brand === filterState.brand
  const personaMatch =
    filterState.persona === dataSet.filters.personas[0] || row.targetPersona === filterState.persona
  const territoryMatch =
    filterState.territory === dataSet.filters.territories[0] ||
    row.territory === filterState.territory

  return brandMatch && personaMatch && territoryMatch
}

export default ConversationBody
