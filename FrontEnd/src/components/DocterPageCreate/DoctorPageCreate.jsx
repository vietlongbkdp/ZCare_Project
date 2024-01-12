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
export default function DoctorPageCreate() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    return (
        <>
            <Container>
                <Typography variant="h5" fontWeight={"bold"} component="h2" mt={2}>
                    Create a new doctor
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{width: '100%'}} mt={3}>
                    <Grid container spacing={2}>
                        <Grid item xs={4} >
                            <Item>
                                <Button component="label" sx={{borderRadius: 50}}>
                                    <img id={"blah"} style={{borderRadius: 100}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Circle-icons-upload.svg/1200px-Circle-icons-upload.svg.png" width={200} height={200}
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
                                                    autoComplete="given-name"
                                                    fullWidth
                                                    id="doctorName"
                                                    label="Full Name"
                                                    autoFocus
                                                    {...register("doctorName")}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    fullWidth
                                                    id="dob"
                                                    type={"date"}
                                                    {...register("dob")}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    autoComplete="email"
                                                    fullWidth
                                                    id="email"
                                                    label="Email"
                                                    {...register("email")}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    fullWidth
                                                    id="phone"
                                                    label="Phone"
                                                    autoComplete="phone"
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
                                                        {...register("clinic")}
                                                        // onChange={handleChange}
                                                    >
                                                        <MenuItem value={1}>Bệnh viện Đa khoa An Việt</MenuItem>
                                                        <MenuItem value={2}>Phòng Khám ACC - Chiropractic Quận 1 TP.HCM</MenuItem>
                                                        <MenuItem value={3}>Phòng khám Chuyên khoa Nội An Phước</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl fullWidth>
                                                    <InputLabel id="specialityLabel">Speciality</InputLabel>
                                                    <Select
                                                        labelId="specialityLabel"
                                                        id="speciality"
                                                        // value={0}
                                                        label="Speciality"
                                                        {...register("speciality")}
                                                        // onChange={handleChange}
                                                    >
                                                        <MenuItem value={"Thần kinh"}>Thần Kinh</MenuItem>
                                                        <MenuItem value={"Tai mũi họng"}>Tai Mũi Họng</MenuItem>
                                                        <MenuItem value={"Da liễu"}>Da Liễu</MenuItem>
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
                                                        {...register("position")}
                                                        // onChange={handleChange}
                                                    >
                                                        <MenuItem value={"GS-TS"}>Giáo sư - Tiến Sĩ</MenuItem>
                                                        <MenuItem value={"PGS-TS"}>Phó giáo sư - Tiến Sĩ</MenuItem>
                                                        <MenuItem value={"TS-BS"}>Tiến Sĩ - Bác Sĩ</MenuItem>
                                                        <MenuItem value={"BS"}>Bác Sĩ</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item container xs={12} sm={6} justifyContent="flex-end" >
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    sx={{ mt: 3, mb: 1}}
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
