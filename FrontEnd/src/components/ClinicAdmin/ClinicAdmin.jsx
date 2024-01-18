import * as React from 'react';
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
import AddModal from "./AddModal";
import EditModal from "./EditModal"
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
import Swal from 'sweetalert2'
import { toast } from "react-toastify";
import { Pagination } from "@mui/material";



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

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [isupdate, setIsupdate] = useState(false);
    const [clinicList, setClinicList] = useState([]);
    const [clinicID, setClinicID] = useState()
    const [showContent, setShowContent] = useState(true)
    const [showCreate, setShowCreate] = useState(true)
    const [showPage, setShowPage] = useState(true);

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
    const handleShowClinic = () => {
        setShowAddModal(true);
        setShowContent(false)
        setShowCreate(false)
        setShowPage(false)
    }

    const handEditID = (id) => {
        setClinicID(id);
        setShowEditModal(true)
        setShowContent(false)
        setShowCreate(false)
        setShowPage(false)
    }

    const handDelete = async (id) => {
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
                {showCreate && <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 1 }}
                    onClick={handleShowClinic}
                >
                    TẠO PHÒNG KHÁM
                </Button>}
                {showAddModal && <AddModal
                    setShow={setShowAddModal}
                    setISupdate={setIsupdate}
                    setShowContent={setShowContent}
                    setShowCreate={setShowCreate}
                    setShowPage={setShowPage}
                />}
                {showEditModal && <EditModal
                    setShow={setShowEditModal}
                    setISupdate={setIsupdate}
                    clinicId={clinicID}
                    setShowContent={setShowContent}
                    setShowCreate={setShowCreate}
                    setShowPage={setShowPage}
                />}
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
                                        <StyledTableCell>GPHD</StyledTableCell>
                                        <StyledTableCell>THÔNG TIN</StyledTableCell>
                                        <StyledTableCell>CHỌN</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {currentClinicList.map((item) => (
                                        <StyledTableRow key={item.id}>
                                            <StyledTableCell sx={{ width: 10 }} component="th" scope="row">
                                                {item.id}
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <img src={item.clinicLogo} alt="Clinic Logo" style={{ width: '50px', height: '50px' }} />
                                            </StyledTableCell>
                                            <StyledTableCell>{item.clinicName}</StyledTableCell>
                                            <StyledTableCell>{item.address}</StyledTableCell>
                                            <StyledTableCell>{item.legalRepresentative}</StyledTableCell>
                                            <StyledTableCell>{item.hotline}</StyledTableCell>
                                            <StyledTableCell>{item.operatingLicence}</StyledTableCell>
                                            <StyledTableCell>{item.clinicInfor}</StyledTableCell>
                                            <StyledTableCell >
                                                <Stack direction="row" spacing={1}>
                                                    <Button variant="contained" color="warning" onClick={() => handEditID(item.id)} sx={{ width: 5 }}><i className="fa-solid fa-pen-to-square"></i>
                                                    </Button>
                                                    <Button variant="contained" color="error"
                                                        onClick={() => handDelete(item.id)} sx={{ marginLeft: 'auto' }}><i
                                                            className="fa-solid fa-delete-left"></i>
                                                    </Button>
                                                </Stack>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    }
                </Box>
                {showPage &&
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