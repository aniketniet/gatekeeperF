import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import CIcon from '@coreui/icons-react';
import { cilCheck, cilPaperPlane, cilTrash, cilList, cilColorBorder, cilDescription } from '@coreui/icons';
import { AppSidebar, AppHeader } from '../../../components/index'
import Loader from '../../../Loader';
import { useParams } from 'react-router-dom';

const Extra = () => {
    const [Stone, setStone] = useState([]);
    const token = localStorage.getItem('token')
    const [loading, setLoading] = useState(false);
    const { type } = useParams(); // Read the 'type' parameter from the URL
    async function getStone() {
        setLoading(true);
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}user/extras`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const allExtra = res.data.extras;

              // Filter materials based on 'type'
              const filteredExtras = type ? allExtra.filter(item => item.category === type) : allExtra;
            //   setServices(filteredExtras);
            console.log(filteredExtras, 'ser');
            setStone(filteredExtras);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete() {
        // Alert the user about the action and the criteria
        const confirmed = confirm('This will delete data older than 3 months. Do you want to proceed?');
        
        if (confirmed) {
            try {
                // Make the delete request
                const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}admin/delete-old-extras`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
    
                // Check response status and give feedback
                if (res.status === 200) {
                    alert('Data older than 3 months has been deleted successfully.');
                    getUsers(); // Refresh the user data
                } else {
                    alert('Something went wrong. Please try again.');
                }
            } catch (error) {
                console.error('Error deleting old Extras:', error);
                alert('Failed to delete old Extras. Please check your connection or try again later.');
            }
        } else {
            return; // User canceled the action
        }
    }
    
    const columns = useMemo(
        () => [
            {
                header: 'S No.',
                Cell: ({ row }) => row.index + 1
            },
            {
                header: 'Remark',
                accessorKey: 'remark',
                size: 150,
            },
         
            {
                header: 'Full Details',
                size: 60,
                Cell: ({ row }) => <Link to={`detail/${row.original._id}`} style={{ textDecoration: 'none' }}><CIcon icon={cilDescription} /></Link>,
            },
            {
                header: "Date & Time",
                Cell: ({ row }) => {
                    if (row.original.created_at) {
                        const options = {
                            day: '2-digit', // Show the day first
                            month: '2-digit', // Month as a number
                            year: 'numeric', // Full year
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                        };
                        return new Intl.DateTimeFormat('en-GB', options).format(new Date(row.original.created_at)); // 'en-GB' for DD/MM/YYYY format
                    }
                    return '';
                },
            },
            {
                header: 'Edit',
                size: 60,
                Cell: ({ row }) => <Link to={`extraEdit/${row.original._id}`} style={{ textDecoration: 'none' }}><CIcon icon={cilColorBorder} /></Link>,
            },
            
            // {
            //     header: 'Delete',
            //     size: 60,
            //     accessorFn: (dataRow) => <CIcon icon={cilTrash} onClick={() => handleDelete(dataRow._id)} style={{ cursor: 'pointer', color: "red" }} />
            // },
            
        ],
        [],
    );

    useEffect(() => {
        getStone();
    }, [type])

    const table = useMantineReactTable({
        columns,
        data: Stone,
        enableRowSelection: false,
        enableColumnOrdering: false,
        enableGlobalFilter: true,
        enableFullScreenToggle: false,
        initialState: { density: 'xs' },
    });

    return (
        <>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1">
                {loading && <Loader />}
                    <div className='mx-3 mb-2'>
                    <div  style={
                            {
                                 marginBottom: '10px',
                                 display: 'flex',
                                    justifyContent: 'space-between',
                                    itemsAlign: 'center'

                             }   
                        }>
                        <h4 className='mb-2'>Extra</h4>
                        <CIcon icon={cilTrash} onClick={() => handleDelete()} style={{ cursor: 'pointer', color: "red" }} />
                        </div>
                        <MantineReactTable table={table} />
                    </div>
                </div>
            </div>
        </>
    )
}
export default Extra;
