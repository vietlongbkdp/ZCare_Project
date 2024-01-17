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
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

const schema = yup.object({
    doctorName: yup.string()
        .required("tên không được để trống")
        .min(2, 'Too short')
        .max(50, 'Too long'),
    dob: yup.string()
        .required("sinh nhật không được để trống"),
    email: yup.string()
        .required("Email không được để trống")
        .matches(/^.+@.+\..+$/, "Email không hợp lệ"),
    phone: yup.string()
        .required("Số điện thoại không được để trống")
        .matches(/^(02|03|07|09)\d{8}$/, "Số điện thoại bắt đầu bằng 02;03;07;09 và gồm 10 chữ số"),
    clinic: yup.string()
        .required(" địa chỉ không được để trống"),
    position: yup.string()
        .required(" không được để trống"),
    fee: yup.number()
        .required(" không được để trống"),
    speciality: yup.string()
        .required(" không được để trống")
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
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
export default function DoctorPageCreate({ setShowAdd, setUpdateShow, setButtonCreate, setShowTable, setShowPage }) {
    const [clinicList, setClinicList] = useState([]);
    const [positionList, setPositionList] = useState([])
    const [specialityList, setSpecialityList] = useState([]);

    const { register, handleSubmit, formState: { errors }, reset } = useForm(
        {
            resolver: yupResolver(schema)
        }
    );

    const createDoctor = async (data) => {
        data.avatarImg = 'null'
        console.log(data)
        try {
            await axios.post('http://localhost:8080/api/doctor', data);
            setShowAdd(false)
            toast.success("thành công")
            setUpdateShow(pre => !pre);
            reset();
            setButtonCreate(true)
            setShowTable(true)
            setShowPage(true)

        } catch (error) {
            toast.error("thất bại")
        }

    }

    useEffect(() => {
        const getClinics = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/clinic');
                setClinicList(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        getClinics();
    }, []);

    useEffect(() => {
        const getPositions = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/position');
                setPositionList(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        getPositions();
    }, [])

    useEffect(() => {
        const getSpeciality = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/speciality');
                setSpecialityList(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        getSpeciality();
    }, [])

    const closeAddModal = () => {
        setShowAdd(false)
        setButtonCreate(true)
        setShowTable(true)
        setShowPage(true)

    }
    return (
        <>
            <Container>
                <Typography variant="h5" fontWeight={"bold"} component="h2" mt={2}>
                    Create a new doctor
                </Typography>
                <Box component="form" onSubmit={handleSubmit(createDoctor)} sx={{ width: '100%' }} mt={3}>
                    <Grid container spacing={2}>
                        <Grid item xs={4} >
                            <Item>
                                <Button component="label" sx={{ borderRadius: 50 }}>
                                    <img id={"blah"} style={{ borderRadius: 100 }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Circle-icons-upload.svg/1200px-Circle-icons-upload.svg.png" width={200} height={200}
                                        alt={"avatar"} />
                                    <VisuallyHiddenInput  {...register("avatarImg")} type="file" onChange={(event) => {
                                        document.getElementById('blah').src = window.URL.createObjectURL(event.target.files[0])
                                    }} />
                                </Button>
                                <Typography variant="p" fontWeight={"bold"} component="p" mt={2}>
                                    Upload your Avatar
                                </Typography>
                                <Typography fontSize={12} fontStyle={"italic"} mb={5}>
                                    Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3MB
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={8}>
                            <Item >
                                <Box sx={{ mt: 3 }}>
                                    <Grid container spacing={2} >
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                autoComplete="given-name"
                                                fullWidth
                                                id="doctorName"
                                                label="Full Name"
                                                error={Boolean(errors.doctorName)}
                                                helperText={errors.doctorName?.message || ''}
                                                {...register("doctorName")}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                autoComplete="dob"
                                                fullWidth
                                                id="dob"
                                                type={"date"}
                                                label="dob"
                                                error={Boolean(errors.dob)}
                                                helperText={errors.dob?.message || ''}
                                                {...register("dob")}
                                            />
                                            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer components={['DatePicker']} sx={{ paddingTop: 0, overflow:'none'}}>
                                                    <DatePicker
                                                        sx={{width: '100%'}}
                                                        error={Boolean(errors.dob)}
                                                        helperText={errors.dob?.message || ''}
                                                        {...register("dob")}
                                                        label="Date Of Birth" />
                                                </DemoContainer>
                                            </LocalizationProvider> */}
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
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
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                id="phone"
                                                label="Phone"
                                                autoComplete="phone"
                                                error={Boolean(errors.phone)}
                                                helperText={errors.phone?.message || ''}
                                                {...register("phone")}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl fullWidth>
                                                <InputLabel id="clinicLabel">Clinic</InputLabel>
                                                <Select
                                                    labelId="clinicLabel"
                                                    id="clinic"
                                                    // value={0}
                                                    label="Clinic"
                                                    error={Boolean(errors.clinic)}
                                                    helperText={errors.clinic?.message || ''}
                                                    {...register("clinic")}
                                                // onChange={handleChange}
                                                >
                                                    {clinicList.map((item) => (
                                                        <MenuItem value={item.id}>{item.clinicName}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl fullWidth>
                                                <InputLabel id="specialityLabel">Speciality</InputLabel>
                                                <Select
                                                    labelId="specialityLabel"
                                                    id="speciality"
                                                    label="Speciality"
                                                    error={Boolean(errors.speciality)}
                                                    helperText={errors.speciality?.message || ''}
                                                    {...register("speciality")}
                                                >
                                                    {specialityList.map((item) => (
                                                        <MenuItem value={item.id}>{item.specialtyName}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl fullWidth>
                                                <InputLabel id="positionLabel">Position</InputLabel>
                                                <Select
                                                    labelId="positionLabel"
                                                    id="position"
                                                    // value={0}
                                                    label="Position"
                                                    error={Boolean(errors.position)}
                                                    helperText={errors.position?.message || ''}
                                                    {...register("position")}
                                                // onChange={handleChange}
                                                >
                                                    {positionList.map((item) => (
                                                        <MenuItem value={item.id}>{item.name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                id="fee"
                                                label="Fee"
                                                type={"number"}
                                                autoComplete="fee"
                                                error={Boolean(errors.fee)}
                                                helperText={errors.fee?.message || ''}
                                                {...register("fee")}
                                            />
                                        </Grid>
                                        <Grid item container xs={12} sm={6} justifyContent="flex-end" >
                                            <Button variant="secondary" onClick={closeAddModal}
                                                sx={{ mt: 3, mb: 1 }}>
                                                Close
                                            </Button>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                sx={{ mt: 3, mb: 1 }}
                                            >
                                                Create
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    )
}
