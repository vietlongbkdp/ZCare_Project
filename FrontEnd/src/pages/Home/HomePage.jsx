import React from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import HomeContent from '../../components/HomeContent/HomeContent'
import { Route, Routes } from 'react-router-dom'
import ClinicContent from '../../components/Clinic/ClinicContent'
import SpecialityContent from '../../components/SpecialityList/SpecialityContent'
import IntroduceContent from '../../components/IntroduceContent/IntroduceContent'
import Cooperate from '../../components/Cooperate/Cooperate'

export default function HomePage() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<HomeContent />} />
                <Route path="/introduce" element={<IntroduceContent />} />
                <Route path="/clinic-page" element={<ClinicContent />} />
                <Route path='/speciality-page' element={<SpecialityContent/>} />
                <Route path="/cooperate" element={<Cooperate/>} />
            </Routes>
            <Footer />
        </>
    )
}
