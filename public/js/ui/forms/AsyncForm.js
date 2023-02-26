/*
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
*/
class AsyncForm {
  /*
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
  */
  constructor( element ) {
    if ( !element ) {
      throw new Error( 'Элемент не существует' );
    }
    this.element = element;

    this.registerEvents();
  }

  /*
   *В момент отправки вызывает метод submit
  */
  registerEvents() {
    this.element.addEventListener( 'submit', e => {
      e.preventDefault();
      this.submit();
    });
  }

  /*
   * Преобразует данные формы в объект
  */
  getData() {
    return [... ( new FormData( this.element )).entries()]
        .reduce(( target, [ key, value ]) => {
          target[ key ] = value;
          return target;
        }, {});
  }

  onSubmit(options){

  }

  /*
   * Вызывает метод onSubmit и передаёт туда данные, полученные из getData()
  */
  submit() {
    const data = this.getData();

    this.onSubmit({
      data
    });
  }
}