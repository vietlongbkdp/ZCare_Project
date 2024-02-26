import React, { useContext} from "react";
import {
  Box,
  Typography,
  Checkbox,
  Button,
  TextField,
  Divider,
} from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import {ApiContext} from "../ApiContext/ApiProvider";

const schema = yup.object({
  email: yup
    .string()
    .email("Email phải đúng định dạng")
    .required("Email không được để trống"),
  password: yup.string().required("Mật khẩu không được để trống"),
});

function AuthLogin() {
  const { API } = useContext(ApiContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(`${API}/api/user/login`, data);
      console.log(response)
      const userId = response.data.id;
      Cookies.set('userId', userId, { expires: 7, secure: false });
      const storedUserId = Cookies.get('userId');
      const token = response.data.token;
      Cookies.set('JWT', token, { expires: 7, secure: false });
      toast.success("Đăng nhập thành công");
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.roles[0];
      if (userRole === "ROLE_ADMIN") {
        window.location.href = "/admin";
      } else if (userRole === "ROLE_CUSTOMER") {
        const currentPath = window.location.pathname;
        if (!currentPath.includes("/admin")) {
          window.location.href = "/home";
        } else {
          window.location.href = "/home";
        }
      } else if (userRole === "ROLE_ADMIN_CLINIC") {
        window.location.href = `/clinicadmin`;
      } else if (userRole === "ROLE_DOCTOR") {
        window.location.href = `/doctoradmin`;
      }
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
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(https://png.pngtree.com/background/20210711/original/pngtree-hospital-culture-publicity-column-background-picture-image_1085829.jpg)`,
        backgroundSize: "cover",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          maxWidth: "400px",
          marginTop: "20px",
          borderRadius: "7px",
          border: "1px solid rgba(0, 0, 0, 0.125)",
          boxShadow: "0 0 0.25rem rgba(0, 0, 0, 0.075)",
          padding: "16px",
          backgroundColor: "rgba(245, 246, 250, 0.8)",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5">Đăng nhập</Typography>
          <Link to="/register" style={{ textDecoration: "none" }}>
            Bạn chưa có tài khoản?
          </Link>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginTop: "25px" }}
          >
            <TextField
              id="outlined-basic"
              label="Email"
              {...register("email")}
              name={"email"}
              error={!!errors.email}
              helperText={errors.email?.message}
              type="email"
              variant="outlined"

            />
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginTop: "25px" }}
          >
            <TextField
              id="outlined-basic"
              {...register("password")}
              name={"password"}
              label="Password"
              type="password"
              variant="outlined"
              error={!!errors.password}
              helperText={errors.password?.message}
              onKeyDown={handleKeyDown}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              marginTop: "16px",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Checkbox value="" id="flexCheckDefault" />
              <Typography variant="body2" sx={{ marginLeft: "8px" }}>
                Giữ tôi đăng nhập
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Link to="/forgot-password" style={{ textDecoration: "none" }}>
                Quên mật khẩu?
              </Link>
            </Box>
          </Box>
          <Box sx={{ marginTop: "16px" }}>
            <Button type="submit" variant="contained" fullWidth>
              Đăng nhập
            </Button>
          </Box>
        </form>
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
        >
          <Divider flexItem sx={{ width: "30%" }} />
          <Typography variant="body2" sx={{ px: "8px" }}>
            Login with
          </Typography>
          <Divider flexItem sx={{ width: "30%" }} />
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "16px" }}
        >
          <Button variant="outlined" fullWidth sx={{ marginRight: "8px" }}>
            <span className="icon">
              <i className="fab fa-google"></i>
            </span>
            <span className="ms-2"> Google</span>
          </Button>
          <Button variant="outlined" fullWidth sx={{ marginRight: "8px" }}>
            <span className="icon">
              <i className="fab fa-twitter"></i>
            </span>
            <span className="ms-2"> Twitter</span>
          </Button>
          <Button variant="outlined" fullWidth>
            <span className="icon">
              <i className="fab fa-facebook"></i>
            </span>
            <span className="ms-2"> Facebook</span>
          </Button>
        </Box>
        <Link to='/home' style={{ marginTop: 4, width: 'fit-content' }}>Trở về trang chủ</Link>
      </Box>
    </Box>
  );
}

export default AuthLogin;
