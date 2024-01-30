import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import AppWidgetSummary from "./AppWidgetSummary";
import {useEffect, useState} from "react";
import axios from "axios";

export default function AdminViewer() {
    const [DoctorList,setDoctorList]=useState([]);
    const [totalDoctor, setTotalDoctor] = useState(0);
    useEffect(() => {
        axios.get('http://localhost:8080/api/doctor')
            .then(response => {
                setDoctorList(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    useEffect(() => {
        const total = DoctorList.length;
        setTotalDoctor(total);
    }, [DoctorList]);

    const [ClinicList, setClinicList] = useState([]);
    const [totalClinic, setTotalClinic] = useState(0);
    useEffect(() => {
        axios.get('http://localhost:8080/api/clinic')
            .then(response => {
                setClinicList(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);
    useEffect(() => {
        const total = ClinicList.length;
        setTotalClinic(total);
    }, [ClinicList]);

    const [CustomerList, setCustomerList] = useState([]);
    const [totalCustomer, setTotalCustomer] = useState(0);
    useEffect(() => {
        axios.get('http://localhost:8080/api/customer')
            .then(response => {
                setCustomerList(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);
    useEffect(() => {
        const total = CustomerList.length;
        setTotalCustomer(total);
    }, [CustomerList]);

    const [SpecialityList, setSpecialityList] = useState([]);
    const [totalSpeciality, setTotalSpeciality] = useState(0);
    useEffect(() => {
        axios.get('http://localhost:8080/api/speciality')
            .then(response => {
                setSpecialityList(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);
    useEffect(() => {
        const total = SpecialityList.length;
        setTotalSpeciality(total);
    }, [SpecialityList]);

    const [bookingList, setBookingList] = useState([]);
    const [totalbooking, setTotalbooking] = useState(0);
    useEffect(() => {
        axios.get('http://localhost:8080/api/booking/bookingDate')
            .then(response => {
                setBookingList(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);
    useEffect(() => {
        const total = bookingList.length;
        setTotalbooking(total);
    }, [bookingList]);


    return (
        <>
        <Container maxWidth="xl">
            <Typography variant="h4" sx={{mb: 5}}>
                Hi, Welcome back 👋
            </Typography>

            <Grid container spacing={3}>
                <Grid xs={12} sm={6} md={3}>
                    <AppWidgetSummary
                        title="Số phòng khám"
                        total={totalClinic}
                        color="success"
                        icon={<img alt="icon"
                                   src="https://minimal-kit-react.vercel.app/assets/icons/glass/ic_glass_message.png"/>}
                    />
                </Grid>
                <Grid xs={12} sm={6} md={3}>
                    <AppWidgetSummary
                        title="Số chuyên khoa"
                        total={totalSpeciality}
                        color="info"
                        icon={<img alt="icon"
                                   src="https://static.vecteezy.com/system/resources/previews/000/353/690/original/vector-hospital-icon.jpg"
                                   style={{width: '100%', height: 'auto'}}/>}
                    />
                </Grid>
                <Grid xs={12} sm={6} md={3}>
                    <AppWidgetSummary
                        title="Số bác sĩ"
                        total={totalDoctor}
                        color="warning"
                        icon={<img alt="icon" src="https://cdn.haynhat.com/wp-content/uploads/2020/07/bac-si.jpg"
                                   style={{width: '120%', height: 'auto'}}/>}
                    />
                </Grid>
                <Grid xs={12} sm={6} md={3}>
                    <AppWidgetSummary
                        title="Số bệnh nhân"
                        total={totalCustomer}
                        color="error"
                        icon={<img alt="icon"
                                   src="https://minimal-kit-react.vercel.app/assets/icons/glass/ic_glass_users.png"/>}
                    />
                </Grid>
                <Grid xs={12} sm={6} md={3}>
                    <AppWidgetSummary
                        title="Booking hôm nay"
                        total={totalbooking}
                        color="error"
                        icon={<img alt="icon"
                                   src="https://res.cloudinary.com/dqcrxfewu/image/upload/v1706603536/example/vbtnnru17uj0cpq9aybn.png"
                                   style={{width: '100%', height: 'auto'}}/>}
                    />
                </Grid>
                <Grid xs={12} sm={6} md={3}>
                    <AppWidgetSummary
                        title="Lịch khám hôm nay"
                        total={totalCustomer}
                        color="error"
                        icon={<img alt="icon"
                                   src="https://thumbs.dreamstime.com/b/vecteur-d-ic%C3%B4ne-de-calendrier-appli-ordre-du-jour-date-butoir-affaires-page-illustration-isolement-sur-le-fond-blanc-rappel-ligne-140057422.jpg"
                                   style={{width: '120%', height: 'auto'}} />}
                    />
                </Grid>
            </Grid>
        </Container>
        </>
)
    ;
}
