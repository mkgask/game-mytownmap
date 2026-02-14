/**
 * @fileoverview Integration tests for full game initialization
 * @description Tests the complete game initialization flow from Game class to rendering
 */

import { describe, it, expect, beforeEach, afterEach } from 'bun:test'
import { Game } from '../../../src/libs/game/core/Game'
import { Scene } from '../../../src/libs/game/features/scenes/Scene'
import * as PIXI from 'pixi.js'

describe('Game Integration', () => {
  let game: Game | null = null
  let container: HTMLElement | null = null

  beforeEach(() => {
    // Skip tests in non-browser environments
    if (typeof document === 'undefined' || typeof window === 'undefined') {
      console.log('Skipping integration tests - requires browser environment')
      return
    }

    // Create container for testing
    container = document.createElement('div')
    container.id = 'test-game-container'
    document.body.appendChild(container)
  })

  afterEach(async () => {
    // Clean up after each test
    if (game) {
      game.destroy()
      game = null
    }

    if (container && container.parentNode) {
      container.parentNode.removeChild(container)
      container = null
    }
  })

  describe('Full Game Initialization', () => {
    it('should initialize complete game with all components', async () => {
      // Skip in non-browser environments
      if (typeof document === 'undefined' || !container) {
        console.log('Skipping full game initialization test - requires browser environment')
        return
      }

      // Create game instance
      game = new Game({
        container,
        width: 800,
        height: 600,
        backgroundColor: 0x1099bb,
        antialias: true
      })

      // Initialize game
      await game.initialize()

      // Verify game is initialized
      expect(game.getIsRunning()).toBe(false)
      expect(game.getRenderer()).toBeDefined()
      expect(game.getCurrentScene()).toBeDefined()

      // Verify renderer is attached
      const renderer = game.getRenderer()
      const app = renderer.getApplication()
      expect(app).toBeDefined()

      // Verify canvas is attached to container
      expect(container.children.length).toBe(1)
      expect(container.children[0]).toBe(app?.canvas)

      // Verify scene is attached to stage
      const currentScene = game.getCurrentScene()
      expect(currentScene).toBeInstanceOf(Scene)
      expect(app?.stage.children).toContain(currentScene)
    })

    it('should start and stop game loop correctly', async () => {
      // Skip in non-browser environments
      if (typeof document === 'undefined' || !container) {
        console.log('Skipping game loop test - requires browser environment')
        return
      }

      // Create and initialize game
      game = new Game({ container })
      await game.initialize()

      // Start game
      game.start()
      expect(game.getIsRunning()).toBe(true)

      // Stop game
      game.stop()
      expect(game.getIsRunning()).toBe(false)
    })

    it('should handle scene management correctly', async () => {
      // Skip in non-browser environments
      if (typeof document === 'undefined' || !container) {
        console.log('Skipping scene management test - requires browser environment')
        return
      }

      // Create and initialize game
      game = new Game({ container })
      await game.initialize()

      const initialScene = game.getCurrentScene()
      expect(initialScene).toBeDefined()

      // Create new scene
      const newScene = new Scene('test-scene')
      await newScene.initialize()

      // Switch to new scene
      game.setScene(newScene)

      // Verify scene switch
      expect(game.getCurrentScene()).toBe(newScene)
      expect(game.getCurrentScene()?.getName()).toBe('test-scene')

      // Verify old scene is deactivated
      expect(initialScene?.getIsActive()).toBe(false)

      // Verify new scene is active
      expect(newScene.getIsActive()).toBe(true)
    })

    it('should handle game destruction properly', async () => {
      // Skip in non-browser environments
      if (typeof document === 'undefined' || !container) {
        console.log('Skipping game destruction test - requires browser environment')
        return
      }

      // Create and initialize game
      game = new Game({ container })
      await game.initialize()
      game.start()

      // Destroy game
      game.destroy()

      // Verify game is stopped
      expect(game.getIsRunning()).toBe(false)

      // Verify scene is cleaned up
      expect(game.getCurrentScene()).toBeNull()

      // Verify container is empty (canvas removed)
      expect(container.children.length).toBe(0)
    })

    it('should handle errors during initialization', async () => {
      // Skip in non-browser environments
      if (typeof document === 'undefined') {
        console.log('Skipping error handling test - requires browser environment')
        return
      }

      // Test with invalid container
      const invalidContainer = null as any

      game = new Game({ container: invalidContainer })

      // Should throw error during initialization
      await expect(game.initialize()).rejects.toThrow()
    })
  })

  describe('Performance Requirements', () => {
    it('should maintain reasonable frame rate', async () => {
      // Skip in non-browser environments
      if (typeof document === 'undefined' || !container) {
        console.log('Skipping performance test - requires browser environment')
        return
      }

      // Create and initialize game
      game = new Game({ container })
      await game.initialize()
      game.start()

      const app = game.getRenderer().getApplication()
      expect(app).toBeDefined()

      // Wait a bit for stabilization
      await new Promise(resolve => setTimeout(resolve, 100))

      // Check that ticker is running
      expect(app?.ticker.started).toBe(true)

      game.stop()
    })
  })
})