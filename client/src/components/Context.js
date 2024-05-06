import { createContext, useState } from "react";
const PhotographersContext = createContext();

const PhotographersProvider = ({ children }) => {
    const [photographers, setPhotographers] = useState([]);
    const addPhotographer = (newPhotographer) => {
        setPhotographers([...photographers, newPhotographer]);
    }

    return (
        <PhotographersContext.Provider value={{ photographers, setPhotographers, addPhotographer }}>
            {children}
        </PhotographersContext.Provider>
    )
}
export { PhotographersContext, PhotographersProvider } 