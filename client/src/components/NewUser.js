import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup";
const NewUser = ({ photographer_id }) => {
    const [newUser, setNewUser] = useState({
        name: "",
        photographer_id: photographer_id
    })
    const formSchema = Yup.object().shape({
        name: Yup.string().required("Name cannot be empty").max(60),
    })

    const formik = useFormik({
        initialValues: {
            name: "",
            photographer_id: photographer_id
        },
        validationSchema: formSchema,
        onSubmit: values => {
            fetch(process.env.REACT_APP_API_URI + '/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formik.values)
            })
                .then(r => r.json())
                .then(data =>
                    setNewUser(data)
                )
        }
    })

    return (
        <div>
            <h1>Please enter your information</h1>
            <form onSubmit={formik.handleSubmit}>
                <label>Name:</label>
                <div>{(formik.errors.name) ? <p style={{ color: 'red' }}>{formik.errors.name}</p> : null}</div>
                <input type="text" name="name" value={formik.values.name} onChange={formik.handleChange}></input>
                <button type="submit">Submit</button>
            </form>

        </div>
    )
}

export default NewUser
