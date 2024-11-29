import React, { useState } from 'react';

import { CForm, CFormInput, CFormLabel, CFormSelect } from '@coreui/react';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';

const CreateSrcBill = () => {

    const { state } = useLocation();
    const { billerName  } = state || {}; 


    // console.log(billerName, 'billerName');


    const [formData, setFormData] = useState({
        rto: '',
        vehicleNumber: '',
        fieldName: '',
        material: '',
        type: '',
    });
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const { rto, vehicleNumber,  material, type } = formData;

        if (!rto || !vehicleNumber  || !material || !type) {
            alert('Please fill all fields');
            return;
        }

        const payload = {
            rstno: rto,
            vehicle_number: vehicleNumber,
            name: "GATEKEEPER",
            material,
            type,
        };

        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}admin/set-bills`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (res.status === 201) {
                const billId = res.data.data._id; // Extract billId
                console.log(billId, 'Bill ID');
                navigate('/previewbill', { state: { billId, material, type,billerName } }); // Pass billId, material, and type
            } else {
                alert('Failed to create bill');
            }
        } catch (error) {
            console.error('Error creating bill:', error);
            alert('An error occurred while creating the bill');
        }
    }

    return (
        <>
            
            <div className="wrapper d-flex flex-column min-vh-100 mt-5">
             
                <div className="body flex-grow-1">
                    <div className="mx-3">
                        
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h4 className="mb-2">GENERATE SLIP</h4>
                            <button
                                className="btn btn-danger"
                                onClick={() => {
                                    localStorage.removeItem('token');
                                    navigate('/billlogin');
                                }}
                            >
                                Logout
                            </button>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <CForm className="p-4 rounded shadow-sm" onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="rto" className="form-label d-flex ">
                                         RST &nbsp; <span className="text-white rounded-circle bg-primary px-1" >1</span>
                                            </CFormLabel>
                                        <CFormInput
                                            type="text"
                                            name="rto"
                                            placeholder="Enter RST"
                                            className="form-control"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="vehicleNumber" className="form-label">VEHICLE NUMBER</label>
                                        <input
                                            type="text"
                                            name="vehicleNumber"
                                            placeholder="Enter Vehicle Number"
                                            className="form-control"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    
                                        <input
                                            type="hidden"
                                            name="fieldName"
                                            placeholder="Enter Field Name"
                                            className="form-control"
                                            value="GATEKEEPER"
                                        />
                                   
                                    <div className="mb-4">
                                        <label htmlFor="material" className="form-label">CATEGORY</label>
                                        <CFormSelect
                                            name="material"
                                            className="form-select"
                                            onChange={handleChange}
                                        >
                                            <option value="">SELECT CATEGORY</option>
                                            <option value="Material">MATERIAL</option>
                                            <option value="Stone">STONE</option>
                                            <option value="Extra">EXTRA</option>
                                        </CFormSelect>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="type" className="form-label">MATERIAL</label>
                                        <CFormSelect
                                            name="type"
                                            className="form-select"
                                            onChange={handleChange}
                                        >
                                            <option value="">Select Type</option>
                                            <option value="10 MM">10 MM</option>
                                            <option value="20 MM">20 MM</option>
                                            <option value="STONE DUST">STONE DUST</option>
                                            <option value="EXTRA">EXTRA</option>
                                        </CFormSelect>
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
    );
};

export default CreateSrcBill;
