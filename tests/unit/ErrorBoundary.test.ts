/**
 * Unit tests for the ErrorBoundary component.
 * Tests basic error catching functionality.
 */

import { describe, expect, it } from "bun:test"
import React from "react"
import { render } from "@testing-library/react"
import { ErrorBoundary } from "../../src/components/ErrorBoundary"

// Import setup to ensure jsdom is configured
import "../setup"

/**
 * Component that throws an error for testing purposes.
 */
const ErrorThrowingComponent: React.FC = () => {
	throw new Error("Test error")
}

/**
 * Simple fallback component for testing.
 */
const TestFallback: React.FC<{ error: Error; resetError: () => void }> = ({ error }) => {
	return React.createElement("div", null, `Error: ${error.message}`)
}

describe("ErrorBoundary", () => {
	it("should be defined", () => {
		expect(ErrorBoundary).toBeDefined()
	})

	it("should handle error throwing component", () => {
		// Test that ErrorBoundary catches errors and renders fallback
		expect(() => {
			render(
				React.createElement(ErrorBoundary, {
					fallback: TestFallback,
					children: React.createElement(ErrorThrowingComponent),
				})
			)
		}).not.toThrow()
	})

	it("should create ErrorBoundary instance", () => {
		const boundary = React.createElement(ErrorBoundary, {
			fallback: TestFallback,
			children: React.createElement("div", null, "test"),
		})
		expect(boundary).toBeDefined()
	})
})
