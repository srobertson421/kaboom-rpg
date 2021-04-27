import Observable from 'https://sean-cdn.netlify.app/js/observable/@0.0.1/observable.min.js';

import {
  keyDown,
  keyPress,
  keyRelease,
  get,
  add,
  sprite,
  pos
} from '../engine.js';

import gameState from '../state/gameState.js';

const PLAYER_SPEED = 75;

let gamepad = new Observable(null);
let paused = false;

gamepad.subscribe(newVal => {
  if(newVal !== null) {
    playerControls();
  }
});

gameControl.on('connect', pad => gamepad.value = pad);

function wasdControls(player) {
  document.addEventListener('keydown', e => {
    const { key } = e;
    
    switch(key) {
      case 'w':
        player.move(0, -PLAYER_SPEED);
        break;
      case 'a':
        player.move(-PLAYER_SPEED, 0);
        break;
      case 's':
        player.move(0, PLAYER_SPEED);
        break;
      case 'd':
        player.move(PLAYER_SPEED, 0);
        break;
      default:
        break;
    }
  });
}

gameState.subscribe(newVal => {

  console.log('gamestate: ', newVal)

  if(newVal.paused){
    paused = newVal.paused;

    playerControls();

  }
})

function arrowControls(player) {

    keyDown('left', () => {
      if(!player.paused){
        player.move(-PLAYER_SPEED, 0);
      }
      
    });
  
    keyDown('right', () => {
      if(!player.paused){
        player.move(PLAYER_SPEED, 0);
      }
      
    });
    keyDown('up', () => {
      if(!player.paused){
        player.move(0, -PLAYER_SPEED);
      }
      
    });
    keyDown('down', () => {
      if(!player.paused){
        player.move(0, PLAYER_SPEED);
      }
      
    });
  
    keyPress('left', () => {
      if(!player.paused){

        player.play('walkLeft');
        player.robe.play('walkLeft');
        player.staff.play('walkLeft');
        player.beard.hidden = false;
        player.beard.frame = 4;
        player.isAnimated = 'left';

      }
     
    });
    keyPress('right', () => {
      if(!player.paused){

        player.play('walkRight');
        player.robe.play('walkRight');
        player.staff.play('walkRight');
        player.beard.hidden = false;
        player.beard.frame = 5;
        player.isAnimated = 'right';

      }
      
    });
    keyPress('up', () => {
      if(!player.paused){

        player.play('walkUp');
        player.robe.play('walkUp');
        player.staff.play('walkUp');
        player.beard.hidden = true;
        player.isAnimated = 'up';

      }
      
    });
    keyPress('down', () => {
      if(!player.paused){

        player.play('walkDown');
        player.robe.play('walkDown');
        player.staff.play('walkDown');
        player.beard.hidden = false;
        player.beard.frame = 3;
        player.isAnimated = 'down';

      }
      
    });
  
    keyRelease('left', () => {
      if(player.isAnimated === 'left'){
        player.stop();
        player.robe.stop();
        player.staff.stop();
        player.frame = 6;
        player.robe.frame = 6;
        player.staff.frame = 6;
      }
    });
  
    keyRelease('right', () => {
      if(player.isAnimated === 'right'){
        player.stop();
        player.robe.stop();
        player.staff.stop();
        player.frame = 9;
        player.robe.frame = 9;
        player.staff.frame = 9;
      }
    });
  
    keyRelease('up', () => {
      if(player.isAnimated === 'up'){
        player.stop();
        player.robe.stop();
        player.staff.stop();
        player.frame = 3;
        player.robe.frame = 3;
        player.staff.frame = 3;
      }
    });
  
    keyRelease('down', () => {
      if(player.isAnimated === 'down'){
        player.stop();
        player.robe.stop();
        player.staff.stop();
        player.frame = 0;
        player.robe.frame = 0;
        player.staff.frame = 0;
      }
    });
  
}

function gamepadControls(player) {

    gamepad.value.on('up0', () => {
      if(!player.paused){
        player.move(0, -PLAYER_SPEED);
      }
    })
    .before('up0', () => {
      if(!player.paused){
        player.play('walkUp');
        player.robe.play('walkUp');
        player.staff.play('walkUp');
        player.beard.hidden = true;
        player.isAnimated = 'up';
      }
    })
    .after('up0', () => {
      if(player.isAnimated === 'up'){
        player.stop();
        player.robe.stop();
        player.staff.stop();
        player.frame = 3;
        player.robe.frame = 3;
        player.staff.frame = 3;
      }
    });
  
    gamepad.value.on('down0', () => {
      if(!player.paused){
        player.move(0, PLAYER_SPEED);
      }
    })
    .before('down0', () => {
      if(!player.paused){
        player.play('walkDown');
        player.robe.play('walkDown');
        player.staff.play('walkDown');
        player.beard.hidden = false;
        player.beard.frame = 3;
        player.isAnimated = 'down';
      }
    })
    .after('down0', () => {
      if(player.isAnimated === 'down'){
        player.stop();
        player.robe.stop();
        player.staff.stop();
        player.frame = 0;
        player.robe.frame = 0;
        player.staff.frame = 0;
      }
    });
  
    gamepad.value.on('left0', () => {
      if(!player.paused){
       player.move(-PLAYER_SPEED, 0);
      }
    })
    .before('left0', () => {
      if(!player.paused){
        player.play('walkLeft');
        player.robe.play('walkLeft');
        player.staff.play('walkLeft');
        player.beard.hidden = false;
        player.beard.frame = 4;
        player.isAnimated = 'left';
      }
    })
    .after('left0', () => {
      if(player.isAnimated === 'left'){
        player.stop();
        player.robe.stop();
        player.staff.stop();
        player.frame = 6;
        player.robe.frame = 6;
        player.staff.frame = 6;
      }
    });
  
    gamepad.value.on('right0', () => {
      if(!player.paused){
       player.move(PLAYER_SPEED, 0);
      }
    })
    .before('right0', () => {
      if(!player.paused){
        player.play('walkRight');
        player.robe.play('walkRight');
        player.staff.play('walkRight');
        player.beard.hidden = false;
        player.beard.frame = 5;
        player.isAnimated = 'right';
      }
    })
    .after('right0', () => {
      if(player.isAnimated === 'right'){
        player.stop();
        player.robe.stop();
        player.staff.stop();
        player.frame = 9;
        player.robe.frame = 9;
        player.staff.frame = 9;
      }
    });
}

export default function playerControls() {
  const player = get('player')[0];

  arrowControls(player);
  wasdControls(player);
  if(gamepad.value) {
    gamepadControls(player);
  }
}