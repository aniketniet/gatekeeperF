import React, { useEffect, useState } from 'react'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
} from '@coreui/react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalVendors, setTotalVendors] = useState(0)

  useEffect(() => {
    async function fetchUsersAndVendors() {
      const token = localStorage.getItem('token')
      const users = await axios.get(`${import.meta.env.VITE_BASE_URL}admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    
      setTotalUsers(users.data.users.length)

     const res = await axios.get(`${import.meta.env.VITE_BASE_URL}admin/get-all-audio`, {
        headers: {
           Authorization: `Bearer ${token}`
        }
     })
     console.log(res.data.data, 'vendors')
     setTotalVendors(res.data.data.length)
    }
    fetchUsersAndVendors()
  }, [])

  return (
    <>
      
      <CCard
        // textBgColor={'#0077ff'}
        className="mb-3"
        style={{ maxWidth: '18rem' , backgroundColor: '#0077ff' }}
      >
        <CCardHeader className='fs-5 fw-bold text-white'>USERS</CCardHeader>
        <CCardBody>
          <CCardTitle className='fs-3 text-white'>USERS: {totalUsers} </CCardTitle>
        </CCardBody>
      </CCard>
      <Link to="/audiolist">
       <CCard
        // textBgColor={'#0077ff'}
        className="mb-4 mt-3 "
        style={{ maxWidth: '18rem', backgroundColor: '#0077ff' }}
      >
        <CCardHeader className='fs-5 fw-bold text-white'>TOTAL AUDIO</CCardHeader>
        <CCardBody>
          <CCardTitle className='fs-3 text-white'>TOTAL AUDIO: {totalVendors}</CCardTitle>
        </CCardBody>
      </CCard> 
      </Link>
    </>
  )
}

export default Dashboard
