import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table'
import { CIcon } from '@coreui/icons-react'
import { cilTrash } from '@coreui/icons'
import { AppHeader, AppSidebar } from '../../../../components'
import { DatePicker, DatePickerInput } from '@mantine/dates'

const SrscSlips = () => {
  const [services, setServices] = useState([])
  const [filteredServices, setFilteredServices] = useState([])
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const token = localStorage.getItem('token')

  async function getSrscBills() {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}admin/srsc-bill`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const usersData = res.data.bills
    setServices(usersData)
    setFilteredServices(usersData) // Initialize filtered services with all data
  }

 
  async function handleParmanentDelete(id) {
    const confirmed = confirm('Confirm to delete?')
    if (confirmed) {
      try {
        const res = await axios.put(`${import.meta.env.VITE_BASE_URL}admin/srsc/delete/bill/`,{
            id: id
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (res.status === 200) {
            getSrscBills() // Refresh the data after deletion
        } else {
          alert('Failed to delete Slip.')
        }
      } catch (error) {
        console.error('Error occurred while deleting the user:', error)
        alert('An error occurred. Please try again.')
      }
    }
  }


  const columns = useMemo(
    () => [
      {
        header: 'S NO.',
        Cell: ({ row }) => (
          <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{row.index + 1}</span>
        ),
        size: 70,
      },
      {
        header: 'BILL ID',
        accessorKey: 'bill_id',
        Cell: ({ cell }) => (
          <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{cell.getValue()}</span>
        ),
        size: 150,
      },
      {
        header: 'COUNTER',
        accessorKey: 'counter',
        Cell: ({ cell }) => (
          <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{cell.getValue()}</span>
        ),
        size: 150,
      },
      {
        header: 'REMARKS',
        accessorKey: 'material',
        Cell: ({ cell }) => (
          <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{cell.getValue()}</span>
        ),
        size: 150,
      },
      {
        header: 'DATE',
        accessorKey: 'createdAt',
        Cell: ({ cell }) => {
          const date = new Date(cell.getValue())
          const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear().toString().slice(-2)}`
          return <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{formattedDate}</span>
        },
        size: 150,
      },
      {
        header: 'DELETE',
        size: 70,
        accessorFn: (dataRow) => (
          <CIcon
            icon={cilTrash}
            onClick={() => handleParmanentDelete(dataRow._id)}
            style={{ cursor: 'pointer', color: 'red' }}
          />
        ),
      },
    ],
    [],
  )

  useEffect(() => {
    getSrscBills()
  }, [])

  // Function to filter services by date range
  const filterByDateRange = (start, end) => {
    if (!start || !end) {
      setFilteredServices(services)
    } else {
      const filtered = services.filter((service) => {
        const serviceDate = new Date(service.createdAt)
        return serviceDate >= new Date(start) && serviceDate <= new Date(end)
      })
      setFilteredServices(filtered)
    }
  }

  return (
    <>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <div className="mx-3 mb-2">
            <h4 className="mb-2 fw-bold fs-1">ALL S.R.S.C. SLIPS</h4>
            <div className="d-flex mb-3">
              <DatePickerInput
               
                 placeholder="Start Date"
                leftSectionPointerEvents="none"
                label="Pick date"
                
                value={startDate}
                onChange={(date) => {
                  setStartDate(date)
                  filterByDateRange(date, endDate)
                }}
                style={{ marginRight: '10px' }}
              />
              <DatePickerInput
             
                
                leftSectionPointerEvents="none"
                label="Pick date"
                
                placeholder="End Date"
                value={endDate}
                onChange={(date) => {
                  setEndDate(date)
                  filterByDateRange(startDate, date)
                }}
                style={{ marginRight: '10px' }}
              />
      
            </div>
            <MantineReactTable
              table={useMantineReactTable({
                columns,
                data: filteredServices,
                enableRowSelection: false,
                enableColumnOrdering: false,
                enableGlobalFilter: true,
                enableFullScreenToggle: false,
                initialState: { density: 'xs' },
              })}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default SrscSlips
