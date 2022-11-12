import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
    this.stepSlider = {};
    this.ribbonMenu = {};
    this.carousel = {};
    this.productsGrid = {};
    this.cart = {};

    this.addEventListeners();
  }

  async render() {
    this.stepSlider = new StepSlider({steps: 5, value: 3});
    this.ribbonMenu = new RibbonMenu(categories);
    this.carousel = new Carousel(slides);

    document.body.querySelector('[data-carousel-holder]').append(this.carousel.elem);
    document.body.querySelector('[data-ribbon-holder]').append(this.ribbonMenu.elem);
    document.body.querySelector('[data-slider-holder]').append(this.stepSlider.elem);
    
    const cartIcon = new CartIcon();
    document.body.querySelector('[data-cart-icon-holder]').append(cartIcon.elem);
    this.cart = new Cart(cartIcon);

    const productsGridHolder = document.body.querySelector('[data-products-grid-holder]');
    productsGridHolder.innerHTML = '';

    await fetch('products.json')
    .then((response) => response.json())
    .then((products) => {
      this.products = products;
      this.productsGrid = new ProductsGrid(products);
      productsGridHolder.append(this.productsGrid.elem);
    })
    .then(() => {
      this.productsGrid.updateFilter({
        noNuts: document.getElementById('nuts-checkbox').checked,
        vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
        maxSpiciness: this.stepSlider.value,
        category: this.ribbonMenu.value
      });
    });
  }

  addEventListeners() {
    document.body.addEventListener('product-add', (event) => {
      this.cart.addProduct(this.products.find(product => product.id == event.detail));
    });

    document.body.addEventListener('slider-change', (event) => {
      this.productsGrid.updateFilter({
        maxSpiciness: event.detail
      });
    });

    document.body.addEventListener('ribbon-select', (event) => {
      this.productsGrid.updateFilter({
        category: event.detail
      });
    });

    document.body.querySelector('#nuts-checkbox').addEventListener('change', (event) => {
      this.productsGrid.updateFilter({
        noNuts: event.target.checked
      });
    });

    document.body.querySelector('#vegeterian-checkbox').addEventListener('change', (event) => {
      this.productsGrid.updateFilter({
        vegeterianOnly: event.target.checked
      });
    });
  }

  
}
