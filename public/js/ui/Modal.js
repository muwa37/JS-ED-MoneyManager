/*
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
*/
class Modal {
  /*
   * Устанавливает текущий элемент в свойство element
  */
  constructor(element) {
    if (!(element)) {
      throw new Error( 'Element not found' );
    }
    this.element = element;
  }

  /*
   * При нажатии на элемент с data-dismiss="modal"
   * должен закрыть текущее окно c Modal.onClose
  */
  registerEvents() {
    this.dismiss = [...this.element.querySelectorAll( 'button[data-dismiss="modal"]' )];
    this.dismiss.map(element => element.onclick = this.onClose.bind(this));
  }

  /*
   * Срабатывает после нажатия на элементы, закрывающие окно.
   * Закрывает текущее окно (Modal.close())
  */
  onClose() {
    this.close();
    this.unregisterEvents();
  }

  /*
   * Удаляет обработчики событий
  */
   unregisterEvents() {
    this.dismiss.map(element => element.onclick = '');
  }

  /*
   * Открывает окно
  */
  open() {
    this.registerEvents();
    this.element.style.display = 'block';
  }
  /*
   * Закрывает окно
  */
  close(){
    this.element.style.display = 'none';
  }
}