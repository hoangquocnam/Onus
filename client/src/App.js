import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HomePage, LoginPage } from "./pages";
import { AccountConsumer, AccountProvider } from "./stores/account";
import { authenticate, getTokenFromStorage } from "./utils/common";

const App = () => {
  return (
    <>
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

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={4}
      />
    </>
  );
};

export default App;
