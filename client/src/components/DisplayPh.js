import React from 'react'
import { Link } from 'react-router-dom'


const DisplayPh = ({ photographer }) => {

  const source = photographer.portfolio_pictures.startsWith('http') ? `${photographer.profile_picture}` : `data:image/jpeg;base64,${photographer.profile_picture}`

  return (
    <div>
      <img key={photographer.id} className='profile_pic' src={source} height={200} width={200}></img>
      <br />
      <br />
      <Link to={`/photographers/${photographer.id}`}>
        {photographer.name}
      </Link>
      <br />
      <br />
    </div>
  )
}

export default DisplayPh
