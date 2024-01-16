import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import {
    Paper,
    TextField
} from "@mui/material";
import { useForm } from "react-hook-form";
import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ClinicEditor from './../CkEditor/ClinicEditor';

const schema = yup.object({
    clinicName: yup.string()
        .required("tên không được để trống")
        .min(2, 'Too short')
        .max(50, 'Too long'),
    address: yup.string()
        .required("tên không đuược để trống")
        .min(2, 'Too short')
        .max(50, 'Too long'),
    clinicInfo: yup.string()
        .required("tên không đuược để trống")
        .min(2, 'Too short')
        .max(50, 'Too long'),
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

export default function DoctorPageCreate({ setShow, setISupdate, setShowContent, setShowCreate, setShowPage }) {

    const resetModal = () => {
        setShow(false)
        setShowContent(true)
        setShowCreate(true)
        setShowPage(true)
    }

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(schema) });

    const createClinic = async (data) => {
        try {
            let imagesImport = Array.from(data.clinicLogo);
            const formData = new FormData();
            formData.append('image', imagesImport[0])
            const res = await axios.post('http://localhost:8080/api/avatar', formData)
            data.clinicLogo = await res.data.fileUrl

            await axios.post('http://localhost:8080/api/clinic', data);
            toast.success("Tạo phòng khám thành công!")
            reset();
            setShowContent(true)
            setShowCreate(true)
            setShow(false);
            setShowPage(true)
            setISupdate(pre => !pre);

        } catch (error) {
            toast.error("Tạo phòng khám thất bại!")
        }
    }

    return (
        <>
            <Container>
                <Typography variant="h5" fontWeight={"bold"} component="h2" mt={2}>
                    TẠO PHÒNG KHÁM
                </Typography>
                <Box component="form" onSubmit={handleSubmit(createClinic)} sx={{ width: '100%' }} mt={3}>
                    <Grid container spacing={2}>
                        <Grid item xs={4} >
                            <Item>
                                <Button component="label" sx={{ borderRadius: 50 }}>
                                    <img id={"blah"} style={{ borderRadius: 100 }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Circle-icons-upload.svg/1200px-Circle-icons-upload.svg.png" width={200} height={200}
                                        alt={"avatar"} />
                                    <VisuallyHiddenInput  {...register("clinicLogo")} type="file" onChange={(event) => {
                                        if (event.target.files && event.target.files[0]) {
                                            document.getElementById("blah").src = window.URL.createObjectURL(
                                                event.target.files[0]
                                            );
                                        }
                                    }} />
                                </Button>
                                <Typography variant="p" fontWeight={"bold"} component="p" mt={2}>
                                    Tải ảnh phòng khám tại đây
                                </Typography>
                                {/* <Typography fontSize={12} fontStyle={"italic"} mb={5}>
                                    Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3MB
                                </Typography> */}
                            </Item>
                        </Grid>
                        <Grid item xs={8}>
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
                                                autoFocus
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
                                        <Grid item xs={12} sm={12}>
                                            {/* <TextField
                                                fullWidth
                                                id="information"
                                                label="Thông tin phòng khám"
                                                type={"text"}
                                                autoComplete="information"
                                                error={Boolean(errors.clinicInfo)}
                                                helperText={errors.clinicInfo?.message || ''}
                                                {...register("clinicInfo")}
                                            /> */}
                                            <ClinicEditor />
                                        </Grid>

                                        <Grid item container xs={12} sm={6} justifyContent="flex-end" >
                                            <Button variant="secondary" onClick={resetModal}
                                                sx={{ mt: 3, mb: 1 }}>
                                                Close
                                            </Button>
                                            <Button
                                                variant="primary"
                                                type={"submit"}
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
