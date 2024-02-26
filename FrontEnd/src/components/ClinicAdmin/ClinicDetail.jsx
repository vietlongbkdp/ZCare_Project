import { Box, Button, Container, Typography } from '@mui/material'
import axios from 'axios'
import React, {useContext, useEffect, useState} from 'react'
import Loading from "../Loading/Loading";
import { Stack } from '@mui/system';
import HTMLReactParser from 'html-react-parser';
import {ApiContext} from "../ApiContext/ApiProvider";

export default function ClinicDetail({ clinicId, handleHideClinicDetail }) {
    const [clinicDetail, setClinicDetail] = useState();
    const [buttonCreate, setButtonCreate] = useState(true)
    const [loading, setLoading] = useState(true);
    const { API } = useContext(ApiContext)
    useEffect(() => {
        const getClinicById = async () => {
            const res = await axios.get(`${API}/api/clinic/${clinicId}`)
            if (res.status === 200) {
                setClinicDetail(res.data)
                console.log(clinicDetail);
                setLoading(false)
            }
            else {
                console.error("Thất bại");
                setLoading(false)
            }
        }
        getClinicById();
    }, [])
    return (
        <>
            {loading && <Loading />}
            <Container>
                {buttonCreate &&
                    <Button
                        type="button"
                        variant="contained"
                        sx={{ mb: 1, mr: 1, backgroundColor: 'grey', '&:hover': { backgroundColor: 'gray' } }}
                        onClick={handleHideClinicDetail}
                    >
                        Trở lại
                    </Button>}
                <Container sx={{ backgroundColor: 'white', pt: 1 }}>
                    <Typography variant='h4' align='center' gutterBottom>{clinicDetail?.clinicName}</Typography>
                    <Stack direction='row' sx={{ borderBottom: '1 solid black' }}>
                        <Box px={2} mx={3}>
                            <img src={clinicDetail?.clinicLogo} style={{ width: '200px', height: '130px' }} alt="Logo" />
                        </Box>
                        <Box pr={3} width='180px'>
                            <Typography variant='subtitle1'>Người đại diện:</Typography>
                            <Typography variant='subtitle1'>Email:</Typography>
                            <Typography variant='subtitle1'>Đường dây nóng:</Typography>
                            <Typography variant='subtitle1'>Giấy phép hoạt động:</Typography>
                            <Typography variant='subtitle1'>Địa chỉ:</Typography>
                        </Box>
                        <Box>
                            <Typography variant='subtitle1'>{clinicDetail?.legalRepresentative}</Typography>
                            <Typography variant='subtitle1'>{clinicDetail?.email}</Typography>
                            <Typography variant='subtitle1'>{clinicDetail?.hotline}</Typography>
                            <Typography variant='subtitle1'>{clinicDetail?.operatingLicence}</Typography>
                            <Typography variant='subtitle1'>{clinicDetail?.address}</Typography>
                        </Box>
                    </Stack>
                    <Box p={1} mt={3}>
                        {clinicDetail && clinicDetail?.clinicInfo && HTMLReactParser(clinicDetail?.clinicInfo)}
                    </Box>
                </Container>
            </Container>
        </>
    )
}
