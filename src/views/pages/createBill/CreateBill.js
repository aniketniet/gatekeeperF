import React, { useState } from 'react'
import { AppSidebar, AppHeader } from '../../../components/index'
import { CForm, CFormInput, CFormLabel } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

const CreateBill = () => {
  const [formData, setFormData] = useState({})
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const { state } = useLocation()
  const { billId } = state || {}

  console.log(billId, 'Bill ID')

  function handleChange(e) {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!formData.rto || !formData.vehicleNumber || !formData.fieldName) {
      alert('Please fill all fields')
      return
    }

    const payload = {
      rstno: formData.rto,
      vehicle_number: formData.vehicleNumber,
      name: formData.fieldName,
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}admin/set-bills`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (res.status === 201) {
        console.log(res.data, 'API response')
        const billId = res.data.data._id
        navigate('/previewbill', { state: { billId } })
      } else {
        alert('Failed to create bill')
      }
    } catch (error) {
      console.error('Error creating bill:', error)
      alert('An error occurred while creating the bill')
    }
  }

  return (
    <>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <div className="mx-3">
            <h4 className="mb-2">Create Bill</h4>
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <CForm className="p-4 rounded shadow-sm" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="rto" className="form-label">
                      RTO
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      name="rto"
                      placeholder="Enter RTO"
                      className="form-control"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="vehicleNumber" className="form-label">
                      Vehicle Number
                    </label>
                    <input
                      type="text"
                      name="vehicleNumber"
                      placeholder="Enter Vehicle Number"
                      className="form-control"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="fieldName" className="form-label">
                      Field Name
                    </label>
                    <input
                      type="text"
                      name="fieldName"
                      placeholder="Enter Field Name"
                      className="form-control"
                      onChange={handleChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
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

export default CreateBill
