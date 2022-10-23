import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.#render();
  }

  #render() {
    const elem = createElement(this.#template());

    const ribbonInner = elem.querySelector('.ribbon__inner');
    const arrowLeft = elem.querySelector('.ribbon__arrow_left');
    const arrowRight = elem.querySelector('.ribbon__arrow_right');
    arrowLeft.addEventListener('click', () => {
      ribbonInner.scrollBy(-350, 0);
    });

    arrowRight.addEventListener('click', () => {
      ribbonInner.scrollBy(350, 0);
    });

    ribbonInner.addEventListener('scroll', () => {
      ribbonInner.scrollLeft < 1 ? arrowLeft.classList.remove('ribbon__arrow_visible') : arrowLeft.classList.add('ribbon__arrow_visible');
      let scrollRight = ribbonInner.scrollWidth - ribbonInner.scrollLeft - ribbonInner.clientWidth;
      scrollRight < 1 ? arrowRight.classList.remove('ribbon__arrow_visible') : arrowRight.classList.add('ribbon__arrow_visible');
    });

    const items = elem.querySelectorAll('.ribbon__item');
    for (const item of items) {
      item.addEventListener('click', this.#onMenuItemClick);
    }

    return elem;
  }

  #onMenuItemClick() {
    this.defaultPrevented;
    const event = new CustomEvent("ribbon-select", {
      detail: this.dataset.id,
      bubbles: true,
    });

    this.dispatchEvent(event);
  }

  #template() {
    return `
    <div class="ribbon">
    <button class="ribbon__arrow ribbon__arrow_left">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
      <nav class="ribbon__inner">
        ${this.categories.map(category =>
          `<a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>`)
        .join('\n')}
      </nav>
      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>
    `
  }
}