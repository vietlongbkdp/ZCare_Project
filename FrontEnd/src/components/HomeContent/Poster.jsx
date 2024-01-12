import { Box } from '@mui/system'
import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

export default function Poster() {
  return (
    <Box>
        <LazyLoadImage src='https://cdn.bookingcare.vn/fo/2023/11/02/134537-group-12314.png' width='100%' height={500}/>
    </Box>
  )
}
