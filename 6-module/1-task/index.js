/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  #rows = null;

  constructor(rows) {
    this.#rows = rows;
    this.elem = this.#render();
  }

  #render() {
    const html = this.#template();

    const elem = document.createElement('table');
    elem.innerHTML = html;

    const buttons = elem.querySelectorAll('button');
    for (const button of buttons) {
      button.addEventListener('click', this.#onButtonClick);
    }

    return elem;
  }

  #onButtonClick() {
    this.parentElement.parentElement.remove();
  }

  #template() {
    return `
    <thead>
      <tr>
        <th>Имя</th>
        <th>Возраст</th>
        <th>Зарплата</th>
        <th>Город</th>
      </tr>
    </thead>
      ${this.#rows.map(item => 
        `<tr>
          <td>${item.name}</td>
          <td>${item.age}</td>
          <td>${item.salary}</td>
          <td>${item.city}</td>
          <td><button>X</buton></td>
        </tr>`)
      .join('\n')}
    `
  }
}
