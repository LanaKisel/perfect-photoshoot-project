import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import "react-datepicker/dist/react-datepicker.css";

const CancelPhotoshoot = ({ photoshoot_id }) => {

    const [photoshoot, setPhotoshoot] = useState([])
    useEffect(() => {
        fetch(`/photoshoots/${photoshoot_id}`)
            .then(r => r.json())
            .then(data => (
                setPhotoshoot(data)))
    }, [])
    let history = useHistory();
    function handleDelete() {
        fetch(`/photoshoots/${photoshoot_id}`, {
            method: "DELETE",
        })
            .then(r => {
                if (r.ok) { history.push(`/photographers/${photoshoot.photographer_id}`) }
                else {
                    history.go(0);
                }
            })
    }

    return (
        <div>
            <h1>Cancel this photoshoot?</h1>
            <h3 className='cancelPhotoshoot'>Location: {photoshoot.location}</h3>
            <h3 className='cancelPhotoshoot'>Time: {photoshoot.date_time}</h3>
            <button className="cancel" type='button' onClick={handleDelete}>Cancel</button>
        </div>
    )
}

export default CancelPhotoshoot
