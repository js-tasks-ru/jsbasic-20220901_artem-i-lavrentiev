import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.#render();
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);
    let filterProducts = this.products.filter(this.#generateFilter, this.filters);
    this.#getProductGridInner(filterProducts);
  }
}

  #getProductGridInner(products) {
    const gridInner = this.elem.querySelector('.products-grid__inner');
    gridInner.innerHTML = '';
    return products.forEach(product => {
      let card = new ProductCard(product);
      gridInner.append(card.elem);
    });
  }

  #template() {
    return `
      <div class="products-grid">
        <div class="products-grid__inner">
        </div>
      </div>
    `
  }
}