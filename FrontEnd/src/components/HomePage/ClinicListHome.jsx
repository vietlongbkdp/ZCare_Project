import { Box, Typography } from '@mui/material'
import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

export default function ClinicListHome() {
  return (
    <Box bgcolor='#ffffff' height={'500px'}>
    <Box sx={{display:'flex', justifyContent:'center', pt:'30px'}}>
      <LazyLoadImage src='https://res.cloudinary.com/dqcrxfewu/image/upload/v1704880692/xn2gns4ws8ul825zyfl3.png' width='70px' height='70px' />
    </Box>
    <Typography variant='h3' align='center'>
      DANH SÁCH PHÒNG KHÁM
    </Typography>
    <Typography variant='subtitle1' align='center' mt={2}>
      Danh sách phòng khám khách hàng có thể tìm nhanh thông tin phòng khám!
    </Typography>
  </Box>
  )
}
