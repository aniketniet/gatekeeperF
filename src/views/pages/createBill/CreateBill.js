import React, { useEffect, useState } from 'react'
import { CForm, CFormInput, CFormLabel, CFormSelect } from '@coreui/react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

const CreateBill = () => {
  const { state } = useLocation()
  const [services, setServices] = useState([])
  const { billerName } = state || {}
  const [count, setCount] = useState('') // State for the counter value
  const [formData, setFormData] = useState({
    rto: '',
    vehicleNumber: '',
    fieldName: '',
    material: '',
    type: '',
  })

  const [isFilled, setIsFilled] = useState({
    rto: false,
    vehicleNumber: false,
    material: false,
    // type: false,
  })

  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Check if the field is filled
    setIsFilled({
      ...isFilled,
      [name]: !!value.trim(),
    })
  }


  async function getBscBills() {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}admin/bsc-bill`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const usersData = res.data.bills
    setServices(usersData)
    setFilteredServices(usersData) // Initialize filtered services with all data
  }
  
    useEffect(() => {
      getBscBills()
    }, [])
  







  async function fetchCount() {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}admin/bsc-bill-count`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (res.status === 200) {
        setCount(res.data.count)
      } else {
        console.error('Failed to fetch count')
      }
    } catch (error) {
      console.error('Error fetching count:', error)
    }
  }

  useEffect(() => {
    fetchCount()
  }, [token])

  async function handleSubmit(e) {
    e.preventDefault()
    const { rto, vehicleNumber, material, type } = formData

    if (!rto || !vehicleNumber || !material || !type) {
      alert('Please fill all fields')
      return
    }

    const payload = {
      rstno: rto,
      vehicle_number: vehicleNumber,
      category: 'TROOPER',
      material,
      type,
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}admin/set-bills-bsc`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (res.status === 201) {
        const billId = res.data.data._id
        const counters = res.data.data.counter
        if (counters !== undefined) {
          setCount(counters)
        } else {
          console.error('Counter value is undefined')
        }

        navigate('/previewbill', { state: { billId, material, type } })
      } else {
        alert('Failed to create bill')
      }
    } catch (error) {
      console.error('Error creating bill:', error)
      alert('An error occurred while creating the bill')
    }
  }
async function resetCount() {
    if (confirm('Are you sure you want to reset the counter?')) {
        try {
            const res = await axios.put(
                `${import.meta.env.VITE_BASE_URL}admin/reset-bsc-counter`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                },
            )

            if (res.status === 200) {
                alert('Counter reset successfully')
                fetchCount()
            } else {
                alert('Failed to reset counter')
            }
        } catch (error) {
            console.error('Error resetting counter:', error)
            alert('An error occurred while resetting the counter')
        }
    }
}
  const handleDownloadPDF = () => {
    navigate('/printPage', { state: { materials:services , type:"B.S.C.", tableTyle: 'Slip' } })
  }


  return (
    <>
      <div className="wrapper d-flex flex-column min-vh-100 mt-5">
        <div className="body flex-grow-1">
          <div className="mx-3">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4
                className="mb-2 btn btn-primary fs-4 fw-bold"
                style={{ backgroundColor: '#0077ff' }}
              >
                {' '}
                B.S.C. SLIP
              </h4>
              <div className="d-flex align-items-center  gap-4">
               

                <p
                  className="fs-4 fw-bold mt-3 text-white btn "
                  style={{ backgroundColor: '#0077ff' }}
                >
                 SLIP NO. {count || '0'}
                </p>
                <button
                  className="btn text-white fs-4 fw-bold"
                  style={{ backgroundColor: '#0077ff' }}
                  onClick={resetCount}
                >
                  RESET COUNT {/* Display the count state or N/A if empty */}
                </button>
                <button
                  className={
                    services.length === 0
                      ? 'btn text-white fs-4 fw-bold disabled'
                      : 'btn text-white fs-4 fw-bold'
                  }
                  onClick={handleDownloadPDF}
                  style={{backgroundColor: '#0077ff', textTransform: 'uppercase' }}
                >
                  REPORTS
                </button>
                <button
                  className="btn btn-danger text-white fs-4 fw-bold"
                  onClick={() => {
                   if( confirm('Are you sure you want to logout?')){
                    localStorage.removeItem('token')
                    navigate('/billbsclogin')
                   }
                  
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <CForm className="p-4 rounded shadow-sm" onSubmit={handleSubmit}>
                  <div className="mb-3 position-relative">
                    <CFormLabel htmlFor="rto" className="form-label d-flex fs-3 fw-bold">
                      RST 1.
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      name="rto"
                      placeholder="Enter RST"
                      className="form-control"
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    {isFilled.rto && (
                      <span
                        className="position-absolute end-0  translate-middle-y text-success me-3"
                        style={{ top: '78%' }}
                      >
                        ✅
                      </span>
                    )}
                  </div>
                  <div className="mb-4 position-relative">
                    <label htmlFor="vehicleNumber" className="form-label fs-3 fw-bold">
                      VEHICLE NUMBER
                    </label>
                    <input
                      type="text"
                      name="vehicleNumber"
                      placeholder="Enter Vehicle Number"
                      className="form-control"
                      onChange={handleChange}
                      onInput={(e) => (e.target.value = e.target.value.toUpperCase())}
                      autoComplete="off"
                    />
                    {isFilled.vehicleNumber && (
                      <span
                        className="position-absolute end-0  translate-middle-y text-success me-3"
                        style={{ top: '78%' }}
                      >
                        ✅
                      </span>
                    )}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="type" className="form-label fs-3 fw-bold">
                      MATERIAL
                    </label>
                    <CFormSelect name="type" className="form-select" onChange={handleChange}>
                      <option value="">Select Type</option>
                      <option value="10 MM">10 MM</option>
                      <option value="20 MM">20 MM</option>
                      <option value="STONE DUST">STONE DUST</option>
                      <option value="STONE">STONE</option>
                      <option value="EXTRA">EXTRA</option>
                    </CFormSelect>
                  </div>
                  <div className="mb-4 position-relative">
                    <label htmlFor="material" className="form-label fs-3 fw-bold">
                      REMARK
                    </label>
                    <input
                      type="text"
                      name="material"
                      placeholder="Enter Remark"
                      className="form-control"
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    {isFilled.material && (
                      <span
                        className="position-absolute end-0  translate-middle-y text-success me-3 text-success"
                        style={{ top: '78%' }}
                      >
                        ✅
                      </span>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="btn text-white fs-3 fw-bold"
                    style={{ backgroundColor: '#0077ff' }}
                  >
                    GENERATE SLIP
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
