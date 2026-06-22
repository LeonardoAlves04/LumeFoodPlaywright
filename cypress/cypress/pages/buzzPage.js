class BuzzPage {
  selectorsList() {
    const selectors = {
      postInput: ".oxd-buzz-post-input",
      postButton: "button",
      posts: ".orangehrm-buzz-post",
      postActionButtons: "button",
    };

    return selectors;
  }

  checkBuzzPage() {
    cy.url().should("include", "/buzz");
  }

  checkPostInputVisible() {
    cy.get(this.selectorsList().postInput).should("be.visible");
  }

  checkFeedHasPosts() {
    cy.get(this.selectorsList().posts).should("exist");
  }

  checkFirstPostHasActionButtons() {
    cy.get(this.selectorsList().posts)
      .first()
      .within(() => {
        cy.get(this.selectorsList().postActionButtons).should(
          "have.length.greaterThan",
          0,
        );
      });
  }

  typePost(text) {
    cy.get(this.selectorsList().postInput).first().clear().type(text);
  }

  checkPostInputHasText(text) {
    cy.get(this.selectorsList().postInput)
      .first()
      .should("have.length.greaterThan", 0);
  }

  submitPost() {
    cy.get(this.selectorsList().postButton).contains("Post").click();
  }
}

export default BuzzPage;
