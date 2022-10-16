import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = this.#render();
  }

  #render() {
    const elem = createElement(this.#template());

    const carouselButtons = elem.querySelectorAll('.carousel__button');
    for (const carouselButton of carouselButtons) {
      carouselButton.addEventListener('click', this.#onCarouselButtonClick);
    }
    this.#onCarrouselArrowClick(elem);

    return elem;
  }

  #onCarouselButtonClick() {
    const event = new CustomEvent("product-add", {
      detail: this.parentNode.parentNode.dataset.id,
      bubbles: true,
    });

    this.dispatchEvent(event);
  }

  #onCarrouselArrowClick(elem) {
    const slide = elem.querySelector('.carousel__inner');
    const slideCount = elem.children.length;
    const arrowRight = elem.querySelector('.carousel__arrow_right');
    const arrowLeft = elem.querySelector('.carousel__arrow_left');
    let slideOffset = 0;
    let translation = 0;
    arrowLeft.style.display = 'none';
    arrowRight.addEventListener('click', () => {
      slideOffset = slide.offsetWidth;
      translation += slideOffset;
      slide.style.transform = `translateX(-${translation}px)`;
      translation == 0 ? arrowLeft.style.display = 'none' : arrowLeft.style.display = '';
      translation == slideOffset*(slideCount-1) ? arrowRight.style.display = 'none' : arrowRight.style.display = '';
    });
    arrowLeft.addEventListener('click', () => {
      translation -= slideOffset;
      slide.style.transform = `translateX(-${translation}px)`;
      translation == 0 ? arrowLeft.style.display = 'none' : arrowLeft.style.display = '';
      translation == slideOffset*(slideCount-1) ? arrowRight.style.display = 'none' : arrowRight.style.display = '';
    });
  }

  #template() {
    return `
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">
          ${this.slides.map(slide => 
            `<div class="carousel__slide" data-id="${slide.id}">
              <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
              <div class="carousel__caption">
                <span class="carousel__price">€${slide.price.toFixed(2)}</span>
                <div class="carousel__title">${slide.name}</div>
                <button type="button" class="carousel__button">
                  <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                </button>
              </div>
            </div>
          `)
          .join('\n')}
        </div.
      </div>
    `
  }
}
document.body.addEventListener('product-add',(e) => {console.log(e.detail);})