import { useContext } from "react";
import { AccountContext } from "../stores/account";

export default function useAccount() {
  return useContext(AccountContext);
};
