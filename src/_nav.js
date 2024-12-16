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
    name: 'DASHBOARD',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" style={{ color: "#0077ff", fontSize: "1.2em" }} />,
  },
  {
    component: CNavTitle,
    name: 'USERS',
  },
  {
    component: CNavItem,
    name: 'ALL USERS',
    to: '/users',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" style={{ color: "#0077ff", fontSize: "1.2em" }} />,
  },
  {
    component: CNavItem,
    name: 'CREATE USER',
    to: '/user/create',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" style={{ color: "#0077ff", fontSize: "1.2em" }} />,
  },
  {
    component: CNavTitle,
    name: 'REPORTS',
  },
  {
    component: CNavGroup, // Collapsible group for dropdown
    name: 'B.S.C.',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" style={{ color: "#0077ff", fontSize: "1.2em" }} />,
    items: [
      {
        component: CNavItem,
        name: 'MATERIAL',
        to: '/bsc/material',
      },
      {
        component: CNavItem,
        name: 'STONE',
        to: '/bsc/stone',
      },
      {
        component: CNavItem,
        name: 'EXTRA',
        to: '/bsc/extra',
      },
      {
        component: CNavItem,
        name: 'B.S.C. SLIPS',
        to: '/bscSlips',
      },
    ],
  },
  {
    component: CNavGroup, // Collapsible group for dropdown
    name: 'S.R.S.C.',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" style={{ color: "#0077ff", fontSize: "1.2em" }} />,
    items: [
      {
        component: CNavItem,
        name: 'MATERIAL',
        to: '/srsc/material',
      },
      {
        component: CNavItem,
        name: 'STONE',
        to: '/srsc/stone',
      },
      {
        component: CNavItem,
        name: 'EXTRA',
        to: '/srsc/extra',
      },
      {
        component: CNavItem,
        name: 'S.R.S.C. SLIPS',
        to: '/srscSlips',
      },
    ],
  },
  {
    component: CNavGroup, // Collapsible group for dropdown
    name: 'S.S.C.',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" style={{ color: "#0077ff", fontSize: "1.2em" }} />,
    items: [
      {
        component: CNavItem,
        name: 'MATERIAL',
        to: '/ssc/material',
      },
      {
        component: CNavItem,
        name: 'STONE',
        to: '/ssc/stone',
      },
      {
        component: CNavItem,
        name: 'EXTRA',
        to: '/ssc/extra',
      },
      {
        component: CNavItem,
        name: 'S.S.C. SLIPS',
        to: '/sscSlips',
      },
    ],
  },
  // {
  //   component: CNavItem,
  //   name: 'CREATE BILL',
  //   to: '/createbill',
  //   icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  // },
]

export default _nav
