import React, { useState, useEffect, useContext, useCallback } from 'react'
import { PhotographersContext } from './Context';
import Gallery from 'react-photo-gallery';
import Search from './Search';
import {useHistory} from "react-router-dom"
import setBodyColor from '../setBodyColor'
const Home = () => {
    const {photographers, setPhotographers}=useContext(PhotographersContext)
    const [searchedZipCode, setZipCode]=useState("")
    // const navigate=useNavigate();
    let history = useHistory();
    // if (!photographers || photographers.length===0){
        useEffect(()=>{
            fetch('/photographers')
            .then(r=>r.json())
            .then(data=>setPhotographers(data))
        }, [])

    const photos = photographers.filter((photographer)=>{
        return (""+ photographer.zip_code).includes(searchedZipCode) || !searchedZipCode || searchedZipCode.length===0}).map(p=>{
        if (p.portfolio_pictures.startsWith('http')){
          return {
            src: `${p.portfolio_pictures}`,
            width: 1,
            height: 1,
            href: `/photographers/${p.id}`
          }
        }
        else{
          return {
            src: `data:image/jpeg;base64,${p.portfolio_pictures}`,
            width: 1,
            height: 1,
            href: `/photographers/${p.id}`
          }
        }        
      })

    function handleSearch(inputZipCode){
        setZipCode(inputZipCode)
    }   
    const photographerClick=useCallback((event, {photo,index})=>{
        history.push(photo.href);
        console.log(photo)
        console.log(index)
        console.log(event)
    })

    // function handleInputChange(e){
    //     setZipCode(e.target.value)
    // }

    // function handleFormSubmit(e){
    //     e.preventDefault();
    //     setZipCode(e.target.value)
    // }

  setBodyColor({color: "#CAA0AF"})  
  return (
    <div>        
        <h1>Ready to book a perfect photoshoot???</h1>
        <Search onSearch={handleSearch} />
        {/* <form onSubmit={handleFormSubmit}>
            <input placeholder="Enter your zip code.."type="text" zip_code="zip_code" value={zip_code} onChange={handleInputChange}/>            
            <button>Find photographers</button>
            <br/>
        </form>   */}
        <Gallery photos={photos} onClick={photographerClick}/>  
        
    </div>
  )
}

export default Home
