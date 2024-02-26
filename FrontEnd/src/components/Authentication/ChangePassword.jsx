import React, {useContext, useState} from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useParams} from "react-router-dom";
import Loading from "../Loading/Loading";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import {ApiContext} from "../ApiContext/ApiProvider";

const schema = yup.object({
  password: yup.string().required("không được để trống"),
  newPassword: yup.string().required("không được để trống"),
});
export default function ChangePassword() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const password = watch("password");
  const newPassword = watch("newPassword");
  const { API } = useContext(ApiContext)
    const [loading, setLoading] = useState(false);
  const isPasswordMatch = password === newPassword;

  const handleNewPasswordChange = (e) => {
    const fieldName = e.target.name;
    setValue(fieldName, e.target.value, { shouldValidate: true });
  };

  const { userId } = useParams();

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const requestData = {
        ...data,
        userId: userId,
      };
      const responses = await axios.post(
        `${API}/api/user/change-password`,
        requestData
      );
        setLoading(false)
      toast.success("Đổi mật khẩu thành công");
       const object={
         email:responses.data.email,
         password:data.password
       };
      const response = await axios.post(`${API}/api/user/login`, object);
      console.log(response)
      Cookies.set('userId', userId, { expires: 7, secure: false });
      const storedUserId = Cookies.get('userId');
      console.log(storedUserId)
      const token = response.data.token;
      Cookies.set('JWT', token, { expires: 7, secure: false });
      toast.success("Đăng nhập thành công");
      const decodedToken = jwtDecode(token);

      const userRole = decodedToken.roles[0];
      console.log(userRole)
      if (userRole === "ROLE_ADMIN") {
        window.location.href = "/admin";
      } else if (userRole === "ROLE_CUSTOMER") {
        const currentPath = window.location.pathname;
        console.log(currentPath)
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
    } catch (error) {
      toast.error("Đổi mật khẩu thất bại.");
        setLoading(false)
    }
  };

  return (
      <>
      {loading && <Loading/>}
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
          <Typography variant="h5">Đổi mật khẩu</Typography>
          {/* <Link to="/register" style={{ textDecoration: 'none' }}>
            Bạn chưa có tài khoản?
            </Link> */}
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginTop: "25px" }}
          >
            <TextField
              label="Nhập mật khẩu mới"
              {...register("password")}
              name="password"
              error={!!errors.password}
              helperText={errors.password?.message}
              type="password"
              variant="outlined"
            />
          </Box>

          <Box
            sx={{ display: "flex", flexDirection: "column", marginTop: "25px" }}
          >
            <TextField
              {...register("newPassword")}
              name="newPassword"
              label="Xác nhận mật khẩu"
              type="password"
              variant="outlined"
              error={
                !!errors.newPassword || (!!newPassword && !isPasswordMatch)
              }
              helperText={
                errors.newPassword?.message ||
                (!!newPassword && !isPasswordMatch && "Mật khẩu không khớp")
              }
              onChange={handleNewPasswordChange}
            />
          </Box>
          <Box sx={{ marginTop: "16px" }}>
            <Button type="submit" variant="contained" fullWidth>
              Gửi xác nhận
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
      </>
  );
}
