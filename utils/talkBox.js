const talk_box = document.getElementById('talk_box');
export function showTalkBox(text) {
  if(talk_box.style.display !== 'block'){
    talk_box.textContent = text;
    talk_box.style.display = "block";
  }
}
export function hideTalkBox() {
  if(talk_box.style.display === 'block'){
    talk_box.textContent = "";
    talk_box.style.display = "none";
  }
}

