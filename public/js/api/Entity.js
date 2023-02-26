/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
  static URL = '';
  /*
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы.
   * */
  static list(data, callback = (f) => f){
    return createRequest({method: 'GET', URL: this.URL, body: data}, callback);
  }

  /* Создаёт счёт или доход/расход с помощью запроса на сервер. */
  static create(data, callback = (f) => f) {
    data.append( '_method', 'PUT' )
    return createRequest({method: 'POST', URL: this.URL, body: data}, callback);

  }

  /* Удаляет информацию о счёте или доходе/расходе */
  static remove(data, callback = (f) => f) {
    data.append( '_method', 'DELETE' );
    return createRequest({method: 'POST', URL: this.URL, body: data}, callback);
  }

   /* Получает информацию о счёте или доходе/расходе */
    static get(id = '', data, callback = (f) => f ) {
      return createRequest({method: 'GET', URL: this.URL, body: data}, callback);
    }
}
