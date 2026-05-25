class LoginPage {
  selectorsList() {
    const selectors = {
      usernameField: '[name="username"]',
      passwordField: "[name='password']",
      submitButton: "[type='submit']",
      alertMessage: "[class='orangehrm-login-error']",
    };

    return selectors;
  }

  acessLoginPage() {
    cy.visit("auth/login");
  }

  loginWithUser(username, password) {
    cy.get(this.selectorsList().usernameField).type(username);
    cy.get(this.selectorsList().passwordField).type(password);
    cy.get(this.selectorsList().submitButton).click();
  }

  checkLoginError() {
    cy.get(this.selectorsList().alertMessage).should("be.visible");
  }
}

export default LoginPage;
