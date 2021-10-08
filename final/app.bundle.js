/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

// UNUSED EXPORTS: default

;// CONCATENATED MODULE: ./src/module-5/pagination/solution/index.js
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Pagination {
  constructor({
    totalPages = 10,
    page = 1
  } = {}) {
    _defineProperty(this, "element", void 0);

    _defineProperty(this, "start", 0);

    _defineProperty(this, "pageIndex", 0);

    _defineProperty(this, "subElements", {});

    _defineProperty(this, "onPageChanged", event => {
      const pageIndex = parseInt(event.detail, 10);
      const pageItems = this.element.querySelectorAll('[data-element="page-link"]');
      this.pageIndex = pageIndex;
      pageItems.forEach(item => item.classList.remove('active'));
      pageItems[pageIndex].classList.add('active');
    });

    this.totalPages = totalPages;
    this.pageIndex = page - 1;
    this.initialize();
  }

  initialize() {
    this.render();
    this.getSubElements();
    this.addEventListeners();
    this.update();
  }

  getSubElements() {
    const result = {};
    const elements = this.element.querySelectorAll('[data-element]');

    for (const subElement of elements) {
      const name = subElement.dataset.element;
      result[name] = subElement;
    }

    this.subElements = result;
  }

  get template() {
    return `
    <nav class="os-pagination">
      <a href="#" class="page-link previous" data-element="nav-prev">
        <i class="bi bi-chevron-left"></i>
      </a>

      <ul class="page-list" data-element="pagination">

      </ul>

      <a href="#" class="page-link next" data-element="nav-next">
        <i class="bi bi-chevron-right"></i>
      </a>
    </nav>
    `;
  }

  goToPrevPage() {
    if (this.pageIndex - 1 >= 0) {
      this.dispatchEvent(this.pageIndex - 1);
    }
  }

  goToNextPage() {
    if (this.pageIndex + 1 < this.totalPages) {
      this.dispatchEvent(this.pageIndex + 1);
    }
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.template;
    this.element = element.firstElementChild;
  }

  addEventListeners() {
    this.element.addEventListener('pointerdown', event => {
      const navElement = event.target.closest('[data-element^="nav-"]');

      if (navElement) {
        const type = navElement.dataset.element;

        if (type === 'nav-prev') {
          this.goToPrevPage();
        }

        if (type === 'nav-next') {
          this.goToNextPage();
        }
      }
    });
    this.element.addEventListener('pointerdown', event => {
      const pageIndex = parseInt(event.target.dataset.pageIndex, 10);

      if (!isNaN(pageIndex) && this.pageIndex !== pageIndex) {
        this.pageIndex = pageIndex;
        this.dispatchEvent(pageIndex);
      }
    });
    document.addEventListener('page-changed', this.onPageChanged);
  }

  update({
    totalPages = this.totalPages,
    page = this.pageIndex + 1
  } = {}) {
    this.totalPages = totalPages;
    this.pageIndex = page - 1;

    if (this.totalPages < 1) {
      this.subElements.pagination.innerHTML = 'No pagination';
      return;
    }

    this.subElements.pagination.innerHTML = this.getPages();
  }

  getPages() {
    const pages = new Array(this.totalPages).fill(true);
    return pages.map((item, index) => {
      const isActive = index === this.pageIndex ? 'active' : '';
      return `<li>
        <a href="#" data-element="page-link" class="page-link ${isActive}" data-page-index="${index}">${index + 1}</a>
      </li>`;
    }).join('');
  }

  dispatchEvent(pageIndex) {
    this.element.dispatchEvent(new CustomEvent('page-changed', {
      bubbles: true,
      detail: pageIndex
    }));
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    document.removeEventListener('page-changed', this.onPageChanged);
  }

}
;// CONCATENATED MODULE: ./src/module-4/filters-list/solution/index.js
function solution_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class FiltersList {
  constructor({
    title = '',
    list = []
  } = {}) {
    solution_defineProperty(this, "element", void 0);

    solution_defineProperty(this, "subElements", {});

    this.title = title;
    this.list = list;
    this.render();
    this.getSubElements();
    this.addEventListeners();
  }

  get template() {
    return `
      <form class="os-form-group divider">
        <h3 class="os-form-title">${this.title}</h3>

        <div data-element="body">${this.body}</div>
      </form>
    `;
  }

  get body() {
    const result = this.list.map(item => {
      return `<div class="os-filters-panel-item">
        <div class="os-form-checkbox">
          <input id="${item.value}" type="checkbox" name="filter" value="${item.value}" ${item.checked ? "checked" : ''}>
          <label for="${item.value}">${item.title}</label>
        </div>
      </div>`;
    });
    return result.join('');
  }

  render() {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = this.template;
    this.element = wrapper.firstElementChild;
  }

  update(list) {
    this.list = list;
    this.subElements.body.innerHTML = this.body;
  }

  getSubElements() {
    const result = {};
    const elements = this.element.querySelectorAll('[data-element]');

    for (const subElement of elements) {
      const name = subElement.dataset.element;
      result[name] = subElement;
    }

    this.subElements = result;
  }

  reset() {
    this.element.reset();
  }

  addEventListeners() {
    this.element.addEventListener('change', event => {
      const {
        target
      } = event;
      const eventName = target.checked ? 'add-filter' : 'remove-filter';
      this.element.dispatchEvent(new CustomEvent(eventName, {
        bubbles: true,
        detail: target.value
      }));
    });
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = null;
    this.subElements = {};
  }

}
;// CONCATENATED MODULE: ./src/module-5/double-slider/solution/index.js
function double_slider_solution_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class DoubleSlider {
  constructor({
    min = 100,
    max = 200,
    formatValue = value => value,
    selected = {
      from: min,
      to: max
    },
    precision = 0,
    filterName = ''
  } = {}) {
    double_slider_solution_defineProperty(this, "element", void 0);

    double_slider_solution_defineProperty(this, "subElements", {});

    double_slider_solution_defineProperty(this, "onThumbPointerMove", event => {
      event.preventDefault();
      const {
        left: innerLeft,
        right: innerRight,
        width
      } = this.subElements.inner.getBoundingClientRect();

      if (this.dragging === this.subElements.thumbLeft) {
        let newLeft = (event.clientX - innerLeft + this.shiftX) / width;

        if (newLeft < 0) {
          newLeft = 0;
        }

        newLeft *= 100;
        const right = parseFloat(this.subElements.thumbRight.style.right);

        if (newLeft + right > 100) {
          newLeft = 100 - right;
        }

        this.dragging.style.left = this.subElements.progress.style.left = newLeft + '%';
        this.subElements.from.innerHTML = this.formatValue(this.getValue().from);
      }

      if (this.dragging === this.subElements.thumbRight) {
        let newRight = (innerRight - event.clientX - this.shiftX) / width;

        if (newRight < 0) {
          newRight = 0;
        }

        newRight *= 100;
        const left = parseFloat(this.subElements.thumbLeft.style.left);

        if (left + newRight > 100) {
          newRight = 100 - left;
        }

        this.dragging.style.right = this.subElements.progress.style.right = newRight + '%';
        this.subElements.to.innerHTML = this.formatValue(this.getValue().to);
      }
    });

    double_slider_solution_defineProperty(this, "onThumbPointerUp", () => {
      this.element.classList.remove('range-slider_dragging');
      document.removeEventListener('pointermove', this.onThumbPointerMove);
      document.removeEventListener('pointerup', this.onThumbPointerUp);
      this.element.dispatchEvent(new CustomEvent('range-selected', {
        bubbles: true,
        detail: {
          filterName: this.filterName,
          value: this.getValue()
        }
      }));
    });

    this.min = min;
    this.max = max;
    this.formatValue = formatValue;
    this.selected = selected;
    this.precision = 10 ** precision;
    this.filterName = filterName;
    this.render();
  }

  get template() {
    const {
      from,
      to
    } = this.selected;
    return `<div class="range-slider">
      <span data-element="from">${this.formatValue(from)}</span>
      <div data-element="inner" class="range-slider__inner">
        <span data-element="progress" class="range-slider__progress"></span>
        <span data-element="thumbLeft" class="range-slider__thumb-left"></span>
        <span data-element="thumbRight" class="range-slider__thumb-right"></span>
      </div>
      <span data-element="to">${this.formatValue(to)}</span>
    </div>`;
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.template;
    this.element = element.firstElementChild;

    this.element.ondragstart = () => false;

    this.subElements = this.getSubElements(element);
    this.initEventListeners();
    this.update();
  }

  initEventListeners() {
    const {
      thumbLeft,
      thumbRight
    } = this.subElements;
    thumbLeft.addEventListener('pointerdown', event => this.onThumbPointerDown(event));
    thumbRight.addEventListener('pointerdown', event => this.onThumbPointerDown(event));
  }

  getSubElements(element) {
    const result = {};
    const elements = element.querySelectorAll('[data-element]');

    for (const subElement of elements) {
      const name = subElement.dataset.element;
      result[name] = subElement;
    }

    return result;
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    document.removeEventListener('pointermove', this.onThumbPointerMove);
    document.removeEventListener('pointerup', this.onThumbPointerUp);
  }

  update(from = this.selected.from, to = this.selected.to) {
    const rangeTotal = this.max - this.min;
    const left = Math.floor((from - this.min) / rangeTotal * 100) + '%';
    const right = Math.floor((this.max - to) / rangeTotal * 100) + '%';
    this.subElements.progress.style.left = left;
    this.subElements.progress.style.right = right;
    this.subElements.thumbLeft.style.left = left;
    this.subElements.thumbRight.style.right = right;
    this.subElements.from.innerText = this.formatValue(from);
    this.subElements.to.innerText = this.formatValue(to);
  }

  onThumbPointerDown(event) {
    const thumbElem = event.target;
    event.preventDefault();
    const {
      left,
      right
    } = thumbElem.getBoundingClientRect();

    if (thumbElem === this.subElements.thumbLeft) {
      this.shiftX = right - event.clientX;
    } else {
      this.shiftX = left - event.clientX;
    }

    this.dragging = thumbElem;
    this.element.classList.add('range-slider_dragging');
    document.addEventListener('pointermove', this.onThumbPointerMove);
    document.addEventListener('pointerup', this.onThumbPointerUp);
  }

  getValue() {
    const rangeTotal = this.max - this.min;
    const {
      left
    } = this.subElements.thumbLeft.style;
    const {
      right
    } = this.subElements.thumbRight.style;
    const leftShift = parseFloat(left) * rangeTotal / 100;
    const rightShift = parseFloat(right) * rangeTotal / 100;
    const from = Math.round((this.min + leftShift) * this.precision) / this.precision;
    const to = Math.round((this.max - rightShift) * this.precision) / this.precision;
    return {
      from,
      to
    };
  }

  reset() {
    this.selected = {
      from: this.min,
      to: this.max
    };
    this.update();
  }

}
;// CONCATENATED MODULE: ./src/module-4/side-bar/solution/index.js
function side_bar_solution_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class SideBar {
  constructor(categoriesFilter = [], brandFilter = []) {
    side_bar_solution_defineProperty(this, "element", void 0);

    side_bar_solution_defineProperty(this, "subElements", {});

    side_bar_solution_defineProperty(this, "components", {});

    this.categoriesFilter = categoriesFilter;
    this.brandFilter = brandFilter;
    this.initializeComponents();
    this.render();
    this.getSubElements();
    this.renderComponents();
    this.addEventListeners();
  }

  update(categoriesFilter = [], brandFilter = []) {
    this.components.categoriesFilter.update(categoriesFilter);
    this.components.brandFilter.update(brandFilter);
  }

  get template() {
    return `
      <aside class="os-filters-panel">
        <form class="os-filters-panel-content">
          <div class="os-form-group">
            <h3 class="os-form-title">Price</h3>
             <div data-element="priceSlider">
              <!-- Double Slider price -->
            </div>
          </div>

          <div data-element="categoriesFilter">
            <!-- Category -->
          </div>
          <div data-element="brandFilter">
            <!-- Brand -->
          </div>

          <div class="os-form-group">
            <h3 class="os-form-title">Rating</h3>
            <div data-element="ratingSlider">
              <!-- Double Slider rating -->
            </div>
          </div>

        </form>

        <button data-element="clearFilters" class="os-btn-primary clear-filters" type="button">CLEAR ALL FILTERS</button>
      </aside>
    `;
  }

  initializeComponents() {
    const priceSlider = new DoubleSlider({
      min: 0,
      max: 85000,
      filterName: 'price',

      formatValue(value) {
        return `${value} UAH`;
      }

    });
    const categoriesFilter = new FiltersList({
      title: 'Category',
      name: 'categories',
      list: this.categoriesFilter
    });
    const brandFilter = new FiltersList({
      title: 'Brand',
      name: 'brands',
      list: this.brandFilter
    });
    const ratingSlider = new DoubleSlider({
      min: 0,
      max: 5,
      precision: 2,
      filterName: 'rating'
    });
    this.components = {
      priceSlider,
      categoriesFilter,
      brandFilter,
      ratingSlider
    };
  }

  renderComponents() {
    Object.keys(this.components).forEach(component => {
      const root = this.subElements[component];
      const {
        element
      } = this.components[component];

      if (element) {
        root.append(element);
      }
    });
  }

  render() {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = this.template;
    this.element = wrapper.firstElementChild;
  }

  getSubElements() {
    const result = {};
    const elements = this.element.querySelectorAll('[data-element]');

    for (const subElement of elements) {
      const name = subElement.dataset.element;
      result[name] = subElement;
    }

    this.subElements = result;
  }

  addEventListeners() {
    this.subElements.clearFilters.addEventListener('pointerdown', () => {
      for (const component of Object.values(this.components)) {
        component.reset();
      }

      this.element.dispatchEvent(new CustomEvent('clear-filters', {
        bubbles: true
      }));
    });
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = null;
    this.subElements = {};
    this.components = {};
  }

}
;// CONCATENATED MODULE: ./src/module-3/cards-list-v1/solution/index.js
function cards_list_v1_solution_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class CardsList {
  constructor({
    data = [],
    Component = {}
  } = {}) {
    cards_list_v1_solution_defineProperty(this, "element", void 0);

    cards_list_v1_solution_defineProperty(this, "subElements", {});

    this.data = data;
    this.Component = Component;
    this.render();
    this.getSubElements();
    this.update(this.data);
  }

  get template() {
    return `
      <div>
        <div class="os-products-list" data-element="body"></div>
      </div>
    `;
  }

  render() {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = this.template;
    this.element = wrapper.firstElementChild;
  }

  getSubElements() {
    const result = {};
    const elements = this.element.querySelectorAll('[data-element]');

    for (const subElement of elements) {
      const name = subElement.dataset.element;
      result[name] = subElement;
    }

    this.subElements = result;
  }

  update(data = []) {
    this.data = data;

    if (this.data.length) {
      const cards = data.map(item => new this.Component(item).element);
      this.subElements.body.replaceChildren(...cards);
    } else {
      this.subElements.body.innerText = 'No products found';
    }
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = null;
    this.subElements = {};
  }

}
;// CONCATENATED MODULE: ./src/module-2/card/solution/index.js
function card_solution_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Card {
  constructor({
    id = '',
    images = [],
    title = '',
    rating = 0,
    price = 0,
    category = '',
    brand = ''
  } = {}) {
    card_solution_defineProperty(this, "element", void 0);

    this.id = id;
    this.images = images;
    this.title = title;
    this.rating = rating;
    this.price = price;
    this.category = category;
    this.brand = brand;
    this.render();
  }

  get template() {
    return `
      <div class="os-product-card">
        <div class="os-product-img" style="background-image: url(${this.images[0]});"></div>

        <div class="os-product-content">
          <div class="os-product-price-wrapper">
            <div class="os-product-rating">
              <span>${this.rating}</span>
              <i class="bi bi-star"></i>
            </div>

            <div class="os-product-price">${this.price}</div>
          </div>

          <h5 class="os-product-title">${this.title}</h5>
          <p class="os-product-description">${this.category}</p>
        </div>

        <footer class="os-product-footer">
        <button class="os-btn-default">
          <i class="bi bi-heart os-product-wish-icon"></i>
          Wishlist
        </button>

        <button class="os-btn-primary">
          <i class="bi bi-box-seam os-product-shopping-bag"></i>
          Add To Cart
        </button>
      </footer>
      </div>
    `;
  }

  render() {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = this.template;
    this.element = wrapper.firstElementChild;
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = null;
  }

}
;// CONCATENATED MODULE: ./src/module-1/debounce/solution/index.js
const debounce = (fn, delay = 0) => {
  let timerId;
  return function (...args) {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      fn.apply(this, args);
      timerId = null;
    }, delay);
  };
};
;// CONCATENATED MODULE: ./src/module-6/search/solution/index.js
function search_solution_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class Search {
  constructor() {
    search_solution_defineProperty(this, "element", void 0);

    search_solution_defineProperty(this, "subElements", {});

    search_solution_defineProperty(this, "onKeyUp", debounce(event => {
      const title = event.target.value.trim();
      this.dispatchEvent(title);
    }, 300));

    this.initialize();
  }

  initialize() {
    this.render();
    this.getSubElements();
    this.addEventListeners();
  }

  get template() {
    return `
      <form>
        <div class="os-form-input use-icon">
          <input id="search-input"
                 type="text"
                 data-element="search"
                 placeholder="Search">
          <label class="bi bi-search input-icon"
                 for="search-input"></label>
        </div>
      </form>
    `;
  }

  render() {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = this.template;
    this.element = wrapper.firstElementChild;
  }

  getSubElements() {
    const result = {};
    const elements = this.element.querySelectorAll('[data-element]');

    for (const subElement of elements) {
      const name = subElement.dataset.element;
      result[name] = subElement;
    }

    this.subElements = result;
  }

  dispatchEvent(searchString) {
    this.element.dispatchEvent(new CustomEvent('search-filter', {
      bubbles: true,
      detail: searchString
    }));
  }

  addEventListeners() {
    this.subElements.search.addEventListener('input', this.onKeyUp);
  }

  clear() {
    this.element.reset();
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = null;
    this.subElements = {};
  }

}
;// CONCATENATED MODULE: ./src/module-6/main-page/request/index.js
const request = async (url = '', props = {}) => {
  try {
    const response = await fetch(url.toString(), props);
    const data = await response.json();
    return [data, null];
  } catch (error) {
    return [null, error];
  }
};
;// CONCATENATED MODULE: ./src/module-6/main-page/prepare-filters/index.js
const prepareFilters = (arr, prefix) => {
  return arr.map(item => {
    return {
      value: `${prefix}=` + item.toLowerCase().split(' ').join('_'),
      title: item
    };
  });
};
;// CONCATENATED MODULE: ./src/module-6/main-page/solution/index.js
function main_page_solution_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3000';
class Page {
  constructor() {
    main_page_solution_defineProperty(this, "element", void 0);

    main_page_solution_defineProperty(this, "subElements", {});

    main_page_solution_defineProperty(this, "components", {});

    main_page_solution_defineProperty(this, "pageLimit", 10);

    main_page_solution_defineProperty(this, "totalPages", 100);

    main_page_solution_defineProperty(this, "filters", new URLSearchParams());

    this.filters.set('_page', '1');
    this.filters.set('_limit', this.pageLimit);
    this.render();
    this.getSubElements();
    this.initializeComponents();
    this.renderComponents();
    this.initEventListeners();
    this.loadData();
  }

