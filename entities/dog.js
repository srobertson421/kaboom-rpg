import {
  add,
  sprite,
  pos,
  action,
  wait,
  solid,
  layer,
  get,
  destroy
} from '../engine.js';

import talkBox, { talkBoxText, talkBoxNPC } from '../state/talkBox.js';

const MENTOR_SPEED = 20;

function dogStop(dog){
  dog.stopped = true;
  dog.stop();
  if(dog.direction === 'down'){
    dog.frame = 0;
  } else if(dog.direction === 'up') {
    dog.frame = 3;
  } else if(dog.direction === 'right'){
    dog.frame = 6;
  } else {
    dog.frame = 9;
  }
}

function walkDown(dog){
  dog.stop();
  dog.play('walkDown');
}

function walkUp(dog){
  dog.stop();
  dog.play('walkUp');
}

function walkRight(dog){
  dog.stop();
  dog.play('walkRight');
}

function walkLeft(dog){
  dog.stop();
  dog.play('walkLeft');
}

function sitWag(dog){
  dog.stop();
  dog.play('sitWag')
}

function moveToPathPoint(dog){
  // i am moving the x plane first. then y
  if(Math.ceil(dog.pos.x) < dog.path[dog.pathIndex][0]){
    // if we need to move to the right
    dog.move(MENTOR_SPEED, 0);
  } else if(Math.ceil(dog.pos.x) > dog.path[dog.pathIndex][0]){
    // if we need to move to the left
    dog.move(-MENTOR_SPEED, 0);
  }else if(Math.ceil(dog.pos.y) < dog.path[dog.pathIndex][1]){
    // if we need to move down
    dog.move(0, MENTOR_SPEED);
  } else if(Math.ceil(dog.pos.y) > dog.path[dog.pathIndex][1]){
    // if we need to move up
    dog.move(0, -MENTOR_SPEED);
  } else if(Math.ceil(dog.pos.x) === dog.path[dog.pathIndex][0] && Math.ceil(dog.pos.y) === dog.path[dog.pathIndex][1]){
    // now we check for y
    dog.checking = true;
    // we are at the final location of our first path coordinates

    dog.move(0,0);
    sitWag(dog);

    wait(1, ()=> {
      setPathIndex(dog);
    });
    
  }
}

function setDogAnimation(dog){
  if(dog.direction === 'down'){
    walkDown(dog);
  } else if(dog.direction === 'up') {
    walkUp(dog);
  } else if(dog.direction === 'right'){
    walkRight(dog);
  } else {
    walkLeft(dog);
  }
}

function setPathIndex(dog){

  if(!dog.reverse){
    if(dog.pathIndex < dog.path.length - 1){
      dog.pathIndex++;
    } else {
      // we are at the last point lets turn around;
      dog.reverse = true;
      dog.pathIndex--;
    }
  } else {
    if(dog.pathIndex > 0){
      dog.pathIndex--;
    } else {
      //we are at the beginning of the path lets turn around;
      dog.reverse = false;
      dog.pathIndex++; 
    }
  }

  if(dog.reverse){
    //check for animation
    if(Math.ceil(dog.pos.x) === dog.path[dog.pathIndex][0]){
      // if we need to move up
      dog.direction = 'up';
    } else if(Math.ceil(dog.pos.y) === dog.path[dog.pathIndex][1]){
      // if we need to move left
      dog.direction = 'left';
    }
  } else {
     // check for animation
     if(Math.ceil(dog.pos.x) === dog.path[dog.pathIndex][0]){
        // if we need to move down
        dog.direction = 'down';
      } else if(Math.ceil(dog.pos.y) === dog.path[dog.pathIndex][1]){
        // if we need to move right
        dog.direction = 'right';
      } 
  }
  setDogAnimation(dog);
  dog.checking = false;
}

export function addDog() {
  const dog = add([
    sprite('dog', {animSpeed: 0.25}),
    pos(100,0),
    layer('player'),
    solid(),
    'dog',
    'pausable',
    {
      reverse: false,
      stopped: false,
      path: [[100, 0], [100, 150], [200, 150], [200, 250]],
      pathIndex: 0,
      checking: false,
      direction: 'down'
    }
  ]);
}

export function dogActions(){
  action('dog', dog => {
    const player = get('player')[0];
    dog.resolve();
    if(!dog.checking){
      moveToPathPoint(dog);
    }

    if(dog.aura){
      dog.aura.pos.x = dog.pos.x;
      dog.aura.pos.y = dog.pos.y;
    }

    let showInteraction = player.pos.dist(dog.pos) <= 20;
    if(showInteraction){
      talkBoxText.value = 'Press E To Pet';
      talkBoxNPC.value = 'dog';
      talkBox.value = true;
      dog.checking = true;
      if(!dog.interacted){
        dog.interacted = true;
        dog.move(0,0);
        sitWag(dog);
      }
      
    } else {

      if(dog.interacted){

        talkBox.value = false;
        if(dog.checking){
          setDogAnimation(dog);
        }
        dog.checking = false;
        dog.interacted = false;

        if(dog.aura){
          destroy(dog.aura);
        }

      }
     
    }
  })
}