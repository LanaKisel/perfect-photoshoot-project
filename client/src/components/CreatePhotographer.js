import React, { useState } from 'react'
import { useFormik } from 'formik';
import { useHistory } from "react-router-dom"
import * as Yup from "yup";
const CreatePhotographer = ({ onAddPh }) => {
    let history = useHistory();

    // to validate urls: https://stackoverflow.com/a/65810131
    const URL = /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i

    const formSchema = Yup.object().shape({
        name: Yup.string().required("Name cannot be empty").max(60),
        zip_code: Yup.string().required('Please enter your zip').matches(/^\d{5,10}(?:[-\s]\d{4})?$/, 'Zip code is invalid'),
        profile_picture: Yup.string().matches(URL, 'Enter a valid url'), //https://stackoverflow.com/a/65810131
        bio: Yup.string().max(500),
        portfolio_pictures: Yup.string().matches(URL, 'Enter a valid url')
    })
    const formik = useFormik({
        initialValues: {
            name: '',
            zip_code: '',
            profile_picture: "",
            bio: "",
            portfolio_pictures: ""
        },
        validationSchema: formSchema,
        onSubmit: values => {
            fetch(process.env.REACT_APP_API_URI + '/photographers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formik.values)
            })
                .then(r => r.json())
                .then(data => {
                    if (!data.errors && !!data.id) {
                        history.go(0)
                    } else {
                        alert('Photographer data has no id or has errors')
                    }
                }
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
                <br />
                <label>Zip code:</label>
                <div>{(formik.errors.zip_code) ? <p style={{ color: 'red' }}>{formik.errors.zip_code}</p> : null}</div>
                <input type="text" name="zip_code" value={formik.values.zip_code} onChange={formik.handleChange}></input>
                <br />
                <label>Profile picture:</label>
                <div>{(formik.errors.profile_picture) ? <p style={{ color: 'red' }}>{formik.errors.profile_picture}</p> : null}</div>
                <input type="text" name="profile_picture" value={formik.values.profile_picture} onChange={formik.handleChange}></input>
                <br />
                <label>Bio:</label>
                <div>{(formik.errors.bio) ? <p style={{ color: 'red' }}>{formik.errors.bio}</p> : null}</div>
                <input type="text" name="bio" value={formik.values.bio} onChange={formik.handleChange}></input>
                <br />
                <label>Portfolio pictures:</label>
                <div>{(formik.errors.portfolio_pictures) ? <p style={{ color: 'red' }}>{formik.errors.portfolio_pictures}</p> : null}</div>
                <input type="text" name="portfolio_pictures" value={formik.values.portfolio_pictures} onChange={formik.handleChange}></input>
                <input type="submit"></input>
            </form>
        </div>
    )
}

export default CreatePhotographer
