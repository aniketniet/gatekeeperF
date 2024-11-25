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
        textBgColor={'secondary'}
        className="mb-3"
        style={{ maxWidth: '18rem' }}
      >
        <CCardHeader>Users</CCardHeader>
        <CCardBody>
          <CCardTitle>Users: {totalUsers} </CCardTitle>
        </CCardBody>
      </CCard>
      <Link to="/audiolist">
       <CCard
        textBgColor={'primary'}
        className="mb-4 mt-3"
        style={{ maxWidth: '18rem' }}
      >
        <CCardHeader>Total Audio</CCardHeader>
        <CCardBody>
          <CCardTitle>Total Audio: {totalVendors}</CCardTitle>
        </CCardBody>
      </CCard> 
      </Link>
    </>
  )
}

export default Dashboard
