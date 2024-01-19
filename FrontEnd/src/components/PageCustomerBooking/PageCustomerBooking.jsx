import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import React from "react";
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Container,
    FormControl, FormHelperText, FormLabel,
    InputLabel, MenuItem, Select,
    Typography
} from '@mui/material'
import TextField from '@mui/material/TextField';
import Avatar from "@mui/material/Avatar";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/material/Button';
export default function PageCustomerBooking (){
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();

    return (

        <>
            <Header/>
            <Container sx={{minHeight: 500, mt:4, minWidth: '100px', mb:6}}>
                <Box>
                    <Box sx={{alignItems: 'center'}} display={'flex'} >
                        <Avatar
                            src="https://cdn.bookingcare.vn/fo/w384/2021/10/07/145448-bs-lan.jpg"
                            alt="Hình ảnh"
                            sx={{ width: 200, height: 200, mr:10 }}
                        />
                        <Box >
                            <Typography variant={'h6'}> ĐẶT LỊCH KHÁM </Typography>
                            <Typography> Bác sĩ: Nguyễn Duy Hưng, Chuyên Khoa Tai Mũi Họng </Typography>
                            <Typography> 8:30-9:00 - Chủ nhật 2024-15-01 </Typography>
                            <Typography> Giá khám: 300.000đ</Typography>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{mt: 4}}>
                    <Box style={{width: '100%', height: '1px', background: 'gray'}}></Box>
                </Box>
                <Box sx={{mt: 2, minWidth: '500px'}}>
                    <Box>
                        <Typography variant={'h6'}>THÔNG TIN ĐẶT LỊCH KHÁM</Typography>
                        <Box component="form" onSubmit={handleSubmit()} sx={{ flexGrow: 1, mt: 2 }}>
                            <Grid container spacing={4}>
                                <Grid container item spacing={7}>
                                    <Grid item xs={4}>
                                        <TextField
                                            autoComplete="given-name"
                                            fullWidth
                                            id="doctorName"
                                            label="Full Name"
                                            autoFocus
                                            {...register("doctorName")}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            autoComplete="dob"
                                            fullWidthyy
                                            id="dob"
                                            type={"date"}
                                            label="dob"
                                            {...register("dob")}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            fullWidth
                                            id="phone"
                                            label="Phone"
                                            autoComplete="phone"
                                            {...register("phone")}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container item spacing={7}>
                                    <Grid item xs={4}>
                                        <TextField
                                            autoComplete="address"
                                            fullWidth
                                            id="address"
                                            type={"text"}
                                            label="Address"
                                            {...register("address")}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormControl fullWidth>
                                            <InputLabel id="gender">Gender</InputLabel>
                                            <Select
                                                labelId="gender"
                                                id="gender"
                                                label="Gender"
                                                {...register("gender")}
                                            >
                                                <MenuItem >NAM</MenuItem>
                                                <MenuItem >NU</MenuItem>
                                                <MenuItem >KHAC</MenuItem>

                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            autoComplete="email"
                                            fullWidth
                                            id="email"
                                            label="Email"
                                            {...register("email")}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid  sx={{ mt: 1, ml: 0.3}} container item spacing={7}>
                                    <FormControl sx={{minWidth: '100%'}} >
                                        <FormLabel sx={{}}>Lý do khám: </FormLabel>
                                        <Textarea
                                            placeholder="Lý do khám" minRows={2}
                                            {...register("doctor")}/>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box sx={{mt: 8}}>
                            <Typography variant={'h6'}>Chi phí thanh toán (Thanh toán sau tại cơ sở y tế): </Typography>
                            <Box>
                                <Box sx={{mt: 1, mb: 1}}>
                                    <Box style={{width: '100%', height: '0.5px', background: 'gray', opacity: 0.5}}></Box>
                                </Box>
                                <Box sx={{display: 'flex', justifyContent: 'space-between', ml: 2, mr:2}}>
                                    <Typography>Giá khám </Typography>
                                    <Typography>300.000đ</Typography>
                                </Box>
                                <Box sx={{mt: 1, mb: 1}}>
                                    <Box style={{width: '100%', height: '0.5px', background: 'gray', opacity: 0.5}}></Box>
                                </Box>
                                <Box sx={{display: 'flex', justifyContent: 'space-between', ml: 2, mr:2}}>
                                    <Typography> Phí đặt lịch </Typography>
                                    <Typography>Miễn phí</Typography>
                                </Box>
                                <Box sx={{mt: 1, mb: 1}}>
                                    <Box style={{width: '100%', height: '0.5px', background: 'gray', opacity: 0.5}}></Box>
                                </Box>
                                <Box sx={{display: 'flex', justifyContent: 'space-between', ml: 2, mr:2}}>
                                    <Typography>Tổng cộng </Typography>
                                    <Typography>300.000đ</Typography>
                                </Box>
                                <Box sx={{mt: 1, mb: 1}}>
                                    <Box style={{width: '100%', height: '0.5px', background: 'gray', opacity: 0.5}}></Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{mt:8, mb:4}}>
                            <Typography  sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center', mb:1 }}> Quý khách vui lòng điền đầy đủ thông tin để tiết kiệm thời gian làm thủ tục khám </Typography>
                            <Container  sx={{  display: 'flex', justifyContent: 'center' }} fixed>
                                <Box sx={{ bgcolor: '#cfe8fc', height: '200px', width: '800px' }}>
                                    <Typography sx={{mt: 3, ml: 4, mb: 3}} variant={'h6'}>Lưu ý</Typography>
                                    <Typography sx={{ml: 4}}> Thông tin anh/chị cung cấp sẽ được sử dụng làm hồ sơ khám bệnh, khi điền thông tin anh/chi vụi lòng. </Typography>
                                    <Typography sx={{ml: 4.5}}> - Ghi rõ họ và tên, vết hoa những chữ cái đầu tiên, ví dụ: Lê Thị Vân Anh </Typography>
                                    <Typography sx={{ml: 4.5}}> - Điền đầy đủ, úng và vui long kiểm tra lại thông tin trước khi ấn "Xác nhận" </Typography>
                                </Box>
                            </Container>
                        </Box>
                        <Box sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                            <Button variant="contained" disableElevation>
                                Xác nhận đặt khám
                            </Button>
                        </Box>

                    </Box>


                </Box>

            </Container>
            <Footer/>
        </>
    )
}