// @ts-nocheck

import { useState, useEffect, useRef } from 'react';
import { Stage } from '@inlet/react-pixi';

import Plot, { PlotProps, PlotGrade } from 'components/Plot';
import Viewport from 'components/Viewport';
import styles from './Field.module.css';


const defaultProps: PlotProps[] = [
  {
    grade: PlotGrade.Poor,
    index: 1,
    name: "Plot1",
  },
  {
    grade: PlotGrade.Excellent,
    index: 2,
    name: "Plot2",
  }
];

export default function Field() {
  const [dimensions, setDimensions] = useState({width: 1000, height: 1000});
  useEffect(() => {
    const field = document.querySelector(`.${styles.field}`);
    setDimensions({ width: field.offsetWidth, height: field.offsetHeight });
  }, []);

//  useEffect(() => {
//  window.setTimeout(()=>{
//    const field = document.querySelector(`.${styles.field}`);
//    const app = new PIXI.Application({backgroundColor: "var(--grass-green)"});
//    field.appendChild(app.view);
//
//    const viewport = new Viewport({
//      screenWidth: field.offsetWidth,
//      screenHeight: field.offsetHeight,
//      worldWidth: 5000,
//      worldHeight: 5000,
//      interaction: app.renderer.plugins.interaction,
//    });
//
//    console.log(viewport.options, viewport);
//    app.stage.addChild(viewport);
//    viewport
//      .drag()
//      .pinch()
//      .wheel();
//
//
//    console.log(app.view.width, app.view.height);
//
////    Object.assign(app.view.style, {
////    width: field.offsetWidth + 'px',
////    height: field.offsetHeight + 'px',
////    });
//
//    viewport.update();
//    const sprite = viewport.addChild(new PIXI.Sprite(PIXI.Texture.WHITE))
//    sprite.tint = 0xff0000
//    sprite.width = sprite.height = 100
//    sprite.position.set(100, 100)
//  }, 1000);
//  }, []);


  return (
    <div className={styles.field}>
      <Stage width={dimensions.width} height={dimensions.height}>
        <Viewport width={dimensions.width} height={dimensions.height} />
      </Stage>
    </div>
  );
}
