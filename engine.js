const engine = kaboom({
  fullscreen: true,
	scale: 2,
  debug: true
});

export const init = engine.init;
export const scene = engine.scene;
export const add = engine.add;
export const readd = engine.readd;
export const text = engine.text;
export const pos = engine.pos;
export const start = engine.start;
export const loadSprite = engine.loadSprite;
export const loadSound = engine.loadSound;
export const sprite = engine.sprite;
export const gravity = engine.gravity;
export const body = engine.body;
export const keyDown = engine.keyDown;
export const keyPress = engine.keyPress;
export const keyRelease = engine.keyRelease;
export const width = engine.width;
export const height = engine.height;
export const scale = engine.scale;
export const origin = engine.origin;
export const action = engine.action;
export const destroy = engine.destroy;
export const overlaps = engine.overlaps;
export const mouseClick = engine.mouseClick;
export const go = engine.go;
export const rand = engine.rand;
export const play = engine.play;
export const get = engine.get;
export const wait = engine.wait;
export const loop = engine.loop;
export const addLevel = engine.addLevel;
export const vec2 = engine.vec2;
export const camScale = engine.camScale;
export const camPos = engine.camPos;
export const solid = engine.solid;
export const collides = engine.collides;
export const every = engine.every;
export const layers = engine.layers;
export const layer = engine.layer;
export const area = engine.area;
export const rect = engine.rect;



export default engine;