  get template() {
    return `
      <div class="os-container">
        <header class="os-header">
          <div class="os-logo">
            <img class="os-logo-img"
                 src="/logo.svg"
                 alt="logo">
            <span class="os-logo-text">Online Store</span>
          </div>
        </header>

        <nav class="os-breadcrumb">
          <ul class="os-breadcrumb-list">
            <li class="os-breadcrumb-item">
              <a class="os-breadcrumb-link"
                 href="#">
                <i class="bi bi-house-door"></i>
              </a>
              <i class="bi bi-chevron-right link-icon"></i>
            </li>

            <li class="os-breadcrumb-item">
              <a class="os-breadcrumb-link"
                 href="#">eCommerce</a>
              <i class="bi bi-chevron-right link-icon"></i>
            </li>

            <li class="os-breadcrumb-item">
              <a class="os-breadcrumb-link"
                 href="#">Electronics</a>
              <i class="bi bi-chevron-right link-icon"></i>
            </li>
          </ul>
        </nav>

        <main class="os-products">
          <div data-element="sideBar">
          <!-- SideBar -->
          </div>

          <section>
            <div data-element="search">
              <!-- Search -->
            </div>

            <div data-element="cardsList">
              <!-- CardsList -->
            </div>

            <footer data-element="pagination" class="os-products-footer">
              <!-- Pagination -->
            </footer>
          </section>
        </main>
      </div>
    `;
  }

