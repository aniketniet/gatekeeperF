import React, { Suspense, useEffect } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'
import AllUsers from './views/pages/users/AllUsers'
import Material from './views/pages/vendors/Material'
import Stone from './views/pages/vendors/Stone'
import Extra from './views/pages/vendors/Extra'

import Faq from './views/pages/others/faq'
import AboutUs from './views/pages/others/about'
import Coupon from './views/pages/others/Coupon'
import Sos from './views/pages/others/Sos'
import Orders from './views/pages/users/Orders'
import City from './views/pages/others/City'
import Complaint from './views/pages/others/Complaint'
import CreateUser from './views/pages/users/CreateUser'
import DetailMaterial from './views/pages/vendors/DetailMaterial'
import DetailStone from './views/pages/vendors/DetailStone'
import DetailExtra from './views/pages/vendors/DetailExtra'
import EditMaterial from './views/pages/vendors/Editmaterial'
import EditStone from './views/pages/vendors/EditStone'
import EditExtra from './views/pages/vendors/EditExtra'
import CreateBill from './views/pages/createBill/CreateBill'
import PreviewBill from './views/pages/createBill/PreviewBill'
// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }
    if (isColorModeSet()) {
      return
    }
    setColorMode(storedTheme)
  }, []) 

  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route exact path="/login" name="Login Page" element={<Login />} />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route path='/users' element={<AllUsers />} />
          <Route path='/user/create' element={<CreateUser />} />
          <Route path='/material' element={<Material/>} />
          <Route path='/material/detail/:id' element={<DetailMaterial/>} />
          <Route path='/material/materialEdit/:id' element={<EditMaterial/>} />
          <Route path='/stone/stoneEdit/:id' element={<EditStone/>} />
          <Route path='/extra/extraEdit/:id' element={<EditExtra/>} />
          <Route path='/createbill' element={<CreateBill/>} />
          <Route path='/previewbill' element={<PreviewBill/>} />


          <Route path='/stone/detail/:id' element={<DetailStone/>} />
          <Route path='/extra/detail/:id' element={<DetailExtra/>} />
          <Route path='/stone' element={<Stone/>} />
          <Route path='/extra' element={<Extra/>} />
          <Route path='/faq' element={<Faq />} />
          <Route path='/city' element={<City />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/complaint' element={<Complaint />} />
          <Route path='/coupon' element={<Coupon />} />
          <Route path='/sos' element={<Sos />} />
          <Route path='/user/orders/:id' element={<Orders />} /> 
          <Route path="*" name="Home" element={<DefaultLayout />} />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default App
