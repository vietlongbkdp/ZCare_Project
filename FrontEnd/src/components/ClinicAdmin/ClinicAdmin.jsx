import React, { useContext } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Swal from 'sweetalert2'
import { toast } from "react-toastify";
import { Pagination } from "@mui/material";
import AddClinic from './AddClinic';
import EditClinic from './EditClinic';
import DoctorAdmin from '../Doctor/DoctorAdmin';
import { ApiContext } from '../ApiContext/ApiProvider';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: 'white',
        color: theme.palette.common.black,
        textAlign: 'left'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        textAlign: 'left'
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

export default function CustomizedTables() {

    const itemsPerPage = 7;
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const [showAddClinic, setShowAddClinic] = useState(false);
    const [showEditClinic, setShowEditClinic] = useState(false);
    const [isupdate, setIsupdate] = useState(false);
    const [clinicList, setClinicList] = useState([]);
    const [clinicId, setClinicId] = useState();
    const [showContent, setShowContent] = useState(true);
    const [showCreateBtn, setShowCreateBtn] = useState(true);
    const [showPagination, setShowPagination] = useState(true);
    const [showDoctorList, setShowDoctorList] = useState(false);
    const [showAddDoctor, setShowAddDoctor] = useState(false);

    const { API_DOCTOR } = useContext(ApiContext)

    useEffect(() => {
        const getClinics = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/clinic');
                setClinicList(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        getClinics();
    }, [isupdate, currentPage]);

    const currentClinicList = clinicList.slice(startIndex, endIndex);
    const handleCreateClinic = () => {
        setShowAddClinic(true);
        setShowContent(false)
        setShowCreateBtn(false)
        setShowPagination(false)
    }

    const handleEditClinic = (id) => {
        setClinicId(id);
        setShowEditClinic(true)
        setShowContent(false)
        setShowCreateBtn(false)
        setShowPagination(false)
    }

    const handleShowDoctor = (id) => {
        setClinicId(id);
        setShowDoctorList(true)
        setShowContent(false)
        setShowCreateBtn(false)
        setShowPagination(false)
    }

    const handleHideDoctor = () => {
        setShowDoctorList(false)
        setShowContent(true)
        setShowCreateBtn(true)
        setShowPagination(true)
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
                    await axios.delete(`http://localhost:8080/api/clinic/${id}`);
                    toast.success("Xóa phòng khám thành công")
                    setIsupdate(pre => !pre);
                } catch (error) {
                    toast.error("Xóa phòng khám thất bại")
                }
            }
        })

    }

    return (
        <>
            <Box>
                {showCreateBtn && <Button
                    type="submit"
                    variant="contained"
                    color='success'
                    sx={{ mt: 3, mb: 1 }}
                    onClick={handleCreateClinic}
                >
                    TẠO PHÒNG KHÁM
                </Button>}
                {showAddClinic && <AddClinic
                    setShow={setShowAddClinic}
                    setISupdate={setIsupdate}
                    setShowContent={setShowContent}
                    setShowCreateBtn={setShowCreateBtn}
                    setShowPagination={setShowPagination}
                />}
                {showEditClinic && <EditClinic
                    setShow={setShowEditClinic}
                    setISupdate={setIsupdate}
                    clinicId={clinicId}
                    setShowContent={setShowContent}
                    setShowCreateBtn={setShowCreateBtn}
                    setShowPagination={setShowPagination}
                />}
                {
                    showDoctorList && <DoctorAdmin API_URL={`${API_DOCTOR}/byClinicId/${clinicId}`}
                        clinicId={clinicId}
                        handleHideDoctor={handleHideDoctor} />
                }
                <Box >
                    {showContent &&
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell sx={{ width: 10 }}>#</StyledTableCell>
                                        <StyledTableCell>LOGO</StyledTableCell>
                                        <StyledTableCell>TÊN PHÒNG KHÁM</StyledTableCell>
                                        <StyledTableCell>ĐỊA CHỈ</StyledTableCell>
                                        <StyledTableCell>NGƯỜI ĐẠI DIỆN</StyledTableCell>
                                        <StyledTableCell>HOTLINE</StyledTableCell>
                                        <StyledTableCell>GPHĐ</StyledTableCell>
                                        <StyledTableCell sx={{ width: 25 }}>DANH SÁCH BÁC SĨ</StyledTableCell>
                                        <StyledTableCell sx={{ width: 25 }}>THÔNG TIN</StyledTableCell>
                                        <StyledTableCell sx={{ width: 25 }}>CẬP NHẬT</StyledTableCell>
                                        <StyledTableCell sx={{ width: 25 }}>XÓA</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {currentClinicList.map((item) => (
                                        <StyledTableRow key={item.id}>
                                            <StyledTableCell sx={{ width: 10 }} component="th" scope="row">
                                                {item?.id}
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <img src={item?.clinicLogo} alt="Clinic Logo" style={{ width: '50px', height: '50px', borderRadius: '25px' }} />
                                            </StyledTableCell>
                                            <StyledTableCell>{item?.clinicName}</StyledTableCell>
                                            <StyledTableCell>{item?.address}</StyledTableCell>
                                            <StyledTableCell>{item?.legalRepresentative}</StyledTableCell>
                                            <StyledTableCell>{item?.hotline}</StyledTableCell>
                                            <StyledTableCell>{item?.operatingLicence}</StyledTableCell>
                                            <StyledTableCell>
                                                <Button variant='contained' color='secondary'
                                                    onClick={() => handleShowDoctor(item?.id)} sx={{ width: 5 }}>
                                                    <i class="fa-solid fa-user-doctor"></i>
                                                </Button>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <Button variant='contained' color='primary'>
                                                    <i class="fa-solid fa-list-ul"></i>
                                                </Button>
                                            </StyledTableCell>
                                            <StyledTableCell >
                                                <Button variant="contained" color="warning"
                                                    onClick={() => handleEditClinic(item?.id)} sx={{ width: 5 }}>
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </Button>
                                            </StyledTableCell>
                                            <StyledTableCell >
                                                <Button variant="contained" color="error"
                                                    onClick={() => handleDelete(item?.id)} sx={{ marginLeft: 'auto' }}>
                                                    <i className="fa-solid fa-delete-left"></i>
                                                </Button>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    }
                </Box>
                {showPagination &&
                    <Pagination
                        count={Math.ceil(clinicList.length / itemsPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                        showFirstButton
                        showLastButton
                        style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}
                    />}
            </Box>
        </>
    );
}