import React, { useState } from 'react';
import './FeedbackTable.css';

// 1. Import the JSON file directly!
import mockDataRaw from './mockFeedbackData.json';

// 2. Define the shape of our data for TypeScript
export interface FeedbackRecord {
  id: string;
  timestamp: string;
  brand: string;
  targetPersona: string;
  updatedBy: string;
}

// 3. Tell TypeScript that this imported JSON perfectly matches our interface
const mockData: FeedbackRecord[] = mockDataRaw as FeedbackRecord[];

export default function FeedbackTable() {
  // --- PAGINATION LOGIC ---
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  
  // Calculate how many pages we need in total
  const totalPages = Math.ceil(mockData.length / rowsPerPage);
  
  // Figure out exactly which 10 items to grab for the current page
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = mockData.slice(startIndex, startIndex + rowsPerPage);

  // Button Click Handlers
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="table-container">
      <table className="feedback-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Timestamp</th>
            <th>Brand</th>
            <th>Target persona</th>
            <th>Updated By</th>
            <th></th> {/* Empty header for the action column */}
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, index) => (
            <tr key={index}>
              <td className="id-col">{row.id}</td>
              <td>{row.timestamp}</td>
              <td>{row.brand}</td>
              <td>{row.targetPersona}</td>
              <td>{row.updatedBy}</td>
              <td className="action-col">
                <button 
                  className="view-btn"
                  onClick={() => console.log(`Viewing rules for ${row.id}`)}
                >
                  view feedback rules
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* --- CONDITIONAL PAGINATION UI --- */}
      {totalPages > 1 && (
        <div className="pagination-container">
          <button 
            className={`page-btn ${currentPage === 1 ? 'disabled' : ''}`} 
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          
          <span className="page-info">Page {currentPage} of {totalPages}</span>
          
          <button 
            className={`page-btn ${currentPage === totalPages ? 'disabled' : ''}`} 
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      )}
      
    </div>
  );
}