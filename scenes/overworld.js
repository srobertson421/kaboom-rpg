import {
  scene,
  gravity,
  camScale
} from '../engine.js';
import { overworldMusic } from '../state/music.js';
import SCALE from '../state/scale.js'

import {
  addPlayer,
  playerActions,
  playerCollisions,
  playerControls
} from '../entities/player.js';
import createCurrentLevel from '../utils/createCurrentLevel.js';

const overworldScene = () => {
  return scene('overworld', () => {
    gravity(0);

    // if(!overworldMusic.value) {
    //   overworldMusic.value = play('overworldSound', { loop: true });
    // } else {
    //   overworldMusic.value.resume();
    // }

    camScale(SCALE.value);
  
    createCurrentLevel();
  
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