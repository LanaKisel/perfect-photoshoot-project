import React, { useEffect, useState } from 'react'
import {useHistory} from "react-router-dom"

const BookPhotoshoot = ({photographer_id}) => {
    const [photoshoot, setPhotoshoot]=useState({
        // id:"",
        photographer_id:photographer_id,
        user_id:1,
        location:"",
        date_time:""
    })

    console.log(photographer_id)

    const handleChange = (e) =>{

        
        setPhotoshoot({...photoshoot, [e.target.name]: e.target.value})
    }
    let history = useHistory();
    const handleSubmit = (e)=>{
        e.preventDefault();
       
        fetch("/photoshoots",{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify(photoshoot)
        })
        .then(r=>r.json())
        .then(data=>{
            if(!data.errors && !!data.id){
                history.push(`/photoshoots/${data.id}`)
            }else{
                // display error message in modal
            }
            
        })
    }       
  return (
    <div>
        <h1>Book photoshoot</h1>
        <form onSubmit={handleSubmit}>            
            <label>Location</label>
            <input name="location" onChange={handleChange}></input>
            <label>Date and time</label>
            <input name="date_time" onChange={handleChange}></input>
            <input type="submit"></input>
        </form>      
    </div>
  )
}

export default BookPhotoshoot
