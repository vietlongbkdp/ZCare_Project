import React, {useContext, useEffect, useState} from 'react'
import { Box, Typography, Checkbox, Button, TextField, Divider } from '@mui/material';
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import axios from "axios";
import {toast} from "react-toastify";
import { useForm } from 'react-hook-form';
import { Link,useNavigate  } from 'react-router-dom';
import Loading from "../Loading/Loading";
import {ApiContext} from "../ApiContext/ApiProvider";

const schema = yup.object({
    email: yup.string()
        .email("Email phải đúng định dạng")
        .required("email không được để trống"),
        code: yup.string().required("Code không được để trống"),
})
export default function ForgotPassword() {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [resendButtonDisabled, setResendButtonDisabled] = useState(false);
    const [countdown, setCountdown] = useState(90);
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors},reset, setValue, getValues } = useForm({
        resolver: yupResolver(schema)
    });
    const [loading, setLoading] = useState(false);
    const { API } = useContext(ApiContext)
    const onSubmit = async (data) => {
      try {
        const response = await axios.post(`${API}/api/user/forgot-password`, data);
        console.log(response.data);
        const UserId=response.data;
        toast.success("Gửi xác nhận thành công");
        navigate(`/change-password/${UserId}`);
      } catch (error) {
        toast.error("Mã xác nhận không đúng.");
      } 
    };


    const handleClick = async () => {
        setLoading(true)
        try {
          setIsButtonDisabled(true);
          const emailValue = getValues('email');
          if (!emailValue) {
            toast.error("Vui lòng nhập email.");
              setLoading(false)
            return;
          }
          const response = await axios.post(`${API}/api/user/email`, { email: emailValue });
          console.log(response.data);
          toast.success("Mã xác nhận đã được gửi thành công!");
          setResendButtonDisabled(true);
          setCountdown(90);
        } catch (error) {
          toast.error("Đã xảy ra lỗi khi gửi mã xác nhận.");
        } finally {
          setIsButtonDisabled(false);
            setLoading(false)
        }
      };

      useEffect(() => {
        if (countdown > 0) {
          const timer = setTimeout(() => {
            setCountdown(countdown - 1);
          }, 1000);
      
          return () => clearTimeout(timer);
        } else {
          setResendButtonDisabled(false);
        }
      }, [countdown]);


  return (
      <>
      {loading && <Loading/>}
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
            <Typography variant="h5">Quên mật khẩu</Typography>
            <Link to="/register" style={{ textDecoration: 'none' }}>
            Bạn chưa có tài khoản?
            </Link>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: '25px', gap: '10px', justifyContent:"space-between" , alignItems:"center"}}>
            <Box>
                <TextField
            id="email"
            label="Xác nhận email" 
            {...register('email')}
            name="email"
            error={!!errors.email}
            helperText={errors.email?.message}
            type="email" 
            variant="outlined"
            sx={{ flex: 1 ,width:"280px"}}
            /></Box>
           <Box>
           {resendButtonDisabled ? (
           <span>
           Gửi lại mã sau: {Math.floor(countdown / 60)}:{countdown % 60}
          </span>
            ) : 
        <Button
        sx={{ width: 'fit-content', padding: '5px 16px', fontSize: '13px' }}
        variant="contained"
        disabled={isButtonDisabled}
        onClick={handleClick}
      >
       Nhận mã
     </Button>
        }
       </Box>
        </Box>
       
    <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '25px' }}>
        <TextField
            {...register('code')}
            name="code"
            label="Nhập mã xác nhận" 
            type="text"   
            variant="outlined"
            error={!!errors.code}
            helperText={errors.code?.message}
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
      </>
  )
}
