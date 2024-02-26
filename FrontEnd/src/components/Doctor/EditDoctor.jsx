import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import {
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField
} from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import React, {useContext, useEffect, useState} from "react";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import DoctorEditor from "../CkEditor/DoctorEditor";
import Loading from "../Loading/Loading";
import {ApiContext} from "../ApiContext/ApiProvider";

const schema = yup.object().shape({
    doctorName: yup.string()
        .required("Tên không được để trống")
        .min(2, 'Tên tối thiểu 2 kí tự')
        .max(50, 'Tên tối đa 50 kí tự'),
    dob: yup.string()
        .required("Sinh nhật không được để trống"),
    email: yup.string()
        .required("Email không được để trống")
        .matches(/^.+@.+\..+$/, "Email không hợp lệ"),
    phone: yup.string()
        .required("Số điện thoại không được để trống")
        .matches(/^(02|03|07|09)\d{8}$/, "Số điện thoại bắt đầu bằng 02;03;07;09 và gồm 10 chữ số"),
    position: yup.string()
        .required("Chức danh không được để trống"),
    fee: yup.number()
        .required("Giá khám không được để trống")
        .typeError('Giá khám không được để trống'),
    speciality: yup.string()
        .required("Chuyên khoa không được để trống"),
    // avatarImg: yup.mixed().test("file", "Ảnh đại diện không được để trống", (value) => {
    //     if (value.length > 0) {
    //         return true;
    //     }
    //     return false;
    // }),
})

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
    color: theme.palette.text.secondary,
    boxShadow: 'none'
}));

const StyledErrorText = styled('p')({
    color: '#d32f2f',
    fontSize: '14px',
    marginTop: '8px',
});

let updateAvatar;
let presentAvatar;

