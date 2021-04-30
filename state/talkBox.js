import Observable from 'https://sean-cdn.netlify.app/js/observable/@0.0.1/observable.min.js';

import {
  showTalkBox,
  hideTalkBox
} from '../utils/talkBox.js';

const talkBox = new Observable(false);
export const talkBoxText = new Observable('');
export const talkBoxNPC = new Observable('');

talkBox.subscribe(val=>{
  if(val){
    showTalkBox(talkBoxText.value);
  } else {
    hideTalkBox();
  }

});

export default talkBox;