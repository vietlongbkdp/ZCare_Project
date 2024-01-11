import { Box, Typography } from '@mui/material'
import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

export default function DoctorListHome() {
    return (
        <Box bgcolor='#fff0fe' sx={{backgroundImage: `url("https://cdn.bookingcare.vn/fo/w1920/2023/11/01/140311-background5.png")`}} height={'600px'}>
            <Box sx={{ display: 'flex', justifyContent: 'center', pt: '30px' }}>
                <LazyLoadImage src='https://res.cloudinary.com/dqcrxfewu/image/upload/v1704880692/xn2gns4ws8ul825zyfl3.png' width='70px' height='70px' />
            </Box>
            <Typography variant='h3' align='center'>
                DANH SÁCH BÁC SĨ
            </Typography>
            <Typography variant='subtitle1' align='center' mt={2}>
                Danh sách bác sĩ khách hàng có thể tìm nhanh thông tin bác sĩ!
            </Typography>
        </Box>
    )
}
