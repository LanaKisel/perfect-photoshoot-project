import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import setBodyColor from '../setBodyColor'

const MyBookings = () => {
    setBodyColor({ color: "#CAA0AF" })
    const [user, setUser] = useState({ name: "", id: -1, photoshoots: [] });
    const [userFound, setUserFound] = useState(undefined);
    const userFormSchema = Yup.object().shape({
        name: Yup.string().required("Name cannot be empty").max(60),
    });
    const userFormik = useFormik({
        initialValues: {
            name: ''
        },
        validationSchema: userFormSchema,
        onSubmit: values => {
            fetch(`/users/${userFormik.values.name}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(r => { if (r.ok) { return r.json() } })
                .then(data => {
                    if (!!data) {
                        setUserFound(true)
                        setUser(data);
                    } else {
                        setUserFound(false)
                    }
                })

        }
    })
    const userNotFoundMessage = () => {
        return (<div><p>Hey {userFormik.values.name}, it doesn't look like you have booked a photoshoot yet!</p><p>Please note: the name you booked the photoshoot under is case-sensitive. Look it up again below or visit a photographers page to book a photoshoot for the first time</p></div>)
    }
    const userForm = () => {
        return (<form onSubmit={userFormik.handleSubmit} className='myBookingsForm'>
            <p className='myBookingsP'>Please enter the name you booked under</p>
            <label className='myBookingsLabel'>Name:</label>
            <div>{(userFormik.errors.name) ? <p style={{ color: 'red' }}>{userFormik.errors.name}</p> : null}</div>
            <input placeholder='Enter the name' type="text" name="name" value={userFormik.values.name} onChange={userFormik.handleChange}></input>
            <input type="submit"></input>
        </form>)
    }
    const displayPhotoshoots = () => {
        return (<div>
            {
                user.photoshoots.length == 0 ? <p>You have no photoshoots booked yet 😿</p> : ""
            }
            {user.photoshoots
                .sort(p => p.date_time)
                .map(p => {
                    return <div key={"photoshoot_" + p.id}>
                        <h1>Date and time: {(new Date(p.date_time + 'Z').toLocaleString())}</h1> 
                        <h2 className='BookedPhotoshoot'>Photographer: {p.photographer.name}</h2>
                        <h2 className='BookedPhotoshoot'>Location: {p.location}</h2>
                        <Link key={p.id} to={`/photoshoots/${p.id}`}>Update booking<br /></Link>
                    </div>
                })}
        </div>)
    }

    return (
        <div>
            {(userFound === false) ? userNotFoundMessage() : ""}
            {(userFound == undefined || !userFound) ? userForm() : ""}
            {(userFound === true) ? displayPhotoshoots() : ""}
        </div>
    )
}

export default MyBookings
