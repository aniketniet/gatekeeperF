import React, { useEffect, useState } from 'react'
import { AppSidebar, AppHeader } from '../../../components/index'
import { CForm, CFormInput, CFormLabel } from '@coreui/react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const EditExtra = () => {
    const [remark,setremark]= useState();
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

   const {id}= useParams()

    async function getUsers() {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}user/extra/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const stoneData = res.data.extra.remark; // Assuming you need the first stone from the response
            setremark(stoneData)
            console.log(stoneData, 'Fetched stone Data')
           
        } catch (error) {
            console.error('Error fetching stone data:', error)
        }
    }

    useEffect(() => {
        getUsers()
    }, [])



    async function handleSubmit(e) {
        e.preventDefault()
        if (!remark) {
            alert('Please fill remark fields')
            return
        }
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}user/extra/${id}`,
              {
                 remark:remark
              }
                ,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(res)
            if (res.status === 200) {
                navigate('/extra')
            } else {
                alert('Failed to update Extra')
            }
        } catch (error) {
            console.error('Error updating extra:', error)
            alert('Error updating ')
        }
    }

    return (
        <>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1">
                    <div className='mx-3'>
                        <h4 className='mb-2'>Extra Edit</h4>
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <CForm className="p-4 rounded shadow-sm" onSubmit={handleSubmit}>
                                   
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="remark" className="form-label">Remark</CFormLabel>
                                        <CFormInput
                                            type="text"
                                            name="remark"
                                            placeholder="Remark"
                                            className="form-control"
                                            value={remark}
                                            onChange={(e) => setremark(e.target.value)}
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
    )
}

export default EditExtra
