import userData from "../fixtures/user-data.json";
import LoginPage from "./../pages/loginPage";
import DashboardPage from "./../pages/dashboardPage";
import MenuPage from "../pages/menuPage";

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();
const menuPage = new MenuPage();

describe("Orange HRM Tests", () => {
  const selectorsList = {
    firstNameField: "[name='firstName']",
    middleNameField: "[name='middleName']",
    lastNameField: "[name='lastName']",
    genericField: ".oxd-input--active",
    dropDownInput: ".oxd-select-text--active",
    dateField: "[placeholder='yyyy-mm-dd']",
    dateCloseButton: ".--close",
    submitButton: "[type='submit']",
    textInput: ".oxd-select-text-input",
    radioInput: ".oxd-radio-input",
  };

  it.only("User Info Success - Success", () => {
    loginPage.acessLoginPage();
    loginPage.loginWithUser(
      userData.userSuccess.username,
      userData.userSuccess.password,
    );
    dashboardPage.checkDashboardPage();
    menuPage.acessMyInfo();

    cy.get(selectorsList.firstNameField, { timeout: 10000 })
      .clear()
      .type("FirstNameTest");
    cy.get(selectorsList.middleNameField, { timeout: 10000 })
      .clear()
      .type("MiddleNameTest");
    cy.get(selectorsList.lastNameField, { timeout: 10000 })
      .clear()
      .type("LastNameTest");
    cy.get(selectorsList.genericField, { timeout: 10000 })
      .eq(3)
      .clear()
      .type("123teste");
    cy.get(selectorsList.genericField, { timeout: 10000 })
      .eq(4)
      .clear()
      .type("OtherIdTest");
    cy.get(selectorsList.genericField, { timeout: 10000 })
      .eq(5)
      .clear()
      .type("DriversLicenseNumberTest");
    cy.get(selectorsList.genericField, { timeout: 10000 })
      .eq(6)
      .clear()
      .type("2025-03-10");
    cy.get(selectorsList.dateCloseButton).click();
    cy.get(selectorsList.textInput).eq(0).click();
    cy.contains("Brazilian").click();
    cy.get(selectorsList.textInput).eq(1).click();
    cy.contains("Other").click();
    cy.get(selectorsList.radioInput).eq(1).click();
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
