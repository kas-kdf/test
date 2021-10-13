import FiltersList from '../filters-list/index.js';

export default class SideBar {
  constructor (categoriesFilter = [], brandFilter = []) {
    this.categoriesFilter = categoriesFilter;
    this.brandFilter = brandFilter;

    // ... your logic

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
      <aside>
        <form>
          <div>
            <h3>Price</h3s=>
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

          <div>
            <h3>Rating</h3=>
            <div data-element="ratingSlider">
              <!-- Double Slider rating -->
            </div>
          </div>

        </form>

        <button data-element="clearFilters" type="button">CLEAR ALL FILTERS</button>
      </aside>
    `;
  }

  initializeComponents() {
    // const priceSlider = new DoubleSlider({
    //   min: 0,
    //   max: 85000,
    //   filterName: 'price',

    //   formatValue(value) {
    //     return `${value} UAH`;
    //   }

    // });
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
    // const ratingSlider = new DoubleSlider({
    //   min: 0,
    //   max: 5,
    //   precision: 2,
    //   filterName: 'rating'
    // });
    this.components = {
      // priceSlider,
      categoriesFilter,
      brandFilter,
      // ratingSlider
    };
  }

  renderComponents() {
    Object.keys(this.components).forEach(component => {
      const root = this.subElements[component];
      const {element} = this.components[component];

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
