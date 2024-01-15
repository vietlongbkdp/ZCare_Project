import React from 'react'
import { Box, Typography, Checkbox, Button, TextField, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import axios from "axios";
import {toast} from "react-toastify";
import { useForm } from 'react-hook-form';

const schema = yup.object({
    email: yup.string()
        .email("Email phải đúng định dạng")
        .required("email không được để trống"),
        code: yup.string().required("Code không được để trống"),
})
export default function ChangePassword() {
    const {register, handleSubmit, formState: {errors},reset, setValue, getValues } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        // try {
        //   const response = await axios.post('http://localhost:8080/api/customer/forgot', data);
        //   console.log(response.data);
        //   toast.success("Gửi xác nhận thành công");
        // } catch (error) {
        //   toast.error("Mã xác nhận không đúng.");
        // } 
      };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' , justifyContent: 'center',
    backgroundImage: `url(https://png.pngtree.com/background/20210711/original/pngtree-hospital-culture-publicity-column-background-picture-image_1085829.jpg)`,
    backgroundSize: 'cover',
    width: '100vw',
    height: '100vh',}}>
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '100%',
            maxWidth: '400px',
            marginTop: '20px',
            borderRadius: '7px',
            border: '1px solid rgba(0, 0, 0, 0.125)',
            boxShadow: '0 0 0.25rem rgba(0, 0, 0, 0.075)',
            padding: '16px',
            backgroundColor: 'rgba(245, 246, 250, 0.8)',
        }}
    >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h5">Đổi mật khẩu</Typography>
            {/* <Link to="/register" style={{ textDecoration: 'none' }}>
            Bạn chưa có tài khoản?
            </Link> */}
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '25px'}}>
                <TextField
            label="Nhập mật khẩu mới" 
            {...register('password')}
            name="password"
            error={!!errors.password}
            helperText={errors.password?.message}
            type="password" 
            variant="outlined"
            />
        </Box>
       
    <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '25px' }}>
        <TextField
            {...register('newPassword')}
            name="code"
            label="Xác nhận mật khẩu" 
            type="password"   
            variant="outlined"
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
        />
    </Box>
        <Box sx={{ marginTop: '16px' }}>
         <Button type="submit" variant="contained" fullWidth>
        Gửi xác nhận
        </Button>
        </Box>
        </form>
    </Box>
</Box>
  )
}
