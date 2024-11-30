import { useParams } from 'react-router-dom'
import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table'
import CIcon from '@coreui/icons-react'
import { cilDescription, cilColorBorder, cilTrash } from '@coreui/icons'
import { AppSidebar, AppHeader } from '../../../components/index'
import Loader from '../../../Loader'
import * as XLSX from 'xlsx' // Import the xlsx library

const Stones = () => {
  const [stones, setStones] = useState([])
  const [loading, setLoading] = useState(false)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [users, setUsers] = useState()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false) // Control dropdown visibility
  const [selectedUsers, setSelectedUsers] = useState([])
  const [filteredServices, setFilteredServices] = useState([])
  const { type } = useParams() // Use the 'type' parameter for filtering
  const navigate = useNavigate(); 
  const token = localStorage.getItem('token')


  
  
  async function getUsersData() {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}admin/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    // Assuming the response has the users array

    const usersData = res.data.users
    console.log(usersData, 'name')

    setUsers(usersData) // Set the response users data to services
  }

  useEffect(() => {
    getUsersData()
  }, [])

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  // Fetch Stones Data
  const getStone = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}user/stones`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      let filteredStones = res.data.stones

      // Filter by 'type'
      if (type) {
        filteredStones = filteredStones.filter((item) => item.category === type)
      }

      // Filter by date range
      if (startDate && endDate) {
        filteredStones = filteredStones.filter((item) => {
          const createdAt = new Date(item.created_at)
          return createdAt >= new Date(startDate) && createdAt <= new Date(endDate)
        })
      }

      setStones(filteredStones)
    } catch (error) {
      console.error('Error fetching stones:', error)
    } finally {
      setLoading(false)
    }
  }

  
  const handleDownloadPDF = () => {
    // const navigate = useNavigate();
    // Filter data based on the date range and format
    const filteredData = stones.filter((item) => {
      const createdAt = new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }).format(new Date(item.created_at));
      return (
        (!startDate || createdAt >= new Date(startDate)) &&
        (!endDate || createdAt <= new Date(endDate))
      );
    });
  
    // Map the filtered data to include only the required fields
    const formattedData = filteredData.map((item, index) => ({
      SR_No: index + 1,
      category: item.category,
      remark: item.remark,
      rst: item.rst,
      vehicle_number: item.vehicle_number,
      final_weight: item.final_weight,
      material: item.material,
      created_at: new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }).format(new Date(item.created_at)),
      created_by: item.created_by,
    }));
  
    // Navigate to PrintPage with the data passed as state
    navigate('/printPage', { state: { materials: formattedData, type,tableTyle:"stone" } });
  };
  

  // Delete Old Stones
  const handleDelete = async () => {
    const confirmed = confirm('This will delete data older than 3 months. Do you want to proceed?')

    if (confirmed) {
      try {
        const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}admin/delete-old-stones`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (res.status === 200) {
          alert('Data older than 3 months has been deleted successfully.')
          getStone() // Refresh data
        } else {
          alert('Something went wrong. Please try again.')
        }
      } catch (error) {
        console.error('Error deleting old stones:', error)
        alert('Failed to delete old stones. Please check your connection or try again later.')
      }
    }
  }

  // Download Data as Excel
  // const handleDownloadExcel = () => {
  //   const worksheet = XLSX.utils.json_to_sheet(stones)
  //   const workbook = XLSX.utils.book_new()
  //   XLSX.utils.book_append_sheet(workbook, worksheet, 'Stones')
  //   XLSX.writeFile(workbook, `stones_${new Date().toISOString()}.xlsx`)



  // }

  // Filter Data
  
  // Filter data based on the selected users
  const handleUserSelect = (userName) => {
    setSelectedUsers(
      (prev) =>
        prev.includes(userName)
          ? prev.filter((user) => user !== userName) // Remove if already selected
          : [...prev, userName], // Add if not selected
    )
    console.log(selectedUsers, 'userName')
  }
  // Filter data based on selected users and date range
  const handleFilter = () => {
    console.log(selectedUsers, 'selectedUsers')
    const filteredData = stones.filter((item) => {
      console.log(item.created_by, 'item.created_by')

      const createdAt = new Date(item.created_at)
      // Filter based on date range and matching created_by value
      return (
        (!startDate || createdAt >= new Date(startDate)) &&
        (!endDate || createdAt <= new Date(endDate)) &&
        selectedUsers.includes(item.created_by)
      )
    })

    console.log(filteredData, 'filteredData')
    if (filteredData.length === 0) {
      alert('No matching users found.');
    }
    setFilteredServices(filteredData)
  }






  function handleDownloadExcel() {
    // Filter data based on the date range
    const filteredData = filteredServices.filter((item) => {
        const createdAt = new Date(item.created_at);
        return (
            (!startDate || createdAt >= new Date(startDate)) && 
            (!endDate || createdAt <= new Date(endDate))
        );
    });

    // Map the filtered data to include only the required fields
    const formattedData = filteredData.map((item ,index)=> ({
      SR_No: index + 1,
        category: item.category,
        remark: item.remark,
        rst: item.rst,
        vehicle_number: item.vehicle_number,
        final_weight: item.final_weight,
        material: item.material,
        created_at: new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        }).format(new Date(item.created_at)),
        created_by: item.created_by
    }));

    // Create the worksheet from the filtered and formatted data
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Filtered Materials');

    // Download the file
    XLSX.writeFile(workbook, `filtered_materials_${new Date().toISOString()}.xlsx`);
}

  async function handleParmanentDelete(id) {
    const confirmed = confirm('Confirm to delete?');
    if (confirmed) {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}user/stone/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            if (res.status === 200) {
                // After successful deletion, fetch the updated list of users
                getStone()  // Make sure to implement this function to refresh your users list
            } else {
                alert('Failed to delete user.');
            }
        } catch (error) {
            console.error('Error occurred while deleting the user:', error);
            alert('An error occurred. Please try again.');
        }
    } else {
        return;
    }
}
  const columns = useMemo(
    () => [
      { header: 'S No.', Cell: ({ row }) => row.index + 1,
      size: 70, // Reduced size for "S No."
    },
     { header: 'RST', accessorKey: 'rst', size: 150 },
     { header: 'VEHICLE NO.', accessorKey: 'vehicle_number', size: 150 },
     {
       header: 'SUBMITTED BY',
       accessorKey: 'created_by',
       size: 150,
     },
     {
       header: 'FULL DETAILS',
       size: 60,
       Cell: ({ row }) => (
      <Link to={`detail/${row.original._id}`} style={{ textDecoration: 'none' }}>
        <CIcon icon={cilDescription} />
      </Link>
       ),
     },
     {
       header: 'DATE & TIME',
       Cell: ({ row }) => {
          if (row.original.created_at) {
            const options = {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }
            return new Intl.DateTimeFormat('en-GB', options).format(new Date(row.original.created_at))
          }
          return ''
        },
      },
      {
        header: 'EDIT',
        size: 60,
        Cell: ({ row }) => (
          <Link to={`stoneEdit/${row.original._id}`} style={{ textDecoration: 'none' }}>
            <CIcon icon={cilColorBorder} />
          </Link>
        ),
      },
      {
        header: 'DELETE',
         size: 60,
         accessorFn: (dataRow) => <CIcon icon={cilTrash} onClick={() => handleParmanentDelete(dataRow._id)} style={{ cursor: 'pointer', color: "red" }} />
    },
    ],
    [],
  )

  useEffect(() => {
    getStone()
  }, [type, startDate, endDate]) // Re-fetch data when filters change

  const table = useMantineReactTable({
    columns,
    data: filteredServices.length > 0 ? filteredServices : stones,
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
        {loading && <Loader />}
        <AppHeader />
        <div className="body flex-grow-1">
          <div className="mx-3 mb-2">
            <div
              style={{
                marginBottom: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h4 className="mb-2"  style={{ textTransform: 'uppercase' }}>Stone-{type}</h4>
              <div>
              <button className="btn btn-primary mx-2" onClick={handleDownloadExcel}  style={{ textTransform: 'uppercase' }}>
                Download Excel
              </button>
              <button className="btn btn-danger mx-2 text-white " onClick={handleDelete}  style={{ textTransform: 'uppercase' }}>
               Delete
              </button>
              <button className="btn btn-info" onClick={handleDownloadPDF} style={{ textTransform: 'uppercase' }}>
                Download PDF
              </button> 
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                style={{ textTransform: 'uppercase' }}
                placeholder="Start Date"
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                style={{ textTransform: 'uppercase' }}
                placeholder="End Date"
              />
              <button className="btn btn-secondary" onClick={handleFilter}  style={{ textTransform: 'uppercase' }}>
                Apply Filters
              </button>
              <div className="dropdown">
                <button className="btn btn-secondary" type="button" onClick={toggleDropdown}>
                  {selectedUsers.length > 0 ? selectedUsers.join(', ') : 'Select Users'}
                </button>
                {isDropdownOpen && (
                  <ul className="dropdown-menu show">
                    {users?.map((user) => (
                      <li key={user._id} className="dropdown-item">
                        <label>
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user.name)}
                            onChange={() => handleUserSelect(user.name)}
                          />
                          {user.name}
                        </label>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {/* //reset filter */}

              <button className="btn btn-secondary" onClick={() => {
                setStartDate('')
                setEndDate('')
                setSelectedUsers([])
                setFilteredServices([])
              }
              }  style={{ textTransform: 'uppercase' }}>
                Reset Filters
              </button>

            </div>
            <MantineReactTable table={table} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Stones
