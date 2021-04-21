import {
  get,
  keyDown,
  keyPress,
  keyRelease,
  add,
  sprite,
  pos,
  overlaps,
  rand,
  go,
  action,
  vec2,
  camPos,
  width
} from '../engine.js';
import playerPos from '../state/playerPos.js';
import currentLevel from '../state/currentLevel.js';
import SCALE from '../state/scale.js';

const PLAYER_SPEED = 75;

export function addPlayer() {
  return add([
    sprite('character', { animSpeed: 0.25 }),
    pos(playerPos.value.x, playerPos.value.y),
    'player'
  ]);
}

export function playerControls() {
  const player = get('player')[0];

  keyDown('left', () => {
    player.move(-PLAYER_SPEED, 0);
  });

  keyPress('left', () => {
    player.play('walkLeft');
  });

  keyRelease('left', () => {
    player.stop();
    player.frame = 6;
  });

  keyDown('right', () => {
    player.move(PLAYER_SPEED, 0);
  });

  keyPress('right', () => {
    player.play('walkRight');
  });

  keyRelease('right', () => {
    player.stop();
    player.frame = 9;
  });

  keyDown('up', () => {
    player.move(0, -PLAYER_SPEED);
  });

  keyPress('up', () => {
    player.play('walkUp');
  });

  keyRelease('up', () => {
    player.stop();
    player.frame = 3;
  });

  keyDown('down', () => {
    player.move(0, PLAYER_SPEED);
  });

  keyPress('down', () => {
    player.play('walkDown');
  });

  keyRelease('down', () => {
    player.stop();
    player.frame = 0;
  });
}

export function playerCollisions() {
  overlaps('flower', 'player', (flower, player) => {
    const randomChance = Math.round(rand(1,75));

    if(randomChance === 45) {
      // overworldMusic.value.pause();
      go('battle');
    }
  });
}

export function playerActions() {
  action('player', player => {
    playerPos.value = player.pos;

    if(player.pos.x > 500) {
      playerPos.value = vec2(-9, player.pos.y);

      if(currentLevel.value === '00') {
        currentLevel.value = '01';
        go('overworld');
      } else if(currentLevel.value === '01') {
        currentLevel.value = '02';
        go('overworld');
      }
    } else if(player.pos.x < -10) {
      playerPos.value = vec2(500, player.pos.y);

      if(currentLevel.value === '02') {
        currentLevel.value = '01';
        go('overworld');
      } else if(currentLevel.value === '01') {
        currentLevel.value = '00';
        go('overworld');
      }
    }

    camPos(player.pos);

    if(camPos().x <= 120) {
      camPos(120, camPos().y);
    } else if(camPos().x >= 360) {
      camPos(360, camPos().y);
    }

    if(camPos().y <= 85) {
      camPos(camPos().x, 85);
    } else if(camPos().y >= 220) {
      camPos(camPos().x, 220);
    }
  });
}