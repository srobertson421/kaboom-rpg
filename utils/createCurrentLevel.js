import {
  addLevel,
  vec2,
  sprite
} from '../engine.js';

import levels from '../levels.js';
import currentLevel from '../state/currentLevel.js';

export default function createCurrentLevel() {
  const map = addLevel(levels[currentLevel.value], {
    width: 16,
    height: 16,
    pos: vec2(0, 0),
    'g': [
      sprite('tileSheet', { frame: 11 }),
      'grass'
    ],
    'f': [
      sprite('tileSheet', { frame: 12 }),
      'flower'
    ]
  });

  return map;
}