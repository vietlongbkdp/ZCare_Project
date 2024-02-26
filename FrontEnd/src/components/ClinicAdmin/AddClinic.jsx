import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Paper, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import React, {useContext, useState} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ClinicEditor from '../CkEditor/ClinicEditor';
import Loading from "../Loading/Loading";
import {ApiContext} from "../ApiContext/ApiProvider";

const schema = yup.object().shape({
    clinicName: yup.string()
        .required("Tên không được để trống")
        .min(2, 'Nhập trên 2 kí tự')
        .max(200, 'Nhập dưới 200 kí tự'),
    address: yup.string()
        .required("Địa chỉ không đuược để trống")
        .min(2, 'Nhập trên 2 kí tự')
        .max(200, 'Nhập dưới 200 kí tự'),
    legalRepresentative: yup.string()
        .required("Tên người đại diện không đuược để trống")
        .min(2, 'Nhập trên 2 kí tự')
        .max(200, 'Nhập dưới 200 kí tự'),
    email: yup.string()
        .required("Email không được để trống")
        .matches(/^.+@.+\..+$/, "Email không hợp lệ"),
    hotline: yup.string()
        .required("Số điện thoại không được để trống")
        .matches(/^(02|03|07|09)\d{8}$/, "Số điện thoại bắt đầu bằng 02;03;07;09 và gồm 10 chữ số"),
    operatingLicence: yup.string()
        .required("GPHĐ không đuược để trống")
        .min(5, 'Nhập trên 5 kí tự')
        .max(30, 'Nhập dưới 30 kí tự'),
    clinicLogo: yup.mixed().test("file", "Logo không được để trống", (value) => {
        if (value.length > 0) {
            return true;
        }
        return false;
    }),
})

const StyledErrorText = styled('p')({
    color: '#d32f2f',
    fontSize: '14px',
    marginTop: '8px',
});

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: 'none'
}));

export default function AddClinic({ setShow, setISupdate, setShowContent, setShowCreateBtn, setShowPagination }) {

    const resetModal = () => {
        setShow(false)
        setShowContent(true)
        setShowCreateBtn(true)
        setShowPagination(true)
    }

    const { register, handleSubmit, formState: { errors }, reset, setValue, getValues } = useForm(
        { resolver: yupResolver(schema) }
    );
    const [loading, setLoading] = useState(false);
    const { API } = useContext(ApiContext)
    const createClinic = async (data) => {
        setLoading(true)
        console.log('data', data);
        let imagesImport = Array.from(data.clinicLogo);
        const formData = new FormData();
        formData.append('image', imagesImport[0])
        const res = await axios.post(`${API}/api/avatar`, formData)
        if (res.status == '200') {
            data.clinicLogo = await res.data.fileUrl
            const response = await axios.post(`${API}/api/clinic`, data);
            console.log(response);
            if (response.status == '200') {
                toast.success("Tạo phòng khám thành công!")
                setLoading(false);
                reset();
                setShowContent(true)
                setShowCreateBtn(true)
                setShow(false);
                setShowPagination(true)
                setISupdate(pre => !pre);
            }
            else {
                await axios.delete(`${API}/api/avatar/${res.data.id}`)
                toast.error("Tạo phòng khám thất bại!")
                setLoading(false);
            }
        }
        else {
            toast.error("Tải logo thất bại!")
            setLoading(false);
        }
    }

    return (
        <>
            {loading && <Loading/>}
            <Container sx={{ backgroundColor: 'white', paddingY: '15px', borderRadius: '10px' }}>
                <Typography variant="h5" fontWeight={"bold"} textAlign='center' component="h2">
                    TẠO PHÒNG KHÁM
                </Typography>
                <Box component="form" onSubmit={handleSubmit(createClinic)} sx={{ width: '100%' }} mt={1}>
                    <Grid container spacing={2}>
                        <Grid item xs={3} >
                            <Item>
                                <Button component="label" sx={{ textAlign: 'center' }}>
                                    <img id={"blah"} src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Circle-icons-upload.svg/1200px-Circle-icons-upload.svg.png" width={170} height={170}
                                        alt={"avatar"} />
                                    <VisuallyHiddenInput  {...register("clinicLogo")} type="file" onChange={(event) => {
                                        if (event.target.files && event.target.files[0]) {
                                            document.getElementById("blah").src = window.URL.createObjectURL(
                                                event.target.files[0]
                                            );
                                        }
                                    }} />
                                </Button>
                                {errors?.clinicLogo && <StyledErrorText>{errors?.clinicLogo?.message}</StyledErrorText>}
                                <Typography variant="p" fontWeight={"bold"} component="p" mt={1}>
                                    Tải ảnh phòng khám tại đây
                                </Typography>
                                <Typography fontSize={12} fontStyle={"italic"}>
                                    Chỉ cho phép các định dạng *.jpeg, *.jpg, *.png, *.gif kích thước tối đa 1MB
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={9}>
                            <Item >
                                <Box sx={{ mt: 3 }}>
                                    <Grid container spacing={2} >
                                        <Grid item xs={12} sm={6} mb={1}>
                                            <TextField
                                                autoComplete="clinicName"
                                                fullWidth
                                                id="clinicName"
                                                label="Tên phòng khám"
                                                type="text"
                                                error={Boolean(errors.clinicName)}
                                                helperText={errors.clinicName?.message || ''}
                                                {...register('clinicName')}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} mb={1}>
                                            <TextField
                                                autoComplete="address"
                                                fullWidth
                                                id="address"
                                                type={"text"}
                                                label="Địa chỉ"
                                                error={Boolean(errors.address)}
                                                helperText={errors.address?.message || ''}
                                                {...register("address")}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} mb={1}>
                                            <TextField
                                                autoComplete="legalRepresentative"
                                                fullWidth
                                                id="legalRepresentative"
                                                type={"text"}
                                                label="Người đại diện"
                                                error={Boolean(errors.legalRepresentative)}
                                                helperText={errors.legalRepresentative?.message || ''}
                                                {...register("legalRepresentative")}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} mb={1}>
                                            <TextField
                                                autoComplete="email"
                                                fullWidth
                                                id="email"
                                                label="Email"
                                                error={Boolean(errors.email)}
                                                helperText={errors.email?.message || ''}
                                                {...register("email")}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} mb={1}>
                                            <TextField
                                                autoComplete="hotline"
                                                fullWidth
                                                id="hotline"
                                                label="Hotline"
                                                type="tel"
                                                error={Boolean(errors.hotline)}
                                                helperText={errors.hotline?.message || ''}
                                                {...register("hotline")}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} mb={1}>
                                            <TextField
                                                autoComplete="operatingLicence"
                                                fullWidth
                                                id="operatingLicence"
                                                type={"text"}
                                                label="Giấy phép hoạt động"
                                                error={Boolean(errors.operatingLicence)}
                                                helperText={errors.operatingLicence?.message || ''}
                                                {...register("operatingLicence")}
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Item>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid item xs={12} sm={12}>
                                <ClinicEditor {...register("clinicInfo")} setValue={setValue} getValues={getValues} />
                            </Grid>

                            <Grid item container xs={12} sm={6} >
                                <Button
                                    variant="contained"
                                    color="success"
                                    type="submit"
                                    sx={{ mt: 3, mb: 1, mr: 1 }}
                                >
                                    Lưu
                                </Button>
                                <Button variant="contained" onClick={resetModal}
                                    sx={{ mt: 3, mb: 1 }}>
                                    Hủy
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    )
}
