import {Box, Card, CardActionArea, CardContent, CardMedia, Container, Typography} from '@mui/material'
import React from 'react'
import Grid from "@mui/material/Grid";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Avatar from "@mui/material/Avatar";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#f9f9f9',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,

}));


export default function IntroduceContent() {

    return (
        <>
            <Container sx={{ minHeight:'700px', mt: 5, minWidth: '1200px' }}>
                <Typography variant='h3' sx={{color: 'Black', mb:8, textAlign:'center', fontWeight: 'bold'}}>Chào mừng bạn đến với hệ thống đặt lịch khám bệnh trực tuyến Z-CARE</Typography>
                <Box>
                    <Grid container spacing={2} columns={16} >
                        <Grid sx={{ display: 'flex', alignItems: 'center' }}  item xs={8}>
                            <Box>
                                <Typography variant={'h4'} sx={{fontWeight: 'bold'}}>Ứng dụng đặt khám, đặt thuốc</Typography>
                                <Typography sx={{mt: 4}}>Chúng tôi xây dựng nền tảng y tế thông minh với sứ mệnh rút ngắn khoảng cách giữa Bệnh nhân, Bác sĩ và các cơ sở Y tế  </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={8}>
                            <Box display="flex" justifyContent="center">
                                <Avatar
                                    src="https://cdn.bookingcare.vn/fo/w384/2021/10/07/145448-bs-lan.jpg"
                                    alt="Hình ảnh"
                                    sx={{ width: 200, height: 200 }}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{mt: 10}}>
                    <Grid container spacing={4} columns={16} >
                        <Grid item xs={8} >
                            <Item>
                                <Box>
                                    <Avatar
                                        src="https://cdn.bookingcare.vn/fo/w128/2023/07/06/163421-153524-near-home-01.png"
                                        alt="Hình ảnh"
                                        sx={{ width: 50, height: 50 }}
                                    />
                                </Box>
                                <Typography  variant={'h5'} sx={{color: 'black', textAlign: 'left', mt: 2 }}>
                                    Tìm Chính xác
                                </Typography>
                                <Typography sx={{color: 'black', textAlign: 'left', mt: 2 }}>
                                    Thông tin về phóng khám và bác sĩ luôn được cập nhất chính xác bởi đội ngũ chuyên nghiệp của Z-Care. Bạn hoàn toàn có thể yên tâm tự nghiên cứu, đánh giá và đưa ra sự lựa chọn bác sĩ phù hợp  với tình hình bệnh án của mình mà không ần phải mất nhiều thời gian.

                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={8} >
                            <Item sx={{minHeight: '242px'}}>
                                <Box>
                                    <Avatar
                                        src="https://cdn.bookingcare.vn/fo/w128/2023/06/07/161442-iconbai-test-suc-khoe2.png"
                                        alt="Hình ảnh"
                                        sx={{ width: 50, height: 50 }}
                                    />
                                </Box>
                                <Typography  variant={'h5'} sx={{color: 'black', textAlign: 'left', mt: 2 }}>
                                    Đặt lịch khám dễ dàng
                                </Typography>
                                <Typography sx={{color: 'black', textAlign: 'left', mt: 2 }}>
                                    Chỉ với vài thao tác đơn giản, bạn cso thể đặt lịch khám Online moojt cách nhanh chóng mà không cần phải gọi điện thoại hoặc lo lắng rằng không có thông tin liên lạc của Bác sĩ.
                                </Typography>
                            </Item>
                        </Grid>
                    </Grid>
                    <Grid sx={{mt: 1}} container spacing={4} columns={16}>
                        <Grid item xs={8}>
                            <Item sx={{minHeight: '242px'}}>
                                <Box>
                                    <Avatar
                                        src="https://cdn.bookingcare.vn/fo/w128/2023/06/07/161817-iconkham-tu-xa.png"
                                        alt="Hình ảnh"
                                        sx={{ width: 50, height: 50 }}
                                    />
                                </Box>
                                <Typography  variant={'h5'} sx={{color: 'black', textAlign: 'left', mt: 2 }}>
                                    Tái khám thuận tiện
                                </Typography>
                                <Typography sx={{color: 'black', textAlign: 'left', mt: 2 }}>
                                    Z-Care sẽ giúp hỗ trợ nhắc nhở khi đến thời gian tái khám. Bạn hoàn toàn có thể yên tâm tin tưởng chọn lựa Z-Care trở thành cầu nối để việc khám bệnh trở nên thuận tiện và hiệu quả hơn bao giờ hết.

                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={8}>
                            <Item sx={{minHeight: '242px'}}>
                                <Box>
                                    <Avatar
                                        src="https://cdn.bookingcare.vn/fo/w128/2023/06/07/161350-iconkham-tong-quan.png"
                                        alt="Hình ảnh"
                                        sx={{ width: 50, height: 50 }}
                                    />
                                </Box>
                                <Typography  variant={'h5'} sx={{color: 'black', textAlign: 'left', mt: 2 }}>
                                    Thông tin y tế chính thống
                                </Typography>
                                <Typography sx={{color: 'black', textAlign: 'left', mt: 2 }}>
                                     Trang thông tin sức kho chính thống và hữu ích hàng đầu Việt Nam. Toàn bộ nội dung được biên soạn bởi đội ngũ Bác sĩ, Dược sĩ nhằm mục đích cung cấp kiến thức Y khoa chính thống cho cộng đồng.

                                </Typography>
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
                <Typography variant='h4' sx={{color: 'Black', mb:5, mt: 8, textAlign:'center', fontWeight: 'bold'}}>Đội ngũ điều hành</Typography>
                <Box sx={{mb: 8}}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={1}>
                            <Grid container item spacing={10}>
                                <Grid item xs={4}>
                                    <Box>
                                        <CardMedia
                                            component="img"
                                            image='https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-6/418431473_1597327954414234_8801241719182602824_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=BfYIDy9Qpi4AX8YqeV1&_nc_ht=scontent.fhan20-1.fna&oh=00_AfCSd6r1TAyjdeO1sVwMNKHHhDykqa0lnu9AZUAfgAY66A&oe=65AA6ABC'
                                            alt="Error image"
                                        />
                                        <Typography alignItems={'left'} sx={{mt: 2, fontWeight: 'bold'}}>Nguyễn Văn A</Typography>
                                        <Typography>Tổng giám đốc: CEO </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={4}>
                                    <Box>
                                        <CardMedia
                                            component="img"
                                            image='https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-6/418431473_1597327954414234_8801241719182602824_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=BfYIDy9Qpi4AX8YqeV1&_nc_ht=scontent.fhan20-1.fna&oh=00_AfCSd6r1TAyjdeO1sVwMNKHHhDykqa0lnu9AZUAfgAY66A&oe=65AA6ABC'
                                            alt="Error image"
                                        />
                                        <Typography alignItems={'left'} sx={{mt: 2, fontWeight: 'bold'}}>Nguyễn Văn B</Typography>
                                        <Typography>Marketing Director </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={4}>
                                    <Box>
                                        <CardMedia
                                            component="img"
                                            image='https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-6/418431473_1597327954414234_8801241719182602824_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=BfYIDy9Qpi4AX8YqeV1&_nc_ht=scontent.fhan20-1.fna&oh=00_AfCSd6r1TAyjdeO1sVwMNKHHhDykqa0lnu9AZUAfgAY66A&oe=65AA6ABC'
                                            alt="Error image"
                                        />
                                        <Typography alignItems={'left'} sx={{mt: 2, fontWeight: 'bold'}}>Nguyễn Văn C</Typography>
                                        <Typography>Operations Manager </Typography>
                                    </Box>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    )
}