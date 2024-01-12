import React from 'react';
import { Box, Typography, Checkbox, Button, TextField, Divider } from '@mui/material';
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import axios from "axios";
import {toast} from "react-toastify";
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const schema = yup.object({
    email: yup.string()
        .email("Email phải đúng định dạng")
        .required("Email không được để trống"),
    password:yup.string().required("Mật khẩu không được để trống"),
   
})

function AuthLogin() {
    const {register, handleSubmit, formState: {errors},reset,setValue } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = async (data) => {
        console.log(data)
        try {
            await axios.post('http://localhost:8080/api/customer/login', data);
            toast.success("Đăng nhập thành công")
            reset();
        } catch (error) {
            if (error.response) {
                const errorMessage = error.response.data;
                toast.error(errorMessage);
                reset();
            } else {
                toast.error("Đăng nhập thất bại");
                reset();
                console.error(error);
            }
        }
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
                    <Typography variant="h5">Login</Typography>
                    <Link to="/register" style={{ textDecoration: 'none' }}>
                     Don't have an account?
                    </Link>
                </Box>
                <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '25px' }}>
                    <TextField id="outlined-basic"
                     label="Email" 
                     {...register('email')}
                     name={"email"}
                     error={!!errors.email}
                     helperText={errors.email?.message}
                     type="email" 
                     variant="outlined" />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '25px' }}>
                    <TextField id="outlined-basic" 
                    {...register('password')}
                    name={"password"}
                    label="Password" 
                    type="password" 
                    variant="outlined"
                    error={!!errors.password}
                    helperText={errors.password?.message} />
                </Box>
                <Box sx={{ display: 'flex', marginTop: '16px', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Checkbox value="" id="flexCheckDefault" />
                        <Typography variant="body2" sx={{ marginLeft: '8px' }}>
                            Keep me sign in
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Link to="/forgot" style={{ textDecoration: 'none' }}>
                        Forgot Password?
                        </Link>
                    </Box>
                </Box>
                <Box sx={{ marginTop: '16px' }}>
                    <Button type='submit' variant="contained" fullWidth>
                        Login
                    </Button>
                </Box>
                </form>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <Divider flexItem sx={{ width: '30%' }} />
                    <Typography variant="body2" sx={{ px: '8px' }}>
                        Login with
                    </Typography>
                    <Divider flexItem sx={{ width: '30%' }} />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                    <Button variant="outlined" fullWidth sx={{ marginRight: '8px' }}>
            <span className="icon">
              <i className="fab fa-google"></i>
            </span>
                        Google
                    </Button>
                    <Button variant="outlined" fullWidth sx={{ marginRight: '8px' }}>
            <span className="icon">
              <i className="fab fa-twitter"></i>
            </span>
                        Twitter
                    </Button>
                    <Button variant="outlined" fullWidth>
            <span className="icon">
              <i className="fab fa-facebook"></i>
            </span>
                        Facebook
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default AuthLogin;