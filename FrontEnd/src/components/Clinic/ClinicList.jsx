import React, {useContext, useEffect, useState} from 'react';
import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import {Link} from "react-router-dom";
import Loading from "../Loading/Loading";
import {ApiContext} from "../ApiContext/ApiProvider";

function ClinicList() {
    const [clinicData, setClinicData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { API } = useContext(ApiContext)
    useEffect(() => {
        axios.get(`${API}/api/clinic`)
            .then(response => {
                setClinicData(response.data);
                setLoading(false)
            })
            .catch(error => {
                console.error(error);
                setLoading(false)
            });
    }, []);

    if (!clinicData) {
        return null;
    }

    return (
        <>
            {loading && <Loading/>}
            <div className={"w-100 d-flex flex-column justify-content-center align-items-center"}
                 style={{height: "200px", backgroundColor: "rgb(237 255 250)"}}>
                <h2 className={" mt-2"}>Danh sách phòng khám</h2>
                <p className={" mt-3"}>Giúp bạn dễ dàng tìm kiếm và lựa chọn phòng khám phù hợp với nhu cầu của mình.</p>
            </div>
            <Grid style={{display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap"}} my={5}>
                {clinicData.map(clinic => (
                    <Container
                        key={clinic.id}
                        style={{
                            flex: '0 0 30%',
                            display: 'flex',
                            borderRadius: '4px',
                            border: '1px solid',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            padding: '16px',
                            marginTop: '8px',
                            marginRight: "10px",
                            marginLeft: "10px",
                            width: '30%',
                            boxSizing: 'border-box',
                            height: '250px',
                            wordWrap: 'break-word',
                            wordBreak: 'break-all',
                        }}
                    >
                        <Link to={`/list-clinic/${clinic.id}`} style={{ textDecoration: 'none',color:"black" }}>
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                <Box display="flex" flexDirection="column" marginRight="10px" marginLeft="10px">
                                    <Typography variant="h6" style={{color: '#74b9ff', flexShrink: 0, overflow: 'hidden', textOverflow: 'ellipsis', wordWrap: 'break-word', whiteSpace: 'pre-line',}}  align='center' height='80px'>
                                        {clinic.clinicName}
                                    </Typography>
                                    <Typography variant="subtitle1" style={{ color: '#81ecec', flexShrink: 1, overflow: 'hidden', textOverflow: 'ellipsis', wordWrap: 'break-word', whiteSpace: 'pre-line', }} fontSize='1rem' align='center' height='80px'>
                                        {clinic.address}
                                    </Typography>
                                    <div style={{ display: 'flex' }} >
                                        <IconButton style={{ marginRight: '8px' }}>
                                            <Facebook />
                                        </IconButton>
                                        <IconButton style={{ marginRight: '8px' }}>
                                            <Instagram />
                                        </IconButton>
                                        <IconButton style={{ marginRight: '8px' }}>
                                            <Twitter />
                                        </IconButton>
                                        <IconButton style={{ marginRight: '8px' }}>
                                            <LinkedIn />
                                        </IconButton>
                                    </div>
                                </Box>
                            </Grid>
                            <Grid item xs={2}>
                                <Box style={{
                                    marginLeft: '8px',
                                    marginRight: '16px',
                                    verticalAlign: 'middle',
                                }}>
                                    <img
                                        src={clinic.clinicLogo}
                                        alt=""
                                        style={{width: '120px', margin: '0 auto'}}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                        </Link>
                    </Container>
                ))}
            </Grid>
        </>
    );
}

export default ClinicList;