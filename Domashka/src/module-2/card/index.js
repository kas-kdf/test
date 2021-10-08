export default class Card {
  element;

  constructor ({
    id = '',
    images = [],
    title = '',
    rating = 0,
    price = 0,
    category = '',
    brand = ''
  } = {}) {
    this.id = id;
    this.images = images;
    this.title = title;
    this.rating = rating;
    this.price = price;
    this.category = category;
    this.brand = brand;

    this.render();
  }

  getTemplate () {
    return `	<div class="card shadow col-3 m-5">
                <img src=${this.images[0]} class="card-img-top p-5" alt="apple-watch"></img>
                 <div class="card-body">
                  <div class="d-flex justify-content-between pb-2">
                    <div class="bg-primary text-white p-1 rounded shadow">${this.rating}  <i class="bi bi-star"></i> </div>
                    <div>&#36; ${this.price}</div>
                  </div>
                  <h5 class="card-title">${this.title}</h5>
                  <p class="card-text">${this.category}</p>
                </div> 
                <div class="d-flex justify-content-center align-items-center">
                  <a href="#" class="col-6 btn bg-secondary bg-opacity-10">
                    <i class="bi bi-suit-heart"></i> WISHLIST</a>
                  <a href="#" class="col-6 btn btn-primary">
                    <i class="bi bi-bag-plus"></i> ADD TO CART</a>
                </div>
              </div>`;
  }

  render () {
    const wrapper = document.createElement('div');

    wrapper.innerHTML = this.getTemplate();

    this.element = wrapper.firstElementChild;
  }

  remove () {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy () {
    this.remove();
    this.element = null;
  }
}
