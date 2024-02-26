import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Header from "../Header/Header";
import DoctorInfoClinic from "../DoctorInfoClinic/DoctorInfoClinic";
import Footer from "../Footer/Footer";
import HTMLReactParser from "html-react-parser";
import axios from "axios";
import Loading from "../Loading/Loading";
import {Box, Container, Typography} from "@mui/material";
import {Stack} from "@mui/system";
import {ApiContext} from "../ApiContext/ApiProvider";

function DoctorListByClinic() {
    const {clinicId} = useParams();
    const [clinic, setClinic] = useState();
    const [loading, setLoading] = useState(true);
    const { API } = useContext(ApiContext)
    useEffect(() => {
        axios.get(`${API}/api/clinic/${clinicId}`)
            .then(response => {
                setClinic(response.data);
                setLoading(false)
            })
            .catch(error => {
                console.error('Error:', error);
                setLoading(false)
            });

    }, []);

    return (
        <>
            {loading && <Loading/>}
            <Header/>
            <div className="w-100 d-flex flex-column justify-content-center align-items-center"
                 style={{height: "200px", backgroundColor: "rgb(237 255 250)"}}>
                <Container >
                    <Typography variant='h5' align='center' gutterBottom>{clinic?.clinicName}</Typography>
                    <Stack direction='row'  sx={{borderBottom: '1 solid black', justifyContent: 'center' }}>
                        <Box px={2} mx={3}>
                            <img src={clinic?.clinicLogo} style={{ width: '150px', height: '130px' }} alt="Logo" />
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
                </Container>
            </div>
            <DoctorInfoClinic clinicId={clinicId}/>
            <div className={"my-5"}>
                <div className={"container pb-4"}>
                    <div className={"d-flex flex-column mt-3"}>
                        {clinic && clinic.clinicInfo && HTMLReactParser(clinic.clinicInfo)}
                    </div>
                </div>
            </div>
            <Footer/>


        </>
    );
}

export default DoctorListByClinic;