import React, {useContext, useState} from "react";
import {
    Box,
    Typography,
    Button,
    TextField,
    Divider,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
} from "@mui/material";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import axios from "axios";
import {toast} from "react-toastify";
import {Link, useNavigate} from "react-router-dom";
import {differenceInYears} from "date-fns";
import Loading from "../Loading/Loading";
import {ApiContext} from "../ApiContext/ApiProvider";

const schema = yup.object({
    fullName: yup
        .string()
        .min(2, "Tên phải tối thiểu 2 kí tự")
        .required("Tên không được để trống"),
    email: yup
        .string()
        .email("Email phải đứng định dạng")
        .required("Email không được để trống"),
    phone: yup
        .string()
        .min(10, "Số điện thoại tối thiểu phải 10 số")
        .required("Số điện thoại không được để trống"),
    address: yup.string()
        .required("Địa chỉ không được để trống")
        .min(5, 'Địa chỉ phải trên 5 ký tự')
        .max(100, 'Địa chỉ phải ít hơn 100 ký tự'),
    gender: yup.string().required("Giới tính không được để trống"),
    password: yup.string().required("Mật khẩu không được để trống"),
    dob: yup.string()
        .required("Ngày sinh không được để trống")
        .test("dob", "Bạn phải lớn hơn 15 tuổi", function (value) {
            return differenceInYears(new Date(), new Date(value)) >= 15;
        })
        .test("dob", "Tuổi không hợp lệ", function (value) {
            return differenceInYears(new Date(), new Date(value)) <= 120;
        }),
});

function AuthRegister() {
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {API} = useContext(ApiContext)
    const onSubmit = async (data) => {
        setLoading(true)
        try {
            await axios.post(`${API}/api/user`, data);
            toast.success("Đăng kí thành công");
            setLoading(false)
            reset();
            navigate(`/login`);
        } catch (error) {
            toast.error("Đăng kí thất bại, vui lòng kiểm tra thông tin");
            setLoading(false)
            console.error(error);
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
                        maxWidth: "500px",
                        marginTop: "20px",
                        borderRadius: "8px",
                        border: "1px solid rgba(0, 0, 0, 0.125)",
                        boxShadow: "0 0 0.25rem rgba(0, 0, 0, 0.075)",
                        padding: "20px",
                        backgroundColor: "rgba(245, 246, 250, 0.8)",
                        marginLeft: "10px",
                    }}
                >
                    <Box sx={{display: "flex", justifyContent: "space-between"}}>
                        <Typography variant="h5">Đăng kí</Typography>
                        <Link to="/login" style={{textDecoration: "none"}}>
                            Bạn đã có tài khoản ?
                        </Link>
                    </Box>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box
                            sx={{display: "flex", flexDirection: "column", marginTop: "25px"}}
                        >
                            <TextField
                                id="outlined-basic"
                                {...register("fullName")}
                                name={"fullName"}
                                label="Full Name"
                                type="text"
                                variant="outlined"
                                error={!!errors.fullName}
                                helperText={errors.fullName?.message}
                            />
                        </Box>
                        <Box
                            sx={{display: "flex", flexDirection: "column", marginTop: "25px"}}
                        >
                            <TextField
                                id="outlined-basic"
                                label="Email"
                                {...register("email")}
                                name={"email"}
                                type="email"
                                variant="outlined"
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Box>
                        <Box
                            sx={{display: "flex", flexDirection: "column", marginTop: "25px"}}
                        >
                            <TextField
                                id="outlined-basic"
                                label="Phone"
                                {...register("phone")}
                                name={"phone"}
                                type="tel"
                                variant="outlined"
                                error={!!errors.phone}
                                helperText={errors.phone?.message}
                            />
                        </Box>
                        <Box
                            sx={{display: "flex", flexDirection: "column", marginTop: "25px"}}
                        >
                            <TextField
                                id="outlined-basic"
                                label="Address"
                                {...register("address")}
                                name={"address"}
                                type="text"
                                variant="outlined"
                                error={!!errors.address}
                                helperText={errors.address?.message}
                            />
                        </Box>
                        <Box
                            sx={{display: "flex", marginTop: "25px", alignItems: "center"}}
                        >
                            <Box>
                                <TextField
                                    id="outlined-basic"
                                    {...register("dob")}
                                    name={"dob"}
                                    label="Date of Birth"
                                    sx={{width: "220px", marginRight: "16px"}}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    type="date"
                                    variant="outlined"
                                    error={!!errors.dob}
                                    helperText={errors.dob?.message}
                                />
                            </Box>
                            <Box>
                                <FormControl sx={{width: "220px"}}>
                                    <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                    <Select
                                        {...register("gender")}
                                        name={"gender"}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Gender"
                                        error={!!errors.gender}
                                    >
                                        <MenuItem value="MALE">Nam</MenuItem>
                                        <MenuItem value="FEMALE">Nữ</MenuItem>
                                        <MenuItem value="OTHER">Khác</MenuItem>
                                    </Select>
                                    {errors.gender && (
                                        <FormHelperText error>{errors.gender.message}</FormHelperText>
                                    )}
                                </FormControl>
                            </Box>
                        </Box>
                        <Box
                            sx={{display: "flex", flexDirection: "column", marginTop: "25px"}}
                        >
                            <TextField
                                id="outlined-basic"
                                {...register("password")}
                                name={"password"}
                                label="PassWord"
                                type="password"
                                variant="outlined"
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                marginTop: "16px",
                                justifyContent: "space-between",
                            }}
                        >
                            <Box sx={{display: "flex", alignItems: "center"}}>
                                <Typography variant="body2" sx={{marginLeft: "8px"}}>
                                    Bằng cách đăng ký, bạn đồng ý với Điều khoản dịch vụ và Chính
                                    sách quyền riêng tư của chúng tôi
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{marginTop: "16px"}}>
                            <Button type={"submit"} variant="contained" fullWidth>
                                Đăng kí
                            </Button>
                        </Box>
                    </form>

                    <Box
                        sx={{display: "flex", justifyContent: "center", marginTop: "20px"}}
                    >
                        <Divider flexItem sx={{width: "30%"}}/>
                        <Typography variant="body2" sx={{px: "8px"}}>
                            Sign up with
                        </Typography>
                        <Divider flexItem sx={{width: "30%"}}/>
                    </Box>
                    <Box
                        sx={{display: "flex", justifyContent: "center", marginTop: "16px"}}
                    >
                        <Button variant="outlined" fullWidth sx={{marginRight: "8px"}}>
            <span className="icon">
              <i className="fab fa-google"></i>
            </span>
                            <span className="ms-2"> Google</span>
                        </Button>
                        <Button variant="outlined" fullWidth sx={{marginRight: "8px"}}>
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
                </Box>
            </Box>
        </>
    );
}

export default AuthRegister;
