import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from 'axios'
import Loader from '../../../Loader'

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  async function handleLogin() {
    // Prevent the default form submission
    setLoading(true);
    try {
      const creds = {
        phone: username,
        password: password,
      };
  
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}auth/login`, 
        creds
      );
      console.log(response, 'res')
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);
       

          
  
      if (response.status === 200) {
       // Log the response data for debugging
        console.log(response.data);
  
        // Store the user object and token in localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user)); // Storing user data
        localStorage.setItem('token', response.data.token); // Storing the token
  
     // Navigate to the dashboard
        navigate("/dashboard");
      } else {
        alert("Login failed: Invalid credentials.");
      }
    } 
    catch (error) {
      console.error("Login error:", error);
      alert("Login Failed! Please try again.");
      setLoading(false);
    }
  }
  

  return (
    <>
    {loading && <Loader />}
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Phone"
                        autoComplete="off"
                        name="username"
                        onChange={e => setUsername(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={e => setPassword(e.target.value)}
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={handleLogin}>
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
    </>
  );

};

export default Login;
