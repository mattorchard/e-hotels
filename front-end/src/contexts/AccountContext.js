import React from "react";

const AccountContext = React.createContext({
  account: {},
  setAccount: () => {}
});
export default AccountContext;
