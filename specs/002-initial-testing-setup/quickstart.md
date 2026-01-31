# Quickstart: Initial Testing Implementation

**Date**: 2026-01-31
**Feature**: [specs/002-initial-testing-setup/spec.md](specs/002-initial-testing-setup/spec.md)

## Overview

This guide provides quick instructions for setting up and running the initial testing infrastructure. The setup focuses on establishing the foundation for iterative coding and testing cycles.

## Prerequisites

- Node.js and bun package manager installed
- Project dependencies installed (`bun install`)
- Local development server running (`bun run dev:pages`)

## Installation

The testing dependencies are already configured in package.json:

```json
{
  "devDependencies": {
    "@playwright/test": "^1.40.0"
  }
}
```

## Directory Structure

After setup, your project will have:

```
tests/
├── unit/                   # Unit tests
│   └── example.test.ts     # Empty unit test (ready to add tests)
├── integration/            # Integration tests
│   └── example.test.ts     # Empty integration test
└── e2e/                    # E2E tests
    ├── example.spec.ts     # Empty E2E test
    └── playwright.config.ts # Playwright configuration

src/
└── components/
    └── ErrorBoundary.tsx   # Error boundary component
```

## Running Tests

### Unit Tests
```bash
# Run all unit tests
bun run test:unit

# Run unit tests in watch mode
bun run test:unit:watch

# Run unit tests with coverage
bun run test:unit:coverage
```

### Integration Tests
```bash
# Run all integration tests
bun run test:integration

# Run integration tests in watch mode
bun run test:integration:watch
```

### E2E Tests
```bash
# Install Playwright browsers (first time only)
bun run test:e2e:install

# Run E2E tests
bun run test:e2e

# Run E2E tests in UI mode (for debugging)
bun run test:e2e:ui
```

### All Tests
```bash
# Run all test types
bun run test

# Run tests with coverage report
bun run test:coverage
```

## Adding New Tests

### Unit Test Example
Create `tests/unit/myFunction.test.ts`:

```typescript
import { myFunction } from '../../src/libs/myModule';

describe('myFunction', () => {
  it('should return expected result', () => {
    const result = myFunction('input');
    expect(result).toBe('expected output');
  });
});
```

### Integration Test Example
Create `tests/integration/componentInteraction.test.ts`:

```typescript
import { render } from '@testing-library/react';
import { MyComponent } from '../../src/components/MyComponent';

describe('MyComponent Integration', () => {
  it('should interact correctly with dependencies', () => {
    render(<MyComponent />);
    // Add integration test logic
  });
});
```

### E2E Test Example
Create `tests/e2e/userWorkflow.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test('user can perform workflow', async ({ page }) => {
  await page.goto('http://localhost:4321');
  // Add E2E test steps
});
```

## Error Boundary Usage

Wrap components that might throw errors:

```tsx
import { ErrorBoundary } from '../components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <MyComponent />
    </ErrorBoundary>
  );
}
```

## Configuration Files

### Bun Test Configuration (package.json)
```json
{
  "scripts": {
    "test": "bun test",
    "test:unit": "bun test tests/unit",
    "test:integration": "bun test tests/integration",
    "test:coverage": "bun test --coverage"
  }
}
```

### Playwright Configuration (tests/e2e/playwright.config.ts)
```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'http://localhost:4321',
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
  ],
});
```

## Troubleshooting

### Tests Not Running
- Ensure local dev server is running on port 4321
- Check that test files have `.test.ts` or `.spec.ts` extension
- Verify package.json scripts are correct

### E2E Tests Failing
- Install Playwright browsers: `bun run test:e2e:install`
- Check that baseURL matches your dev server
- Use `bun run test:e2e:ui` for visual debugging

### Coverage Not Generated
- Ensure source files are included in `collectCoverageFrom`
- Check that test files are executing

## Next Steps

1. Add your first unit test to `tests/unit/example.test.ts`
2. Implement integration tests for component interactions
3. Add E2E tests for critical user workflows
4. Configure CI/CD to run tests automatically
5. Set up test coverage reporting and thresholds