  async makeRequest(path = '') {
    const url = new URL(path, BACKEND_URL);
    const [data, error] = await request(url);

    if (data) {
      return Promise.resolve(data);
    }

    return Promise.reject(error);
  }

  async loadData() {
    const categories = this.makeRequest('categories');
    const brands = this.makeRequest('brands');
    const products = this.loadProducts();
    const [categoriesData, brandsData, productsData] = await Promise.all([categories, brands, products]);
    const categoriesFilter = prepareFilters(categoriesData, 'category');
    const brandsFilter = prepareFilters(brandsData, 'brand');
    this.components.sideBar.update(categoriesFilter, brandsFilter);
    this.components.cardsList.update(productsData);
  }

  render() {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = this.template;
    this.element = wrapper.firstElementChild;
  }

  initializeComponents() {
    const search = new Search();
    const cardsList = new CardsList({
      Component: Card
    });
    const sideBar = new SideBar();
    const pagination = new Pagination();
    this.components = {
      search,
      cardsList,
      sideBar,
      pagination
    };
  }

  renderComponents() {
    Object.keys(this.components).forEach(component => {
      const root = this.subElements[component];
      const {
        element
      } = this.components[component];

      if (element) {
        root.append(element);
      }
    });
  }

  getSubElements() {
    const result = {};
    const elements = this.element.querySelectorAll('[data-element]');

    for (const subElement of elements) {
      const name = subElement.dataset.element;
      result[name] = subElement;
    }

    this.subElements = result;
  }

