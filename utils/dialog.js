export function showDialog(text) {
  const dialog = document.getElementById('dialog');
  console.log("dialog: ", dialog);
  dialog.textContent = text;
  dialog.style.display = "block";
}

export function hideDialog() {
  const dialog = document.getElementById('dialog');
  dialog.textContent = "";
  dialog.style.display = "none";
}

