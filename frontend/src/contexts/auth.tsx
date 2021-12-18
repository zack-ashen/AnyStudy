import { createContext } from "react";
import { User } from "../types";

type AuthState = {
  logout: () => void;
  id: string;
  user?: User;
  refreshUser: () => void;
};

const AuthContext = createContext({
  logout: () => { },
  id: "",
  user: {},
  refreshUser: () => {},
} as AuthState);

export default AuthContext;
