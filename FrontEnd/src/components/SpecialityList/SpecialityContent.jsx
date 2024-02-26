import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import React, {useContext, useEffect, useState} from 'react'
import axios from "axios";
import {Link} from "react-router-dom";
import {ApiContext} from "../ApiContext/ApiProvider";

export default function SpecialityContent() {
    const [specialityList, setSpecialityList] = useState(null);
    const { API } = useContext(ApiContext)
    useEffect(() => {
        axios.get(`${API}/api/speciality`)
            .then(response => {
                setSpecialityList(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    if (!specialityList) {
        return null;
    }
    return (
        <>
            <div className={"w-100 d-flex flex-column justify-content-center align-items-center"}
                 style={{height: "200px", backgroundColor: "rgb(237 255 250)"}}>
                <h2 className={" mt-2"}>Danh sách Chuyên khoa</h2>
                <p className={" mt-3"}>Giúp bạn dễ dàng tìm kiếm và lựa chọn Chuyên khoa phù hợp với nhu cầu của
                    mình.</p>
            </div>
            <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'space-around', m: 7}}>
                {
                    specialityList.map((item, index) => (
                        <Card key={index} sx={{borderRadius: '15px', m: 2}}>
                            <Link to={`/list-speciality/${item.id}`} style={{textDecoration: 'none', color: "black"}}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        width="250"
                                        image={item.specialtyImage}
                                        alt="Error image"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" align='center'>
                                            {item.specialtyName}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Link>
                        </Card>
                    ))
                }
            </Box>
        </>
    )
}