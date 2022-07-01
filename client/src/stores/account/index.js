import React, { createContext, useState } from "react";

const { Provider, Consumer } = createContext();

function AccountProvider(props) {
  const [account, setAccount] = useState(undefined);
  return (
    <Provider value={{ account: account, setAccount: setAccount }}>
      {props.children}
    </Provider>
  );
}

export { Consumer as AccountConsumer, AccountProvider };
