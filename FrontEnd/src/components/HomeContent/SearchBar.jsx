import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import React, {useContext, useEffect, useState} from 'react'
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {ApiContext} from "../ApiContext/ApiProvider";

export default function SearchBar() {
    const [clinicList, setClinicList] = useState([]);
    const [specialityList, setSpecialityList] = useState([]);
    const [selectedClinic, setSelectedClinic] = useState('');
    const [selectedSpeciality, setSelectedSpeciality] = useState('');
    const [doctorName, setDoctorName] = useState('');
    const navigate = useNavigate();
    const { API } = useContext(ApiContext)
    useEffect(() => {
        axios.get(`${API}/api/clinic`)
            .then(response => {
                setClinicList(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    useEffect(() => {
        axios.get(`${API}/api/speciality`)
            .then(response => {
                setSpecialityList(response.data);
            })
            .catch(error => {

                console.error('Error:', error);
            });
    }, []);

    const handleSearch = () => {
        const queryParams = new URLSearchParams({
            doctorName: doctorName,
            clinicId: selectedClinic,
            specialityId:selectedSpeciality
        });
        navigate(`/search?${queryParams.toString()}`);
    }

    return (
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <Stack direction='row' spacing={2} p={3} xs mdOffset={2} sx={{ borderRadius: '10px'}}>
                <TextField
                    label='Tìm kiếm với tên bác sĩ'
                    value={doctorName}
                    onChange={(event) => setDoctorName(event.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment>
                                <IconButton>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <FormControl sx={{ width: '300px' }} >
                    <InputLabel>Phòng khám</InputLabel>
                    <Select
                        id="demo-simple-select"
                        value={selectedClinic}
                        label='Phòng khám'
                        onChange={(event) => setSelectedClinic(event.target.value)}
                    >
                        {clinicList.map((clinic) => (
                            <MenuItem key={clinic.id} value={clinic.id}>{clinic.clinicName}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl sx={{ width: '300px' }} >
                    <InputLabel>Chuyên khoa</InputLabel>
                    <Select
                        id="demo-simple-select"
                        value={selectedSpeciality}
                        label='Chuyên khoa'
                        onChange={(event) => setSelectedSpeciality(event.target.value)}
                    >
                        {specialityList.map((speciality) => (
                            <MenuItem key={speciality.id} value={speciality.id}>{speciality.specialtyName}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button variant='contained' onClick={handleSearch}>Tìm kiếm</Button>
            </Stack>
        </Box>

    )
}
