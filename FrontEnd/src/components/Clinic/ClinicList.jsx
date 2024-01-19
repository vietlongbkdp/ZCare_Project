import React, { useEffect, useState } from 'react';
import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import axios from "axios";

function ClinicList() {
    const [clinicData, setClinicData] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/api/clinic')
            .then(response => {
                setClinicData(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    if (!clinicData) {
        return null;
    }

    return (
        <>
            <div className={"w-100 d-flex flex-column justify-content-center align-items-center"}
                 style={{height: "200px", backgroundColor: "rgb(237 255 250)"}}>
                <h2 className={" mt-2"}>Danh sách phòng khám</h2>
                <p className={" mt-3"}>Giúp bạn dễ dàng tìm kiếm và lựa chọn phòng khám phù hợp với nhu cầu của mình.</p>
            </div>
            <Grid style={{display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap"}}>
                {clinicData.map(clinic => (
                    <Container
                        key={clinic.id}
                        style={{
                            flex: '0 0 25%',
                            display: 'flex',
                            borderRadius: '4px',
                            border: '1px solid',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            padding: '16px',
                            marginTop: '8px',
                            marginRight: "10px",
                            marginLeft: "10px",
                            width: '25%',
                            boxSizing: 'border-box',
                            height: '200px',
                            wordWrap: 'break-word',
                            wordBreak: 'break-all',
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                <Box display="flex" flexDirection="column" marginRight="10px" marginLeft="10px">
                                    <Typography variant="h6" style={{ color: '#74b9ff', flexShrink: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {clinic.clinicName}
                                    </Typography>
                                    <Typography variant="subtitle1" style={{ color: '#81ecec', flexShrink: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {clinic.address}
                                    </Typography>
                                    <div style={{ display: 'flex' }}>
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
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    marginLeft: '8px',
                                    marginRight: '16px'
                                }}>
                                    <img
                                        src={clinic.clinicLogo}
                                        alt=""
                                        style={{width: '100px', margin: '0 auto'}}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                ))}
            </Grid>
        </>
    );
}

export default ClinicList;