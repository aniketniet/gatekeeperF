import React, { useEffect, useState } from 'react'
import { AppSidebar, AppHeader } from '../../../components/index'
import axios from 'axios'
import { CFormInput, CFormText, CFormTextarea } from '@coreui/react'

export default function Sos() {
    const [sos, setSos] = useState('')
    const token = localStorage.getItem('token')

    async function getSos() {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}admin/getSos`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setSos(res.data.sos.number)
    }

    function handleChange(e) {
        const { value } = e.target
        setSos(value)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if (!sos) {
            alert('Please fill all fields')
            return
        }

        const res = await axios.patch(`${import.meta.env.VITE_BASE_URL}admin/editSos`, {number: sos}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (res.status === 200) {
            alert('Updated Successfully')
            getSos()
            return
        }
        alert('Not Updated')
        return
    }

    useEffect(() => {
        getSos()
    }, [])

    return (
        <>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1">
                    <div className='mx-3'>
                        <h4 className='mb-4'>SOS Number</h4>
                        <CFormInput type='number' value={sos} onChange={handleChange}  className='w-50'/>
                        <button type="submit" onClick={handleSubmit} className="btn btn-primary mt-4">
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
