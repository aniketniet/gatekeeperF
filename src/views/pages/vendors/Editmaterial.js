import React, { useEffect, useState } from 'react'
import { AppSidebar, AppHeader } from '../../../components/index'
import { CForm, CFormInput, CFormLabel } from '@coreui/react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const EditMaterial = () => {
    const [formData, setFormData] = useState({
        material: '',
        remark: '',
        final_weight: '',
        vehicle_number: ''
    })
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

   const {id}= useParams()

    async function getUsers() {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}user/material/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const materialData = res.data.material; // Assuming you need the first material from the response
            console.log(materialData, 'Fetched Material Data')
            setFormData({
                material: materialData?.material || '',
                remark: materialData?.remark || '',
                rst: materialData?.rst || '',
                final_weight: materialData?.final_weight || '',
                vehicle_number: materialData?.vehicle_number || ''
            })
        } catch (error) {
            console.error('Error fetching material data:', error)
        }
    }

    useEffect(() => {   
        getUsers()
    }, [])

    function handleChange(e) {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if (!formData.material || !formData.remark || !formData.final_weight || !formData.vehicle_number) {
            alert('Please fill all fields')
            return
        }
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}user/material/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(res)
            if (res.status === 200) {
                navigate('/material')
            } else {
                alert('Failed to update material')
            }
        } catch (error) {
            console.error('Error updating material:', error)
            alert('Error updating material')
        }
    }

    return (
        <>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1">
                    <div className='mx-3'>
                        <h4 className='mb-2'>Material Edit</h4>
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <CForm className="p-4 rounded shadow-sm" onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="material" className="form-label">Material</CFormLabel>
                                        <CFormInput
                                            type="text"
                                            name="material"
                                            placeholder="Material"
                                            className="form-control"
                                            value={formData.material}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="remark" className="form-label">Remark</CFormLabel>
                                        <CFormInput
                                            type="text"
                                            name="remark"
                                            placeholder="Remark"
                                            className="form-control"
                                            value={formData.remark}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="remark" className="form-label">RST</CFormLabel>
                                        <CFormInput
                                            type="text"
                                            name="rst"
                                            placeholder="Rst"
                                            className="form-control"
                                            value={formData.rst}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="final_weight" className="form-label">Final Weight</CFormLabel>
                                        <CFormInput
                                            type="text"
                                            name="final_weight"
                                            placeholder="Final Weight"
                                            className="form-control"
                                            value={formData.final_weight}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="vehicle_number" className="form-label">Vehicle Number</CFormLabel>
                                        <CFormInput
                                            type="text"
                                            name="vehicle_number"
                                            placeholder="Vehicle Number"
                                            className="form-control"
                                            value={formData.vehicle_number}
                                            onChange={handleChange}
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

export default EditMaterial
