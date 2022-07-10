import { createContext, useState } from "react";

const { Consumer, Provider } = createContext();

function AccountProvider(props) {
  const [account, setAccount] = useState(undefined);
  return (
    <Provider value={{ account: account, setAccount: setAccount }}>
      {props.children}
    </Provider>
  );
}

export { Consumer as AccountConsumer, AccountProvider };
