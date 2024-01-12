import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {styled} from '@mui/material/styles';
import Button from '@mui/material/Button';
import {
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField
} from "@mui/material";
import {useForm} from "react-hook-form";
import React, {useEffect} from "react";
import axios from "axios";
import {toast} from "react-toastify";


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
const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
export default function DoctorPageCreate({setShow, setISupdate, clinicId}) {


    const resetModal = () =>{
        setShow(false)
    }



    useEffect(() => {
        if(clinicId){
            const getClinic = async () => {

                const res = await axios.get(`http://localhost:8080/api/clinic/${clinicId}`);
                const result = await res.data;
                setValue("clinicName", result.clinicName)
                setValue("address", result.address)
                setValue("clinicInfor", result.clinicInfor)
            }
            getClinic();
        }
    },[clinicId]);


    const updateClinic = async () => {
        try {

        }catch (error){

        }
    }

    const { register, handleSubmit, watch, formState: { errors }, reset, setValue } = useForm();

    return (
        <>
            <Container>
                <Typography variant="h5" fontWeight={"bold"} component="h2" mt={2}>
                    Update Clinic
                </Typography>
                <Box component="form" onSubmit={handleSubmit(updateClinic)} sx={{width: '100%'}} mt={3}>
                    <Grid container spacing={2}>
                        <Grid item xs={4} >
                            <Item>
                                <Button component="label"  sx={{borderRadius: 50}}>
                                    <img id={"blah"}  style={{borderRadius: 100}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Circle-icons-upload.svg/1200px-Circle-icons-upload.svg.png" width={200} height={200}
                                         alt={"avatar"}/>
                                    <VisuallyHiddenInput  {...register("avatar")} type="file" onChange={(event) => {
                                        document.getElementById('blah').src = window.URL.createObjectURL(event.target.files[0])}}/>
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
                                <Box  sx={{ mt: 3 }}>
                                    <Grid container spacing={2} >
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                autoComplete="clinicName"
                                                fullWidth
                                                id="clinicName"
                                                label="Clinic Name"
                                                type={"text"}
                                                autoFocus
                                                {...register("clinicName")}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                autoComplete="address"
                                                fullWidth
                                                id="address"
                                                type={"text"}
                                                label="Address"
                                                {...register("address")}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                id="information"
                                                label="Information"
                                                type={"text"}
                                                autoComplete="information"
                                                {...register("clinicInfor")}
                                            />
                                        </Grid>

                                        <Grid item container xs={12} sm={6} justifyContent="flex-end" >
                                            <Button variant="secondary" onClick={resetModal}
                                                    sx={{ mt: 3, mb: 1}}>
                                                Close
                                            </Button>
                                            <Button
                                                variant="primary"
                                                type={"submit"}
                                                sx={{ mt: 3, mb: 1}}
                                            >
                                                Update
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
