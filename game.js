import {
  start,
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

loadSprite('mapTiles', '/assets/mapTiles.png', {
  sliceX: 7,
  sliceY: 8
});

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

loadSprite('blue_robe', '/assets/wizard_robe.png', {
  sliceX: 3,
  sliceY: 4,
  anims: {
    walkDown: [1,2],
    walkLeft: [7,8],
    walkRight: [10,11],
    walkUp: [4,5]
  }
})

loadSprite('blue_robe_staff', '/assets/robe_wizard_staff.png', {
  sliceX: 3,
  sliceY: 4,
  anims: {
    walkDown: [1,2],
    walkLeft: [7,8],
    walkRight: [10,11],
    walkUp: [4,5]
  }
})

loadSprite('naked_staff', '/assets/naked_wizard_staff.png', {
  sliceX: 3,
  sliceY: 4,
  anims: {
    walkDown: [1,2],
    walkLeft: [7,8],
    walkRight: [10,11],
    walkUp: [4,5]
  }
})

loadSprite('beard', '/assets/wizard_beard.png', {
  sliceX: 3,
  sliceY: 4
})

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

loadSprite('dog', '/assets/dog_wizard.png', {
  sliceX: 3,
  sliceY: 4,
  anims: {
    sitWag: [0,1],
    walkDown: [2,3],
    walkUp: [4,5],
    walkLeft: [6,7],
    walkRight: [8,9]
  }
});


loadSprite('dogAura', '/assets/dog_aura.png', {
  sliceX: 3,
  sliceY: 3,
  anims: {
    aura: [0,7]
  }
});

loadSound('overworldSound', '/assets/overworld.ogg');

overworldScene();
battleScene();

start('overworld');



