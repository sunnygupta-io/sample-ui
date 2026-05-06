import { useState, useRef, useEffect } from 'react'
import './CustomDropdown.css'

type CustomDropdownProps = {
  options: string[]
  value: string
  onChange: (value: string) => void
}

function CustomDropdown({ options, value, onChange }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <button 
        type="button" 
        className={`dropdown-trigger ${isOpen ? 'open' : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {isOpen && (
        <ul className="dropdown-options">
          {options.map((option) => (
            <li 
              key={option} 
              className={`dropdown-option ${option === value ? 'selected' : ''}`}
              onClick={() => {
                onChange(option)
                setIsOpen(false)
              }}
            >
              {option === value && <div className="active-indicator" />}
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CustomDropdown
