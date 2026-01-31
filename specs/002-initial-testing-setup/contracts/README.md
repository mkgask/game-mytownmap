# Test Contracts: Initial Testing Implementation

**Date**: 2026-01-31
**Feature**: [specs/002-initial-testing-setup/spec.md](specs/002-initial-testing-setup/spec.md)

## Overview

This document defines the contracts and interfaces for the testing infrastructure. Since this is an initial setup, the contracts focus on the basic interfaces that test frameworks and components must implement.

## Test Runner Contract

### Interface: TestRunner
Defines the contract for executing tests across different types.

```typescript
interface TestRunner {
  /**
   * Execute a single test case
   * @param testCase The test case to execute
   * @returns Promise resolving to test result
   */
  runTest(testCase: TestCase): Promise<TestResult>;

  /**
   * Execute all tests in a test suite
   * @param suite The test suite to execute
   * @returns Promise resolving to array of test results
   */
  runSuite(suite: TestSuite): Promise<TestResult[]>;

  /**
   * Execute tests matching a pattern
   * @param pattern Glob pattern for test files
   * @param type Type of tests to run
   * @returns Promise resolving to array of test results
   */
  runPattern(pattern: string, type: TestType): Promise<TestResult[]>;
}
```

**Contract Requirements**:
- Must handle async test execution
- Must provide detailed error information
- Must support test timeouts
- Must be configurable for different environments

## Test Framework Contracts

### Bun Test Contract
For unit and integration testing.

```typescript
interface BunTestConfig {
  test: {
    globals: boolean;
    environment: 'jsdom' | 'node';
    setupFiles: string[];
    include: string[];
    exclude: string[];
  };
}
```

### Playwright Contract
For E2E testing.

```typescript
interface PlaywrightConfig {
  use: {
    headless: boolean;
    viewport: { width: number; height: number };
    baseURL: string;
  };
  projects: Array<{
    name: string;
    use: { browserName: 'chromium' | 'firefox' | 'webkit' };
  }>;
}
```

## Error Boundary Contract

### Interface: ErrorBoundaryProps
Props for the ErrorBoundary component.

```typescript
interface ErrorBoundaryProps {
  /**
   * Component to render when an error occurs
   */
  fallback: React.ComponentType<{ error: Error; resetError: () => void }>;

  /**
   * Callback fired when an error is caught
   */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;

  /**
   * Keys that trigger boundary reset when changed
   */
  resetKeys?: Array<string | number>;

  /**
   * Children components to protect
   */
  children: React.ReactNode;
}
```

**Contract Requirements**:
- Must catch JavaScript errors in component tree
- Must provide error recovery mechanism
- Must not interfere with normal rendering
- Must support error logging

## Test Discovery Contract

### Interface: TestDiscovery
Contract for finding and loading tests.

```typescript
interface TestDiscovery {
  /**
   * Discover all test files matching patterns
   * @param patterns Array of glob patterns
   * @returns Promise resolving to array of test file paths
   */
  discoverTests(patterns: string[]): Promise<string[]>;

  /**
   * Load test cases from a file
   * @param filePath Path to test file
   * @returns Promise resolving to array of test cases
   */
  loadTestCases(filePath: string): Promise<TestCase[]>;

  /**
   * Validate test file structure
   * @param filePath Path to test file
   * @returns Promise resolving to validation result
   */
  validateTestFile(filePath: string): Promise<ValidationResult>;
}
```

## Data Contracts

### TestCase Schema
JSON schema for test case data exchange.

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "id": { "type": "string" },
    "name": { "type": "string" },
    "type": { "enum": ["unit", "integration", "e2e"] },
    "filePath": { "type": "string" },
    "description": { "type": "string" },
    "tags": { "type": "array", "items": { "type": "string" } },
    "timeout": { "type": "number", "minimum": 0 }
  },
  "required": ["id", "name", "type", "filePath"]
}
```

### TestResult Schema
JSON schema for test result data exchange.

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "id": { "type": "string" },
    "testCaseId": { "type": "string" },
    "status": { "enum": ["pass", "fail", "skip", "error"] },
    "duration": { "type": "number", "minimum": 0 },
    "error": { "type": ["string", "null"] },
    "timestamp": { "type": "string", "format": "date-time" },
    "metadata": { "type": "object" }
  },
  "required": ["id", "testCaseId", "status", "duration", "timestamp"]
}
```

## Integration Contracts

### Framework Integration Points
- Bun test: Must support custom test environment for PixiJS/bitECS
- Playwright: Must integrate with Astro dev server
- Error Boundary: Must work with Astro's component system

### Environment Contracts
- Development: Tests run against local dev server
- CI/CD: Tests run in headless mode with predefined configurations
- Browser: Tests must work in supported browsers (Chrome, Firefox, Safari)