import { useState, useEffect, type ReactNode } from 'react'
import './GenericTable.css'

export type Column<T> = {
  key: string
  label: string
  render?: (row: T) => ReactNode
  className?: string
}

type GenericTableProps<T> = {
  columns: Column<T>[]
  data: T[]
  itemsPerPage: number
  emptyMessage?: string
  onRowClick?: (row: T) => void
}

function GenericTable<T extends { id: string }>({ 
  columns, 
  data, 
  itemsPerPage, 
  emptyMessage = "No rows match the selected filters.",
  onRowClick
}: GenericTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setCurrentPage(1)
  }, [data])

  const totalPages = Math.ceil(data.length / itemsPerPage)
  const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  if (data.length === 0) {
    return (
      <div className="table-card no-results">
        <p>{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="table-card">
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key} className={col.className}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row) => (
              <tr key={row.id} onClick={onRowClick ? () => onRowClick(row) : undefined} className={onRowClick ? 'clickable' : ''}>
                {columns.map((col) => (
                  <td key={col.key} className={col.className} data-label={col.label || 'Action'}>
                    {col.render ? col.render(row) : (row as any)[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.length > itemsPerPage && (
        <div className="pagination">
          <button 
            disabled={currentPage === 1} 
            onClick={() => setCurrentPage(p => p - 1)}
            aria-label="Previous"
          >
            <ChevronLeft />
          </button>
          <span className="page-info">Page {currentPage} of {totalPages}</span>
          <button 
            disabled={currentPage === totalPages} 
            onClick={() => setCurrentPage(p => p + 1)}
            aria-label="Next"
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  )
}

const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
)

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

export default GenericTable
