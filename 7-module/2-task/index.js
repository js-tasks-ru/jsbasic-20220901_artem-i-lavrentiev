import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.elem = this.#render();
  }

  open() {
    document.body.append(this.elem);
    document.body.classList.add('is-modal-open');
  }

  setTitle(title) {
    const elemTitle = this.elem.querySelector('.modal__title');
    elemTitle.textContent = title;
  }

  setBody(body) {
    const elemBody = this.elem.querySelector('.modal__body');
    elemBody.innerHTML = '';
    elemBody.append(body);
  }

  close() {
    this.elem.remove();
    document.body.classList.remove('is-modal-open');
  }

  #render() {
    const elem = createElement(this.#template());
    const btnClose = elem.querySelector('.modal__close');
    
    btnClose.addEventListener('click', () => {this.close()}, {once : true});

    document.addEventListener('keydown', (e) => {
      console.log(111);
      if(e.code === 'Escape') {
        this.close()};
    }, {once : true});

    return elem;
  }

  #template() {
    return `
    <div class="modal">
      <div class="modal__overlay"></div>
      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
          <h3 class="modal__title">
            Вот сюда нужно добавлять заголовок
          </h3>
        </div>
        <div class="modal__body">
          A сюда нужно добавлять содержимое тела модального окна
        </div>
      </div>
    </div>
    `
  }
} 
