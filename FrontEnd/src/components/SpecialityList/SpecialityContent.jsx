import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'

export default function SpecialityContent() {

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
        },
        {
            image: 'https://cdn.bookingcare.vn/fo/w384/2023/12/26/101627-co-xuong-khop.png',
            title: 'Cột sống'
        }
    ]


    return (
        <>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'space-around', m:7 }}>
                {
                    specialityList.map((item, index) => (
                        <Card key={index} sx={{ borderRadius: '15px', m:2 }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    width="250"
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
            </Box>
        </>
    )
}