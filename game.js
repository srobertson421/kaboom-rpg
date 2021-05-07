import {
  start,
  loadSprite,
  loadSound
} from './engine.js';
import overworldScene from './scenes/overworld.js';
import interiorScene from './scenes/interior.js';
import battleScene from './scenes/battle.js';

loadSprite('tileSheet', '/assets/basictiles.png', {
  sliceX: 8,
  sliceY: 15
});

loadSprite('mapTiles', '/assets/mapTiles.png', {
  sliceX: 7,
  sliceY: 8
});

loadSprite('barTiles', '/assets/tilesInterior.png', {
  sliceX: 5,
  sliceY: 6
});

loadSprite('bar', '/assets/house1.png', {
  sliceX: 2,
  sliceY: 2,
  anims: {
    smoke: {from: 2, to: 3}
  }
});

loadSprite('character', '/assets/wizard.png', {
  sliceX: 3,
  sliceY: 4,
  anims: {
    walkDown: {from: 1, to: 2},
    walkLeft: {from: 7, to: 8},
    walkRight: {from: 10, to: 11},
    walkUp: {from: 4, to: 5}
  }
});

loadSprite('blue_robe', '/assets/wizard_robe.png', {
  sliceX: 3,
  sliceY: 4,
  anims: {
    walkDown: {from: 1, to: 2},
    walkLeft: {from: 7, to: 8},
    walkRight: {from: 10, to: 11},
    walkUp: {from: 4, to: 5}
  }
})

loadSprite('blue_robe_staff', '/assets/robe_wizard_staff.png', {
  sliceX: 3,
  sliceY: 4,
  anims: {
    walkDown: {from: 1, to: 2},
    walkLeft: {from: 7, to: 8},
    walkRight: {from: 10, to: 11},
    walkUp: {from: 4, to: 5}
  }
})

loadSprite('naked_staff', '/assets/naked_wizard_staff.png', {
  sliceX: 3,
  sliceY: 4,
  anims: {
    walkDown: {from: 1, to: 2},
    walkLeft: {from: 7, to: 8},
    walkRight: {from: 10, to: 11},
    walkUp: {from: 4, to: 5}
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
    burn: {from: 0, to: 6}
  }
});

loadSprite('mentor', '/assets/old_wizard.png', {
  sliceX: 3,
  sliceY: 4,
  anims: {
    walkDown: {from: 1, to: 2},
    walkLeft: {from: 7, to: 8},
    walkRight: {from: 10, to: 11},
    walkUp: {from: 4, to: 5}
  }
});

loadSprite('dog', '/assets/dog_wizard.png', {
  sliceX: 3,
  sliceY: 4,
  anims: {
    sitWag: {from: 0, to: 1},
    walkDown: {from: 2, to: 3},
    walkUp: {from: 4, to: 5},
    walkLeft: {from: 6, to: 7},
    walkRight: {from: 8, to: 9}
  }
});


loadSprite('dogAura', '/assets/dog_aura.png', {
  sliceX: 3,
  sliceY: 3,
  anims: {
    aura: {from: 0, to: 7}
  }
});

loadSound('overworldSound', '/assets/overworld.ogg');

overworldScene();
interiorScene();
battleScene();

start('overworld');



