import { createContext, useState } from "react";

export const loaderContext = createContext();

export const LoaderContext = ({children}) => {
    const [loading, setLoading] = useState(false);
    return (
        <loaderContext.Provider value={{loading, setLoading}}>
            {children}
        </loaderContext.Provider>
    )
}