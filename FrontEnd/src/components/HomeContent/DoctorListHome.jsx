import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import React, {useContext, useEffect, useState} from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import {Link} from "react-router-dom";
import Rating from "@mui/material/Rating";
import {ApiContext} from "../ApiContext/ApiProvider";

export default function DoctorListHome() {
    const [DoctorList,setDoctorList]=useState([]);
    const { API } = useContext(ApiContext)
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        margin: 2
      };
    useEffect(() => {
        axios.get(`${API}/api/doctor`)
            .then(response => {
                setDoctorList(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    return (
        <Box bgcolor='#fff0fe' sx={{ backgroundImage: `url("https://cdn.bookingcare.vn/fo/w1920/2023/11/01/140311-background5.png")` }} height={'750px'}>
            <Box sx={{ display: 'flex', justifyContent: 'center', pt: '30px' }}>
                <LazyLoadImage src='https://res.cloudinary.com/dqcrxfewu/image/upload/v1704880692/xn2gns4ws8ul825zyfl3.png' width='70px' height='70px' />
            </Box>
            <Typography variant='h3' align='center'>
                DANH SÁCH BÁC SĨ
            </Typography>
            <Typography variant='subtitle1' align='center' mt={2}>
                Danh sách bác sĩ khách hàng có thể tìm nhanh thông tin bác sĩ!
            </Typography>
            <Box mx={10} mt={10} >
                <Slider {...settings} >
                    {
                        DoctorList.map((item, index) => (
                            <Card key={index} sx={{ border: '0', boxShadow:' none' , backgroundColor:'inherit' }}>
                                <Link to={`/doctorDetail/${item.id}`} style={{ textDecoration: 'none',color:"black" }}>
                                <CardActionArea>
                                    <Box>
                                        <CardMedia
                                            sx={{ padding: '20px', borderRadius:'100%' }}
                                            component="img"
                                            height="260"
                                            width='260'
                                            image={item.avatarImg}
                                            alt="Error image"
                                        />
                                    </Box>
                                    <CardContent className='clinic-title'>
                                        <Typography mb={3} variant="h6" fontSize='1.2rem' align='center' height='40px' >
                                            {item.doctorName}
                                        </Typography>
                                        <Typography gutterBottom variant="subtitle1" fontSize='1rem' align='center' height='20px' >
                                            {item.speciality.specialtyName}
                                        </Typography>
                                        <Typography gutterBottom variant="subtitle1" fontSize='1rem' align='center' height='20px' >
                                            <Rating value={item?.star} max={5} name="half-rating" precision={0.5} readOnly />
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                </Link>
                            </Card>
                        ))
                    }
                </Slider>
            </Box>
        </Box>
    )
}
