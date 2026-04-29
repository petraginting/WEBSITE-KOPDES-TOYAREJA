import { createContext, useContext } from "react";

export const AuthContext = createContext();

export const useAppContext = () => useContext(AuthContext);