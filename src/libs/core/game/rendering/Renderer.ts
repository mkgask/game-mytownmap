/**
 * @fileoverview Renderer class for PixiJS Application management
 * @description Manages PixiJS Application lifecycle, configuration, and canvas attachment
 */

import * as PIXI from 'pixi.js'

/**
 * Configuration options for the Renderer
 */
export interface RendererConfig {
  /** Canvas width in pixels */
  width: number
  /** Canvas height in pixels */
  height: number
  /** Background color as hex number */
  backgroundColor: number
  /** Enable antialiasing */
  antialias: boolean
  /** Use device pixel ratio for resolution */
  resolution: number
}

/**
 * Default configuration for the Renderer
 */
const DEFAULT_CONFIG: RendererConfig = {
  width: 800,
  height: 600,
  backgroundColor: 0x1099bb,
  antialias: true,
  resolution: (typeof window !== 'undefined') ? window.devicePixelRatio || 1 : 1
}

/**
 * Renderer class that manages PixiJS Application lifecycle
 */
export class Renderer {
  private app: PIXI.Application | null = null
  private config: RendererConfig

  /**
   * Creates a new Renderer instance
   * @param config - Optional configuration overrides
   */
  constructor(config: Partial<RendererConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config }
  }

  /**
   * Initializes the PixiJS Application
   * @returns The initialized PixiJS Application
   */
  public async initialize(): Promise<PIXI.Application> {
    if (this.app) {
      throw new Error('Renderer is already initialized')
    }

    try {
      // Create application instance
      this.app = new PIXI.Application()

      // Initialize with configuration
      await this.app.init({
        width: this.config.width,
        height: this.config.height,
        backgroundColor: this.config.backgroundColor,
        antialias: this.config.antialias,
        resolution: this.config.resolution
      })

      return this.app
    } catch (error) {
      throw new Error(`Failed to initialize PixiJS Application: ${error}`)
    }
  }

  /**
   * Attaches the PixiJS Application view to a DOM element
   * @param container - The DOM element to attach the canvas to
   */
  public attachToCanvas(container: HTMLElement): void {
    if (!this.app) {
      throw new Error('Renderer must be initialized before attaching to canvas')
    }

    if (!container) {
      throw new Error('Container element is required')
    }

    try {
      container.appendChild(this.app.view as HTMLCanvasElement)
    } catch (error) {
      throw new Error(`Failed to attach canvas to container: ${error}`)
    }
  }

  /**
   * Gets the current PixiJS Application instance
   * @returns The PixiJS Application or null if not initialized
   */
  public getApplication(): PIXI.Application | null {
    return this.app
  }

  /**
   * Destroys the renderer and cleans up resources
   */
  public destroy(): void {
    if (this.app) {
      this.app.ticker.stop()
      this.app.destroy(true)
      this.app = null
    }
  }

  /**
   * Checks if the renderer is initialized
   * @returns True if initialized, false otherwise
   */
  public isInitialized(): boolean {
    return this.app !== null
  }
}