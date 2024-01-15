import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SpecialityListHome() {

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
      image: 'https://cdn.bookingcare.vn/fo/w384/2023/12/26/101627-co-xuong-khop.png',
      title: 'Cơ xương khớp'
    },
    {
      image: 'https://cdn.bookingcare.vn/fo/w384/2023/12/26/101739-than-kinh.png',
      title: 'Thần kinh'
    },
    {
      image: 'https://cdn.bookingcare.vn/fo/w1920/2023/12/26/101713-tieu-hoa.png',
      title: 'Tiêu hóa'
    },
    {
      image: 'https://cdn.bookingcare.vn/fo/w384/2023/12/26/101713-tim-mach.png',
      title: 'Tim mạch'
    },
    {
      image: 'https://cdn.bookingcare.vn/fo/w384/2023/12/26/101713-tai-mui-hong.png',
      title: 'Tai mũi họng'
    }
  ]
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
              <Card key={index} sx={{ borderRadius: '15px' }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.image}
                    alt="Error image"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" align='center' >
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