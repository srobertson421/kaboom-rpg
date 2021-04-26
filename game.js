import {
  start,
  init,
  loadSprite,
  loadSound
} from './engine.js';
import overworldScene from './scenes/overworld.js';
import battleScene from './scenes/battle.js';

// kaboom.debug.showArea = true;

loadSprite('tileSheet', '/assets/basictiles.png', {
  sliceX: 8,
  sliceY: 15
});

// loadSprite('character', '/assets/characters.png', {
//   sliceX: 12,
//   sliceY: 8,
//   anims: {
//     walkDown: [0,2],
//     walkLeft: [12,14],
//     walkRight: [24,26],
//     walkUp: [36,38]
//   }
// });

loadSprite('character', '/assets/wizard.png', {
  sliceX: 3,
  sliceY: 4,
  anims: {
    walkDown: [1,2],
    walkLeft: [7,8],
    walkRight: [10,11],
    walkUp: [4,5]
  }
});

loadSprite('fire', '/assets/camp_fire.png', {
  sliceX: 3,
  sliceY: 3,
  anims: {
    burn: [0,6]
  }
});

loadSprite('mentor', '/assets/old_wizard.png', {
  sliceX: 3,
  sliceY: 4,
  anims: {
    walkDown: [1,2],
    walkRight: [7,8],
    walkLeft: [10,11],
    walkUp: [4,5]
  }
});

loadSound('overworldSound', '/assets/overworld.ogg');

init({
  // canvas: document.getElementById('game'),
  fullscreen: true,
	scale: 2
});

overworldScene();
battleScene();

start('overworld');