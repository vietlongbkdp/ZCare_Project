import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthLogin from './AuthLogin';
import AuthRegister from './AuthRegister';
import ForgotPassword from './ForgotPassword';

export default function LoginAndRegister() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<AuthLogin />} />
        <Route path="/register" element={<AuthRegister />} />
        <Route path="/forgot" element={<ForgotPassword />} />
      </Routes>
    </>
  )
}
