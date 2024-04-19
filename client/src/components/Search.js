import { useState } from "react"
import React from 'react'
import {useDebouncedCallback} from 'use-debounce' 

const Search = ({onSearch}) => {
    const [inputZipCode, setInputZipCode]=useState("")
    const debounced = useDebouncedCallback(
      (e)=>{
        console.log('onchange changing debounce');        
        onSearch(e)        
      }, 100
    )
    
    function handleChange(e){
        console.log('onchange changing');
        setInputZipCode(e.target.value)
        debounced(e.target.value)
    }

    function handleFormSubmit(e){
        console.log('onsubmit submitting')
        e.preventDefault();
        onSearch(inputZipCode);
    }

  return (
    <div>
      <form className="searchbar" onSubmit={handleFormSubmit}>
        <input 
          placeholder="Enter your zip code.." 
          type="text"
          id="search"
          value={inputZipCode} 
          onChange={handleChange}/>            
        <button type="submit">Find photographers🔎</button>
      </form>        
    </div>
  )
}

export default Search
