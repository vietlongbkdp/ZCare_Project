import { Box, Container, Typography } from '@mui/material'
import React from 'react'

export default function IntroduceContent() {
    return (
        <>
            <Container sx={{ minHeight:'500px', mt: 5 }}>
                <Typography variant='h4' sx={{color: 'red', mb:5, textAlign:'center'}}>Chào mừng bạn đến với hệ thống đặt lịch khám bệnh trực tuyến Z-CARE</Typography>
                <Typography>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates accusantium vel, magnam quasi magni error,
                    eaque repudiandae vitae aspernatur, saepe dolore facere rem fuga suscipit pariatur corporis similique molestiae totam
                    assumenda nesciunt dignissimos nihil obcaecati et expedita! Velit ipsum quisquam dolores recusandae unde, beatae laborum
                    consequuntur corrupti sit saepe architecto itaque nesciunt officia deleniti nulla, possimus omnis odit laboriosam error!
                    Quia, iusto quis. Aspernatur aperiam perferendis fuga adipisci repudiandae minus eum doloribus possimus enim incidunt animi
                    ullam, harum, ratione culpa dolore placeat officiis sed? Dicta assumenda itaque, doloribus nemo, possimus libero facilis
                    eveniet laborum quasi eos, ipsa non labore vitae.
                </Typography>
            </Container>
        </>
    )
}