import type { SummaryRow, TableColumn } from './conversation-body.types'
import './ConversationTable.css'

type SummaryListProps = {
  columns: TableColumn[]
  rows: SummaryRow[]
}

function SummaryList({ columns, rows }: SummaryListProps) {
  return (
    <article className="panel table-panel summary-list">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>{row.reference}</td>
              <td>{row.callId}</td>
              <td>{row.targetPersona}</td>
              <td>{row.territory}</td>
              <td>{row.brand}</td>
              <td>{row.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {rows.length === 0 && (
        <p className="no-results" role="status">
          No rows match the selected filters.
        </p>
      )}

      <div className="table-pagination" aria-label="Pagination">
        <button type="button" aria-label="Previous page" disabled>
          {'<'}
        </button>
        <span>Page 1 of 1</span>
        <button type="button" aria-label="Next page" disabled>
          {'>'}
        </button>
      </div>
    </article>
  )
}

export default SummaryList
