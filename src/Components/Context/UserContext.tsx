import { useState } from "react";
import { createContext } from "react";




 export const UserContext = createContext<{ userLogin: string | null; setUserLogin: React.Dispatch<React.SetStateAction<string | null>> } | null>(null);

 export function UserContextProvider(props: React.PropsWithChildren<object>){

   const [userLogin, setUserLogin] = useState<string | null>(null);



    return (
        <UserContext.Provider value={ {userLogin,setUserLogin} }>
            {props.children}
        </UserContext.Provider>
    )
}