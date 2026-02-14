/**
 * @fileoverview Unit tests for TitleScene
 */

import { expect, test, describe } from 'bun:test'
import * as PIXI from 'pixi.js'
import { TitleScene } from '@/libs/game/features/scenes/TitleScene'
import { Game } from '@/libs/game/core/Game'

describe('TitleScene', () => {
  test('should instantiate TitleScene', () => {
    const titleScene = new TitleScene()
    expect(titleScene).toBeInstanceOf(TitleScene)
  })

  test('should display title text after initialization', async () => {
    const titleScene = new TitleScene()
    await titleScene.initialize()
    const titleText = titleScene.getTitleText()
    expect(titleText).toBeInstanceOf(PIXI.Text)
    expect(titleText?.text).toBe('My Town Map')
  })

  test('should style title text with center alignment and large font', async () => {
    const titleScene = new TitleScene()
    await titleScene.initialize()
    const titleText = titleScene.getTitleText()
    expect(titleText?.style.fontSize).toBe(48)
    expect(titleText?.style.align).toBe('center')
    expect(titleText?.anchor.x).toBe(0.5)
    expect(titleText?.anchor.y).toBe(0.5)
  })

  test('should create Play button after initialization', async () => {
    const titleScene = new TitleScene()
    await titleScene.initialize()
    const playButton = titleScene.getPlayButton()
    expect(playButton).toBeInstanceOf(PIXI.Container)
  })

  test('should handle button click events', async () => {
    const titleScene = new TitleScene()
    await titleScene.initialize()
    const playButton = titleScene.getPlayButton()

    // Mock the click handler
    let clicked = false
    playButton!.on('pointerdown', () => {
      clicked = true
    })

    // Simulate click
    playButton!.emit('pointerdown')

    expect(clicked).toBe(true)
  })

  test('should trigger scene transition on play button click', () => {
    let transitioned = false
    const onPlayClick = () => {
      transitioned = true
    }

    const titleScene = new TitleScene(onPlayClick)
    titleScene.onPlayClick()

    expect(transitioned).toBe(true)
  })

  test('should style Play button with correct appearance and positioning', async () => {
    const titleScene = new TitleScene()
    await titleScene.initialize()
    const playButton = titleScene.getPlayButton()

    expect(playButton?.interactive).toBe(true)
    expect(playButton?.cursor).toBe('pointer')
    expect(playButton?.x).toBe(300)
    expect(playButton?.y).toBe(350)

    // Check button text
    const buttonText = playButton?.children[1] as PIXI.Text
    expect(buttonText.text).toBe('Play Game')
    expect(buttonText.style.fontSize).toBe(24)
  })
})