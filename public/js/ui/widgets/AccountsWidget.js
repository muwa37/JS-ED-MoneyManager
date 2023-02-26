/*
 * Управляет блоком отображения счетов в боковой колонке
*/

class AccountsWidget {
  /*
   * Устанавливает текущий элемент.
   * Регистрирует обработчики событий.
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения.
  */
  constructor(element) {
    if (!(element)) {
      throw new Error('Elem not found');
    }
    this.element = element;
    this.currentAccountId = null;

    this.registerEvents();
    this.update();
  }

  /*
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * вызывает AccountsWidget.onSelectAccount()
  */
  registerEvents() {
    this.element.addEventListener('click', (e) => {
      e.preventDefault();
      const createAccount = e.target.closest('.create-account');

      if (createAccount) {
        const modal = App.getModal('createAccount');
        return modal.open();
      }

      const selectedAccount = e.target.closest('.account');

      if (selectedAccount) {
        this.onSelectAccount(selectedAccount);
      }
    });
  }

  /*
   * Метод доступен только авторизованным пользователям
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
  */
  update() {
    if (!(User.current())) {
      return;
    }
    Account.list(User.current(), (err, response) => {
      if (err) {
        return;
      }
      if (!(response.data)) {
        return;
      }
      this.clear();
      this.renderItem(response.data);
    });
  }

  /*
   * Очищает список ранее отображённых счетов.
  */
  clear() {
    [...this.element.querySelectorAll('.account')].forEach((item) => item.remove());
  }

  /*
   * Срабатывает в момент выбора счёта.
  */
  onSelectAccount(element) {
    if (this.currentAccountId) {
      const account = this.element.querySelector(`.account[data-id="${this.currentAccountId}"]`);
      if (account) {
        account.classList.remove('active');
      }
      else {
        this.currentAccountId = null;
      }
    }

    element.classList.add('active');

    const { id } = element.dataset;

    this.currentAccountId = id;

    App.showPage('transactions', {
      account_id: id
    });
  }

  /*
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
  */
  getAccountHTML(item){
    return `
      <li class="account" data-id="${ item.id }">
          <a href="#">
              ${ item.name } / ${ item.sum } ₽
          </a>
      </li>
    `;
  }

  /*
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
  */
  renderItem(data){
    data.forEach( (item) => {
      const {name, id} = item,
          sum = item.sum.toLocaleString('en'),
          html = this.getAccountHTML({
            name, id, sum
          });
      this.element.insertAdjacentHTML('beforeend', html);
    });
  }
}
