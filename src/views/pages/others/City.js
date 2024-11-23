import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { AppSidebar, AppHeader } from '../../../components/index'
import {  CForm, CFormLabel, } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilTrash } from '@coreui/icons'

export default function City() {
  const [cityData, setCityData] = useState('')
  const [city, setCity] = useState([])
  const token = localStorage.getItem('token')

  async function handleSubmit(e) {
    e.preventDefault()
    console.log(cityData)
    if (!cityData) {
      alert('Please fill city fields')
      return
    }

    const data = {
      city: cityData,
    }

    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}admin/createCity`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log(res)
    if(res.status===400){
        alert(" city already exists")
        return
    }
    if (res.status === 200) {
      alert('Added')
      getCity()
      return
    }
    alert('Not added')
    return
  }

  async function getCity() {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}admin/cities`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const ser = res.data.cities
    console.log(ser)
    setCity(ser)
  }

  async function handleDelete(id) {
    const confirmed = confirm('Confirm to delete?')
    if (confirmed) {
      const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}admin/deleteCity/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (res.status === 200) {
        getCity()
      }
    } else {
      return
    }
  }

  const columns = useMemo(
    () => [
      {
        header: 'City',
        accessorKey: 'city',
        size: 150,
      },
      {
        header: 'Delete',
        size: 60,
        accessorFn: (dataRow) => (
          <CIcon
            icon={cilTrash}
            onClick={() => handleDelete(dataRow._id)}
            style={{ cursor: 'pointer', color: 'red' }}
          />
        ),
      },
    ],
    [],
  )

  useEffect(() => {
    getCity()
  }, [])

  const table = useMantineReactTable({
    columns,
    data: city,
    enableRowSelection: false,
    enableColumnOrdering: false,
    enableGlobalFilter: true,
    enableFullScreenToggle: false,
    initialState: { density: 'xs' },
  })

  return (
    <>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <div className="mx-3">
            <h4 className="mb-2">Create City</h4>
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <CForm className="p-4 rounded shadow-sm">
                  <div className="mb-3">
                    <CFormLabel htmlFor="question" className="form-label">
                      City
                    </CFormLabel>
                    <input
                      type="text"
                      value={cityData}
                      name="city"
                      placeholder="Enter City"
                      className="form-control"
                      onChange={(e) => setCityData(e.target.value)}
                    />
                  </div>

                  <button type="submit" onClick={handleSubmit} className="btn btn-primary">
                    Submit
                  </button>
                </CForm>
              </div>
            </div>
            <div className="mb-4">
              <h4 className="mb-4 mt-4">City List</h4>
              <MantineReactTable table={table} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
