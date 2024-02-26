import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import React, {useContext, useEffect, useState} from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import {Link} from "react-router-dom";
import {ApiContext} from "../ApiContext/ApiProvider";

export default function SpecialityListHome() {
  const [specialityList, setSpecialityList] = useState([]);
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
    axios.get(`${API}/api/speciality`)
        .then(response => {
          setSpecialityList(response.data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
  }, []);

  return (
    <Box sx={{
      backgroundImage: `url('https://res.cloudinary.com/dqcrxfewu/image/upload/v1705044346/lsfpeouonm9fyemv208u.jpg')`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }} height={'670px'}>
      <Box sx={{ display: 'flex', justifyContent: 'center', pt: '30px' }}>
        <LazyLoadImage src='https://res.cloudinary.com/dqcrxfewu/image/upload/v1704880692/xn2gns4ws8ul825zyfl3.png' width='70px' height='70px' />
      </Box>
      <Typography variant='h3' align='center'>
        CHUYÊN KHOA
      </Typography>
      <Typography variant='subtitle1' align='center' mt={2}>
        Danh sách chuyên khoa khách hàng có thể tìm nhanh thông tin bác sĩ!
      </Typography>
      <Box mx={10} mt={10} >
        <Slider {...settings}>
          {
            specialityList.map((item, index) => (
              <Card key={item.id} sx={{ borderRadius: '15px' }}>
                <Link to={`/list-speciality/${item.id}`} style={{ textDecoration: 'none',color:"black" }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.specialtyImage}
                    alt="Error image"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" align='center' >
                      {item.specialtyName}
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
