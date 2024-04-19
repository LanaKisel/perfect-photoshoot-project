import React from 'react'
// import { Link } from 'react-router-dom/cjs/react-router-dom'
import { Link } from 'react-router-dom'


const DisplayPh = ({photographer}) => {

  const source= photographer.portfolio_pictures.startsWith('http') ? `${photographer.portfolio_pictures}` : `data:image/jpeg;base64,${photographer.profile_picture}`
 
  // src={`data:image/jpeg;base64,${photographer.profile_picture}`}
  return (
    <div>
        <img key={photographer.id} className='profile_pic' src={source}></img>
        <br/>
        <br/>
        <Link to={`/photographers/${photographer.id}`}>
            {photographer.name}
        </Link>
        <br/> 
        <br/>     
    </div>
  )
}

export default DisplayPh
