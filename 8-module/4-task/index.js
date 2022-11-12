import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (typeof product != 'undefined' && product != null && product.length != 0) {
      let cartItem = this.cartItems.find(item => item.product.id == product.id);
      if (typeof cartItem == 'undefined') {
        cartItem = {};
        cartItem.product = product;
        cartItem.count = 1;
        this.cartItems.push(cartItem);
      }
      else {
        this.cartItems.map(item => item.product.id == product.id ? item.count += 1 : item.count = item.count);
      }

      cartItem = this.cartItems.find(item => item.product.id == product.id);

      this.onProductUpdate(cartItem);
    }
  }

  updateProductCount(productId, amount) {
    let cartItem = {};
    if(amount > 0) {
      this.cartItems.map(item => item.product.id == productId ? item.count += 1 : item.count = item.count);
      cartItem = this.cartItems.find(item => item.product.id == productId);
    }
    else {
      let cartItemIndex = this.cartItems.findIndex(item => item.product.id == productId);
      if (cartItemIndex != -1 && this.cartItems[cartItemIndex].count > 1) {
        this.cartItems.map(item => item.product.id == productId ? item.count -= 1 : item.count = item.count);
        cartItem = this.cartItems.find(item => item.product.id == productId);
      }
      else {
        if (this.cartItems.length > 1) {
          this.cartItems.splice(cartItemIndex, 1);
          this.getModalBody().querySelector(`[data-product-id="${productId}"].cart-product`).remove();
          const infoPrice = this.modal.elem.querySelector(`.cart-buttons__info-price`);
          infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;  
        }
        else {
          this.cartItems.splice(cartItemIndex, 1);
          this.modal.close();
        }
        this.cartIcon.update(this);
      }
    }
    
    for (let item in cartItem) {
      this.onProductUpdate(cartItem);
    }
  }

  isEmpty() {
    return this.cartItems.length > 0 ? false : true;
  }

  getTotalCount() {
    return this.cartItems.reduce((totalCount, item) => totalCount + item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((totalPrice, item) => totalPrice + item.count * item.product.price, 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle('Your order');
    const modalBody = createElement('<div></div>');
    this.cartItems.forEach(item => modalBody.append(this.renderProduct(item.product, item.count)));
    modalBody.append(this.renderOrderForm());
    this.modal.setBody(modalBody);

    const buttonsMinus = this.modal.elem.querySelectorAll('.cart-counter__button_minus');
    buttonsMinus.forEach((button) => {
      button.addEventListener('click', (e) => {
          this.updateProductCount(e.target.closest('.cart-product').dataset.productId, -1)
      });
    });

    const buttonsPlus = this.modal.elem.querySelectorAll('.cart-counter__button_plus');
    buttonsPlus.forEach((button) => {
      button.addEventListener('click', (e) => {
          this.updateProductCount(e.target.closest('.cart-product').dataset.productId, 1)
      });
    });

    this.modal.elem.querySelector('.cart-form').addEventListener('submit', (event) => this.onSubmit(event));

    this.modal.open();
  }

  onProductUpdate(cartItem) {
    if (document.body.classList.contains('is-modal-open')) {
      const modalBody = this.getModalBody();

      const productCount = modalBody.querySelector(`[data-product-id="${cartItem.product.id}"] .cart-counter__count`);
      productCount.innerHTML = cartItem.count;
      
      const productPrice = modalBody.querySelector(`[data-product-id="${cartItem.product.id}"] .cart-product__price`);
      productPrice.innerHTML = `€${(cartItem.count * cartItem.product.price).toFixed(2)}`;
      
      const infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);
      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;       
    }

    this.cartIcon.update(this);
  }

  onSubmit(event) {
    event.preventDefault();
    this.modal.elem.querySelector('button[type="submit"]').classList.add('is-loading');

    const form  = this.modal.elem.querySelector('.cart-form');
    const formData = new FormData(form);

    const fetchResult = fetch('https://httpbin.org/post', {
      method: 'POST',
      body: formData,
    });

    fetchResult.then((response) => {
      this.modal.setTitle('Success!');
      this.cartItems = [];
      this.modal.setBody(createElement(`<div class="modal__body-inner">
      <p>
        Order successful! Your order is being cooked :) <br>
        We’ll notify you about delivery time shortly.<br>
        <img src="/assets/images/delivery.gif">
      </p>
    </div>`))
    });
  };

  getModalBody() {
    return document.body.querySelector('.modal__body');
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}