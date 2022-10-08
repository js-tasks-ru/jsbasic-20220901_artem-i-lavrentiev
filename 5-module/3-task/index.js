function initCarousel() {
  const slide = document.querySelector('.carousel__inner');
  const slideCount = slide.children.length;
  const arrowRight = document.querySelector('.carousel__arrow_right');
  const arrowLeft = document.querySelector('.carousel__arrow_left');
  let slideOffset = slide.offsetWidth;
  let translation = 0;
  arrowLeft.style.display = 'none';
  arrowRight.addEventListener('click', () => {
    translation += slideOffset;
    slide.style.transform = `translateX(-${translation}px)`;
    translation == 0 ? arrowLeft.style.display = 'none' : arrowLeft.style.display = '';
    translation == slideOffset*(slideCount-1) ? arrowRight.style.display = 'none' : arrowRight.style.display = '';
  });
  arrowLeft.addEventListener('click', () => {
    console.log(translation);
    translation -= slideOffset;
    console.log(translation);
    slide.style.transform = `translateX(-${translation}px)`;
    translation == 0 ? arrowLeft.style.display = 'none' : arrowLeft.style.display = '';
    translation == slideOffset*(slideCount-1) ? arrowRight.style.display = 'none' : arrowRight.style.display = '';
  });
}
