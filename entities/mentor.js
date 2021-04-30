import {
  get,
  keyPress,
  add,
  sprite,
  pos,
  action,
  every,
  layer,
  solid
} from '../engine.js';

import talkBox, { talkBoxText, talkBoxNPC } from '../state/talkBox.js';

const MENTOR_SPEED = 10;

function mentorStop(mentor){
  mentor.stop();
  if(mentor.direction === 'down'){
    mentor.frame = 0;
  } else if(mentor.direction === 'up') {
    mentor.frame = 3;
  } else if(mentor.direction === 'right'){
    mentor.frame = 6;
  } else {
    mentor.frame = 9;
  }
}

function walkDown(mentor){
  mentor.stop();
  mentor.play('walkDown');
}

function walkUp(mentor){
  mentor.stop();
  mentor.play('walkUp');
}

function walkRight(mentor){
  mentor.stop();
  mentor.play('walkRight');
}

function walkLeft(mentor){
  mentor.stop();
  mentor.play('walkLeft');
}

function moveToPathPoint(mentor){
  // i am moving the x plane first. then y
  if(Math.ceil(mentor.pos.x) < mentor.path[mentor.pathIndex][0]){
    // if we need to move to the right
    mentor.move(MENTOR_SPEED, 0);
  } else if(Math.ceil(mentor.pos.x) > mentor.path[mentor.pathIndex][0]){
    // if we need to move to the left
    mentor.move(-MENTOR_SPEED, 0);
  }else if(Math.ceil(mentor.pos.y) < mentor.path[mentor.pathIndex][1]){
    // if we need to move down
    mentor.move(0, MENTOR_SPEED);
  } else if(Math.ceil(mentor.pos.y) > mentor.path[mentor.pathIndex][1]){
    // if we need to move up
    mentor.move(0, -MENTOR_SPEED);
  } else if(Math.ceil(mentor.pos.x) === mentor.path[mentor.pathIndex][0] && Math.ceil(mentor.pos.y) === mentor.path[mentor.pathIndex][1]){
    // now we check for y
    mentor.checking = true;
    // we are at the final location of our first path coordinates
    mentor.move(0,0);
    setPathIndex(mentor);
  }
}

function setMentorAnimation(mentor){
  if(mentor.direction === 'down'){
    walkDown(mentor);
  } else if(mentor.direction === 'up') {
    walkUp(mentor);
  } else if(mentor.direction === 'right'){
    walkRight(mentor);
  } else {
    walkLeft(mentor);
  }
}

function setPathIndex(mentor){

  if(!mentor.reverse){
    if(mentor.pathIndex < mentor.path.length - 1){
      mentor.pathIndex++;
    } else {
      // we are at the last point lets turn around;
      mentor.reverse = true;
      mentor.pathIndex--;
    }
  } else {
    if(mentor.pathIndex > 0){
      mentor.pathIndex--;
    } else {
      //we are at the beginning of the path lets turn around;
      mentor.reverse = false;
      mentor.pathIndex++; 
    }
  }

  if(mentor.reverse){
    //check for animation
    if(Math.ceil(mentor.pos.x) === mentor.path[mentor.pathIndex][0]){
      // if we need to move up
      mentor.direction = 'up';
    } else if(Math.ceil(mentor.pos.y) === mentor.path[mentor.pathIndex][1]){
      // if we need to move left
      mentor.direction = 'left';
    }
  } else {
     // check for animation
     if(Math.ceil(mentor.pos.x) === mentor.path[mentor.pathIndex][0]){
        // if we need to move down
        mentor.direction = 'down';
      } else if(Math.ceil(mentor.pos.y) === mentor.path[mentor.pathIndex][1]){
        // if we need to move right
        mentor.direction = 'right';
      } 
  }
  setMentorAnimation(mentor);
  mentor.checking = false;
}

export function addMentor() {
  const mentor = add([
    sprite('mentor', {animSpeed: 0.25}),
    pos(230, 0),
    layer('player'),
    solid(),
    'mentor',
    'pausable',
    {
      reverse: false,
      stopped: false,
      path: [[230, 0], [230, 190], [480, 190]],
      pathIndex: 0,
      checking: false,
      direction: 'down'
    }
  ]);
}

export function mentorActions(){
  action('mentor', mentor => {
    const player = get('player')[0];
    mentor.resolve();
    if(!mentor.checking){
      moveToPathPoint(mentor);
    }
    let showInteraction = player.pos.dist(mentor.pos) <= 20;
    if(showInteraction){
      talkBoxText.value = 'Press E To Talk';
      talkBoxNPC.value = 'mentor';
      talkBox.value = true;
      mentor.checking = true;
      

      if(!mentor.interacted){
        mentor.interacted = true;
        mentorStop(mentor);
      }
    } else {

      if(mentor.interacted){
        
        talkBox.value = false;
        if(mentor.checking){
          setMentorAnimation(mentor);
        }
        mentor.interacted = false;
        mentor.checking = false;

      }
      
    }
  })
}