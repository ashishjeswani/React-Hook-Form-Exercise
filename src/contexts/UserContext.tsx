import {createContext,useContext} from "react";
import {IUserContext, IUserProvider} from "../typings.ts";

const UserContext = createContext<IUserContext | undefined>(undefined)

export function UserProvider({userId,children}:IUserProvider){
    return(
        <UserContext.Provider value={{userId}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
}