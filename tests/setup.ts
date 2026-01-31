/**
 * Global test setup file for bun test.
 * This file is executed before each test file.
 */

// Import jest-dom matchers for better assertions
import "@testing-library/jest-dom"

// Set up global test environment
import { beforeAll, afterAll } from "bun:test"

// Configure HappyDOM environment for DOM testing
if (typeof globalThis.window === "undefined") {
	// Import HappyDOM for fast DOM testing
	const { Window } = require("happy-dom")
	const window = new Window({
		url: "http://localhost:4321",
	})

	// Set up global objects
	globalThis.window = window
	globalThis.document = window.document
	globalThis.navigator = window.navigator

	// Copy properties from window to global
	Object.keys(window).forEach((key) => {
		if (!(key in globalThis)) {
			;(globalThis as any)[key] = window[key]
		}
	})
}

// Global setup for all tests
beforeAll(() => {
	console.log("Setting up test environment...")
})

afterAll(() => {
	console.log("Cleaning up test environment...")
})
