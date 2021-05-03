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

import SCALE from '../state/scale.js'


import {
  addPlayer,
  playerActions,
  playerCollisions,
  playerOverlaps
} from '../entities/player.js';
import createCurrentLevel from '../utils/createCurrentLevel.js';
import playerControls from '../utils/playerControls.js';



const interiorScene = () => {

  return scene('interior', () => {
    gravity(0);
    camScale(SCALE.value);
  
    const pos = createCurrentLevel('interior');

    addPlayer(pos);

    playerControls();

    playerCollisions();

    playerOverlaps();

    playerActions();

  });
}

export default interiorScene;