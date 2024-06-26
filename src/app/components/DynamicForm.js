// components/DynamicForm.js

"use client"
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const DynamicForm = () => {
  const [formData, setFormData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const initialValues = {
    name: '',
    email: '',
    age: '',
    country: ''
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    age: Yup.number().required('Required').positive('Invalid age').integer('Invalid age'),
    country: Yup.string().required('Required')
  });

  const onSubmit = (values, { resetForm }) => {
    setTableData([...tableData, values]);
    resetForm();
  };

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedData = tableData.filter((_, i) => i !== index);
    setTableData(updatedData);
  };

  return (
    <div>

      <h1>GL Request Form using Formik</h1>
      <div className='container'>
        <div className='row'>
          <div className='col-sm-6'>
          <Formik
        enableReinitialize
        initialValues={editIndex !== null ? tableData[editIndex] : initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {formik => (
          <Form className='col-12'>
            <div className='mb-3'>
              <label className="form-label" htmlFor="name">Name</label>
              <Field className="form-control" type="text" id="name" name="name" />
              <ErrorMessage name="name" component="div" />
            </div>
            <div className='mb-3'>
              <label className="form-label" htmlFor="email">Email</label>
              <Field className="form-control" type="email" id="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div className='mb-3'>
              <label className="form-label"htmlFor="age">Age</label>
              <Field className="form-control" type="number" id="age" name="age" />
              <ErrorMessage name="age" component="div" />
            </div>
            <div className='mb-3'>
              <label htmlFor="country">Country</label>
              <Field className="form-select" as="select" id="country" name="country">
                <option value="" label="Select country" />
                <option value="USA" label="United States" />
                <option value="Canada" label="Canada" />
                <option value="UK" label="United Kingdom" />
                <ErrorMessage name="country" component="div" />
              </Field>
              
            </div>
            <button className='btn btn-danger mb-3' type="submit">Submit</button>
          </Form>
        )}
      </Formik>
          </div>
        </div>
      </div>
      

<div className='container'>
<div className='row'>
  <div className='col'>
  <h2>Submitted Data</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data, index) => (
            <tr key={index}>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{data.age}</td>
              <td>{data.country}</td>
              <td>
                <button className='btn btn-success' onClick={() => handleEdit(index)}>Edit</button>
                <button className='btn btn-warning' onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>
</div>
      
  );
};

export default DynamicForm;
