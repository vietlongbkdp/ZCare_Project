import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Container, Grid, Stack } from '@mui/material';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import ScheduleCreate from '../ScheduleCreate/ScheduleCreate';
import EditDoctor from './EditDoctor';
import AddDoctor from './AddDoctor';
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import DoctorInfo from './../DoctorInfo/DoctorInfo';
import DoctorDetail from './DoctorDetail';

export default function DoctorInClinic({ API_URL, handleHideDoctor, clinicId }) {
    const [doctorList, setDoctorList] = useState([])
    const [showAdd, setShowAdd] = useState(false)
    const [showEdit, setShowEdit] = useState(false);
    const [updateShow, setUpdateShow] = useState(false)
    const [buttonCreate, setButtonCreate] = useState(true)
    const [showData, setShowData] = useState(true)
    const [showSchedule, setShowSchedule] = useState(false)
    const [showDoctorDetail, setShowDoctorDetail] = useState(false)
    const [doctorId, setDoctorId] = useState();

    useEffect(() => {
        const getDoctors = async () => {
            try {
                axios.defaults.withCredentials = true;
                const response = await axios.get(API_URL);
                setDoctorList(response.data)
            } catch (error) {
                console.error(error);
            }
        }
        getDoctors();
    }, [updateShow])

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
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, change it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.put(`http://localhost:8080/api/doctor/lock/${id}`, {
                        userId: currentLockStatus
                    });
                    toast.success("Thành công");
                    setUpdateShow((prev) => !prev);
                } catch (error) {
                    toast.error("Thất bại");
                }
                Swal.fire({
                    title: "khóa thành công",
                    text: `The doctor has been `,
                    icon: "success"
                });

            }
        });
    };

    return (
        <Container>
            {buttonCreate &&
                <>
                    <Button
                        type="button"
                        variant="contained"
                        sx={{ mb: 1, mr: 1, backgroundColor: 'grey', '&:hover': { backgroundColor: 'gray' } }}
                        onClick={handleHideDoctor}
                    >
                        Trở lại
                    </Button>
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
                                            Giá khám : {doctor?.fee} đ
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" pb='5px'>
                                            Đánh giá: {doctor?.star}
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
    )
}