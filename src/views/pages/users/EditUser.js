import React, { useEffect, useState } from 'react'
import { AppSidebar, AppHeader } from '../../../components/index'
import { CForm, CFormInput, CFormLabel } from '@coreui/react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const EditUser = () => {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const { id } = useParams();

    // Function to fetch the user details for editing
    async function getUserDetails() {
        console.log(id, 'id')
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}admin/get-user/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
           console.log(res,"res")
            const userData = res.data.user;   // Assuming the response structure includes user data directly
            setName(userData.name);
            setMobile(userData.phone);
            setPassword(userData.password); // You might want to exclude password or handle it differently
            console.log(userData, 'Fetched user data');
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    useEffect(() => {
        getUserDetails();
    }, []);

    // Handle form submission
    async function handleSubmit(e) {
        e.preventDefault();

        // if (!name || !mobile) {
        //     alert('Please fill all fields');
        //     return;
        // }

        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}admin/edit-user/${id}`, {
                name,
                mobile,
                password
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.status === 200) {
                navigate('/users'); // Navigate to the users list or desired page after successful update
            } else {
                alert('Failed to update user');
            }
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Error updating user');
        }
    }

    return (
        <>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1">
                    <div className='mx-3'>
                        <h4 className='mb-2'>Edit User</h4>
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <CForm className="p-4 rounded shadow-sm" onSubmit={handleSubmit}>
                                    {/* Name input */}
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="name" className="form-label">Name</CFormLabel>
                                        <CFormInput
                                            type="text"
                                            name="name"
                                            placeholder="Name"
                                            className="form-control"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>

                                    {/* Mobile input */}
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="mobile" className="form-label">Mobile</CFormLabel>
                                        <CFormInput
                                            type="text"
                                            name="mobile"
                                            placeholder="Mobile"
                                            className="form-control"
                                            value={mobile}
                                            onChange={(e) => setMobile(e.target.value)}
                                        />
                                    </div>

                                    {/* Password input */}
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="password" className="form-label">Password</CFormLabel>
                                        <CFormInput
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            className="form-control"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary">
                                        Update
                                    </button>
                                </CForm>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditUser;
