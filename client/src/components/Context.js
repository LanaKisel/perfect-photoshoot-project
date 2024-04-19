import {createContext, useState} from "react";
const PhotographersContext = createContext();
// const PhotoshootContest= createContext();

// function Context(){
//     return (
//         <PhotographersContext.Provide value=
//     )

// }

 const PhotographersProvider = ({children}) =>{
    const [photographers, setPhotographers] = useState([]);
    // const [photoshoots, setPhotoshoots] = useState([]);

    const addPhotographer = (newPhotographer)=>{
        setPhotographers([...photographers, newPhotographer]);
    }
    // const addPhotoshoot = (newPhotoshoot)=>{
    //     setPhotoshoots([...photoshoots, newPhotoshoot]);
    // }

 return (
    <PhotographersContext.Provider value={{photographers, setPhotographers, addPhotographer}}>
        {children}
    </PhotographersContext.Provider>
 )
}
export {PhotographersContext, PhotographersProvider} 