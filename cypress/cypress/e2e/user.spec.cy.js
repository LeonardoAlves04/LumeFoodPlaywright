import userData from "../fixtures/user-data.json";
import LoginPage from "./../pages/loginPage";
import DashboardPage from "./../pages/dashboardPage";
import MenuPage from "../pages/menuPage";
import MyInfoPage from "../pages/myInfoPage";

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();
const menuPage = new MenuPage();
const myInfoPage = new MyInfoPage();

describe("Orange HRM Tests", () => {
  it("User Info Update - Success", () => {
    loginPage.acessLoginPage();

    loginPage.loginWithUser(
      userData.userSuccess.username,
      userData.userSuccess.password,
    );

    dashboardPage.checkDashboardPage();

    menuPage.acessMyInfo();

    myInfoPage.fillPersonalDetails(
      "TestFirstName",
      "TestMiddleName",
      "TestLastName",
    );

    myInfoPage.fillEmploymentDetails(
      "12345",
      "67890",
      "A1234567",
      "2024-01-01",
    );

    myInfoPage.fillStatusDetails();

    myInfoPage.saveForm();
  });
});
