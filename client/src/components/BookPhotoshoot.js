import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import DatePicker from "react-datepicker";
import { useFormik } from 'formik';
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
const BookPhotoshoot = ({ photographer_id }) => {
    
    const [user, setUser] = useState({ name: "", id: -1 });

    let history = useHistory();
    const formSchema = Yup.object().shape({
        location: Yup.string().required("Name cannot be empty").max(60),
        date_time: Yup.date().min(new Date(), 'Photoshoot date must be in the future.')
    });
    const formik = useFormik({
        initialValues: {
            photographer_id: photographer_id,
            user_id: -1,
            location: '',
            date_time: '',
        },
        validationSchema: formSchema,
        onSubmit: values => {
            let formdata = structuredClone(formik.values)
            formdata.date_time = formdata.date_time.toISOString().replace('T', ' ').split(".")[0]
            formdata.user_id = user.id;
            fetch("/photoshoots", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formdata)
            })
                .then(r => r.json())
                .then(data => {
                    if (!data.errors && !!data.id) {
                        history.push(`/photoshoots/${data.id}`)
                    } else {
                        alert('Photoshoot data has no id or has errors')
                    }
                })
        }
    })

    const userFormSchema = Yup.object().shape({
        name: Yup.string().required("Name cannot be empty").max(60),
    });
    const userFormik = useFormik({
        initialValues: {
            name: ''
        },
        validationSchema: userFormSchema,
        onSubmit: values => {
            fetch("/users", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userFormik.values)
            })
                .then(r => r.json())
                .then(data => {
                    console.log(data);
                    if (!data.errors && !!data.id) {
                        setUser(data);
                    } else {

                    }
                })

        }
    })

    // const [photoshoot, setPhotoshoot]=useState({
    //     photographer_id:photographer_id,
    //     user_id:1,
    //     location:"",
    //     date_time:""
    // })

    // const handleChange = (e) =>{        
    //     setPhotoshoot({...photoshoot, [e.target.name]: e.target.value})
    // }

    // const handleSubmit = (e)=>{
    //     e.preventDefault();

    //     fetch("/photoshoots",{
    //         method:'POST',
    //         headers:{
    //             'Content-Type':'application/json',
    //         },
    //         body: JSON.stringify(photoshoot)
    //     })
    //     .then(r=>r.json())
    //     .then(data=>{
    //         if(!data.errors && !!data.id){
    //             history.push(`/photoshoots/${data.id}`)
    //         }else{
    //             // display error message in modal
    //         }            
    //     })
    // }

    const setPhotoshootDate_time = (date_time) => {
        formik.setFieldValue('date_time', date_time)
        console.log(date_time, typeof (date_time))
        // setPhotoshoot({...photoshoot, ['date_time']: date_time.toISOString().replace('T',' ').split(".")[0]})
    }

    const bookingForm = () => {
        return (<form onSubmit={formik.handleSubmit}>
<p>Hey {user.name}!</p>
<p>Step 2: Tell use about your planned shoot</p>
            <label>Location:</label>
            <div>{(formik.errors.location) ? <p style={{ color: 'red' }}>{formik.errors.location}</p> : null}</div>
            <input type="text" name="location" value={formik.values.location} onChange={formik.handleChange}></input>
            <br />
            <label>Date and time:</label>
            {/* <input name="date_time" onChange={handleChange}></input> */}
            <div>{(formik.errors.date_time) ? <p style={{ color: 'red' }}>{formik.errors.date_time}</p> : null}</div>
            <DatePicker
                selected={formik.values.date_time}
                onChange={(date) => setPhotoshootDate_time(date)}
                showTimeSelect
                name="date_time"
                timeFormat='HH:mm'
                timeIntervals={15}
                timeCaption='time'
                dateFormat="yyyy-MM-dd hh:mm aa"
            />
            <input type="submit"></input>
        </form>)
    }

    const userForm = () => {
        return (<form onSubmit={userFormik.handleSubmit}>
            <p>Step 1: tell us about yourself</p>
            <label>Name:</label>
            <div>{(userFormik.errors.name) ? <p style={{ color: 'red' }}>{userFormik.errors.name}</p> : null}</div>
            <input type="text" name="name" value={userFormik.values.name} onChange={userFormik.handleChange}></input>
            <input type="submit"></input>
        </form>)
    }

    return (
        <div>
            <h1>Book photoshoot</h1>
            {(!!user && user.id !== -1) ? bookingForm() : userForm()}
        </div>
    )


}

export default BookPhotoshoot
