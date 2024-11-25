import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import CIcon from '@coreui/icons-react';
import { cilTrash } from '@coreui/icons';
import { AppHeader, AppSidebar } from '../../components';
import Loader from '../../Loader';

const Audio = () => {
    const [Stone, setStone] = useState([]);
    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function getStone() {
        setLoading(true);
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}admin/get-all-audio`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setStone(res.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Failed to fetch audio data.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getStone();
    }, []);


    const columns = useMemo(
        () => [
            {
                header: 'Category',
                accessorKey: 'category',
            },
            {
                header: 'Audio',
                accessorKey: 'audio',
                Cell: ({ row }) => (
                    <audio controls>
                        <source src={`${import.meta.env.VITE_BASE_URL}${row.original.audio}`} type="audio/mp3" />
                    </audio>
                ),
            },
           
        ],
        [],
    );

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
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="mx-3 mb-2">
                        <h4 className="mb-2">Audio Files</h4>
                        <MantineReactTable table={table} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Audio;
