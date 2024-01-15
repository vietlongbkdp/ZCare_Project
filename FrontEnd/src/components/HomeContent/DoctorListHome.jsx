import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function DoctorListHome() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        margin: 2
      };
    
      const specialityList = [
        {
          image: 'https://cdn.bookingcare.vn/fo/w384/2022/12/24/155630-bs-thanh.png',
          name: 'Bác sĩ Chuyên khoa II Nguyễn Tiến Thành',
          speciality: 'Da liễu,Da liễu thẩm mỹ'
        },
        {
          image: 'https://cdn.bookingcare.vn/fo/w384/2021/10/07/145448-bs-lan.jpg',
          name: 'Thạc sĩ, Bác sĩ Đoàn Thị Lan',
          speciality: 'Nhi khoa'
        },
        {
          image: 'https://cdn.bookingcare.vn/fo/w384/2018/12/06/150208bac-si-chuyen-khoa-ii-pham-xuan-hau.jpg',
          name: 'Bác sĩ Chuyên khoa II Phạm Xuân Hậu',
          speciality: 'Tim mạch'
        },
        {
          image: 'https://cdn.bookingcare.vn/fo/w384/2021/01/14/153812-bs-bui-van-duc.jpg',
          name: 'Thạc sĩ, Bác sĩ Chuyên khoa I Bùi Văn Đức',
          speciality: 'Da liễu'
        },
        {
          image: 'https://cdn.bookingcare.vn/fo/w384/2020/08/10/105158-anh-avt.jpg',
          name: 'Phó Giáo sư, Tiến sĩ Phạm Văn Tần',
          speciality: 'Chuyên khoa Mắt'
        }
      ]

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
                        specialityList.map((item, index) => (
                            <Card key={index} sx={{ border: '0', boxShadow:' none' , backgroundColor:'inherit' }}>
                                <CardActionArea>
                                    <Box>
                                        <CardMedia
                                            sx={{ padding: '20px', borderRadius:'100%' }}
                                            component="img"
                                            height="260"
                                            width='260'
                                            image={item.image}
                                            alt="Error image"
                                        />
                                    </Box>
                                    <CardContent className='clinic-title'>
                                        <Typography mb={3} variant="h6" fontSize='1.2rem' align='center' height='40px' >
                                            {item.name}
                                        </Typography>
                                        <Typography gutterBottom variant="subtitle1" fontSize='1rem' align='center' height='20px' >
                                            {item.speciality}
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
