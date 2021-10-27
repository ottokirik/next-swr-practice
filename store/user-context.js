import { createContext, useState } from 'react';

export const initUserState = {
    id: '',
    name: '',
    avatar: '',
    createdAt: '',
};

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(initUserState);

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
