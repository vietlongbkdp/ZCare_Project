import { Button, Container, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from "../Loading/Loading";

export default function ClinicDetail({ clinicId, handleHideClinicDetail }) {
    const [clinicDetail, setClinicDetail] = useState();
    const [buttonCreate, setButtonCreate] = useState(true)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getClinicById = async () => {
            const res = await axios.get(`http://localhost:8080/api/clinic/${clinicId}`)
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
    })
    return (
        <>
        {loading && <Loading/>}
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
            <Container>
                <Typography variant='h5' align='center' gutterBottom>{clinicDetail?.clinicName}</Typography>
            </Container>
        </Container>
        </>
    )
}
