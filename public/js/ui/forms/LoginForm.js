/*
 * Класс управляет формой входа
*/
class LoginForm extends AsyncForm {
  /*
   * Производит авторизацию, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
  */
  onSubmit(options) {
    User.login(options.data, ( err, response ) => {
      if ( !response.success ) {
        return;
      }

      this.element.reset();

      App.setState( 'user-logged' );

      const modal = App.getModal( 'login' );
      modal.close();
    });
  }
}