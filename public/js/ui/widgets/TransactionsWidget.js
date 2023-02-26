/*
 * Oтвечает за открытие всплывающих окон для
 * создания транзакции
*/

class TransactionsWidget {
  /*
   * Устанавливает полученный элемент.
  */
  constructor(element) {
    if (!(element)) {
      throw new Error('Elem not found');
    }
    this.element = element;

    this.registerEvents();
  }
  /*
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
  */
  registerEvents() {
    const createIncomeButton = this.element.querySelector('.create-income-button'),
        createExpenseButton = this.element.querySelector('.create-expense-button'),

        incomeModal = new Modal(document.querySelector('#modal-new-income')),
        expenseModal = new Modal(document.querySelector('#modal-new-expense'));

    createIncomeButton.addEventListener('click', () => incomeModal.open());
    createExpenseButton.addEventListener('click', () => expenseModal.open());
  }
}
