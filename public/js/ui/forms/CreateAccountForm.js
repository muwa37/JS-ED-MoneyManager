/*
 * Управляет формой создания нового счёта
*/
class CreateAccountForm extends AsyncForm {
  /*
   * Создаёт счёт и закрывает окно в случае успеха.
  */
  onSubmit(data) {
    Account.create(options.data, (err, response) => {
      if (!(response.success)) {
        return
      }
      App.getWidget('accounts').update();
      this.element.reset();

      const modal = App.getModal('createAccount');
      modal.close();

      App.update();
    });
  }
}