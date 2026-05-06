export type FilterSet = {
  brands: string[]
  personas: string[]
  territories: string[]
}

export type TableColumn = {
  key: string
  label: string
}

export type BaseRow = {
  id: string
  targetPersona: string
  territory: string
  brand: string
  timestamp: string
}

export type SummaryRow = BaseRow & {
  reference: string
  callId: string
}

export type FeedbackRow = BaseRow & {
  feedbackId: string
  callId: string
  rating: string
}

export type SummaryTable = {
  columns: TableColumn[]
  rows: SummaryRow[]
}

export type FeedbackTable = {
  columns: TableColumn[]
  rows: FeedbackRow[]
}

export type Tabs = {
  generatedSummaries: string
  feedbackCollected: string
}

export type ConversationBodyData = {
  title: string
  tabs: Tabs
  filters: FilterSet
  generatedSummaries: SummaryTable
  feedbackCollected: FeedbackTable
}

export type ViewMode = keyof Tabs

export type FilterState = {
  brand: string
  persona: string
  territory: string
}
