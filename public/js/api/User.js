/*
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
*/
class User {

  static URL = '/user';
  /*
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   */
  static setCurrent(user) {
    localStorage.user = JSON.stringify(user);
  }

  /*
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
  */
  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  /*
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
  */
  static current() {
    if (localStorage.user) {
      try {
        return JSON.parse(localStorage.user);
      }
      catch {
        return null;
      }
    }
  }

  /*
   * Получает информацию о текущем
   * авторизованном пользователе.
  */
  static fetch(callback = (f) => f) {
    createRequest({method: 'GET', URL: this.URL + '/current', body: data}, response => {
      this.setCurrent(response.user);
        callback();
    })
  }

  /*
   * Производит попытку авторизации.
  */
  static login(data, callback = (f) => f) {
    createRequest({method: 'POST', URL: this.URL + '/login', body: data}, response => { 
      this.setCurrent(response.user);
      callback(response);
    });
  }

  /*
   * Производит попытку регистрации пользователя.
  */
  static register(data, callback = (f) => f) {
    createRequest({method: 'POST', URL: this.URL + '/register', body: data}, response => { 
      this.setCurrent(response.user);
      callback(response);
    });
  }

  /*
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
  */
  static logout(data, callback = (f) => f) {
    createRequest({method: 'POST', URL: this.URL + '/logout', body: data}, () => {
      this.unsetCurrent();
      App.setState('init');
    });
  }
}
