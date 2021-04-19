import {
  start,
  init,
  loadSprite,
  loadSound
} from './engine.js';
import overworldScene from './scenes/overworld.js';

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
    walkDown: [0,2],
    walkLeft: [6,8],
    walkRight: [9,11],
    walkUp: [3,5]
  }
});

loadSound('overworldSound', '/assets/overworld.ogg');

init({
  // canvas: document.getElementById('game'),
  fullscreen: true,
	scale: 2
});

overworldScene();

start('overworld');