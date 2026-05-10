describe("Orange HRM Tests", () => {
  const selectorsList = {
    username: '[name="username"]',
    password: "[name='password']",
    submit: "[type='submit']",
    alert: "[role='alert']",
    sectionTitleTopBar: "[class='oxd-topbar-header-breadcrumb-module']",
  };

  it("Login - Success", () => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );
    cy.get(selectorsList.username).type("Admin");
    cy.get(selectorsList.password).type("admin123");
    cy.get(selectorsList.submit).click();
    cy.location("pathname").should("equal", "/web/index.php/dashboard/index");
    cy.get(selectorsList.sectionTitleTopBar).contains("Dashboard");
  });

  it("Login - Fail", () => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );
    cy.get(selectorsList.username).type("Test");
    cy.get(selectorsList.password).type("Test");
    cy.get(selectorsList.submit).click();
    cy.get(selectorsList.alert);
  });
});
