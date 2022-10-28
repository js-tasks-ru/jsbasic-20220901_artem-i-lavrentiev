import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.#render();
  }

  #render() {
    const elem = createElement(this.#template());
    elem.addEventListener('click', this.#onSliderClick);
    const thumb = elem.querySelector('.slider__thumb');
    thumb.ondragstart = () => false;
    elem.addEventListener('pointerdown', this.#onPointerDown);
    return elem;
  }

  #onPointerDown = () => {
    this.elem.classList.add('slider_dragging');
    document.addEventListener('pointermove', this.#onPointerMove);
    document.addEventListener('pointerup', this.#onPointerUp, { once: true });
  }

  #onPointerMove = (event) => {
    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');

    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }

    let leftPercents = leftRelative * 100;
    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;

    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;

    let value = Math.round(approximateValue);

    const sliderSteps = this.elem.querySelector('.slider__steps');
    sliderSteps.childNodes[value + 1].classList.add('slider__step-active');
    const sliderValue = this.elem.querySelector('.slider__value');
    sliderValue.innerHTML = value;
    this.value = value;
  }

  #onPointerUp = () => {
    document.removeEventListener('pointermove', this.#onPointerMove);
    this.elem.classList.remove('slider_dragging');

    this.#addEvents();
  }

  #onSliderClick = (event) => {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;

    let value = Math.round(approximateValue);

    let valuePercents = value / segments * 100;

    this.elem.querySelector('.slider__step-active').classList.remove('slider__step-active');
    let leftPercents = Math.round(leftRelative * 100);
    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');

    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;

    const sliderSteps = this.elem.querySelector('.slider__steps');
    sliderSteps.childNodes[value + 1].classList.add('slider__step-active');
    const sliderValue = this.elem.querySelector('.slider__value');
    sliderValue.innerHTML = value;
    
    this.value = value;

    this.#addEvents();
  }

  #addEvents () {
    const event = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    });

    this.elem.dispatchEvent(event);
  }

  #template() {
    let sliderSteps = '';
    for (let i = 0; i < this.steps; i++) {
      if (i == this.value) {
        sliderSteps += `<span class="slider__step-active"></span>`;
      }
      else {
        sliderSteps += `<span></span>`
      }
    }
    return `
      <div class="slider">
        <div class="slider__thumb">
          <span class="slider__value">${this.value}</span>
        </div>
        <div class="slider__progress"></div>
        <div class="slider__steps">
          ${sliderSteps}
        </div>
      </div>
    `
  }
}