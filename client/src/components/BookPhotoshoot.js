import React, { useEffect } from 'react'

const BookPhotoshoot = () => {
    const [photoshoot, setPhotoshoot]=useState({
        id:"",
        photographer_id:"",
        user_id:"",
        location:"",
        date_time:""
    })

    useEffect(()=>{
        fetch(`photoshoots`),{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({photoshoot})
        }
        .then(r=>r.json)
        .then(data=>setPhotoshoot(data))
    }, [])
  return (
    <div>
        <h1>Book photoshoot</h1>
        <form onSubmit={handleSubmit}>
            <label>T</label>
        </form>      
    </div>
  )
}

export default BookPhotoshoot
