import { HomePage, LoginPage } from "./pages";
import { AccountConsumer, AccountProvider } from "./stores/account";
import { authenticate, getTokenFromStorage } from "./utils/common";

const App = () => {
  return (
    <AccountProvider>
      <AccountConsumer>
        {(context) => {
          const token = getTokenFromStorage();
          if (token && token != null) {
            if (!context.account) {
              authenticate(token)
                .then((response) => {
                  if (response.status === 200) {
                    context.setAccount(response.data);
                  } else {
                    window.location.removeItem("token");
                    window.sessionStorage.removeItem("token");
                  }
                })
                .catch((error) => {
                  // handleLogout(context);
                });
            }
            return <HomePage></HomePage>;
          } else {
            return <LoginPage />;
          }
        }}
      </AccountConsumer>
    </AccountProvider>
  );
};

export default App;
