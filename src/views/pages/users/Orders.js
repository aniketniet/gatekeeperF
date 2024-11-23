import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { AppSidebar, AppHeader } from '../../../components/index'

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token')
  const id = useParams().id
  async function getOrders() {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}admin/fetchAllBookedServicesByUserId/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const ser = res.data.bookedServices;
    setOrders(ser);
  }

  const columns = useMemo(
    () => [
      {
        header: "Service",
        accessorKey: "service.title",
        size: 150,
      },
      {
        header: "Status",
        accessorKey: "bookedService.servicestatus",
        size: 150,
      },
      {
        header: "Price (Rs.)",
        accessorKey: "bookedService.bookedprice",
        size: 60,
      },
      {
        header: 'Date',
        accessorFn: (dataRow) => new Date(dataRow.bookedService.date).toDateString(),
        size: 100,
      },
    ],
    [],
  );

  useEffect(() => {
    getOrders();
  }, [])

  const table = useMantineReactTable({
    columns,
    data: orders,
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
          <div className='mx-3 mb-2'>
            <h4 className='mb-2'>ORDERS</h4>
            <MantineReactTable table={table} />
          </div>
        </div>
      </div>
    </>
  )
}
export default Orders
