export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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
        this.cartItems.splice(cartItemIndex, 1);
      }
    }

    this.onProductUpdate(cartItem);
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

