import {
  addLevel,
  vec2,
  sprite,
  rand,
  layers,
  layer,
  solid,
  area
} from '../engine.js';

import levels from '../levels.js';
import interiorLevels from '../utils/interiorLevels.js';
import currentLevel from '../state/currentLevel.js';
import currentInteriorLevel from '../state/currentInteriorLevel.js';
import { path, brick, grass, water, cliff, fence } from '../utils/mapTileNames.js';
import { floor, stairs, wall, window, mat, bar, stool, chairs, table, mug, black } from '../utils/barTileNames.js';

export default function createCurrentLevel(type) {

  if(type === 'interior'){

    layers([
        'base',
        'bg',
        'hl5',
        'player',
        'ui',
    ], 'game');

    const baseLevel = [
      '                                      ',
      '          ffffffffffffffffff          ',
      '          ffffffffffffffffff          ',
      '          ffffffffffffffffff          ',
      '          ffffffffffffffffff          ',
      '          ffffffffffffffffff          ',
      '          ffffffffffffffffff          ',
      '          ffffffffffffffffff          ',
      '          ffffffffffffffffff          ',
      '          ffffffffffffffffff          ',
      '          ffffffffffffffffff          ',
    ];
    // 1234567890123456789012345678901234567890

    const wallDecor = [
      '                                      ',
      '                                      ',
      '                   w  w  w            ',
      '                                      ',
      '                                      ',
      '                                      ',
      '                                      ',
      '                                      ',
      '                                      ',
      '                                      ',
      '                                      ',
    ];


    const baseMap = addLevel(baseLevel, {
      width: 16,
      height: 16,
      pos: vec2(0, 0),
      //floor 
      'f': () => {
        const tileNum = `main${Math.round(rand(1,3))}`;
        return [
          sprite('barTiles', { frame: floor[tileNum]}),
          layer('base'),
          'floor'
        ]
      },
    })
    
    const wallDeco = addLevel(wallDecor, {
      width: 16,
      height: 16,
      pos: vec2(0, 0),
      'w': [
        sprite('barTiles', { frame: window.main }),
        layer('hl5'),
        'window'
      ]
    })

    const aBar = addLevel(interiorLevels[currentInteriorLevel.value].map, {
      width: 16,
      height: 16,
      pos: vec2(0, 0),  
      //stairs down
      '<': [
        sprite('barTiles', { frame: stairs.down}),
        layer('bg'),
        'stairsDown'
      ],
      //stairs up
      '>': [
        sprite('barTiles', { frame: stairs.up}),
        layer('bg'),
        'stairsUp'
      ],
      // wall topMiddle
      'h': [
        sprite('barTiles', { frame: wall.topMiddle}),
        layer('bg'),
        'wall_topMiddle',
        solid()
      ],
      // wall topRight
      'j': [
        sprite('barTiles', { frame: wall.topRight}),
        layer('bg'),
        'wall_topRight',
        solid()
      ],
      // wall topLeft
      'g': [
        sprite('barTiles', { frame: wall.topLeft}),
        layer('bg'),
        'wall_topLeft',
        solid()
      ],
      // wall bottomMiddle
      'n': [
        sprite('barTiles', { frame: wall.bottomMiddle}),
        layer('bg'),
        'wall_bottomMiddle',
        solid()
      ],
      // wall bottomRight
      'm': [
        sprite('barTiles', { frame: wall.bottomRight}),
        layer('bg'),
        'wall_bottomRight',
        solid()
      ],
      // wall bottomLeft
      'b': [
        sprite('barTiles', { frame: wall.bottomLeft}),
        layer('bg'),
        'wall_bottomLeft',
        solid()
      ],
      // wall topCornerLeft
      't': [
        sprite('barTiles', { frame: wall.topCornerLeft}),
        layer('bg'),
        'wall_topCornerLeft',
        solid()
      ],
      // wall topCornerRight
      'u': [
        sprite('barTiles', { frame: wall.topCornerRight}),
        layer('bg'),
        'wall_topCornerRight',
        solid()
      ],
      // wall bottomCornerLeft
      'B': [
        sprite('barTiles', { frame: wall.bottomCornerLeft}),
        layer('bg'),
        'wall_bottomCornerLeft'
      ],
      // wall bottomCornerRight
      'M': [
        sprite('barTiles', { frame: wall.bottomCornerRight}),
        layer('bg'),
        'wall_bottomCornerRight'
      ],
      // wall sideLeft
      'F': [
        sprite('barTiles', { frame: wall.sideLeft}),
        layer('bg'),
        'wall_sideLeft',
        solid()
      ],
      // wall sideRight
      'K': [
        sprite('barTiles', { frame: wall.sideRight}),
        layer('bg'),
        'wall_sideRight',
        solid()
      ],

      '+': [
        sprite('barTiles', { frame: mat.welcome}),
        layer('bg'),
        'welcomeMat'
      ],
      '#': [
        sprite('barTiles', { frame: black.main }),
        layer('bg'),
        solid(),
        'border'
      ],
      '@': [
        sprite('barTiles', { frame: black.main }),
        layer('bg'),
        'borderPortal'
      ],
      '5': [
        sprite('barTiles', { frame: bar.left}),
        layer('bg'),
        area(vec2(0, 5), vec2(16)),
        solid(),
        'barLeft',
        'counter'
      ],
      '6': [
        sprite('barTiles', { frame: bar.middle }),
        layer('bg'),
        area(vec2(0, 5), vec2(16)),
        solid(),
        'barMiddle',
        'counter'
      ],
      '7': [
        sprite('barTiles', { frame: bar.right }),
        layer('bg'),
        area(vec2(0, 5), vec2(16)),
        solid(),
        'barRight',
        'counter'
      ],

    });

    return interiorLevels[currentInteriorLevel.value].pos;



  } else {



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


    const map = addLevel(levels[currentLevel.value].map, {
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

    return levels[currentLevel.value].pos;

  }


  
}