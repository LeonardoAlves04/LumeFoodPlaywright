class DashboardPage {
  selectorsList() {
    const selectors = {
      dashboardGrid: "[class='oxd-layout-context']",
    };

    return selectors;
  }

  checkDashboardPage() {
    cy.location("pathname").should("equal", "/web/index.php/dashboard/index");
    cy.get(this.selectorsList().dashboardGrid).should("be.visible");
  }
}

export default DashboardPage;