  initEventListeners() {
    this.components.search.element.addEventListener('search-filter', async event => {
      this.filters.set('_page', '1');
      this.filters.set('q', event.detail);
      this.updateProductsList();
    });
    this.components.sideBar.element.addEventListener('range-selected', event => {
      const {
        filterName,
        value
      } = event.detail;
      this.filters.set('_page', '1');
      const gte = `${filterName}_gte`;
      const lte = `${filterName}_lte`;
      this.filters.set(gte, value.from);
      this.filters.set(lte, value.to);
      this.updateProductsList();
    });
    this.components.sideBar.element.addEventListener('add-filter', async event => {
      this.filters.set('_page', '1');

      for (const [key, prop] of new URLSearchParams(event.detail)) {
        this.filters.append(key, prop);
      }

      this.updateProductsList();
    });
    this.components.sideBar.element.addEventListener('remove-filter', event => {
      const [key, prop] = event.detail.split('=');
      const filters = this.filters.getAll(key).filter(item => item !== prop);
      this.filters.set('_page', '1');
      this.filters.delete(key);

      for (const filter of filters) {
        this.filters.append(key, filter);
      }

      this.updateProductsList();
    });
    this.components.sideBar.element.addEventListener('clear-filters', () => {
      this.resetFilters();
      this.components.search.clear();
      this.updateProductsList();
    });
    this.components.pagination.element.addEventListener('page-changed', event => {
      this.filters.set('_page', event.detail + 1);
      this.updateProductsList();
    });
  }

  resetFilters() {
    this.filters = new URLSearchParams();
    this.filters.set('_page', '1');
    this.filters.set('_limit', this.pageLimit);
  }

  async updateProductsList() {
    const products = await this.loadProducts();
    this.components.cardsList.update(products);
  }

  async loadProducts() {
    const url = new URL('products', BACKEND_URL);
    url.search = this.filters;
    const response = await fetch(url);
    const totalPages = parseInt(response.headers.get('X-Total-Count'), 10);

    if (totalPages > this.totalPages) {
      this.totalPages = totalPages;
    }

    this.components.pagination.update({
      totalPages: Math.ceil(totalPages / this.pageLimit),
      page: this.filters.get('_page')
    });
    return await response.json();
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = null;
    this.subElements = {};
    this.filters = new URLSearchParams();

    for (const component of Object.values(this.components)) {
      component.destroy();
    }

    this.components = {};
  }

}
document.addEventListener('DOMContentLoaded', event => {
  console.error(1111);
  const root = document.getElementById('root');
  const page = new Page();
  console.error(1111);
  root.append(page.element);
});
/******/ })()
;
//# sourceMappingURL=app.bundle.js.map