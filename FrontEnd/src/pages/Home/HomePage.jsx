import React from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import HomeContent from '../../components/HomeContent/HomeContent'
import { Route, Routes } from 'react-router'
import ClinicContent from '../../components/Clinic/ClinicContent'

export default function HomePage() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<HomeContent />} />
                <Route path="/clinic-page" element={<ClinicContent/>} />
            </Routes>
            <Footer />
        </>
    )
}
