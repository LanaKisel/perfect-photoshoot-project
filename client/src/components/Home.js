import React, { useState, useEffect, useContext, useCallback } from 'react'
import { PhotographersContext } from './Context';
import Gallery from 'react-photo-gallery';
import Search from './Search';
import { useHistory } from "react-router-dom"
import setBodyColor from '../setBodyColor'
const Home = () => {
  setBodyColor({ color: "#CAA0AF" })
  const { photographers, setPhotographers } = useContext(PhotographersContext)
  const [searchedZipCode, setZipCode] = useState("")

  let history = useHistory();
  useEffect(() => {
    fetch(process.env.REACT_APP_API_URI + '/photographers')
      .then(r => r.json())
      .then(data => setPhotographers(data))
  }, [])

  const photos = photographers.filter((photographer) => {
    return ("" + photographer.zip_code).includes(searchedZipCode) || !searchedZipCode || searchedZipCode.length === 0
  }).flatMap(p => {
    return p.portfolio_pictures.split('|').map(picture => {
      if (picture.startsWith('http')) {
        return {
          src: `${picture}`,
          width: 1,
          height: 1,
          href: `/photographers/${p.id}`
        }
      }
      else {
        return {
          src: `data:image/jpeg;base64,${picture}`,
          width: 1,
          height: 1,
          href: `/photographers/${p.id}`
        }
      }
    })
  })
  function handleSearch(inputZipCode) {
    history.push(`/photographers/zip/${inputZipCode}`);
  }
  const photographerClick = useCallback((event, { photo, index }) => {
    history.push(photo.href);
  })
  
  return (
    <div>
      <h1>Ready to book a perfect photoshoot???</h1>
      <Search onSearch={handleSearch} />
      <Gallery photos={photos} onClick={photographerClick}/>
    </div>
  )
}

export default Home
