import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Pagination, Typography } from "@mui/material";
import { getHeader } from '../utils/ApiComponen';
import './style.css'
import DoctorDetail from './DoctorDetail';
import Loading from "../Loading/Loading";
import {ApiContext} from "../ApiContext/ApiProvider";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: 'white',
        color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 13,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
    height: '70px'
}));

export default function DoctorAdmin({ API_URL, handleHideDoctor, clinicId }) {
    const itemsPerPage = 7;
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const { API } = useContext(ApiContext)
    const [doctorList, setDoctorList] = useState([])
    const [updateShow, setUpdateShow] = useState(false)
    const [buttonDisable, setButtonDisable] = useState(true)
    const [showPage, setShowPage] = useState(true)
    const [showDoctorDetail, setShowDoctorDetail] = useState(false)
    const [doctorId, setDoctorId] = useState()
    const [showDoctorList, setShowDoctorList] = useState(true)
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (!clinicId) {
            setButtonDisable(false)
        }
    }, [])

    useEffect(() => {
        const getDoctors = async () => {
            try {
                axios.defaults.withCredentials = true;
                const response = await axios.get(API_URL,
                    {
                        headers: getHeader()
                    }
                );
                setDoctorList(response.data)
                setLoading(false)

            } catch (error) {
                console.error(error);
                setLoading(false)
            }
        }
        getDoctors();
    }, [updateShow, currentPage])

    const currentDoctorList = doctorList.slice(startIndex, endIndex);

    const handleChangeLock = async (id, currentLockStatus) => {
        console.log(typeof currentLockStatus)

        Swal.fire({
            title: "Bạn có chắc chắn muốn khóa?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Hủy",
            confirmButtonText: "Đồng ý, khóa!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.put(`${API}/api/doctor/lock/${id}`, {
                        userId: currentLockStatus
                    });
                    toast.success("Khóa bác sĩ thành công");
                    setUpdateShow((prev) => !prev);
                } catch (error) {
                    toast.error("Khóa bác sĩ thất bại");
                }
            }
        });
    };

    const handleShowDoctorDetail = (doctorId) => {
        setDoctorId(doctorId);
        setShowDoctorDetail(true);
        setShowDoctorList(false);
    }

    return (
        <>
            {loading && <Loading/>}
            {showDoctorDetail && <DoctorDetail doctorId={doctorId} setShowDoctorList={setShowDoctorList} setShowDoctorDetail={setShowDoctorDetail} />}
            {showDoctorList &&
                <Box>
                    <Typography variant="h5" align="center" gutterBottom>DANH SÁCH BÁC SĨ TRÊN HỆ THỐNG</Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>#</StyledTableCell>
                                    <StyledTableCell align="left">ẢNH ĐẠI DIỆN</StyledTableCell>
                                    <StyledTableCell align="left">TÊN BÁC SĨ</StyledTableCell>
                                    <StyledTableCell align="left">CHỨC DANH</StyledTableCell>
                                    <StyledTableCell align="left">CHUYÊN KHOA</StyledTableCell>
                                    <StyledTableCell align="left">PHÒNG KHÁM</StyledTableCell>
                                    <StyledTableCell align="left">PHÍ KHÁM (VNĐ)</StyledTableCell>
                                    <StyledTableCell align="left">ĐÁNH GIÁ</StyledTableCell>
                                    <StyledTableCell align="center">CHI TIẾT</StyledTableCell>
                                    <StyledTableCell align="center">KHÓA</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentDoctorList.map((item) => (
                                    <StyledTableRow key={item.id}>
                                        <StyledTableCell component="th" align="center" scope="row">{item?.id}</StyledTableCell>
                                        <StyledTableCell align="left">
                                            <img src={item?.avatarImg} alt="Avatar"
                                                style={{ width: '50px', height: '50px', borderRadius: '25px' }} />
                                        </StyledTableCell>
                                        <StyledTableCell align="left">{item?.doctorName}</StyledTableCell>
                                        <StyledTableCell align="left">{item?.position?.name}</StyledTableCell>
                                        <StyledTableCell align="left">{item?.speciality?.specialtyName}</StyledTableCell>
                                        <StyledTableCell align="left">{item?.clinic?.clinicName}</StyledTableCell>
                                        <StyledTableCell align="left">{item && item.fee ? (item.fee * 1000).toLocaleString() + " đ" : ""}</StyledTableCell>
                                        <StyledTableCell align="left">{item?.star}</StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Button
                                                variant="contained"
                                                color='primary'
                                                onClick={() => handleShowDoctorDetail(item.id)}
                                            >
                                                <i className="fa-solid fa-list-ul"></i>
                                            </Button>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Button
                                                variant="contained"
                                                color='error'
                                                onClick={() => handleChangeLock(item.id, item.user.id)}
                                            >
                                                <i className="fa-solid fa-ban"></i>
                                            </Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {showPage &&
                        <Pagination
                            count={Math.ceil(doctorList.length / itemsPerPage)}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                            showFirstButton
                            showLastButton
                            style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}
                        />
                    }
                </Box>}
        </>
    );
}