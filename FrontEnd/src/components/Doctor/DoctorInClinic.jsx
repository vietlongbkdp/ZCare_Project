import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Container, Grid, Rating, Stack } from '@mui/material';
import { useContext, useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import ScheduleCreate from '../ScheduleCreate/ScheduleCreate';
import EditDoctor from './EditDoctor';
import AddDoctor from './AddDoctor';
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import DoctorDetail from './DoctorDetail';
import { ApiContext } from "../ApiContext/ApiProvider";
import Cookies from "js-cookie";
import Loading from "../Loading/Loading";

export default function DoctorInClinic({ API_URL, handleHideDoctor, clinicId }) {
    const { API_DOCTOR } = useContext(ApiContext)
    const [doctorList, setDoctorList] = useState([])
    const [showAdd, setShowAdd] = useState(false)
    const [showEdit, setShowEdit] = useState(false);
    const [updateShow, setUpdateShow] = useState(false)
    const [buttonCreate, setButtonCreate] = useState(true)
    const [showData, setShowData] = useState(true)
    const [showSchedule, setShowSchedule] = useState(false)
    const [showDoctorDetail, setShowDoctorDetail] = useState(false)
    const [doctorId, setDoctorId] = useState();
    const [clinicUserId, setClinicUserId] = useState();
    const [loading, setLoading] = useState(true);
    const storedUserId = Cookies.get('userId');
    const { API } = useContext(ApiContext)
    useEffect(() => {
        const finddUser = async () => {
            try {
                const response = await axios.get(`${API}/api/user/userlogin/${storedUserId}`)
                setClinicUserId(response.data.id)
                setLoading(false)
            } catch (error) {
                console.error(error);
                setLoading(false)
            }
        }
        finddUser();
    }, [])

    useEffect(() => {
        if (clinicId !== undefined) {
            const getDoctors = async () => {
                try {
                    axios.defaults.withCredentials = true;
                    const response = await axios.get(`${API}/api/doctor/byClinicId/${clinicId}`);
                    console.log(response);
                    setDoctorList(response.data);
                    setLoading(false)
                } catch (error) {
                    console.error(error);
                    setLoading(false)
                }
            };
            getDoctors();
        }

        if (clinicUserId !== undefined) {
            const getDoctors1 = async () => {
                try {
                    axios.defaults.withCredentials = true;
                    const response = await axios.get(`${API}/api/doctor/byClinicId/${clinicUserId}`);
                    console.log(response);
                    setDoctorList(response.data);
                } catch (error) {
                    console.error(error);
                }
            };
            getDoctors1();
        }
    }, [updateShow, clinicUserId]);


    const handleOpenDoctor = () => {
        setShowAdd(true)
        setButtonCreate(false)
        setShowData(false)
    }

    const handleEditId = (doctorId) => {
        setDoctorId(doctorId)
        setShowEdit(true)
        setButtonCreate(false)
        setShowData(false)
    }

    const handleShowSchedule = (doctorId) => {
        setDoctorId(doctorId)
        setShowSchedule(true)
        setButtonCreate(false)
        setShowData(false)
    }

    const handleShowDetail = (doctorId) => {
        setDoctorId(doctorId)
        setShowDoctorDetail(true)
        setButtonCreate(false)
        setShowData(false)
    }

    const handleShowDoctorInClinic = () => {
        setButtonCreate(true)
        setShowData(true)
    }

    const handleChangeLock = async (id, currentLockStatus) => {
        console.log(typeof currentLockStatus)

        Swal.fire({
            title: "Bạn muốn khóa",
            text: "Bạn sẽ không thể phục hồi!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Đồng ý, khóa!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.put(`${API}/api/doctor/lock/${id}`, {
                        userId: currentLockStatus
                    });
                    toast.success("Thành công");
                    setUpdateShow((prev) => !prev);
                } catch (error) {
                    toast.error("Thất bại");
                }
            }
        });
    };

    return (
        <>
            {loading && <Loading />}
            <Container>
                {buttonCreate &&
                    <>
                        <Typography variant='h5' align='center' gutterBottom>DANH SÁCH BÁC SĨ TRONG PHÒNG KHÁM</Typography>
                        {clinicId !== undefined ? (
                            <Button
                                type="button"
                                variant="contained"
                                sx={{ mb: 1, mr: 1, backgroundColor: 'grey', '&:hover': { backgroundColor: 'gray' } }}
                                onClick={handleHideDoctor}
                            >
                                Trở lại
                            </Button>
                        ) : null}
                        <Button
                            type="button"
                            variant="contained"
                            color='success'
                            sx={{ mb: 1 }}
                            onClick={handleOpenDoctor}
                        >
                            Tạo bác sĩ
                        </Button>
                    </>}
                {showAdd && <AddDoctor
                    setShowAdd={setShowAdd}
                    setUpdateShow={setUpdateShow}
                    handleShowDoctorInClinic={handleShowDoctorInClinic}
                    clinicId={clinicId}
                    clinicUserId={clinicUserId}
                />}
                {showEdit && <EditDoctor
                    doctorId={doctorId}
                    setShowEdit={setShowEdit}
                    handleShowDoctorInClinic={handleShowDoctorInClinic}
                    setUpdateShow={setUpdateShow}
                    clinicId={clinicId}
                />}
                {showSchedule && <ScheduleCreate
                    doctorId={doctorId}
                    handleShowDoctorInClinic={handleShowDoctorInClinic}
                    setShowSchedule={setShowSchedule}
                />}
                {showDoctorDetail && <DoctorDetail
                    doctorId={doctorId}
                    handleShowDoctorInClinic={handleShowDoctorInClinic}
                    setShowDoctorDetail={setShowDoctorDetail} />}

                <Grid container spacing={2}>
                    {
                        showData &&
                        doctorList.map((doctor) => (
                            <Grid item xs={6} key={doctor?.id}>
                                <Card sx={{ height: '280px', display: 'flex', flexDirection: 'column' }}>
                                    <Stack direction='row' sx={{ height: '210px' }}>
                                        <CardMedia
                                            sx={{ height: 170, width: 170, p: 2, borderRadius: '20px' }}
                                            component="img"
                                            image={doctor?.avatarImg}
                                            title="green iguana"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h6">
                                                {doctor?.doctorName}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" pb='5px'>
                                                Chức danh: {doctor?.position?.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" pb='5px'>
                                                Chuyên khoa: {doctor?.speciality?.specialtyName}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" pb='5px'>
                                                Giá khám : {doctor && doctor.fee ? (doctor.fee * 1000).toLocaleString() + "đ" : ""}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" display={'flex'} pb='5px'>
                                                Đánh giá:
                                                <Rating value={doctor?.star} max={5} name="half-rating" sx={{ fontSize: '1.1rem' }} precision={0.5} readOnly />
                                            </Typography>
                                        </CardContent>
                                    </Stack>

                                    <CardActions sx={{ height: '60px' }}>
                                        <Box sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                            <Button variant='outlined' color='primary' sx={{ width: '90px' }}
                                                onClick={() => handleShowDetail(doctor?.id)}
                                            >
                                                Chi tiết
                                            </Button>
                                            <Button variant='outlined' color='secondary' sx={{ width: '110px' }}
                                                onClick={() => handleShowSchedule(doctor?.id)}
                                            >
                                                Lịch khám
                                            </Button>
                                            <Button variant="outlined" color="warning" sx={{ width: '100px' }}
                                                onClick={() => handleEditId(doctor?.id)}
                                            >
                                                Cập nhật
                                            </Button>
                                            <Button
                                                variant="outlined" color="error" sx={{ width: '90px' }}
                                                onClick={() => handleChangeLock(doctor?.id, doctor?.user.id)}
                                            >
                                                Khóa
                                            </Button>
                                        </Box>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                    }
                </Grid>
            </Container>
        </>
    )
}
