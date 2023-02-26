/*
 * Класс отвечает за отображение имени пользователя
 * после авторизации или выхода 
*/

class UserWidget {
  /*
   * Устанавливает полученный элемент.
  */
  constructor(element){
    if (!(element)) {
      throw new Error('Elem not found');
    }
    this.element = element;
  }

  /*
   * Получает информацию.
   * Если пользователь авторизован,
   * в элемент .user-name устанавливает имя
   * авторизованного пользователя
  */
  update(){
    const user = User.current();
    if (!(user)) {
      return;
    }
    const name = this.element.querySelector('.user-name');
    name.textContent = user.name;
  }
}
