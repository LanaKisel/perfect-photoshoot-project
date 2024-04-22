import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const DetailsPhotoshoot = () => {
    console.log("blah")
    let {id} = useParams()
    const [photoshoot, setPhotoshoot]= useState([]) 
    useEffect(()=>{        
        fetch(`/photoshoots/${id}`)
        .then(r=>r.json())
        .then(data=>setPhotoshoot(data))
    }, [])
  return (
    <div>
        <h2>Here is the details of this photoshoot:</h2>
        <h3>{photoshoot.location}</h3>
        <h3>{photoshoot.date_time}</h3>      
    </div>
  )
}

export default DetailsPhotoshoot
