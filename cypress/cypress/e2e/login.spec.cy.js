import userData from "../fixtures/user-data.json";

describe("Orange HRM Tests", () => {
  const selectorsList = {
    username: '[name="username"]',
    password: "[name='password']",
    submit: "[type='submit']",
    alert: "[role='alert']",
    sectionTitleTopBar: "[class='oxd-topbar-header-breadcrumb-module']",
    dashboardGrid: "[class='oxd-layout-context']",
  };

  it("Login - Success", () => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );
    cy.get(selectorsList.username).type(userData.userSuccess.username);
    cy.get(selectorsList.password).type(userData.userSuccess.password);
    cy.get(selectorsList.submit).click();
    cy.location("pathname").should("equal", "/web/index.php/dashboard/index");
    cy.get(selectorsList.dashboardGrid);
  });

  it("Login - Fail", () => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );
    cy.get(selectorsList.username).type(userData.userFail.username);
    cy.get(selectorsList.password).type(userData.userFail.password);
    cy.get(selectorsList.submit).click();
    cy.get(selectorsList.alert);
  });
});
