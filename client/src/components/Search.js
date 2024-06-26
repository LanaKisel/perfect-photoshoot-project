import React from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";

const Search = ({ onSearch }) => {

  //formik 
  const formSchema = Yup.object().shape({
    zip_code: Yup.string().matches(/^[0-9]+$/, "Must be only digits").min(5, 'Must be exactly 5 digits').max(5, 'Must be exactly 5 digits'),
  });

  const formik = useFormik({
    initialValues: {
      zip_code: ''
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      onSearch(values.zip_code);
    },
  })

  return (
    <div>
      <form className="searchbar" onSubmit={formik.handleSubmit}>
        <div>{(formik.errors.zip_code) ? <p style={{ color: 'red' }}>{formik.errors.zip_code}</p> : null}</div>
        <input
          placeholder="Enter your zip code.."
          type="text"
          id="search"
          name='zip_code'
          value={formik.values.zip_code}
          onChange={formik.handleChange}
        />
        <button type="submit">Find photographers🔎</button>
      </form>
    </div>
  )
}

export default Search


