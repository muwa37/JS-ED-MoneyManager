/*
 * Класс Sidebar отвечает за работу боковой колонки.
*/
class Sidebar {
  /*
   * Запускает initAuthLinks и initToggleButton
  */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /*
   * Отвечает за скрытие/показа боковой колонки.
  */
  static initToggleButton() {
    const sidebarBtn = document.querySelector( '.sidebar-toggle' );
    sidebarBtn.addEventListener('click', (e) => {
      e.preventDefault();
      document.body.classList.toggle('sidebar-open');
      document.body.classList.toggle('sidebar-collapse');
    });
  }

  /*
   * При нажатии на кнопку входа, показывает окно входa
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout
  */
  static initAuthLinks() {
    const registerLink = document.querySelector('.menu-item_register');
    const loginLink = document.querySelector('.menu-item_login');
    const logoutLink = document.querySelector('.menu-item_logout');
    registerLink.addEventListener('click', () => App.getModal('register').open());
    loginLink.addEventListener('click', () => App.getModal('login').open());
    logoutLink.addEventListener('click', () => User.logout());
  }
}