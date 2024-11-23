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

    const columns = useMemo(
        () => [
            {
                header: 'Name',
                accessorKey: 'name', // Corresponds to the 'name' field in the API response
                size: 200,
            },
            {
                header: 'Mobile',
                accessorKey: 'phone', // Use 'phone' instead of 'mobile' to match the response
                size: 200,
            },
            {
                header: 'EmployeeId',
                accessorKey: 'employeeId', // Assuming 'employeeId' exists in the response
                size: 100,
            },
            {
                header: 'Edit',
                size: 100,
                accessorFn: (dataRow) => (
                    <Link to={`/user/orders/${dataRow._id}`}>
                        <CIcon icon={cilColorBorder} />
                    </Link>
                ),
            },
            {
                header: 'Status',
               
                accessorFn: (dataRow) => (
                    <CIcon
                    
                        icon={dataRow.isActive ? cilLockUnlocked : cilLockLocked} // Change icon based on `isActive` state
                        onClick={() => handleDelete(dataRow._id,dataRow.isActive)} // Pass `isActive` to the handler
                        style={{
                            cursor: 'pointer',
                           
                            color: dataRow.isActive ? 'green' : 'red',
                        }}
                          size="lg"
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
