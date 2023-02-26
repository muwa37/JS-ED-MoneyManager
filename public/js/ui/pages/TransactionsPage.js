/*
 * Управляет страницей отображения доходов и
 * расходов конкретного счёта
*/
class TransactionsPage {
  /*
   * Сохраняет переданный элемент и регистрирует события
  */
  constructor(element) {
    if (!(element)) {
      throw new Error('Elem not found');
    }
    this.element = element;

    this.registerEvents();
  }

  /*
   * Вызывает метод render для отрисовки страницы
  */
  update() {
    this.render(this.lastOptions);
  }

  /*
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта.
  */
  registerEvents() {
    this.element.addEventListener('click', (e) => {
      const transactionButton = e.target.closest('.transaction__remove');
      if (transactionButton) {
        const { id } = transactionButton.dataset;

        this.removeTransaction(id);
      }
      const accountButton = e.target.closest('.remove-account');
      if (accountButton) {
        this.removeAccount()
      }
    });
  }

  /*
   * Удаляет счёт. 
  */
  removeAccount() {
    if (!(this.lastOptions)) {
      return;
    }
    if (!confirm('Вы действительно хотите удалить счёт?')) {
      return;
    }
    const id = this.lastOptions.account_id;
    this.clear();
    Account.remove(id, {}, () => App.update());
  }

  /*
   * Удаляет транзакцию (доход или расход). 
  */
  removeTransaction(id) {
    if (!(confirm('Вы действительно хотите удалить эту транзакцию?'))) {
      return;
    }
    Transaction.remove(id, {}, () => App.update());
  }

  /*
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
  */
  render(options){
    if (!(options)) {
      return;
    }
    this.lastOptions = options;
    Account.get(options.account_id, {}, (err, response) => {
      this.renderTitle(response.data.name);
    });
    Transaction.list(options, (err, response) => {
      if (err) {
        return;
      }
      if (!(response)) {
        return;
      }
      if (!(response.data)) {
        return;
      }
      this.renderTransactions(response.data);
    });
  }

  /*
   * Очищает страницу. 
  */
  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счёта');
    this.lastOptions = null;
  }

  /*
   * Устанавливает заголовок в элемент .content-title
  */
  renderTitle(name){
    const title = this.element.querySelector('.content-title');
    title.textContent = name;
  }

  /*
   * Форматирует дату
  */
  formatDate(date){
    const d = new Date(date.replace(' ', 'T')),
        day = d.getDate(),
        months = [
          'января',
          'февраля',
          'марта',
          'апреля',
          'мая',
          'июня',
          'июля',
          'августа',
          'сентября',
          'октября',
          'ноября',
          'декабря'
        ],
        month = months[d.getMonth()],
        year = d.getFullYear(),
        hours = d.getHours(),
        minutes = d.getMinutes(),
        formatTime = (x) => x < 10 ? '0' + x : x;

    return `${day} ${month} ${year} г. в ${formatTime(hours)}:${formatTime(minutes)}`;

  }

  /*
   * Формирует HTML-код транзакции (дохода или расхода).
  */
  getTransactionHTML(item){
    const { type, name, id } = item,
        date = this.formatDate(item.created_at),
        sum = item.sum.toLocaleString('en');

    return `
      <div class="transaction transaction_${type.toLowerCase()} row">
          <div class="col-md-7 transaction__details">
              <div class="transaction__icon">
                  <span class="fa fa-money fa-2x"></span>
              </div>
              <div class="transaction__info">
                  <h4 class="transaction__title">${name}</h4>
                  <div class="transaction__date">${date}</div>
              </div>
          </div>
          <div class="col-md-3">
              <div class="transaction__summ">
                  ${sum} <span class="currency">₽</span>
              </div>
          </div>
          <div class="col-md-2 transaction__controls">
              <button class="btn btn-danger transaction__remove" data-id="${id}">
                <i class="fa fa-trash"></i>  
              </button>
          </div>
      </div>
    `;
  }

  /*
   * Отрисовывает список транзакций на странице.
  */
  renderTransactions(data){
    const container = document.querySelector('.content'),
        itemsHTML = data.reverse()
            .map(this.getTransactionHTML.bind(this))
            .join('');

    container.innerHTML = `<div class="transactions-content">${itemsHTML}</div>`
  }
}