import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock Astro modules
vi.mock('astro:transitions/client', () => ({
  navigate: vi.fn(),
}))

// Global test setup
// You can add any global test configuration here 