export default function EditDoctor({ doctorId, setShowEdit, handleShowDoctorInClinic, setUpdateShow }) {
    const { API } = useContext(ApiContext)
    const [positionList, setPositionList] = useState([])
    const [specialityList, setSpecialityList] = useState([]);
    const [clinicId, setClinicId] = useState(0);
    const [position, setPosition] = useState(0);
    const [speciality, setSpeciality] = useState(0);
    const [loading, setLoading] = useState(true);
    const { register, handleSubmit, formState: { errors }, reset, setValue,getValues } = useForm(
        {
            resolver: yupResolver(schema)
        }
    );
    const handleUpdateDoctor = async (data) => {
        setLoading(true)
        if (presentAvatar === updateAvatar) {
            data.avatarImg = presentAvatar;
        } else {
            data.avatarImg = updateAvatar;
        }
        try {
            data.clinicId = clinicId;
            console.log(data)
            await axios.put(`${API}/api/doctor/update/${doctorId}`, data);
            toast.success("Cập nhật bác sĩ thành công")
            setLoading(false)
            reset();
            setShowEdit(false)
            handleShowDoctorInClinic()
            setUpdateShow(pre => !pre);
        } catch (error) {
            toast.error("Cập nhật bác sĩ thất bại")
            setLoading(false)
        }
    };
    console.log(presentAvatar);

    useEffect(() => {
        if (doctorId) {
            const getDoctor = async () => {
                const res = await axios.get(`${API}/api/doctor/${doctorId}`);
                const result = await res.data;
                setClinicId(result.clinic.id)
                setPosition(result.position.id)
                setSpeciality(result.speciality.id)

                const [year, month, day] = result.dob;
                const dob = new Date(year, month - 1, day);
                setValue("doctorName", result.doctorName)
                setValue("position", result.position.id)
                setValue("dob", dob.toISOString().split('T')[0])
                setValue("email", result.email)
                setValue("phone", result.phone)
                setValue("doctorInfo", result.doctorInfo)
                setValue("speciality", result.speciality.id)
                setValue("fee", result.fee)
                presentAvatar = result.avatarImg;
                updateAvatar = result.avatarImg;
                document.getElementById('blah').src = presentAvatar;
                setLoading(false)
            }
            getDoctor();
        }
    }, []);

    useEffect(() => {
        const getPositions = async () => {
            try {
                const response = await axios.get(`${API}/api/position`);
                setPositionList(response.data);
                setLoading(false)
            } catch (error) {
                console.error(error);
                setLoading(false)
            }
        }
        getPositions();
    }, [])

    useEffect(() => {
        const getSpeciality = async () => {
            try {
                const response = await axios.get(`${API}/api/speciality`);
                setSpecialityList(response.data);
                setLoading(false)
            } catch (error) {
                console.error(error);
                setLoading(false)
            }
        }
        getSpeciality();
    }, [])

    const closeEditModal = () => {
        setShowEdit(false)
        handleShowDoctorInClinic()
    }

    const handleUpload = async (e) => {
        let imagesImport = Array.from(e.target.files);
        const formData = new FormData();
        formData.append('image', imagesImport[0])
        const res = await axios.post(`${API}/api/avatar`, formData)
        updateAvatar = await res.data.fileUrl
        document.getElementById('blah').src = updateAvatar;
    }

    return (
        <>
            {loading && <Loading/>}
            <Container sx={{ backgroundColor: 'white', paddingY: '15px', borderRadius: '10px' }}>
                <Typography variant="h5" fontWeight={"bold"} component="h2" mt={2}>
                    Cập nhật bác sĩ
                </Typography>
                <Box component="form" onSubmit={handleSubmit(handleUpdateDoctor)} sx={{ width: '100%' }} mt={3}>
                    <Grid container spacing={2}>
                        <Grid item xs={3} >
                            <Item sx={{ textAlign: 'center' }}>
                                <Button component="label" sx={{ textAlign: 'center' }}>
                                    <img id={"blah"} style={{ borderRadius: 100 }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Circle-icons-upload.svg/1200px-Circle-icons-upload.svg.png" width={170} height={170}
                                        alt={"avatar"} />
                                    <VisuallyHiddenInput  {...register("avatarImg")} type="file" onChange={(event) => {
                                        handleUpload(event)
                                    }} />
                                </Button>
                                {errors?.avatarImg && <StyledErrorText>{errors?.avatarImg?.message}</StyledErrorText>}
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
                                <Box>
                                    <Grid container spacing={2} >
                                        <Grid item xs={12} sm={6} mb={1}>
                                            <TextField
                                                autoComplete="given-name"
                                                fullWidth
                                                id="doctorName"
                                                label="Họ và tên"
                                                InputLabelProps={{ shrink: true }}
                                                error={Boolean(errors.doctorName)}
                                                helperText={errors.doctorName?.message || ''}
                                                {...register("doctorName")}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} mb={1}>
                                            <TextField
                                                autoComplete="dob"
                                                fullWidth
                                                id="dob"
                                                type={"date"}
                                                label="Ngày sinh"
                                                InputLabelProps={{ shrink: true }}
                                                error={Boolean(errors.dob)}
                                                helperText={errors.dob?.message || ''}
                                                {...register("dob")}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} mb={1}>
                                            <TextField
                                                autoComplete="email"
                                                fullWidth
                                                id="email"
                                                label="Email"
                                                InputLabelProps={{ shrink: true }}
                                                error={Boolean(errors.email)}
                                                helperText={errors.email?.message || ''}
                                                {...register("email")}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} mb={1}>
                                            <TextField
                                                fullWidth
                                                id="phone"
                                                label="Số điện thoại"
                                                autoComplete="phone"
                                                InputLabelProps={{ shrink: true }}
                                                error={Boolean(errors.phone)}
                                                helperText={errors.phone?.message || ''}
                                                {...register("phone")}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} mb={1}>
                                            <FormControl fullWidth>
                                                <InputLabel id="specialityLabel">Chuyên khoa</InputLabel>
                                                <Select
                                                    labelId="specialityLabel"
                                                    id="speciality"
                                                    value={speciality}
                                                    label="Chuyên khoa"
                                                    InputLabelProps={{ shrink: true }}
                                                    error={Boolean(errors.speciality)}
                                                    helperText={errors.speciality?.message || ''}
                                                    {...register("speciality")}
                                                    onChange={(event) => {
                                                        setSpeciality(event.target.value);
                                                        setValue("speciality", event.target.value);
                                                    }}
                                                >
                                                    {specialityList.map((item) => (
                                                        <MenuItem key={item.id} value={item.id}>{item.specialtyName}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6} mb={1}>
                                            <FormControl fullWidth>
                                                <InputLabel id="positionLabel">Chức danh</InputLabel>
                                                <Select
                                                    labelId="positionLabel"
                                                    id="position"
                                                    value={position}
                                                    label="Chức danh"
                                                    InputLabelProps={{ shrink: true }}
                                                    error={Boolean(errors.position)}
                                                    helperText={errors.position?.message || ''}
                                                    {...register("position")}
                                                    onChange={(event) => {
                                                        setPosition(event.target.value);
                                                        setValue("position", event.target.value);
                                                    }}
                                                >
                                                    {positionList.map((item) => (
                                                        <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6} mb={1}>
                                            <TextField
                                                fullWidth
                                                id="fee"
                                                label="Giá khám"
                                                type={"number"}
                                                autoComplete="fee"
                                                InputLabelProps={{ shrink: true }}
                                                error={Boolean(errors.fee)}
                                                helperText={errors.fee?.message || ''}
                                                {...register("fee")}
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <DoctorEditor {...register("doctorInfo")} setValue={setValue} getValues={getValues} />
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} sm={6} >
                        <Button
                            variant="contained"
                            color="success"
                            type="submit"
                            sx={{ mt: 3, mb: 1, mr: 1 }}
                        >
                            Cập nhật
                        </Button>
                        <Button variant="contained" onClick={closeEditModal}
                            sx={{ mt: 3, mb: 1 }}>
                            Hủy
                        </Button>
                    </Grid>
                </Box>
            </Container>
        </>
    )
}
