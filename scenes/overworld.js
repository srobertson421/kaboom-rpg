import {
  scene,
  gravity,
  addLevel,
  sprite,
  vec2,
  overlaps,
  add,
  pos,
  width,
  height,
  get,
  keyDown,
  keyPress,
  keyRelease,
  rand,
  go,
  text,
  origin,
  action,
  play
} from '../engine.js';
import levels from '../levels.js';
import currentLevel from '../state/currentLevel.js';
import playerPos from '../state/playerPos.js';
import { overworldMusic } from '../state/music.js';

const PLAYER_SPEED = 75;

function playerControls() {
  const player = get('player')[0];

  keyDown('left', () => {
    player.move(-PLAYER_SPEED, 0);
  });

  keyPress('left', () => {
    player.play('walkLeft');
  });

  keyRelease('left', () => {
    player.stop();
    player.frame = 13;
  });

  keyDown('right', () => {
    player.move(PLAYER_SPEED, 0);
  });

  keyPress('right', () => {
    player.play('walkRight');
  });

  keyRelease('right', () => {
    player.stop();
    player.frame = 25;
  });

  keyDown('up', () => {
    player.move(0, -PLAYER_SPEED);
  });

  keyPress('up', () => {
    player.play('walkUp');
  });

  keyRelease('up', () => {
    player.stop();
    player.frame = 37;
  });

  keyDown('down', () => {
    player.move(0, PLAYER_SPEED);
  });

  keyPress('down', () => {
    player.play('walkDown');
  });

  keyRelease('down', () => {
    player.stop();
    player.frame = 1;
  });
}

const overworldScene = () => {
  scene('battle', () => {
    add([
      text('BATTLE', 28),
      pos(width() / 2, height() / 2),
      origin('center')
    ]);
  
    keyPress('space', () => {
      go('overworld');
    });
  });

  return scene('overworld', () => {
    gravity(0);

    if(!overworldMusic.value) {
      overworldMusic.value = play('overworldSound', { loop: true });
    } else {
      overworldMusic.value.resume();
    }
  
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
  
    add([
      sprite('character', { animSpeed: 0.25 }),
      pos(playerPos.value.x, playerPos.value.y),
      'player'
    ]);
  
    overlaps('flower', 'player', (flower, player) => {
      const randomChance = Math.round(rand(1,75));
  
      if(randomChance === 45) {
        overworldMusic.value.pause();
        go('battle');
      }
    });
  
    playerControls();

    action('player', player => {
      playerPos.value = player.pos;

      if(player.pos.x > width() + 10) {
        playerPos.value = vec2(10, player.pos.y);

        if(currentLevel.value === '00') {
          currentLevel.value = '01';
          go('overworld');
        } else if(currentLevel.value === '01') {
          currentLevel.value = '02';
          go('overworld');
        }
      } else if(player.pos.x < -10) {
        playerPos.value = vec2(width() - 10, player.pos.y);

        if(currentLevel.value === '02') {
          currentLevel.value = '01';
          go('overworld');
        } else if(currentLevel.value === '01') {
          currentLevel.value = '00';
          go('overworld');
        }
      }
    });

    // there's no spatial hashing yet, if too many blocks causing lag, consider hard disabling collision resolution from blocks far away by turning off 'solid'
    // action("flower", (b) => {
    //   b.solid = player.pos.dist(b.pos) <= 20;
    // });
  });
}

export default overworldScene;