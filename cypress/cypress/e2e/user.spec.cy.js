import userData from "../fixtures/user-data.json";

describe("Orange HRM Tests", () => {
  const selectorsList = {
    username: '[name="username"]',
    password: "[name='password']",
    submit: "[type='submit']",
    alert: "[class='orangehrm-login-error']",
    sectionTitleTopBar: "[class='oxd-topbar-header-breadcrumb-module']",
    dashboardGrid: "[class='oxd-layout-context']",
    myInfoButton: "[href='/web/index.php/pim/viewMyDetails']",
    firstNameField: "[name='firstName']",
    lastNameField: "[name='lastName']",
  };

  it.only("User Info Success - Success", () => {
    cy.visit("auth/login");
    cy.get(selectorsList.username).type(userData.userSuccess.username);
    cy.get(selectorsList.password).type(userData.userSuccess.password);
    cy.get(selectorsList.submit).click();
    cy.location("pathname").should("equal", "/web/index.php/dashboard/index");
    cy.get(selectorsList.dashboardGrid);
    cy.get(selectorsList.myInfoButton).click();
    cy.get(selectorsList.firstNameField, { timeout: 10000 }).type(
      "NicknameTest",
    );
  });

  it("Login - Fail", () => {
    cy.visit("auth/login");
    cy.get(selectorsList.username).type(userData.userFail.username);
    cy.get(selectorsList.password).type(userData.userFail.password);
    cy.get(selectorsList.submit).click();
    cy.get(selectorsList.alert);
  });
});
