import React, { useEffect, useState } from 'react'
import {useHistory} from "react-router-dom"
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
const BookPhotoshoot = ({photographer_id}) => {
    //datepicker
    const [startDate, setStartDate] = useState("")
    //timepicker
    // let handleColor = (time) => {
    //     return time.getHours() > 12 ? "text-success" : "text-error";
    // };

    const [photoshoot, setPhotoshoot]=useState({
        photographer_id:photographer_id,
        user_id:1,
        location:"",
        date_time:""
    })

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
  
  const setPhotoshootDate_time = (date_time) =>{        
    setPhotoshoot({...photoshoot, ['date_time']: date_time.toISOString().replace('T',' ').split(".")[0]})
    setStartDate(date_time) 
}         
  return (
    <div>
        <h1>Book photoshoot</h1>
        <form onSubmit={handleSubmit}>            
            <label>Location:</label>
            <input name="location" onChange={handleChange}></input>
            <br />
            <label>Date and time:</label>
            {/* <input name="date_time" onChange={handleChange}></input> */}
            <DatePicker
            //   dateFormat="yyyy/MM/dd"
            //   showIcon           
              selected={startDate}
              onChange={(date)=>setPhotoshootDate_time(date)}
            //   icon="fa fa-calendar"
              showTimeSelect
              timeFormat='HH:mm'
              timeIntervals={15}
              timeCaption='time'
              dateFormat="yyyy-MM-dd hh:mm aa"
            //   timeClassName={handleColor}
            />
            <input type="submit"></input>  
        </form>      
    </div>
  )
}

export default BookPhotoshoot
