import React from 'react';

import * as PIXI from 'pixi.js';
import { PixiComponent, useApp } from '@inlet/react-pixi';
import { Viewport as PixiViewport } from 'pixi-viewport';


interface ViewportProps {
  width: number,
  height: number,
}

interface PixiComponentViewportProps extends ViewportProps {
  app: PIXI.Application,
}

const PixiComponentViewport = PixiComponent("Viewport", {
  create: (props: PixiComponentViewportProps) => {
    const viewport = new PixiViewport({
      screenWidth: props.width,
      screenHeight: props.height,
      worldWidth: props.width * 4,
      worldHeight: props.height * 4,
      ticker: props.app.ticker,
      interaction: props.app.renderer.plugins.interaction,
    });
    viewport
      .drag()
      .pinch()
      .wheel();

  const sprite = viewport.addChild(new PIXI.Sprite(PIXI.Texture.WHITE))
    sprite.tint = 0xff0000
    sprite.width = sprite.height = 100
    sprite.position.set(0, 0)

    return viewport;
  },
});

export default function Viewport(props: ViewportProps) {
  const app = useApp();
  return <PixiComponentViewport app={ app } { ...props } />;
}
