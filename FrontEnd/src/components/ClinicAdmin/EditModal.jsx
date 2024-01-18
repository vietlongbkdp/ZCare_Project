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
import React, { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ClinicEditor from "../CkEditor/ClinicEditor";
const schema = yup.object({
    clinicName: yup.string()
        .required("tên không được để trống")
        .min(2, 'Too short')
        .max(50, 'Too long'),
    address: yup.string()
        .required("tên không đuược để trống")
        .min(2, 'Too short')
        .max(50, 'Too long'),
    legalRepresentative: yup.string()
        .required("Tên người đại diện không đuược để trống")
        .min(2, 'Too short')
        .max(50, 'Too long'),
    hotline: yup.string()
        .required("Số điện thoại không được để trống")
        .matches(/^(02|03|07|09)\d{8}$/, "Số điện thoại bắt đầu bằng 02;03;07;09 và gồm 10 chữ số"),
    operatingLicence: yup.string()
        .required("GPHĐ không đuược để trống")
        .min(5, 'Quá ngắn')
        .max(30, 'Quá dài')
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
export default function DoctorPageCreate({ setShow, setISupdate, clinicId, setShowContent, setShowCreate, setShowPage }) {
    const { register, handleSubmit, formState: { errors }, reset, setValue, getValues } = useForm({ resolver: yupResolver(schema) });
    let updateAvatar;
    let presentAvatar;
    const resetModal = () => {
        setShow(false)
        setShowContent(true)
        setShowCreate(true)
        setShowPage(true)
    }

    useEffect(() => {
        if (clinicId) {
            const getClinic = async () => {
                const res = await axios.get(`http://localhost:8080/api/clinic/${clinicId}`);
                const result = await res.data;
                setValue("clinicName", result.clinicName)
                setValue("legalRepresentative", result.legalRepresentative)
                setValue("hotline", result.hotline)
                setValue("operatingLicence", result.operatingLicence)
                setValue("address", result.address)
                setValue("clinicInfo", result.clinicInfo)
                presentAvatar = result.clinicLogo;
                updateAvatar = result.clinicLogo;
                console.log(presentAvatar);
                document.getElementById('blah').src = presentAvatar;
            }
            getClinic();
        }
    }, [clinicId]);


    const updateClinic = async (data) => {
        if (presentAvatar === updateAvatar) {
            data.clinicLogo = presentAvatar;
            console.log("presentAvatar", presentAvatar);
        } else {
            data.clinicLogo = updateAvatar;
        }
        try {
            await axios.patch(`http://localhost:8080/api/clinic/${clinicId}`, data);
            toast.success("Cập nhật phòng khám thành công!")
            reset();
            setShowContent(true)
            setShowCreate(true)
            setShow(false)
            setShowPage(true)
            setISupdate(prev => !prev);
        } catch (error) {
            toast.error("Cập nhật phòng khám thất bại!")
        }
    };

    const handleUpload = async (e) => {
        let imagesImport = Array.from(e.target.files);

        const formData = new FormData();
        formData.append('image', imagesImport[0])
        const res = await axios.post('http://localhost:8080/api/avatar', formData)
        updateAvatar = await res.data.fileUrl
        document.getElementById('blah').src = updateAvatar;
    }

    return (
        <>
            <Container>
                <Typography variant="h5" fontWeight={"bold"} component="h2" mt={2}>
                    Cập nhật phòng khám
                </Typography>
                <Box component="form" onSubmit={handleSubmit(updateClinic)} sx={{ width: '100%' }} mt={3}>
                    <Grid container spacing={2}>
                        <Grid item xs={3} >
                            <Item>
                                <Button component="label" sx={{ borderRadius: 50 }}>
                                    <img id={"blah"} style={{ borderRadius: 100 }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Circle-icons-upload.svg/1200px-Circle-icons-upload.svg.png" width={170} height={170}
                                        alt={"avatar"} />
                                    <VisuallyHiddenInput  {...register("clinicLogo")} type="file" onChange={(event) => {
                                        handleUpload(event)
                                    }} />
                                </Button>
                                <Typography variant="p" fontWeight={"bold"} component="p" mt={2}>
                                    Tải ảnh phòng khám tại đây
                                </Typography>
                                <Typography fontSize={12} fontStyle={"italic"} mt={2}>
                                    Chỉ cho phép các định dạng *.jpeg, *.jpg, *.png, *.gif kích thước tối đa 1MB
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={9}>
                            <Item >
                                <Box sx={{ mt: 3 }}>
                                    <Grid container spacing={2} >
                                        <Grid item xs={12} sm={6}>
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
                                        <Grid item xs={12} sm={6}>
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
                                        <Grid item xs={12} sm={6}>
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
                                        <Grid item xs={12} sm={6}>
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
                                        <Grid item xs={12} sm={6}>
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
                                        <Grid item xs={12} sm={12}>
                                            <ClinicEditor {...register("clinicInfo")} setValue={setValue} getValues={getValues} />
                                        </Grid>

                                        <Grid item container xs={12} sm={6} >
                                            <Button
                                                 variant="contained"
                                                color="success"
                                                type={"submit"}
                                                sx={{ mt: 3, mb: 1, mr: 1 }}
                                            >
                                                Cập nhật
                                            </Button>
                                            <Button  variant="contained" onClick={resetModal}
                                                sx={{ mt: 3, mb: 1 }}>
                                                Hủy
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
