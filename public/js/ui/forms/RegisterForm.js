/*
 * Управляет формой регистрации
*/
class RegisterForm extends AsyncForm {
  /*
   * Производит регистрацию, устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
  */
  onSubmit(options) {
    User.register(options.data, (err, response) => {
      if (!(response.success)) {
        return;
      }
      this.element.reset();

      App.setState('user-logged');

      const modal = new Modal( this.element.closest('.modal'));
      modal.close().unregisterEvents();
    });
  }
}