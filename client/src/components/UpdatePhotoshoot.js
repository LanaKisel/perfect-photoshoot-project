import React, { useEffect, useState } from 'react'
import {useHistory} from "react-router-dom"
import DatePicker from "react-datepicker";
import { useFormik} from 'formik';
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";

const UpdatePhotoshoot = ({photographer_id}) => {
    let history = useHistory();
    const formSchema = Yup.object().shape({
        location: Yup.string().required("Name cannot be empty").max(60),
        date_time: Yup.date().min(new Date(),'Photoshoot date must be in the future.')
      });
    const formik= useFormik({
        initialValues: {
            photographer_id:photographer_id,
            user_id:1,
            location:'',
            date_time:'',
        },
        validationSchema: formSchema,
        onSubmit: values=>{
            let formdata = structuredClone(formik.values) 
            formdata.date_time=formdata.date_time.toISOString().replace('T',' ').split(".")[0]
            fetch("/photoshoots",{
                method:'PATCH',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(formdata)
            })
            .then(r=>r.json())
            .then(data=>{
                if(!data.errors && !!data.id){
                    history.push(`/photoshoots/${data.id}`)
                }else{
                    alert('Photoshoot data has no id or has errors')
                }            
            })
        }
    })
  const setPhotoshootDate_time = (date_time) =>{ 
    formik.setFieldValue('date_time', date_time)
    console.log(date_time, typeof(date_time))
  }
  
  return (
    <div>
        <h1>Update photoshoot</h1>
        <form onSubmit={formik.handleSubmit}>            
            <label>Location:</label>
            <div>{(formik.errors.location)? <p style={{color: 'red'}}>{formik.errors.location}</p> : null}</div>
            <input type="text" name="location" value={formik.values.location} onChange={formik.handleChange}></input>
            <br />
            <label>Date and time:</label>
            {/* <input name="date_time" onChange={handleChange}></input> */}
            <div>{(formik.errors.date_time)? <p style={{color: 'red'}}>{formik.errors.date_time}</p> : null}</div>
            <DatePicker          
              selected={formik.values.date_time}
              onChange={(date)=>setPhotoshootDate_time(date)}
              showTimeSelect
              name="date_time"
              timeFormat='HH:mm'
              timeIntervals={15}
              timeCaption='time'
              dateFormat="yyyy-MM-dd hh:mm aa"
            />
            <input type="submit"></input>  
        </form>      
    </div>
  )
}

export default UpdatePhotoshoot
