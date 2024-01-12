import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ClinicListHome() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    margin: 2
  };

  const specialityList = [
    {
      image: 'https://cdn.bookingcare.vn/fo/w384/2018/06/18/143606logo-phong-kham-viet-life.png',
      title: 'Phòng khám Vietlife MRI Trần Bình Trọng'
    },
    {
      image: 'https://cdn.bookingcare.vn/fo/w384/2022/05/12/101707-logo-sg.png',
      title: 'Phòng khám Đa khoa Saigon Healthcare'
    },
    {
      image: 'https://cdn.bookingcare.vn/fo/w384/2018/05/11/181208mediteclogo.jpeg',
      title: 'Phòng khám Đa khoa Meditec'
    },
    {
      image: 'https://cdn.bookingcare.vn/fo/w384/2021/04/11/162940-logo-sihg.png',
      title: 'Phòng khám đa khoa Singapore Indochina Healthcare Group (SIHG)'
    },
    {
      image: 'https://cdn.bookingcare.vn/fo/w384/2021/03/16/112207-logo-golden-healthcarepng.png',
      title: 'Phòng khám Đa khoa Quốc tế Golden Healthcare'
    }
  ]
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
            specialityList.map((item, index) => (
              <Card key={index} sx={{ borderRadius: '15px' }}>
                <CardActionArea>
                  <Box sx={{ display: 'inline'}}>
                    <CardMedia
                      sx={{ padding: '20px', objectFit: 'contain' }}
                      component="img"
                      height="200"
                      image={item.image}
                      alt="Error image"
                    />
                  </Box>
                  <CardContent className='clinic-title'>
                    <Typography gutterBottom variant="h6" fontSize='1.2rem' align='center' height='70px' padding='10px'>
                      {item.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))
          }
        </Slider>
      </Box>
    </Box>
  )
}
