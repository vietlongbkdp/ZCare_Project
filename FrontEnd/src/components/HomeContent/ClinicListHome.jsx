import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import React, {useContext, useEffect, useState} from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { Link } from "react-router-dom";
import {ApiContext} from "../ApiContext/ApiProvider";

export default function ClinicListHome() {
  const [ClinicList, setClinicList] = useState([]);
    const { API } = useContext(ApiContext)
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    margin: 2
  };
  useEffect(() => {
    axios.get(`${API}/api/clinic`)
      .then(response => {
        setClinicList(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <Box bgcolor='#ffffff' height={'670px'}>
      <Box sx={{ display: 'flex', justifyContent: 'center', pt: '30px' }}>
        <LazyLoadImage src='https://res.cloudinary.com/dqcrxfewu/image/upload/v1704880692/xn2gns4ws8ul825zyfl3.png' width='70px' height='70px' />
      </Box>
      <Typography variant='h3' align='center'>
        DANH SÁCH PHÒNG KHÁM
      </Typography>
      <Typography variant='subtitle1' align='center' mt={2}>
        Danh sách phòng khám khách hàng có thể tìm nhanh thông tin phòng khám!
      </Typography>
      <Box mx={10} mt={10} >
        <Slider {...settings} >
          {
            ClinicList.map((item, index) => (
              <Card key={index} sx={{ borderRadius: '15px' }}>
                <Link to={`/list-clinic/${item.id}`} style={{ textDecoration: 'none', color: "black" }}>
                  <CardActionArea>
                    <Box sx={{ display: 'inline' }}>
                      <CardMedia
                        sx={{ padding: '20px', objectFit: 'contain' }}
                        component="img"
                        height="200"
                        image={item.clinicLogo}
                        alt="Error image"
                      />
                    </Box>
                    <CardContent className='clinic-title'>
                      <Typography gutterBottom variant="h6" fontSize='1.2rem' align='center' height='70px' padding='10px'>
                        {item.clinicName}
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
