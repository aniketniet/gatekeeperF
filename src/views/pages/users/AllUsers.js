import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import CIcon from '@coreui/icons-react';
import { cilColorBorder, cilTrash, cilPaperPlane, cilLockUnlocked, cilLockLocked } from '@coreui/icons';
import { AppSidebar, AppHeader } from '../../../components/index';

const AllUsers = () => {
    const [services, setServices] = useState([]);
    const token = localStorage.getItem('token');

    async function getUsers() {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}admin/users`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // Assuming the response has the users array
        const usersData = res.data.users;
        setServices(usersData); // Set the response users data to services
    }

    async function handleDelete(id, isActive) {
        const action = isActive ? 'deactivate' : 'activate';
        const confirmed = confirm(`Confirm to ${action} this user?`);
        if (confirmed) {
            try {
                const res = await axios.put(
                    `${import.meta.env.VITE_BASE_URL}admin/switch/${id}`,
                    {}, // Pass an empty object for the request body if there's no data
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (res.status === 200) {
                    getUsers(); // Refresh the user list after toggling status
                }
            } catch (error) {
                console.error('Error during status toggle operation:', error);
            }
        }
    }
    async function handleParmanentDelete(id) {
        const confirmed = confirm('Confirm to delete?');
        if (confirmed) {
            try {
                const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}admin/delete-user/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                
                if (res.status === 200) {
                    // After successful deletion, fetch the updated list of users
                    getUsers();  // Make sure to implement this function to refresh your users list
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
            {
                header: 'S NO.',
                Cell: ({ row }) => row.index + 1,
                size: 70, // Reduced size for "S No."
            },
            {
                header: 'NAME',
                accessorKey: 'name',
                size: 150,
            },
            {
                header: 'MOBILE',
                accessorKey: 'phone',
                size: 150,
            },
            {
                header: 'USER ID',
                accessorKey: 'employeeId',
                size: 150,
            },
            {
                header: "DATE & TIME",
                size: 150,
                Cell: ({ row }) => {
                    if (row.original.created_at) {
                        const options = {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                        };
                        return new Intl.DateTimeFormat('en-GB', options).format(new Date(row.original.created_at));
                    }
                    return '';
                },
            },
            {
                header: 'EDIT',
                size: 70,
                accessorFn: (dataRow) => (
                    <Link to={`/user/${dataRow._id}`}>
                        <CIcon icon={cilColorBorder} />
                    </Link>
                ),
            },
            {
                header: 'STATUS',
                accessorFn: (dataRow) => (
                    <CIcon
                        icon={dataRow.isActive ? cilLockUnlocked : cilLockLocked}
                        onClick={() => handleDelete(dataRow._id, dataRow.isActive)}
                        style={{
                            cursor: 'pointer',
                            color: dataRow.isActive ? 'green' : 'red',
                        }}
                        size="lg"
                    />
                ),
            },
            {
                header: 'DELETE',
                size: 70, // Reduced size for "Delete"
                accessorFn: (dataRow) => (
                    <CIcon
                        icon={cilTrash}
                        onClick={() => handleParmanentDelete(dataRow._id)}
                        style={{ cursor: 'pointer', color: "red" }}
                    />
                ),
            },
        ],
        []
    );
    
    useEffect(() => {
        getUsers(); // Fetch users when the component mounts
    }, []);

    const table = useMantineReactTable({
        columns,
        data: services, // Set data to services (user data)
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
                    <div className="mx-3 mb-2">
                        <h4 className="mb-2">ALL USERS</h4>
                        <MantineReactTable table={table} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllUsers;
