import Observable from 'https://sean-cdn.netlify.app/js/observable/@0.0.1/observable.min.js';

import {
  showDialog,
  hideDialog
} from '../utils/dialog.js';

const dialog = new Observable(false);
export const dialogText = new Observable('');

dialog.subscribe(val=>{
  if(val){
    showDialog(dialogText.value);
  } else {
    hideDialog();
  }

});

export default dialog;