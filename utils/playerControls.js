import Observable from 'https://sean-cdn.netlify.app/js/observable/@0.0.1/observable.min.js';

import {
  keyDown,
  keyPress,
  keyRelease,
  get
} from '../engine.js';

const PLAYER_SPEED = 75;

let gamepad = new Observable(null);

gamepad.subscribe(newVal => {
  if(newVal !== null) {
    playerControls();
  }
});

gameControl.on('connect', pad => gamepad.value = pad);

function arrowControls(player) {
  keyDown('left', () => {
    player.move(-PLAYER_SPEED, 0);
  });

  keyDown('right', () => {
    player.move(PLAYER_SPEED, 0);
  });
  keyDown('up', () => {
    player.move(0, -PLAYER_SPEED);
  });
  keyDown('down', () => {
    player.move(0, PLAYER_SPEED);
  });

  keyPress('left', () => {
    player.play('walkLeft');
    player.isAnimated = 'left';
  });
  keyPress('right', () => {
    player.play('walkRight');
    player.isAnimated = 'right';
  });
  keyPress('up', () => {
    player.play('walkUp');
    player.isAnimated = 'up';
  });
  keyPress('down', () => {
    player.play('walkDown');
    player.isAnimated = 'down';
  });

  keyRelease('left', () => {
    if(player.isAnimated === 'left'){
      player.stop();
      player.frame = 6;
    }
  });

  keyRelease('right', () => {
    if(player.isAnimated === 'right'){
      player.stop();
      player.frame = 9;
    }
  });

  keyRelease('up', () => {
    if(player.isAnimated === 'up'){
      player.stop();
      player.frame = 3;
    }
  });

  keyRelease('down', () => {
    if(player.isAnimated === 'down'){
      player.stop();
      player.frame = 0;
    }
  });
}

function gamepadControls(player) {
  gamepad.value.on('up0', () => {
    player.move(0, -PLAYER_SPEED);
  })
  .before('up0', () => {
    player.play('walkUp');
    player.isAnimated = 'up';
  })
  .after('up0', () => {
    if(player.isAnimated === 'up'){
      player.stop();
      player.frame = 3;
    }
  });

  gamepad.value.on('down0', () => {
    player.move(0, PLAYER_SPEED);
  })
  .before('down0', () => {
    player.play('walkDown');
    player.isAnimated = 'down';
  })
  .after('down0', () => {
    if(player.isAnimated === 'down'){
      player.stop();
      player.frame = 0;
    }
  });

  gamepad.value.on('left0', () => {
    player.move(-PLAYER_SPEED, 0);
  })
  .before('left0', () => {
    player.play('walkLeft');
    player.isAnimated = 'left';
  })
  .after('left0', () => {
    if(player.isAnimated === 'left'){
      player.stop();
      player.frame = 6;
    }
  });

  gamepad.value.on('right0', () => {
    player.move(PLAYER_SPEED, 0);
  })
  .before('right0', () => {
    player.play('walkRight');
    player.isAnimated = 'right';
  })
  .after('right0', () => {
    if(player.isAnimated === 'right'){
      player.stop();
      player.frame = 9;
    }
  });
}

export default function playerControls() {
  const player = get('player')[0];
  arrowControls(player);
  if(gamepad.value) {
    gamepadControls(player);
  }
}