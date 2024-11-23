import React, { useEffect, useState } from 'react'
import { AppSidebar, AppHeader } from '../../../components/index'
import { CButton, CForm, CFormInput, CFormLabel, CFormTextarea } from '@coreui/react'
import axios from 'axios'
import CIcon from '@coreui/icons-react'
import { cilTrash } from '@coreui/icons'


export default function Faq() {
    const [formData, setFormData] = useState({})
    const [faqs, setFaqs] = useState([])
    const token = localStorage.getItem('token')
    
    async function getFaqs(){
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}admin/getAllFAQs`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setFaqs(res.data.faqs)
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
        if (!formData.question || !formData.answer) {
            alert('Please fill all fields')
            return
        }

        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}admin/createFAQ`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(res);
        if (res.status === 200) {
            alert('Added')
            getFaqs()
            return
        }
        alert('Not added')
        return
    }

    async function handleDelete(id){
        const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}admin/deleteFAQ/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if(res.status === 200){
            alert('Deleted')
            getFaqs()
            return
        }
        alert('Not deleted')
        return
    
    }

    useEffect(() => {
        getFaqs()
    }, [])

    return (
        <>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1">
                    <div className='mx-3'>
                        <h4 className='mb-2'>Create FAQ</h4>
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <CForm className="p-4 rounded shadow-sm">
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="question" className="form-label">Question</CFormLabel>
                                        <CFormTextarea
                                            type="text"
                                            name="question"
                                            placeholder="Question"
                                            className="form-control"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="answer" className="form-label">Answer</CFormLabel>
                                        <CFormTextarea
                                            type="text"
                                            name="answer"
                                            placeholder="Answer"
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
                        <div className='mb-4'>
                        <h4 className='mb-4 mt-4'>FAQs List</h4>
                        {
                            faqs.map((faq, index) => (
                                <div key={index} className="card mb-2">
                                    <div className="card-body">
                                        <h6 className="card-title">{index+1}. {faq.question}</h6>
                                        <p className="card-text">{faq.answer}</p>
                                    <button className="btn btn-danger text-white" onClick={() => handleDelete(faq._id)}><CIcon icon={cilTrash} /></button>
                                    </div>
                                </div>
                            ))
                        }
                        
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
