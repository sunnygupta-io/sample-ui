import { useMemo, useState, useEffect } from 'react'
import summaryData from '../data/GeneralizedSummaries.sample.json'
import feedbackData from '../data/FeedbackCollected.sample.json'
import filterData from '../data/filter-data.json'
import './DashboardBody.css'
import DashboardListHeader from './DashboardListHeader'
import GenericTable from './GenericTable'
import ConversationHistory from './ConversationHistory'
import type { Column } from './GenericTable'
import type {
  DashboardBodyData,
  FeedbackRow,
  FilterState,
  SummaryRow,
  ViewMode,
} from './dashboard-body.types'

const data = {
  title: summaryData.title,
  tabs: summaryData.tabs,
  generatedSummaries: summaryData.generatedSummaries,
  feedbackCollected: feedbackData,
  filters: filterData,
} as unknown as DashboardBodyData

const SELECTED_SUMMARY_ID_KEY = 'dashboard_selectedSummaryId'
const SELECTED_FEEDBACK_ID_KEY = 'dashboard_selectedFeedbackId'

function DashboardBody() {
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    const saved = localStorage.getItem('dashboard_viewMode')
    return (saved as ViewMode) || 'generatedSummaries'
  })
  
  useEffect(() => {
    localStorage.setItem('dashboard_viewMode', viewMode)
  }, [viewMode])

  const [filterState, setFilterState] = useState<FilterState>({
    brand: data.filters.brands[0],
    persona: data.filters.personas[0],
    territory: data.filters.territories[0],
  })

  const [selected, setSelected] = useState<SummaryRow | null>(() => {
    const savedId = localStorage.getItem(SELECTED_SUMMARY_ID_KEY)
    if (!savedId) return null
    return data.generatedSummaries.rows.find((row) => row.id === savedId) ?? null
  })

  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackRow | null>(() => {
    const savedId = localStorage.getItem(SELECTED_FEEDBACK_ID_KEY)
    if (!savedId) return null
    return data.feedbackCollected.rows.find((row) => row.id === savedId) ?? null
  })

  useEffect(() => {
    if (selected) {
      localStorage.setItem(SELECTED_SUMMARY_ID_KEY, selected.id)
      localStorage.removeItem(SELECTED_FEEDBACK_ID_KEY)
      setSelectedFeedback(null)
      setViewMode('generatedSummaries')
    } else {
      localStorage.removeItem(SELECTED_SUMMARY_ID_KEY)
    }
  }, [selected])

  useEffect(() => {
    if (selectedFeedback) {
      localStorage.setItem(SELECTED_FEEDBACK_ID_KEY, selectedFeedback.id)
      localStorage.removeItem(SELECTED_SUMMARY_ID_KEY)
      setSelected(null)
      setViewMode('feedbackCollected')
    } else {
      localStorage.removeItem(SELECTED_FEEDBACK_ID_KEY)
    }
  }, [selectedFeedback])

  const filteredSummaryRows = useMemo(() => 
    data.generatedSummaries.rows.filter(r => matches(r, filterState, data)), 
  [filterState])

  const filteredFeedbackRows = useMemo(() => 
    data.feedbackCollected.rows.filter(r => matches(r, filterState, data)), 
  [filterState])

  const summaryCols: Column<SummaryRow>[] = [
    { key: 'reference', label: 'JNJ Id' },
    { key: 'callId', label: 'Call HCP Id' },
    { key: 'targetPersona', label: 'Target persona' },
    { key: 'territory', label: 'Territory' },
    { key: 'brand', label: 'Brand', className: 'brand-col' },
    { key: 'timestamp', label: 'Time Stamp' },
  ]

  const feedbackCols: Column<FeedbackRow>[] = [
    { key: 'feedbackId', label: 'ID' },
    { key: 'timestamp', label: 'Timestamp' },
    { key: 'brand', label: 'Brand', className: 'brand-col' },
    { key: 'targetPersona', label: 'Target persona' },
    { key: 'updatedBy', label: 'Updated By' },
    { 
      key: 'action', 
      label: '', 
      className: 'action-col',
      render: (row) => (
        <button 
          className="view-rules-btn" 
          onClick={(e) => {
            e.stopPropagation();
            setSelectedFeedback(row);
          }}
        >
          view feedback rules
        </button>
      )
    },
  ]

  return (
    <main className="dashboard-body">
      {!selected && !selectedFeedback && (
        <DashboardListHeader
          title={viewMode === 'generatedSummaries' ? data.title : data.tabs.feedbackCollected}
          tabs={data.tabs}
          viewMode={viewMode}
          filters={data.filters}
          filterState={filterState}
          onViewChange={setViewMode}
          onFilterChange={(f, v) => setFilterState(s => ({ ...s, [f]: v }))}
        />
      )}

      <section className="content-grid">
        {viewMode === 'generatedSummaries' ? (
          selected ? (
            <ConversationHistory onBack={() => setSelected(null)} mode="summary" />
          ) : (
            <GenericTable columns={summaryCols} data={filteredSummaryRows} itemsPerPage={12} onRowClick={(r) => setSelected(r as SummaryRow)} />
          )
        ) : (
          selectedFeedback ? (
            <ConversationHistory onBack={() => setSelectedFeedback(null)} mode="feedback" />
          ) : (
            <GenericTable columns={feedbackCols} data={filteredFeedbackRows} itemsPerPage={10} />
          )
        )}
      </section>
    </main>
  )
}

function matches(row: SummaryRow | FeedbackRow, state: FilterState, ds: DashboardBodyData) {
  return (state.brand === ds.filters.brands[0] || row.brand === state.brand) &&
         (state.persona === ds.filters.personas[0] || row.targetPersona === state.persona) &&
         (state.territory === ds.filters.territories[0] || row.territory === state.territory)
}

export default DashboardBody
