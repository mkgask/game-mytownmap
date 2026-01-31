# Data Model: Initial Testing Implementation

**Date**: 2026-01-31
**Feature**: [specs/002-initial-testing-setup/spec.md](specs/002-initial-testing-setup/spec.md)

## Overview

This feature establishes the foundational data structures for testing infrastructure. Since this is an initial testing setup rather than full test implementation, the data models focus on the basic entities needed for test organization and error handling.

## Core Entities

### TestCase
Represents a single test with its configuration and execution metadata.

**Attributes**:
- `id`: string - Unique identifier for the test case
- `name`: string - Human-readable test name
- `type`: TestType - Unit, Integration, or E2E
- `filePath`: string - Path to the test file
- `description`: string - Optional description of what the test validates
- `tags`: string[] - Optional tags for test categorization
- `timeout`: number - Maximum execution time in milliseconds (default: 5000)

**Relationships**:
- Belongs to TestSuite (optional)
- Has many TestResult

**Validation Rules**:
- `id` must be unique within the project
- `filePath` must exist and be readable
- `type` must be one of the defined TestType values

### TestSuite
Collection of related test cases that can be executed together.

**Attributes**:
- `id`: string - Unique identifier for the test suite
- `name`: string - Human-readable suite name
- `type`: TestType - The type of tests in this suite
- `pattern`: string - Glob pattern for matching test files
- `config`: TestSuiteConfig - Suite-specific configuration

**Relationships**:
- Has many TestCase

**Validation Rules**:
- `pattern` must be a valid glob pattern
- All TestCase in suite must have matching `type`

### TestResult
Outcome of a test execution.

**Attributes**:
- `id`: string - Unique identifier for the result
- `testCaseId`: string - Reference to the executed test case
- `status`: TestStatus - Pass, Fail, Skip, or Error
- `duration`: number - Execution time in milliseconds
- `error`: string | null - Error message if failed
- `timestamp`: Date - When the test was executed
- `metadata`: Record<string, any> - Additional execution data

**Relationships**:
- Belongs to TestCase

**Validation Rules**:
- `status` must be one of the defined TestStatus values
- `duration` must be non-negative
- `timestamp` must be a valid date

### ErrorBoundary
Component that catches and handles JavaScript errors in the component tree.

**Attributes**:
- `id`: string - Unique identifier for the boundary instance
- `componentName`: string - Name of the component being protected
- `fallbackUI`: React.Component - Component to render on error
- `onError`: (error: Error, errorInfo: any) => void - Error handler function
- `resetKeys`: any[] - Keys that trigger boundary reset

**Relationships**:
- Wraps child components (composition relationship)

**Validation Rules**:
- `fallbackUI` must be a valid React component
- `onError` must be a function if provided

## Supporting Types

### TestType
```typescript
type TestType = 'unit' | 'integration' | 'e2e';
```

### TestStatus
```typescript
type TestStatus = 'pass' | 'fail' | 'skip' | 'error';
```

### TestSuiteConfig
```typescript
interface TestSuiteConfig {
  setupFiles?: string[];
  globalSetup?: string;
  globalTeardown?: string;
  testEnvironment?: string;
  slowTestThreshold?: number;
}
```

## State Transitions

### TestResult Status Flow
- Initial: No result
- Running: Test execution started
- Pass: Test completed successfully
- Fail: Test failed with assertion error
- Error: Test failed with runtime error
- Skip: Test was skipped

### ErrorBoundary State Flow
- Normal: Component renders normally
- Error: Error caught, fallback UI displayed
- Reset: Boundary reset, returns to normal state

## Data Flow

1. **Test Execution Flow**:
   - TestRunner discovers TestCase via TestSuite patterns
   - TestRunner executes TestCase and creates TestResult
   - TestResult stored with execution metadata

2. **Error Handling Flow**:
   - ErrorBoundary wraps components
   - On error, boundary catches and renders fallbackUI
   - Error logged via onError callback
   - User can trigger reset to retry

## Constraints

- All entities must be serializable for test reporting
- TestCase and TestSuite must support async operations
- ErrorBoundary must not interfere with normal component lifecycle
- Data models must be compatible with both Jest and Playwright environments