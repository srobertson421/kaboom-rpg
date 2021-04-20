import {
  scene,
  add,
  text,
  pos,
  width,
  height,
  origin,
  keyPress,
  go
} from '../engine.js';

const battleScene = () => {
  return scene('battle', () => {
    add([
      text('BATTLE', 28),
      pos(width() / 2, height() / 2),
      origin('center')
    ]);
  
    keyPress('space', () => {
      go('overworld');
    });
  });
}

export default battleScene;