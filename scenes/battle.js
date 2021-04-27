import {
  scene,
  add,
  text,
  pos,
  width,
  height,
  origin,
  keyPress,
  go,
  sprite,
  vec2,
  destroy
} from '../engine.js';

const battleScene = () => {
  return scene('battle', () => {
    // add([
    //   text('BATTLE', 28),
    //   pos(width() / 2, height() / 2),
    //   origin('center')
    // ]);

    const player = add([
      sprite('player-battle'),
      pos(50, height() - 50),
      origin('center')
    ]);

    player.onAnimPlay('cast', () => {
      const plasma = add([
        sprite('plasma'),
        pos(player.pos),
        origin('center')
      ]);

      plasma.onAnimEnd('fire', () => {
        destroy(plasma);
      });

      plasma.play('fire');
    });

    player.play('cast', true);

    add([
      sprite('rat'),
      pos(width() - 50, 50),
      origin('center')
    ]);
  
    keyPress('space', () => {
      go('overworld');
    });
  });
}

export default battleScene;