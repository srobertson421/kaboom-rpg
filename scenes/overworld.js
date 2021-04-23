import {
  scene,
  gravity,
  camScale,
  add,
  sprite,
  pos,
  get
} from '../engine.js';
import { overworldMusic } from '../state/music.js';
import SCALE from '../state/scale.js'

import {
  addPlayer,
  playerActions,
  playerCollisions
} from '../entities/player.js';
import createCurrentLevel from '../utils/createCurrentLevel.js';
import playerControls from '../utils/playerControls.js';


function addFire() {
  return add([
    sprite('fire', { animSpeed: 0.25 }),
    pos(150, 100),
    'fire'
  ]);
}

function addMentor(){
  return add([
    sprite('mentor', {animSpeed: 0.25}),
    pos(230, 100),
    'mentor'
  ])
}

const overworldScene = () => {
  return scene('overworld', () => {
    gravity(0);

    // if(!overworldMusic.value) {
    //   overworldMusic.value = play('overworldSound', { loop: true });
    // } else {
    //   overworldMusic.value.resume();
    // }

    camScale(SCALE.value);
  
    createCurrentLevel();

    addFire();
  
    addMentor();

    addPlayer();
  
    playerControls();

    playerCollisions();

    playerActions();

    const fire = get('fire')[0];
    fire.play('burn');

    var mentor = get('mentor')[0];
    const MENTOR_SPEED = 75;

    function mentorStop(){
      mentor.stop();
      if(mentor.direction === 'down'){
        mentor.frame = 0;
      } else {
        mentor.frame = 3;
      }

      
    }

    function walkDown(){
      mentor.move(0, MENTOR_SPEED);
      mentor.play('walkDown');
    }

    function walkUp(){
      mentor.move(0, -MENTOR_SPEED);
      mentor.play('walkUp');
    }

    function mentorWalk(){

      clearInterval(walkDown);
      clearInterval(walkUp);

      if(mentor.direction){

        if(mentor.direction === 'down'){

          mentor.direction = 'up';
          setInterval(walkUp, 100);
          

        } else {
          mentor.direction = 'down';
          setInterval(walkDown, 100);
        }

      } else {

        mentor.direction = 'down';
        setInterval(walkDown, 100);

      }

      setTimeout(mentorStop, 1500);

    }

    // setInterval(function(){
    //   mentorWalk();
    // }, 2000)

    // there's no spatial hashing yet, if too many blocks causing lag, consider hard disabling collision resolution from blocks far away by turning off 'solid'
    // action("flower", (b) => {
    //   b.solid = player.pos.dist(b.pos) <= 20;
    // });
  });
}

export default overworldScene;