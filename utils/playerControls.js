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

function leftDown(player) {
  if(!player.paused){
    player.move(-PLAYER_SPEED, 0);
  }
}

function leftPress(player) {
  if(!player.paused){
    player.play('walkLeft');
    player.robe.play('walkLeft');
    player.staff.play('walkLeft');
    player.beard.hidden = false;
    player.beard.frame = 4;
    player.isAnimated = 'left';
  }
}

function leftRelease(player) {
  if(player.isAnimated === 'left'){
    player.stop();
    player.robe.stop();
    player.staff.stop();
    player.frame = 6;
    player.robe.frame = 6;
    player.staff.frame = 6;
  }
}

function rightDown(player) {
  if(!player.paused){
    player.move(PLAYER_SPEED, 0);
  }
}

function rightPress(player) {
  if(!player.paused){
    player.play('walkRight');
    player.robe.play('walkRight');
    player.staff.play('walkRight');
    player.beard.hidden = false;
    player.beard.frame = 5;
    player.isAnimated = 'right';
  }
}

function rightRelease(player) {
  if(player.isAnimated === 'right'){
    player.stop();
    player.robe.stop();
    player.staff.stop();
    player.frame = 9;
    player.robe.frame = 9;
    player.staff.frame = 9;
  }
}

function upDown(player) {
  if(!player.paused){
    player.move(0, -PLAYER_SPEED);
  }
}

function upPress(player) {
  if(!player.paused){
    player.play('walkUp');
    player.robe.play('walkUp');
    player.staff.play('walkUp');
    player.beard.hidden = true;
    player.isAnimated = 'up';
  }
}

function upRelease(player) {
  if(player.isAnimated === 'up'){
    player.stop();
    player.robe.stop();
    player.staff.stop();
    player.frame = 3;
    player.robe.frame = 3;
    player.staff.frame = 3;
  }
}

function downDown(player) {
  if(!player.paused){
    player.move(0, PLAYER_SPEED);
  }
}

function downPress(player) {
  if(!player.paused){
    player.play('walkDown');
    player.robe.play('walkDown');
    player.staff.play('walkDown');
    player.beard.hidden = false;
    player.beard.frame = 3;
    player.isAnimated = 'down';
  }
}

function downRelease(player) {
  if(player.isAnimated === 'down'){
    player.stop();
    player.robe.stop();
    player.staff.stop();
    player.frame = 0;
    player.robe.frame = 0;
    player.staff.frame = 0;
  }
}

function keyboardControls(player) {

  keyDown('left', () => leftDown(player));
  keyDown('right', () => rightDown(player));
  keyDown('up', () => upDown(player));
  keyDown('down', () => downDown(player));
  keyDown('a', () => leftDown(player));
  keyDown('d', () => rightDown(player));
  keyDown('w', () => upDown(player));
  keyDown('s', () => downDown(player));

  keyPress('left', () => leftPress(player));
  keyPress('right', () => rightPress(player));
  keyPress('up', () => upPress(player));
  keyPress('down', () => downPress(player));
  keyPress('a', () => leftPress(player));
  keyPress('d', () => rightPress(player));
  keyPress('w', () => upPress(player));
  keyPress('s', () => downPress(player));

  keyRelease('left', () => leftRelease(player));
  keyRelease('right', () => rightRelease(player));
  keyRelease('up', () => upRelease(player));
  keyRelease('down', () => downRelease(player));
  keyRelease('a', () => leftRelease(player));
  keyRelease('d', () => rightRelease(player));
  keyRelease('w', () => upRelease(player));
  keyRelease('s', () => downRelease(player));
}

function gamepadControls(player) {
    gamepad.value.on('up0', () => leftDown(player))
    .before('up0', () => leftPress(player))
    .after('up0', () => leftRelease(player));
  
    gamepad.value.on('down0', () => downDown(player))
    .before('down0', () => downPress(player))
    .after('down0', () => downRelease(player));
  
    gamepad.value.on('left0', leftDown(player))
    .before('left0', () => leftPress(player))
    .after('left0', () => leftRelease(player));
  
    gamepad.value.on('right0', rightDown(player))
    .before('right0', () => rightPress(player))
    .after('right0', () => rightRelease(player));
}

export default function playerControls() {
  const player = get('player')[0];
  keyboardControls(player);
  if(gamepad.value) {
    gamepadControls(player);
  }
}