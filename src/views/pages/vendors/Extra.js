import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import CIcon from '@coreui/icons-react';
import { cilCheck, cilPaperPlane, cilTrash, cilList, cilColorBorder, cilDescription } from '@coreui/icons';
import { AppSidebar, AppHeader } from '../../../components/index'
import Loader from '../../../Loader';

const Extra = () => {
    const [Stone, setStone] = useState([]);
    const token = localStorage.getItem('token')
    const [loading, setLoading] = useState(false);
    async function getStone() {
        setLoading(true);
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}user/extras`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const ser = res.data.extras;
            console.log(ser, 'ser');
            setStone(ser);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id) {
        const confirmed = confirm('Confirm to delete?')
        if (confirmed) {
            const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}admin/deleteVendorById/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (res.status === 200) {
                getStone()
            }
        }
        else {
            return
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
            // {
            //     header: 'Delete',
            //     size: 60,
            //     accessorFn: (dataRow) => <CIcon icon={cilTrash} onClick={() => handleDelete(dataRow._id)} style={{ cursor: 'pointer', color: "red" }} />
            // },
            {
                header: 'Edit',
                size: 60,
                Cell: ({ row }) => <Link to={`extraEdit/${row.original._id}`} style={{ textDecoration: 'none' }}><CIcon icon={cilColorBorder} /></Link>,
            },
            {
                header: "Date",
                Cell: ({ row }) => row.original.created_at ? new Date(row.original.created_at).toLocaleDateString() : '',
            }
        ],
        [],
    );

    useEffect(() => {
        getStone();
    }, [])

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
                        <h4 className='mb-2'>Stones</h4>
                        <MantineReactTable table={table} />
                    </div>
                </div>
            </div>
        </>
    )
}
export default Extra;
