import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {format} from 'date-fns'
const DetailsPhotoshoot = () => {
    let {id} = useParams()
    const [photoshoot, setPhotoshoot]= useState([]) 
    useEffect(()=>{        
        fetch(`/photoshoots/${id}`)
        .then(r=>r.json())
        .then(data=>(
          console.log(data),
          setPhotoshoot(data)))
    }, [])


  return (
    <div>
        <h2>Here is the details of this photoshoot:</h2>
        <h3>{photoshoot.location}</h3>
        <h3>{photoshoot.date_time? format(new Date(photoshoot.date_time.replace(/-/g, '/')), 'MMMM do yyyy, h:mm a'): ""}</h3>      
    </div>
  )
}

export default DetailsPhotoshoot
