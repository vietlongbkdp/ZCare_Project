import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {styled} from '@mui/material/styles';
import Button from '@mui/material/Button';
import {
    Avatar,
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    Link, MenuItem,
    Paper,
    Select,
    TextField
} from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';

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
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };
    return (
        <>
            <Container>
                <Typography variant="h5" fontWeight={"bold"} component="h2" mt={2}>
                    Create a new doctor
                </Typography>
                <Box sx={{width: '100%'}} mt={3}>
                    <Grid container spacing={2}>
                        <Grid item xs={4} >
                            <Item>
                                <Button component="label" sx={{borderRadius: 50}}>
                                    <img id={"blah"} style={{borderRadius: 100}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Circle-icons-upload.svg/1200px-Circle-icons-upload.svg.png" width={200} height={200}
                                         alt={"avatar"}/>
                                    <VisuallyHiddenInput type="file" onChange={(event) => {
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
                                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                        <Grid container spacing={2} >
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    autoComplete="given-name"
                                                    name="doctorName"
                                                    fullWidth
                                                    id="doctorName"
                                                    label="Full Name"
                                                    autoFocus
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    fullWidth
                                                    id="dob"
                                                    name="dob"
                                                    type={"date"}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    autoComplete="email"
                                                    name="email"
                                                    fullWidth
                                                    id="email"
                                                    label="Email"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    fullWidth
                                                    id="phone"
                                                    label="Phone"
                                                    name="phone"
                                                    autoComplete="phone"
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
                                                        name="clinic"
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
                                                        name="speciality"
                                                        // value={0}
                                                        label="Speciality"
                                                        // onChange={handleChange}
                                                    >
                                                        <MenuItem value={10}>Thần Kinh</MenuItem>
                                                        <MenuItem value={20}>Tai Mũi Họng</MenuItem>
                                                        <MenuItem value={30}>Da Liễu</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl fullWidth>
                                                    <InputLabel id="positionLabel">Position</InputLabel>
                                                    <Select
                                                        labelId="positionLabel"
                                                        id="position"
                                                        name="position"
                                                        // value={0}
                                                        label="Position"
                                                        // onChange={handleChange}
                                                    >
                                                        <MenuItem value={1}>Giáo sư - Tiến Sĩ</MenuItem>
                                                        <MenuItem value={2}>Phó giáo sư - Tiến Sĩ</MenuItem>
                                                        <MenuItem value={3}>Tiến Sĩ - Bác Sĩ</MenuItem>
                                                        <MenuItem value={4}>Bác Sĩ</MenuItem>
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
