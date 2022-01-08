import { createContext, useContext, useState } from 'react';

type AuthContext = {
  jwtCsrf: string;
  setJwtCsrf: (jwtCsrf: string) => void;
};

const defaultContext: AuthContext = {
  jwtCsrf: "",
  setJwtCsrf: () => {},
};

const authContext = createContext<AuthContext>(defaultContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [jwtCsrf, setJwtCsrf] = useState(
    localStorage.getItem("accessCsrf") || ""
  );

  return (
    <authContext.Provider value={{ jwtCsrf, setJwtCsrf }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);