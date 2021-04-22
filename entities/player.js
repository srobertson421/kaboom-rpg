import {
  get,
  keyDown,
  keyPress,
  keyRelease,
  add,
  readd,
  sprite,
  pos,
  overlaps,
  rand,
  go,
  action,
  vec2,
  camPos,
  width,
  height
} from '../engine.js';
import playerPos from '../state/playerPos.js';
import currentLevel from '../state/currentLevel.js';
import SCALE from '../state/scale.js';
import levels from '../levels.js';

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

export function playerCollisions() {
  overlaps('flower', 'player', (flower, player) => {
    const randomChance = Math.round(rand(1,75));

    if(randomChance === 45) {
      // overworldMusic.value.pause();
      go('battle');
    }
  });
}


const levelWidth = 480 * (SCALE.value * 2);
const levelHeight = 304 * (SCALE.value * 2);
const widthRatio = 480 / levelWidth; 
const heightRatio = 304 / levelHeight; 
const screenRightWidthOffset = 480 - (window.innerWidth / 2) * widthRatio;
const screenLeftWidthOffset = (window.innerWidth / 2) * widthRatio;
const screenBottomHeightOffset = 304 - (window.innerHeight / 2) * heightRatio;
const screenTopHeightOffset = (window.innerHeight / 2) * heightRatio;

function checkCurrentLevel(player) {

  let levelTop = false;
  let levelRight = false;
  let levelBottom = false;
  let levelLeft = false;
  let topString,
  bottomString,
  leftString,
  rightString

  topString = `${parseInt(currentLevel.value.split('')[0]) - 1}${currentLevel.value.split('')[1]}`;
  bottomString = `${parseInt(currentLevel.value.split('')[0]) + 1}${currentLevel.value.split('')[1]}`;
  leftString = `${currentLevel.value.split('')[0]}${parseInt(currentLevel.value.split('')[1]) - 1}`;
  rightString = `${currentLevel.value.split('')[0]}${parseInt(currentLevel.value.split('')[1]) + 1}`;

  if(currentLevel.value == '00'){
    // if we are on the first level
    levelTop = false;
    levelLeft = false;

    if(levels['10']){
      levelBottom = true;
    }

    if(levels['01']){
      levelRight = true;
    }

  } else {
    // else check if there are levels on the sides of our current level
    // check top
    if(parseInt(currentLevel.value.split('')[0]) === 0){
      //if our first number in our level id is a 0 then we know there is no level above;
      levelTop = false;

    } else {
      // we build a string by decrementing the first value and check if it exists in our levels
      if(levels[topString]){
        levelTop = true;
      }
    }

    // check left 
    if(parseInt(currentLevel.value.split('')[1]) === 0){

      //if our second number in our level id is a 0 then we know there is no level above;
      levelLeft = false;

    } else {
      // we build a string by decrementing the second value and check if it exists in our levels
      if(levels[leftString]){
        levelLeft = true;
      }

    }

    // check right
    if(levels[rightString]){
      levelRight = true;
    }

    // check bottom
    if(levels[bottomString]){
      levelBottom = true;
    }
    
  }

  if(player.pos.x > 480) {

    // check if player can walk right
    if(levelRight){

      playerPos.value = vec2(-9, player.pos.y);

      currentLevel.value = rightString;
      go('overworld');

    } else {

      playerPos.value = vec2(480, player.pos.y);

      player.pos.x = 480;
    }

  } else if(player.pos.x < -10) {

    // check if player can walk left
    if(levelLeft){

      playerPos.value = vec2(480, player.pos.y);

      currentLevel.value = leftString;
      go('overworld');

    } else {

      playerPos.value = vec2(0, player.pos.y);
      console.log('player position: ', player);
      player.pos.x = 0;
    }

  } else if(player.pos.y > 304){

    // check if player can walk left
    if(levelBottom){

      playerPos.value = vec2(player.pos.x, -9);

      currentLevel.value = bottomString;
      go('overworld');

    } else {

      playerPos.value = vec2(player.pos.x, 304);

      player.pos.y = 304;
    }

  } else if(player.pos.y < -10){

    // check if player can walk left
    if(levelTop){

      playerPos.value = vec2(player.pos.x, 304);
      currentLevel.value = topString;
      go('overworld');

    } else {

      playerPos.value = vec2(player.pos.x, 0);
      
      player.pos.y = 0;
    }

  }


}


export function playerActions() {
  action('player', player => {
    playerPos.value = player.pos;

    checkCurrentLevel(player);

    camPos(player.pos);  

    if(camPos().x <= screenLeftWidthOffset) {
      camPos(screenLeftWidthOffset, camPos().y);
    } else if(camPos().x >= screenRightWidthOffset) {
      camPos(screenRightWidthOffset, camPos().y);
    }

    if(camPos().y <= screenTopHeightOffset) {
      camPos(camPos().x, screenTopHeightOffset);
    } else if(camPos().y >= screenBottomHeightOffset) {
      camPos(camPos().x, screenBottomHeightOffset);
    }
  });
}