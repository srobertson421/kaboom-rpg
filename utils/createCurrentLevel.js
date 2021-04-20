import {
  addLevel,
  vec2,
  sprite,
  rand
} from '../engine.js';

import levels from '../levels.js';
import currentLevel from '../state/currentLevel.js';

export default function createCurrentLevel() {
  const map = addLevel(levels[currentLevel.value], {
    width: 16,
    height: 16,
    pos: vec2(0, 0),
    'g': () => {
      const tileNum = Math.round(rand(64,65));

      return [
        sprite('tileSheet', { frame: tileNum }),
        'grass'
      ]
    },
    'f': [
      sprite('tileSheet', { frame: 12 }),
      'flower'
    ],
    'p': [
      sprite('tileSheet', { frame: 10 }),
      'path'
    ]
  });

  return map;
}