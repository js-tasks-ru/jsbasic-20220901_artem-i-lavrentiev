function toggleText() {
  let btn = document.querySelector('.toggle-text-button');
  let txt = document.querySelector('#text');
  btn.addEventListener('click', () => {
    txt.hidden = !txt.hidden;
  });
}
