import React, {useContext, useEffect, useState} from 'react';
import HTMLReactParser from "html-react-parser";
import axios from "axios";
import { Box, Container, Typography } from '@mui/material'
import Loading from "../Loading/Loading";
import { Stack } from '@mui/system';
import Cookies from "js-cookie";
import {ApiContext} from "../ApiContext/ApiProvider";

function DoctorListByClinic() {
    const [clinic, setClinic] = useState();
    const [clinicUserId, setClinicUserId] = useState();
    const [loading, setLoading] = useState(true);
    const { API } = useContext(ApiContext)
    const storedUserId = Cookies.get('userId');

    useEffect(() => {
        const finddUser = async () => {
            try {
                const response = await axios.get(`${API}/api/user/userlogin/${storedUserId}`)
                console.log(response.data)
                setClinicUserId(response.data.id)
                setLoading(false)
            } catch (error) {
                console.error(error);
                setLoading(false)
            }
        }
        finddUser();
    }, [])

    useEffect(() => {
        if (clinicUserId !== undefined) {
            axios.get(`${API}/api/clinic/${clinicUserId}`)
                .then(response => {
                    setClinic(response.data);
                    setLoading(false)
                })
                .catch(error => {
                    console.error('Error:', error);
                    setLoading(false)
                });
        }

    }, [clinicUserId]);

    return (
        <>
            {loading && <Loading />}
                <Container>
                    <Typography variant='h4' align='center' gutterBottom>{clinic?.clinicName}</Typography>
                    <Stack direction='row' sx={{ borderBottom: '1 solid black' }}>
                        <Box px={2} mx={3}>
                            <img src={clinic?.clinicLogo} style={{ width: '200px', height: '130px' }} alt="Logo" />
                        </Box>
                        <Box pr={3}>
                            <Typography variant='subtitle1'>Người đại diện:</Typography>
                            <Typography variant='subtitle1'>Email:</Typography>
                            <Typography variant='subtitle1'>Đường dây nóng:</Typography>
                            <Typography variant='subtitle1'>Giấy phép hoạt động:</Typography>
                            <Typography variant='subtitle1'>Địa chỉ:</Typography>
                        </Box>
                        <Box>
                            <Typography variant='subtitle1'>{clinic?.legalRepresentative}</Typography>
                            <Typography variant='subtitle1'>{clinic?.email}</Typography>
                            <Typography variant='subtitle1'>{clinic?.hotline}</Typography>
                            <Typography variant='subtitle1'>{clinic?.operatingLicence}</Typography>
                            <Typography variant='subtitle1'>{clinic?.address}</Typography>
                        </Box>
                    </Stack>
                    <Box p={1} mt={3}>
                        {clinic && clinic.clinicInfo && HTMLReactParser(clinic.clinicInfo)}
                    </Box>
                </Container>
        </>
    );
}

export default DoctorListByClinic;