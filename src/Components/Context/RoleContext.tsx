import { createContext, useEffect, useState } from "react";



export const RoleContext =  createContext({});


export default function RoleContextProvider({ children }: { children: React.ReactNode }) {

   
    const [isAdmin, setIsAdmin] = useState(false)
    const [isUser, setIsUser] = useState(false)
    const [isCrafter, setIsCrafter] = useState(false)
    const roles =localStorage.getItem("role")
    useEffect(() => {
        const role = localStorage.getItem("role");
        if (role === "admin") {
            setIsAdmin(true);
        } else if (role === "user") {
            setIsUser(true);    
        } else if (role === "crafter") {
            setIsCrafter(true);
        }
    }, [roles]);
    return (
        <RoleContext.Provider value={{isAdmin, setIsAdmin, isUser, setIsUser, isCrafter, setIsCrafter}}>
          {children}
        </RoleContext.Provider>
    );
}
