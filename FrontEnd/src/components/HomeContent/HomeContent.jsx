import React from 'react'
import Poster from './Poster'
import SearchBar from './SearchBar'
import SpecialityListHome from './SpecialityListHome'
import ClinicListHome from './ClinicListHome'
import DoctorListHome from './DoctorListHome'
import './homePage.css'

export default function HomeContent() {
    return (
        <>
            <Poster />
            <SearchBar />
            <SpecialityListHome />
            <ClinicListHome />
            <DoctorListHome />
        </>
    )
}
