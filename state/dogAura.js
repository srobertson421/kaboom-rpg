import Observable from 'https://sean-cdn.netlify.app/js/observable/@0.0.1/observable.min.js';
import {
  add,
  sprite,
  pos,
  layer,
  get,
  destroy
} from '../engine.js';

const dogAura = new Observable(false);

function addDogAura(dog) { 
  return add([
    sprite('dogAura', { animSpeed: 0.25 }),
    pos(dog.pos.x, dog.pos.y),
    layer('player'),
    'dogAura'
  ]);
}

dogAura.subscribe(val=>{

  console.log('dog aura val: ', val);

  const dog = get('dog')[0];
  if(val){
    if(!dog.aura){
      dog.aura = addDogAura(dog);
      const dogA = get('dogAura')[0];
      dogA.play('aura');
    }
  } else {
    if(dog.aura){
      destroy(dog.aura);
      dog.aura = false;
    }
  }
});

export default dogAura;