import { useParams } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import CIcon from '@coreui/icons-react';
import { cilDescription, cilColorBorder, cilTrash } from '@coreui/icons';
import { AppSidebar, AppHeader } from '../../../components/index';
import Loader from '../../../Loader';

const Stones = () => {
    const [Stone, setStone] = useState([]);
    const [loading, setLoading] = useState(false);
    const { type } = useParams(); // Use the 'type' parameter for filtering

    const token = localStorage.getItem('token');
    

    async function getStone() {
        setLoading(true);
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}user/stones`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const allStones = res.data.stones;

            // Filter the stones based on 'type'
            const filteredStones = type ? allStones.filter(item => item.category === type) : allStones;
            setStone(filteredStones);

            setLoading(false);
        } catch (error) {
            console.error('Error fetching stones:', error);
        }
    }
    async function handleDelete() {
        // Alert the user about the action and the criteria
        const confirmed = confirm('This will delete data older than 3 months. Do you want to proceed?');
        
        if (confirmed) {
            try {
                // Make the delete request
                const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}admin/delete-old-stones`, {
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
                console.error('Error deleting old stone:', error);
                alert('Failed to delete old stones. Please check your connection or try again later.');
            }
        } else {
            return; // User canceled the action
        }
    }
    
    const columns = useMemo(
        () => [
            { header: 'S No.', Cell: ({ row }) => row.index + 1 },
            { header: 'RST', accessorKey: 'rst', size: 150 },
            { header: 'Vehicle no.', accessorKey: 'vehicle_number', size: 150 },
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
                Cell: ({ row }) => <Link to={`stoneEdit/${row.original._id}`} style={{ textDecoration: 'none' }}><CIcon icon={cilColorBorder} /></Link>,
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
    }, [type]); // Re-fetch data when 'type' changes

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
                {loading && <Loader />}
                <AppHeader />
                <div className="body flex-grow-1">
                    <div className='mx-3 mb-2'>
                    <div  style={
                            {
                                 marginBottom: '10px',
                                 display: 'flex',
                                    justifyContent: 'space-between',
                                    itemsAlign: 'center'

                             }   
                        }>
                        <h4 className='mb-2'>Stone</h4>
                        <CIcon icon={cilTrash} onClick={() => handleDelete()} style={{ cursor: 'pointer', color: "red" }} />
                        </div>
                        <MantineReactTable table={table} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Stones;
