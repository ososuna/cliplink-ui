import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

// Example test to demonstrate Vitest setup
describe('Example Test Suite', () => {
  it('should demonstrate basic testing setup', () => {
    expect(1 + 1).toBe(2)
  })

  it('should test a simple component render', () => {
    const TestComponent = () => <div>Hello, World!</div>
    
    render(<TestComponent />)
    expect(screen.getByText('Hello, World!')).toBeInTheDocument()
  })
})

// You can delete this file once you start writing your actual tests 