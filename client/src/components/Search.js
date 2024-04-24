import { useState } from "react"
import React from 'react'
import {useDebouncedCallback} from 'use-debounce' 
import { useFormik } from "formik";
import * as Yup from "yup";

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

  //formik 
  const formSchema = Yup.object().shape({
    zip_code: Yup.number().positive().integer().typeError("Please enter an integer").max(5),
  });

  const formik = useFormik({
    initialValues: {
      zip_code:''
    },
    // validationSchema: formSchema,
    onSubmit: values =>{
      console.log('Form submitted!')
      alert(JSON.stringify(values, null, 2));
    },
  }) 

  return (
    <div>
      <form className="searchbar" onSubmit={formik.handleSubmit}>
        <input 
          placeholder="Enter your zip code.." 
          type="text"
          id="search"
          // value={inputZipCode}           
          // onChange={handleChange}
          value={formik.values.zip_code}
          onChange={formik.handleChange}
          
          />            
        <button type="submit">Find photographers🔎</button>
      </form>        
    </div>
  )
}

export default Search


