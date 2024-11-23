import React, { useState } from 'react'
import { AppSidebar, AppHeader } from '../../../components/index'
import { CForm, CFormInput, CFormLabel } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CreateUser = () => {
    const [formData, setFormData] = useState({})
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    function handleChange(e) {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if (!formData.name || !formData.employeeId || !formData.phone || !formData.password) {
            alert('Please fill all fields')
            return
        }
        if (formData.phone.length !== 10) {
            alert('phone number must be 10 digits')
            return
        }
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}auth/signup`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(res);
        if (res.status === 200) {
            return navigate('/users')
        }
        alert('Not added')
        return
    }

    return (
        <>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1">
                    <div className='mx-3'>
                        <h4 className='mb-2'>NEW USER</h4>
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <CForm className="p-4 rounded shadow-sm">
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="name" className="form-label">Name</CFormLabel>
                                        <CFormInput
                                            type="text"
                                            name="name"
                                            placeholder="User Name"
                                            className="form-control"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="employeeId" className="form-label">Employee Id</label>
                                        <input
                                            type="text"
                                            name="employeeId"
                                            placeholder="employeeId"
                                            className="form-control"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="phone" className="form-label">Phone No.</label>
                                        <input
                                            type="text"
                                            name="phone"
                                            placeholder="Phone No. (10 digits)"
                                            className="form-control"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input
                                            type="text"
                                            name="password"
                                            placeholder="Password"
                                            className="form-control"
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <button type="submit" onClick={handleSubmit} className="btn btn-primary">
                                        Submit
                                    </button>
                                </CForm>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateUser