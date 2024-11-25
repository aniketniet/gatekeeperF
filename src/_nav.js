import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilDrop,
  cilPencil,
  cilSpeedometer,
} from '@coreui/icons'
import { CNavItem, CNavTitle,CNavGroup  } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    
  },
  {
    component: CNavTitle,
    name: 'Users',
  },
  {
    component: CNavItem,
    name: 'All Users',
    to: '/users',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Create User',
    to: '/user/create',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Reports',
  },
   {
    component: CNavGroup, // Collapsible group for dropdown
    name: 'BSC',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Material',
        to: '/bsc/material',
      },
      {
        component: CNavItem,
        name: 'Stone',
        to: '/bsc/stone',
      },
      {
        component: CNavItem,
        name: 'Extra',
        to: '/bsc/extra',
      },
    ],
  },
  {
    component: CNavGroup, // Collapsible group for dropdown
    name: 'SRSC',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Material',
        to: '/srsc/material',
      },
      {
        component: CNavItem,
        name: 'Stone',
        to: '/srsc/stone',
      },
      {
        component: CNavItem,
        name: 'Extra',
        to: '/srsc/extra',
      },
    ],
  },
  {
    component: CNavGroup, // Collapsible group for dropdown
    name: 'SSC',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Material',
        to: '/ssc/material',
      },
      {
        component: CNavItem,
        name: 'Stone',
        to: '/ssc/stone',
      },
      {
        component: CNavItem,
        name: 'Extra',
        to: '/ssc/extra',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Create Bill',
    to: '/createbill',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  
]

export default _nav
