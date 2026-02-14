/**
 * @fileoverview TitleScene class for displaying game title and start button
 * @description Manages the title screen with game title text and play button
 */

import * as PIXI from 'pixi.js'
import { Scene } from '@/libs/game/features/scenes/Scene'

/**
 * TitleScene class that displays the game title and play button
 */
export class TitleScene extends Scene {
  private titleText: PIXI.Text | null = null
  private playButton: PIXI.Container | null = null
  private onPlayClickCallback?: () => void

  /**
   * Creates a new TitleScene instance
   */
  constructor(onPlayClick?: () => void) {
    super('TitleScene')
    this.onPlayClickCallback = onPlayClick
  }

  /**
   * Initializes the title scene
   */
  public async initialize(): Promise<void> {
    // Create title text
    this.titleText = new PIXI.Text({
      text: 'My Town Map',
      style: {
        fontFamily: 'Arial',
        fontSize: 48,
        fill: 0xffffff,
        align: 'center'
      }
    })

    // Center the text
    this.titleText.anchor.set(0.5)
    this.titleText.x = 400 // Assuming canvas width 800
    this.titleText.y = 200 // Position near top

    // Add to scene
    this.addGameObject(this.titleText)

    // Create play button
    this.playButton = new PIXI.Container()

    // Create button background
    const buttonGraphics = new PIXI.Graphics()
    buttonGraphics.fill(0x4CAF50)
    buttonGraphics.roundRect(0, 0, 200, 60, 10)
    buttonGraphics.fill()

    // Create button text
    const buttonText = new PIXI.Text({
      text: 'Play Game',
      style: {
        fontFamily: 'Arial',
        fontSize: 24,
        fill: 0xffffff,
        align: 'center'
      }
    })
    buttonText.anchor.set(0.5)
    buttonText.x = 100
    buttonText.y = 30

    // Add to button container
    this.playButton.addChild(buttonGraphics)
    this.playButton.addChild(buttonText)

    // Position button
    this.playButton.x = 300 // Center horizontally (800/2 - 100)
    this.playButton.y = 350 // Below title

    // Make button interactive
    this.playButton.interactive = true
    this.playButton.cursor = 'pointer'

    // Add click handler
    this.playButton.on('pointerdown', () => {
      this.onPlayClick()
    })

    // Add to scene
    this.addGameObject(this.playButton)
  }

  /**
   * Handles play button click
   */
  public onPlayClick(): void {
    if (this.onPlayClickCallback) {
      this.onPlayClickCallback()
    } else {
      // Default behavior - transition to game scene
      console.log('Play button clicked - transition to game scene')
    }
  }

  /**
   * Gets the title text object
   */
  public getTitleText(): PIXI.Text | null {
    return this.titleText
  }

  /**
   * Gets the play button container
   */
  public getPlayButton(): PIXI.Container | null {
    return this.playButton
  }
}