import React from 'react'
import Header from '../../components/Header/Header'
import Poster from '../../components/HomePage/Poster'
import SearchBar from '../../components/HomePage/SearchBar'
import SpecialityListHome from '../../components/HomePage/SpecialityListHome'
import ClinicListHome from '../../components/HomePage/ClinicListHome'
import DoctorListHome from '../../components/HomePage/DoctorListHome'
import Footer from '../../components/Footer/Footer'
import '../../components/HomePage/homePage.css'

export default function HomePage() {
    return (
        <>
            <Header />
            <Poster />
            <SearchBar />
            <SpecialityListHome />
            <ClinicListHome />
            <DoctorListHome />
            <Footer />
        </>
    )
}
