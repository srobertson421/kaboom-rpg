import {
  add,
  sprite,
  pos,
  overlaps,
  rand,
  go,
  action,
  vec2,
  camPos,
  collides,
  every,
  keyPress,
  layer,
  solid,
  area
} from '../engine.js';
import playerPos from '../state/playerPos.js';
import currentLevel from '../state/currentLevel.js';
import SCALE from '../state/scale.js';
import levels from '../levels.js';
import inventory from '../state/inventory.js';
import currentEquipment from '../state/currentEquipment.js';
import { overworldMusic } from '../state/music.js';
export function addPlayer() {

  let player = add([
    sprite('character', { animSpeed: 0.25 }),
    pos(playerPos.value.x, playerPos.value.y),
    area(vec2(6), vec2(24)),
    layer('player'),
    solid(),
    'player',
    'pausable'
  ]);

  if(currentEquipment.value.body){
    const robeName = inventory.value.body[currentEquipment.value.body.index].name;
    player.robe = addPlayerRobe(robeName);
  }

  player.beard = addPlayerBeard();
  player.beard.frame = 3;

  if(currentEquipment.value.hands){
    const staffName = inventory.value.hands[currentEquipment.value.hands.index].name;
    player.staff = addPlayerStaff(staffName);
  }

  return player;
  
}

function addPlayerRobe(name) {
  
  return add([
    sprite(name, { animSpeed: 0.25 }),
    pos(playerPos.value.x, playerPos.value.y),
    layer('player'),
    'robe'
  ]);
  
}

function addPlayerStaff(name) {
  
  return add([
    sprite(name, { animSpeed: 0.25 }),
    pos(playerPos.value.x, playerPos.value.y),
    layer('player'),
    'staff'
  ]);
  
}

function addPlayerBeard() {
  
  return add([
    sprite('beard'),
    pos(playerPos.value.x, playerPos.value.y),
    layer('player'),
    'beard'
  ]);
  
}

export function playerOverlaps() {
  overlaps('flower', 'player', (flower, player) => {
    const randomChance = Math.round(rand(1,75));
    console.log('flowers attack');
    if(randomChance === 45) {
      // overworldMusic.value.pause();
      go('battle');
    }
  });
}




export function playerCollisions() {
  collides('mentor', 'player', (mentor, player) => {
    
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
    player.resolve();
    playerPos.value = player.pos;

    if(player.robe){
      player.robe.pos.x = player.pos.x;
      player.robe.pos.y = player.pos.y;
    }

    if(player.staff){
      player.staff.pos.x = player.pos.x;
      player.staff.pos.y = player.pos.y;
    }

    if(player.beard){
      player.beard.pos.x = player.pos.x;
      player.beard.pos.y = player.pos.y;
    }    

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