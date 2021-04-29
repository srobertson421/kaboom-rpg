import {
  addLevel,
  vec2,
  sprite,
  rand,
  layers,
  layer
} from '../engine.js';

import levels from '../levels.js';
import currentLevel from '../state/currentLevel.js';

export default function createCurrentLevel() {


  layers([
      'base',
      'bg',
      'player',
      'ui',
  ], 'game');


  const baseLevel = [
    'gggggggggggggggggggggggggggggg',
    'gggggggggggggggggggggggggggggg',
    'gggggggggggggggggggggggggggggg',
    'gggggggggggggggggggggggggggggg',
    'gggggggggggggggggggggggggggggg',
    'gggggggggggggggggggggggggggggg',
    'gggggggggggggggggggggggggggggg',
    'gggggggggggggggggggggggggggggg',
    'gggggggggggggggggggggggggggggg',
    'gggggggggggggggggggggggggggggg',
    'gggggggggggggggggggggggggggggg',
    'gggggggggggggggggggggggggggggg',
    'gggggggggggggggggggggggggggggg',
    'gggggggggggggggggggggggggggggg',
    'gggggggggggggggggggggggggggggg',
    'gggggggggggggggggggggggggggggg',
    'gggggggggggggggggggggggggggggg',
    'gggggggggggggggggggggggggggggg',
    'gggggggggggggggggggggggggggggg',
  ];


  const baseMap = addLevel(baseLevel, {
    width: 16,
    height: 16,
    pos: vec2(0, 0),
    'g': () => {
      const tileNum = Math.round(rand(64,65));

      return [
        sprite('tileSheet', { frame: tileNum }),
        layer('base'),
        'grass'
      ]
    }
  }) 


  const map = addLevel(levels[currentLevel.value], {
    width: 16,
    height: 16,
    pos: vec2(0, 0),
    'f': [
      sprite('tileSheet', { frame: 12 }),
      layer('bg'),
      'flower'
    ],
    'p': [
      sprite('tileSheet', { frame: 10 }),
      layer('bg'),
      'path'
    ]
  });

  return map;
}