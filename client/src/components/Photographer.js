import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import BookPhotoshoot from './BookPhotoshoot'
const Photographer = () => {
    let { id } = useParams()
    const [photographer, setPhotographer] = useState({
        name:"",
        zip_code:"",
        profile_picture:"",
        bio:"",
        portfolio_pictures:""
    })
    
    // const [photoshoots, setPhotoshoots]=useState([])

    useEffect(()=>{
        fetch(`/photographers/${id}`)
        .then(r=>r.json())
        .then(data=>setPhotographer(data))
    },[])

    // useEffect(()=>{
    //     fetch(`/photoshoots`)
    //     .then(r=>r.json())
    // })
    const profileSource= photographer.profile_picture.startsWith('http') ? `${photographer.profile_picture}` : `data:image/jpeg;base64,${photographer.profile_picture}`
    const portfolioSource= photographer.portfolio_pictures.startsWith('http') ? `${photographer.portfolio_pictures}` : `data:image/jpeg;base64,${photographer.portfolio_pictures}`
    const photoshoots=photographer.photoshoots?.map(photoshoot=> <Link key={photoshoot.id} to={`/photoshoots/${photoshoot.id}`}>{photoshoot.user.name}'s photoshoot on {photoshoot.date_time}<br/></Link>)
return (
    <div className='photographer'>
        {/* Navlink */}
        <div className='row'>
            <div className="column">
            {/* <img className='profile_pic' src={`data:image/jpeg;base64,${photographer.profile_picture}`}></img> */}
            <img className='profile_pic' src={profileSource}></img>
            </div>
            <div className ="column">
            <h2>{photographer.name}</h2>
            <h3>{photographer.bio}</h3>
            <h3>{photographer.zip_code}</h3>
            </div>
        </div>
        <div className='portfolio'>
            <h1>Take a look at my work!</h1>
            {/* <img src={`data:image/jpeg;base64,${photographer.portfolio_pictures}`}></img> */}
            <img className='portfolio_pic' src={portfolioSource}></img>
        </div> 
        <button style={{ float: "right", marginRight:"100px"}} className='book' type='submit' onClick={BookPhotoshoot}>Click to book</button>   
        {photoshoots}       
    </div>
)
}

export default Photographer 