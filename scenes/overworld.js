import {
  scene,
  gravity,
  addLevel,
  sprite,
  vec2,
  camScale
} from '../engine.js';
import levels from '../levels.js';
import currentLevel from '../state/currentLevel.js';
import { overworldMusic } from '../state/music.js';

import {
  addPlayer,
  playerActions,
  playerCollisions,
  playerControls
} from '../entities/player.js';

const overworldScene = () => {
  return scene('overworld', () => {
    gravity(0);

    // if(!overworldMusic.value) {
    //   overworldMusic.value = play('overworldSound', { loop: true });
    // } else {
    //   overworldMusic.value.resume();
    // }

    camScale(2);
  
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
  
    addPlayer();
  
    playerControls();

    playerCollisions();

    playerActions();

    // there's no spatial hashing yet, if too many blocks causing lag, consider hard disabling collision resolution from blocks far away by turning off 'solid'
    // action("flower", (b) => {
    //   b.solid = player.pos.dist(b.pos) <= 20;
    // });
  });
}

export default overworldScene;