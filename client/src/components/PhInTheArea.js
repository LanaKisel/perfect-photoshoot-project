import React, {useState, useContext, useEffect} from 'react'
import { PhotographersContext, PhotographersProvider } from './Context'
import DisplayPh from './DisplayPh'
const PhInTheArea = () => {
    const {photographers, setPhotographers}=useContext(PhotographersContext)

    if (!photographers || photographers.length === 0) {
        fetch('/photographers')
            .then(r=>r.json())
            .then(data => setPhotographers(data))
    }
    const photographersList = photographers.map(p=> <DisplayPh key={p.id} photographer={p}></DisplayPh>)
  return (
    <div>
      <h1>Here are all photographers in your area!</h1>  
      <h2>{photographersList}</h2>
    </div>
  )
}

export default PhInTheArea
