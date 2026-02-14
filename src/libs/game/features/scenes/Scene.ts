/**
 * @fileoverview Scene class for managing game scenes
 * @description Manages a PIXI.Container for game objects and scene state
 */

import * as PIXI from 'pixi.js'

/**
 * Scene class that manages a collection of game objects
 */
export class Scene extends PIXI.Container {
  private sceneName: string
  private isActive: boolean = false

  /**
   * Creates a new Scene instance
   * @param name - Optional name for the scene
   */
  constructor(name: string = 'default') {
    super()
    this.sceneName = name
  }

  /**
   * Gets the scene name
   * @returns The scene name
   */
  public getName(): string {
    return this.sceneName
  }

  /**
   * Sets the scene name
   * @param name - The new scene name
   */
  public setName(name: string): void {
    this.sceneName = name
  }

  /**
   * Checks if the scene is currently active
   * @returns True if active, false otherwise
   */
  public getIsActive(): boolean {
    return this.isActive
  }

  /**
   * Sets the scene active state
   * @param active - Whether the scene should be active
   */
  public setActive(active: boolean): void {
    this.isActive = active
  }

  /**
   * Initializes the scene
   * Override this method in subclasses for scene-specific initialization
   */
  public async initialize(): Promise<void> {
    // Default implementation - override in subclasses
  }

  /**
   * Updates the scene
   * Override this method in subclasses for scene-specific updates
   * @param deltaTime - Time elapsed since last update
   */
  public update(deltaTime: number): void {
    // Default implementation - override in subclasses
  }

  /**
   * Destroys the scene and cleans up resources
   */
  public destroyScene(): void {
    // Remove all children
    this.removeChildren()

    // Call parent destroy
    this.destroy({ children: true })
  }

  /**
   * Adds a game object to the scene
   * @param child - The PIXI.DisplayObject to add
   * @returns The added child
   */
  public addGameObject(child: PIXI.DisplayObject): PIXI.DisplayObject {
    return this.addChild(child)
  }

  /**
   * Removes a game object from the scene
   * @param child - The PIXI.DisplayObject to remove
   * @returns The removed child
   */
  public removeGameObject(child: PIXI.DisplayObject): PIXI.DisplayObject | null {
    return this.removeChild(child)
  }

  /**
   * Gets all game objects in the scene
   * @returns Array of all children
   */
  public getGameObjects(): PIXI.DisplayObject[] {
    return this.children
  }

  /**
   * Finds a game object by name
   * @param name - The name to search for
   * @returns The found object or null
   */
  public findGameObjectByName(name: string): PIXI.DisplayObject | null {
    return this.getChildByName(name)
  }

  /**
   * Clears all game objects from the scene
   */
  public clearScene(): void {
    this.removeChildren()
  }
}