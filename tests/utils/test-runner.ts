/**
 * Basic test runner utilities for the game testing infrastructure.
 * Provides common utilities for test execution, assertions, and setup.
 */

/**
 * Test types supported by the testing framework.
 */
export type TestType = "unit" | "integration" | "e2e"

/**
 * Status of a test execution.
 */
export type TestStatus = "pass" | "fail" | "skip" | "error"

/**
 * Represents a single test case.
 */
export interface TestCase {
	/** Unique identifier for the test case */
	id: string
	/** Human-readable test name */
	name: string
	/** Type of test */
	type: TestType
	/** Path to the test file */
	filePath: string
	/** Optional description */
	description?: string
	/** Optional tags for categorization */
	tags?: string[]
	/** Maximum execution time in milliseconds */
	timeout?: number
}

/**
 * Represents a collection of related test cases.
 */
export interface TestSuite {
	/** Unique identifier for the test suite */
	id: string
	/** Human-readable suite name */
	name: string
	/** Type of tests in this suite */
	type: TestType
	/** Glob pattern for matching test files */
	pattern: string
	/** Suite-specific configuration */
	config?: TestSuiteConfig
}

/**
 * Configuration for a test suite.
 */
export interface TestSuiteConfig {
	/** Setup function to run before suite */
	setup?: () => Promise<void>
	/** Teardown function to run after suite */
	teardown?: () => Promise<void>
	/** Environment variables for the suite */
	env?: Record<string, string>
}

/**
 * Result of a test execution.
 */
export interface TestResult {
	/** Unique identifier for the result */
	id: string
	/** Reference to the executed test case */
	testCaseId: string
	/** Execution status */
	status: TestStatus
	/** Execution time in milliseconds */
	duration: number
	/** Error message if failed */
	error?: string
	/** Execution timestamp */
	timestamp: Date
	/** Additional execution data */
	metadata?: Record<string, any>
}

/**
 * Contract for test runners.
 */
export interface TestRunner {
	/**
	 * Execute a single test case
	 * @param testCase The test case to execute
	 * @returns Promise resolving to test result
	 */
	runTest(testCase: TestCase): Promise<TestResult>

	/**
	 * Execute all tests in a test suite
	 * @param suite The test suite to execute
	 * @returns Promise resolving to array of test results
	 */
	runSuite(suite: TestSuite): Promise<TestResult[]>

	/**
	 * Execute tests matching a pattern
	 * @param pattern Glob pattern for test files
	 * @param type Type of tests to run
	 * @returns Promise resolving to array of test results
	 */
	runPattern(pattern: string, type: TestType): Promise<TestResult[]>
}

/**
 * Utility function to create a test case.
 * @param id Unique identifier
 * @param name Human-readable name
 * @param type Test type
 * @param filePath Path to test file
 * @param options Additional options
 * @returns TestCase object
 */
export function createTestCase(
	id: string,
	name: string,
	type: TestType,
	filePath: string,
	options: Partial<Pick<TestCase, "description" | "tags" | "timeout">> = {}
): TestCase {
	return {
		id,
		name,
		type,
		filePath,
		...options,
	}
}

/**
 * Utility function to create a test suite.
 * @param id Unique identifier
 * @param name Human-readable name
 * @param type Test type
 * @param pattern Glob pattern
 * @param config Suite configuration
 * @returns TestSuite object
 */
export function createTestSuite(
	id: string,
	name: string,
	type: TestType,
	pattern: string,
	config?: TestSuiteConfig
): TestSuite {
	return {
		id,
		name,
		type,
		pattern,
		config,
	}
}

/**
 * Utility function to create a test result.
 * @param testCaseId Test case ID
 * @param status Execution status
 * @param duration Execution time
 * @param options Additional options
 * @returns TestResult object
 */
export function createTestResult(
	testCaseId: string,
	status: TestStatus,
	duration: number,
	options: Partial<Pick<TestResult, "error" | "metadata">> = {}
): TestResult {
	return {
		id: `${testCaseId}-${Date.now()}`,
		testCaseId,
		status,
		duration,
		timestamp: new Date(),
		...options,
	}
}

/**
 * Assertion utility for common test checks.
 */
export const assert = {
	/**
	 * Assert that a value is truthy.
	 * @param value Value to check
	 * @param message Error message
	 */
	truthy(value: any, message = "Expected value to be truthy"): void {
		if (!value) {
			throw new Error(message)
		}
	},

	/**
	 * Assert that two values are equal.
	 * @param actual Actual value
	 * @param expected Expected value
	 * @param message Error message
	 */
	equal<T>(actual: T, expected: T, message = "Values are not equal"): void {
		if (actual !== expected) {
			throw new Error(`${message}. Expected: ${expected}, Actual: ${actual}`)
		}
	},

	/**
	 * Assert that a function throws an error.
	 * @param fn Function to test
	 * @param message Error message
	 */
	throws(fn: () => void, message = "Expected function to throw"): void {
		try {
			fn()
			throw new Error(message)
		} catch (error) {
			// Expected to throw
		}
	},
}
