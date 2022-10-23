
import { createContext, useContext, useState, useEffect } from "react";
export const LoginContext = createContext();
export const LoginProvider = ({ children }) => {
    
    const [person, setPerson] = useState(true);
    const [activeUser, setActiveUser] = useState();
    const [auth, setAuth] = useState(0);

    const values = {
        activeUser, setActiveUser,person, setPerson, auth, setAuth
    };

    return (
        <LoginContext.Provider value={values}>{children}</LoginContext.Provider>
    );
};

export default LoginContext;