import {
  scene,
  gravity,
  camScale,
  add,
  sprite,
  pos,
  get,
  play,
  layer
} from '../engine.js';
import { overworldMusic } from '../state/music.js';
import SCALE from '../state/scale.js'


import {
  addMentor,
  mentorActions
} from '../entities/mentor.js';

import {
  addDog,
  dogActions
} from '../entities/dog.js';

import {
  addPlayer,
  playerActions,
  playerCollisions,
  playerOverlaps
} from '../entities/player.js';
import createCurrentLevel from '../utils/createCurrentLevel.js';
import playerControls from '../utils/playerControls.js';


function addFire() {
  return add([
    sprite('fire', { animSpeed: 0.25 }),
    pos(150, 100),
    layer('bg'),
    'fire'
  ]);
}


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

    addFire();
  
    addDog();

    addMentor();

    addPlayer();

    playerControls();

    playerCollisions();

    playerOverlaps();

    playerActions();

    mentorActions();

    dogActions();

    const fire = get('fire')[0];
    fire.play('burn');

    // there's no spatial hashing yet, if too many blocks causing lag, consider hard disabling collision resolution from blocks far away by turning off 'solid'
    // action("flower", (b) => {
    //   b.solid = player.pos.dist(b.pos) <= 20;
    // });
  });
}

export default overworldScene;