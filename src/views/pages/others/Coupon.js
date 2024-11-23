import React, { useEffect, useState } from 'react'
import { AppSidebar, AppHeader } from '../../../components/index'
import axios from 'axios'
import { CForm, CFormInput, CFormLabel, CFormTextarea } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilTrash } from '@coreui/icons'

const Coupon = () => {
    const [formData, setFormData] = useState({})
    const [coupons, setCoupons] = useState([])
    const token = localStorage.getItem('token')

    async function getCoupons() {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}admin/getAllCoupons`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setCoupons(res.data.coupons)
    }

    function handleChange(e) {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        console.log(formData, 'formData');
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}admin/generateCoupon`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (res.status === 200) {
            alert('New Coupon Added')
            getCoupons()
            return
        }
        alert('Not added')
        return
    }

    async function handleDelete(id) {
        const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}admin/deleteCoupon/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (res.status === 200) {
            alert('Deleted')
            getCoupons()
            return
        }
        alert('Not deleted')
        return
    }

    async function handleActivate(id) {
        const token = localStorage.getItem('token')
        const res = await axios.patch(`${import.meta.env.VITE_BASE_URL}admin/makeCouponActive/${id}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        getCoupons();
    }

    async function handleDeactivate(id) {
        const token = localStorage.getItem('token')
        const res = await axios.patch(`${import.meta.env.VITE_BASE_URL}admin/makeCouponInactive/${id}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        getCoupons();
    }

    useEffect(() => {
        getCoupons()
    }, [])

    return (
        <>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1">
                    <div className='mx-3'>
                        <h4 className='mb-4'>COUPONS</h4>
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <CForm className="p-4 rounded shadow-sm">
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="coupon" className="form-label">COUPON CODE</CFormLabel>
                                        <CFormInput
                                            type="text"
                                            name="couponCode"
                                            placeholder="Coupon Code"
                                            className="form-control"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="couponName" className="form-label">NAME</CFormLabel>
                                        <CFormInput
                                            type="text"
                                            name="couponName"
                                            placeholder="Coupon Name"
                                            className="form-control"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="couponName" className="form-label">DESCRIPTION</CFormLabel>
                                        <CFormTextarea
                                            type="text"
                                            name="couponDescription"
                                            placeholder="Coupon Description"
                                            className="form-control"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="coupon" className="form-label">Discount (%)</CFormLabel>
                                        <CFormInput
                                            type="number"
                                            name="discountPercentage"
                                            placeholder="Discount Percentage (Ex- 10)"
                                            className="form-control"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="validityInDays" className="form-label mr-4">Validity</CFormLabel>
                                        <CFormInput
                                            type="number"
                                            name="validityInDays"
                                            placeholder="Validity (days)"
                                            className="form-control"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                                        Generate
                                    </button>
                                </CForm>
                            </div>
                        </div>
                        <div className='mb-4 mt-2'>
                            <h4 className='mb-4 mt-4'>COUPONS LIST</h4>
                            <div className='row gap-4 mx-2'>
                                {
                                    coupons.map((item, index) => (
                                        <div key={index} className="card mb-2 col-12 col-sm-6 col-md-4">
                                            <div className="card-body">
                                                <h5 className={item.isActive ? "card-text text-success" : "card-text text-danger"}>{item.couponCode}</h5>
                                                <p className="card-text">Discount: {item.discountPercentage} %</p>
                                                <div className='d-flex justify-content-between'>
                                                    {
                                                        item.isActive ?
                                                            <button className="btn btn-danger text-white" onClick={() => handleDeactivate(item._id)}>
                                                                Deactivate
                                                            </button>
                                                            :
                                                            <button className="btn btn-primary text-white" onClick={() => handleActivate(item._id)}>
                                                                Activate
                                                            </button>
                                                    }
                                                    <button className="btn btn-danger text-white" onClick={() => handleDelete(item._id)}><CIcon icon={cilTrash} /></button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Coupon