import {
  addLevel,
  vec2,
  sprite,
  rand,
  layers,
  layer,
  solid
} from '../engine.js';

import levels from '../levels.js';
import currentLevel from '../state/currentLevel.js';
import { path, brick, grass, water, cliff, fence } from '../utils/mapTileNames.js';

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
      const tileNum = `main${Math.round(rand(1,3))}`;

      return [
        sprite('mapTiles', { frame: grass[tileNum] }),
        layer('base'),
        'grass'
      ]
    }
  }) 


  const map = addLevel(levels[currentLevel.value], {
    width: 16,
    height: 16,
    pos: vec2(0, 0),
    //path main
    'p': () => {
      const tileNum = `main${Math.round(rand(1,4))}`;
      return [
        sprite('mapTiles', { frame: path[tileNum]}),
        layer('bg'),
        'path'
      ]
    },
    //path top left
    '9': [
      sprite('mapTiles', { frame: path.topLeft }),
      layer('bg'),
      'pathTopLeft'
    ],

    //path top right
    '-': [
      sprite('mapTiles', { frame: path.topRight }),
      layer('bg'),
      'pathTopRight'
    ],
    //path top
    '0': () => {
      const tileNum = `top${Math.round(rand(1,2))}`;
      return [
        sprite('mapTiles', { frame: path[tileNum]}),
        layer('bg'),
        'pathTop'
      ]
    },

    //path left
    'o': () => {
      const tileNum = `left${Math.round(rand(1,2))}`;
      return [
        sprite('mapTiles', { frame: path[tileNum]}),
        layer('bg'),
        'pathLeft'
      ]
    },

    //path right
    '[': () => {
      const tileNum = `right${Math.round(rand(1,2))}`;
      return [
        sprite('mapTiles', { frame: path[tileNum]}),
        layer('bg'),
        'pathRight'
      ]
    },

    //path bottom left
    'l': [
      sprite('mapTiles', { frame: path.bottomLeft }),
      layer('bg'),
      'pathBottomLeft'
    ],

    //path bottom right
    '"': [
      sprite('mapTiles', { frame: path.bottomRight }),
      layer('bg'),
      'pathBottomRight'
    ],
    //path bottom
    ';': () => {
      const tileNum = `bottom${Math.round(rand(1,2))}`;
      return [
        sprite('mapTiles', { frame: path[tileNum]}),
        layer('bg'),
        'pathBottom'
      ]
    },
    //path top left inside
    '(': [
      sprite('mapTiles', { frame: path.topLeftInside }),
      layer('bg'),
      'pathTopLeftInside'
    ],
    //path top right inside
    '_': [
      sprite('mapTiles', { frame: path.topRightInside }),
      layer('bg'),
      'pathTopRightInside'
    ],
    //path bottom left inside
    'L': [
      sprite('mapTiles', { frame: path.bottomLeftInside }),
      layer('bg'),
      'pathBottomLeftInside'
    ],
    //path bottom right inside
    ':': [
      sprite('mapTiles', { frame: path.bottomRightInside }),
      layer('bg'),
      'pathBottomRightInside'
    ],
    'w': [
      sprite('mapTiles', { frame: water.main }),
      layer('bg'),
      solid(),
      'water'
    ],

    // water top left
    '1': [
      sprite('mapTiles', { frame: water.topLeft }),
      layer('bg'),
      solid(),
      'waterTopLeft'
    ],
    // water top
    '2': [
      sprite('mapTiles', { frame: water.top }),
      layer('bg'),
      solid(),
      'waterTop'
    ],
    // water top right
    '3': [
      sprite('mapTiles', { frame: water.topRight }),
      layer('bg'),
      solid(),
      'waterTopRight'
    ],
    // water right
    'e': [
      sprite('mapTiles', { frame: water.right }),
      layer('bg'),
      solid(),
      'waterRight'
    ],
    // water bottom right
    'd': [
      sprite('mapTiles', { frame: water.bottomRight }),
      layer('bg'),
      solid(),
      'waterBottomRight'
    ],
    // water bottom
    's': [
      sprite('mapTiles', { frame: water.bottom }),
      layer('bg'),
      solid(),
      'waterBottom'
    ],
    // water bottom left
    'a': [
      sprite('mapTiles', { frame: water.bottomLeft }),
      layer('bg'),
      solid(),
      'waterBottomLeft'
    ],
    // water left
    'q': [
      sprite('mapTiles', { frame: water.left }),
      layer('bg'),
      solid(),
      'waterLeft'
    ],
    //cliff left
    'z': [
      sprite('mapTiles', { frame: cliff.left }),
      layer('bg'),
      solid(),
      'cliffLeft'
    ],
    //cliff right
    'v': [
      sprite('mapTiles', { frame: cliff.right }),
      layer('bg'),
      solid(),
      'cliffRight'
    ],
    //cliff middleLeft
    'x': [
      sprite('mapTiles', { frame: cliff.middleLeft }),
      layer('bg'),
      solid(),
      'cliffMiddleLeft'
    ],
    //cliff middleRight
    'c': [
      sprite('mapTiles', { frame: cliff.middleRight}),
      layer('bg'),
      solid(),
      'cliffMiddleRight'
    ],

  });

  return map;
}