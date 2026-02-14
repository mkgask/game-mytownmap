/**
 * @fileoverview Main Game class for coordinating game systems
 * @description Manages the overall game lifecycle, renderer, and scenes
 */

import * as PIXI from 'pixi.js'
import { Renderer } from '@/libs/game/features/rendering/Renderer'
import { Scene } from '@/libs/game/features/scenes/Scene'
import { TitleScene } from '@/libs/game/features/scenes/TitleScene'

/**
 * Configuration options for the Game
 */
export interface GameConfig {
  /** Canvas container element */
  container: HTMLElement
  /** Game width */
  width?: number
  /** Game height */
  height?: number
  /** Background color */
  backgroundColor?: number
  /** Enable antialiasing */
  antialias?: boolean
}

/**
 * Main Game class that coordinates all game systems
 */
export class Game {
  private renderer: Renderer
  private currentScene: Scene | null = null
  private config: GameConfig
  private isRunning: boolean = false

  /**
   * Creates a new Game instance
   * @param config - Game configuration
   */
  constructor(config: GameConfig) {
    this.config = {
      width: 800,
      height: 600,
      backgroundColor: 0x1099bb,
      antialias: true,
      ...config
    }

    this.renderer = new Renderer({
      width: this.config.width,
      height: this.config.height,
      backgroundColor: this.config.backgroundColor,
      antialias: this.config.antialias
    })
  }

  /**
   * Initializes the game
   * @returns Promise that resolves when initialization is complete
   */
  public async initialize(): Promise<void> {
    try {
      // Initialize the renderer
      await this.renderer.initialize()

      // Attach renderer to canvas
      this.renderer.attachToCanvas(this.config.container)

      // Create and initialize the main scene
      this.currentScene = new TitleScene(() => this.transitionToGameScene())
      await this.currentScene.initialize()

      // Add scene to application stage
      const app = this.renderer.getApplication()
      if (app && this.currentScene) {
        app.stage.addChild(this.currentScene)
        this.currentScene.setActive(true)
      }

    } catch (error) {
      throw new Error(`Failed to initialize game: ${error}`)
    }
  }

  /**
   * Starts the game loop
   */
  public start(): void {
    if (this.isRunning) {
      console.warn('Game is already running')
      return
    }

    const app = this.renderer.getApplication()
    if (!app) {
      throw new Error('Cannot start game: renderer not initialized')
    }

    // Set up game loop
    app.ticker.add(this.update.bind(this))
    this.isRunning = true
  }

  /**
   * Stops the game loop
   */
  public stop(): void {
    if (!this.isRunning) {
      return
    }

    const app = this.renderer.getApplication()
    if (app) {
      app.ticker.remove(this.update.bind(this))
    }

    this.isRunning = false
  }

  /**
   * Updates the game state
   * @param ticker - PIXI ticker object
   */
  private update(ticker: PIXI.Ticker): void {
    const deltaTime = ticker.deltaMS / 1000 // Convert to seconds

    if (this.currentScene && this.currentScene.getIsActive()) {
      this.currentScene.update(deltaTime)
    }
  }

  /**
   * Sets the current scene
   * @param scene - The scene to set as current
   */
  public setScene(scene: Scene): void {
    // Deactivate current scene
    if (this.currentScene) {
      this.currentScene.setActive(false)
    }

    // Remove current scene from stage
    const app = this.renderer.getApplication()
    if (app && this.currentScene) {
      app.stage.removeChild(this.currentScene)
    }

    // Set new scene
    this.currentScene = scene
    this.currentScene.setActive(true)

    // Add new scene to stage
    if (app) {
      app.stage.addChild(this.currentScene)
    }
  }

  /**
   * Transitions from title scene to game scene
   */
  private transitionToGameScene(): void {
    // Create game scene (placeholder - will be replaced with actual GameScene)
    const gameScene = new Scene('GameScene')
    this.setScene(gameScene)
  }

  /**
   * Gets the current scene
   * @returns The current scene or null if none set
   */
  public getCurrentScene(): Scene | null {
    return this.currentScene
  }

  /**
   * Checks if the game is running
   * @returns True if running, false otherwise
   */
  public getIsRunning(): boolean {
    return this.isRunning
  }

  /**
   * Destroys the game and cleans up resources
   */
  public destroy(): void {
    this.stop()

    if (this.currentScene) {
      this.currentScene.destroyScene()
      this.currentScene = null
    }

    this.renderer.destroy()
  }
}