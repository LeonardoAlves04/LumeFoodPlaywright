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
    middleNameField: "[name='middleName']",
    lastNameField: "[name='lastName']",
    genericField: ".oxd-input--active",
    dropDownInput: ".oxd-select-text--active",
    dateField: "[placeholder='yyyy-mm-dd']",
    dateCloseButton: ".--close",
    submitButton: "[type='submit']",
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
      "FirstNameTest",
    );
    cy.get(selectorsList.middleNameField, { timeout: 10000 }).type(
      "MiddleNameTest",
    );
    cy.get(selectorsList.lastNameField, { timeout: 10000 }).type(
      "LastNameTest",
    );
    cy.get(selectorsList.genericField, { timeout: 10000 }).eq(3).type("123");
    cy.get(selectorsList.genericField, { timeout: 10000 })
      .eq(4)
      .type("OtherIdTest");
    cy.get(selectorsList.genericField, { timeout: 10000 })
      .eq(5)
      .type("DriversLicenseNumberTest");
    cy.get(selectorsList.genericField, { timeout: 10000 })
      .eq(6)
      .type("2025-03-10");
    cy.get(selectorsList.dateCloseButton).click();
    cy.get(selectorsList.submitButton).eq(0).click();
    cy.get("body").should("contain", "Successfully Updated");
  });

  it("Login - Fail", () => {
    cy.visit("auth/login");
    cy.get(selectorsList.username).type(userData.userFail.username);
    cy.get(selectorsList.password).type(userData.userFail.password);
    cy.get(selectorsList.submit).click();
    cy.get(selectorsList.alert);
  });
});
