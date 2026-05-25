import userData from "../fixtures/user-data.json";
import LoginPage from "../pages/loginPage";
import DashboardPage from "../pages/dashboardPage";
import MenuPage from "../pages/menuPage";
import MyInfoPage from "../pages/myInfoPage";

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();

describe("Login Orange HRM Tests", () => {
  it("Login - Fail", () => {
    loginPage.acessLoginPage();
    loginPage.loginWithUser(
      userData.userFail.username,
      userData.userFail.password,
    );
    loginPage.checkLoginError();
  });

  it("Login - Success", () => {
    loginPage.acessLoginPage();
    loginPage.loginWithUser(
      userData.userSuccess.username,
      userData.userSuccess.password,
    );
    dashboardPage.checkDashboardPage();
  });
});
