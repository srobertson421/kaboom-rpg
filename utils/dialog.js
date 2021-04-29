import {
  every
} from '../engine.js';
import gameState from '../state/gameState.js';
function pause(){

  every("pausable", (obj) => {
    obj.paused = true;
  });

  gameState.value = {
    ...gameState.value,
    paused: true
  }
}

function unPause(){

  every("pausable", (obj) => {
    obj.paused = false;
  });

  gameState.value = {
    ...gameState.value,
    paused: false
  }

}

const dialog = document.getElementById('dialog');

export function showDialog(text) {
  if(dialog.style.display !== 'block'){
    pause();
    dialog.textContent = text;
    dialog.style.display = "block";
  }
}

export function hideDialog() {
  if(dialog.style.display === 'block'){
    unPause();
    dialog.textContent = "";
    dialog.style.display = "none";
  }
}

