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
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import AddDoctor from "./AddDoctor";
import EditDoctor from "./EditDoctor";
import { Box } from "@mui/system";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Pagination } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: 'white',
        color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function DoctorAdmin({ API_URL, handleHideDoctor, clinicId }) {
    const itemsPerPage = 7;
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const [doctorList, setDoctorList] = useState([])
    const [showAdd, setShowAdd] = useState(false)
    const [showEdit, setShowEdit] = useState(false);
    const [updateShow, setUpdateShow] = useState(false)
    const [buttonCreate, setButtonCreate] = useState(true)
    const [showTable, setShowTable] = useState(true)
    const [showPage, setShowPage] = useState(true);
    const [doctorId, setDoctorId] = useState();

    useEffect(() => {
        const getDoctors = async () => {
            try {
                const response = await axios.get(API_URL);
                setDoctorList(response.data)
            } catch (error) {
                console.error(error);
            }
        }
        getDoctors();
    }, [updateShow, currentPage])

    const currentDoctorList = doctorList.slice(startIndex, endIndex);

    const handleOpenDoctor = () => {
        setShowAdd(true)
        setButtonCreate(false)
        setShowTable(false)
        setShowPage(false)
    }

    const handleCloseDoctor = () => {
        setButtonCreate(false)

    }

    const handleEditId = (id) => {
        setDoctorId(id)
        setShowEdit(true)
        setButtonCreate(false)
        setShowTable(false)
        setShowPage(false)
    }

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Bạn có chắc chắn không?",
            text: "Bạn sẽ không thể hoàn tác",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: 'Hủy',
            confirmButtonText: "Đồng ý, xóa"
        }).then(async (data) => {
            if (data.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:8080/api/doctor/${id}`);
                    toast.success("Xóa bác sĩ thành công")
                    setUpdateShow(pre => !pre);
                } catch (error) {
                    toast.error("Xóa bác sĩ thất bại")
                }
            }
        })
    }

    return (
        <Box>
            {
                buttonCreate &&
                <>
                    <Button
                        type="button"
                        variant="contained"
                        sx={{ mt: 3, mb: 1, mr: 1, backgroundColor: 'grey', '&:hover': { backgroundColor: 'gray' } }}
                        onClick={handleHideDoctor}
                    >
                        Trở lại
                    </Button>
                    <Button
                        type="button"
                        variant="contained"
                        color='success'
                        sx={{ mt: 3, mb: 1 }}
                        onClick={handleOpenDoctor}
                    >
                        Tạo bác sĩ
                    </Button>
                </>
            }
            {showAdd && <AddDoctor
                setShowAdd={setShowAdd}
                setUpdateShow={setUpdateShow}
                setButtonCreate={setButtonCreate}
                setShowTable={setShowTable}
                setShowPage={setShowPage}
                clinicId={clinicId}
            />}
            {showEdit && <EditDoctor
                doctorId={doctorId}
                setShowEdit={setShowEdit}
                setButtonCreate={setButtonCreate}
                setShowTable={setShowTable}
                setUpdateShow={setUpdateShow}
                setShowPage={setShowPage}
                clinicId={clinicId}
            />}
            {showTable && <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>#</StyledTableCell>
                            <StyledTableCell align="left">ẢNH ĐẠI DIỆN</StyledTableCell>
                            <StyledTableCell align="left">TÊN BÁC SĨ</StyledTableCell>
                            <StyledTableCell align="left">CHỨC DANH</StyledTableCell>
                            <StyledTableCell align="left">CHUYÊN KHOA</StyledTableCell>
                            <StyledTableCell align="left">PHÒNG KHÁM</StyledTableCell>
                            <StyledTableCell align="left">NGÀY SINH</StyledTableCell>
                            <StyledTableCell align="left">EMAIL</StyledTableCell>
                            <StyledTableCell align="left">SĐT</StyledTableCell>
                            <StyledTableCell align="left">NGÀY ĐĂNG KÍ</StyledTableCell>
                            <StyledTableCell align="left">PHÍ KHÁM (VNĐ)</StyledTableCell>
                            <StyledTableCell align="left">SAO ĐÁNH GIÁ</StyledTableCell>
                            <StyledTableCell align="center">CẬP NHẬT</StyledTableCell>
                            <StyledTableCell align="center">XÓA</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentDoctorList.map((item) => (
                            <StyledTableRow key={item.id}>
                                <StyledTableCell component="th" scope="row">{item?.id}</StyledTableCell>
                                <StyledTableCell align="left">
                                    <img src={item?.avatarImg} alt="Avatar" style={{ width: '50px', height: '50px', borderRadius: '25px' }} />
                                </StyledTableCell>
                                <StyledTableCell align="left">{item?.doctorName}</StyledTableCell>
                                <StyledTableCell align="left">{item?.position?.name}</StyledTableCell>
                                <StyledTableCell align="left">{item?.speciality?.specialtyName}</StyledTableCell>
                                <StyledTableCell align="left">{item?.clinic?.clinicName}</StyledTableCell>
                                <StyledTableCell align="left">{item?.dob}</StyledTableCell>
                                <StyledTableCell align="left">{item?.email}</StyledTableCell>
                                <StyledTableCell align="left">{item?.phone}</StyledTableCell>
                                <StyledTableCell align="left">{item?.createAt}</StyledTableCell>
                                <StyledTableCell align="left">{item?.fee}</StyledTableCell>
                                <StyledTableCell align="left">{item?.star}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <Button variant="contained" color="warning"
                                        onClick={() => handleEditId(item.id)} sx={{ width: 5 }}>
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </Button>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <Button variant="contained" color="error"
                                        onClick={() => handleDelete(item.id)}
                                        sx={{ marginLeft: 'auto' }}>
                                        <i className="fa-solid fa-delete-left"></i>
                                    </Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>}
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
        </Box>
    );
}