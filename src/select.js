const getTemplate = (data = [], placeholder) => {
  const text = placeholder ?? 'Placeholder по умолчанию';
  const listElements = data.map((item) =>
    `<li class="select__item" data-type="item" data-id="${item.id}">${item.value}</li>`
  ).join('');

  return `
    <div class="select__backdrop" data-type="backdrop"></div>
    <div class="select__input" data-type="input">
      <span class="select__value" data-type="value">${text}</span>
      <i class="fa fa-chevron-down" aria-hidden="true" data-type="arrow"></i>
    </div>
    <div class="select__dropdown">
      <ul class="select__list">
        ${listElements}
      </ul>
    </div>
  `;
}

export class Select {
  constructor(selector, options) {
    this.$el = document.querySelector(selector);
    this.options = options;
    this.selectedId = options.selectedId ?? null;

    this.#render();
    this.#setup();
  }

  open() {
    this.$el.classList.add('open');
  }

  close() {
    this.$el.classList.remove('open');
  }

  destroy() {
    this.$el.removeEventListener('click', this.clickHandler);
    this.$el.innerHTML = '';
  }

  #render() {
    const { placeholder, data } = this.options;
    this.$el.classList.add('select');
    this.$el.innerHTML = getTemplate(data, placeholder);
  }

  #setup() {
    this.$el.addEventListener('click', this.clickHandler.bind(this));
    this.$arrow = this.$el.querySelector('[data-type="arrow"]');
    this.$value = this.$el.querySelector('[data-type="value"]');

    if (this.selectedId) {
      this.select(this.selectedId);
    }
  }

  clickHandler(event) {
    const { type } = event.target.dataset;

    if (type === 'input') {
      this.$el.classList.toggle('open');
    } else if (type === 'item') {
      const id = event.target.dataset.id;
      this.select(id);
    } else if (type === 'backdrop') {
      this.close();
    }
  }

  get current() {
    return this.options.data.find(item => {
      return item.id === this.selectedId;
    });
  }

  select(id) {
    this.selectedId = id;
    this.$value.innerHTML = this.current.value;

    this.$el.querySelectorAll('[data-type="item"]').forEach(element => {
      element.classList.remove("selected");
    });
    this.$el.querySelector(`[data-id="${id}"]`).classList.add("selected");

    // Если был передан callback onSelect
    if (typeof this.options.onSelect === 'function') {
      this.options.onSelect(this.current);
    }

    this.close();
  }
}
