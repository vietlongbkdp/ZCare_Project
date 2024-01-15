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
import Stack from "@mui/material/Stack";
import AddDoctor from "./AddDoctor";
import EditDoctor from "./EditDoctor";
import { Box } from "@mui/system";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Pagination } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function DoctorAdmin() {

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
                const response = await axios.get('http://localhost:8080/api/doctor');
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

    const handleEditId = (id) => {
        setDoctorId(id)
        setShowEdit(true)
        setButtonCreate(false)
        setShowTable(false)
        setShowPage(false)
    }

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (data) => {
            if (data.isConfirmed) { 
                try {
                    await axios.delete(`http://localhost:8080/api/doctor/${id}`);
                    toast.success("thành công")
                    setUpdateShow(pre => !pre);
                } catch (error) {
                    toast.error("thất bại")
                } Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        })
    }

    return (
        <Box>
            {buttonCreate && <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 1 }}
                onClick={handleOpenDoctor}
            >
                Create
            </Button>}
            {showAdd && <AddDoctor
                setShowAdd={setShowAdd}
                setUpdateShow={setUpdateShow}
                setButtonCreate={setButtonCreate}
                setShowTable={setShowTable}
                setShowPage={setShowPage}
            />}
            {showEdit && <EditDoctor
                doctorId={doctorId}
                setShowEdit={setShowEdit}
                setButtonCreate={setButtonCreate}
                setShowTable={setShowTable}
                setUpdateShow={setUpdateShow}
                setShowPage={setShowPage}
            />}
            {showTable && <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>#</StyledTableCell>
                            <StyledTableCell align="right">FULL NAME</StyledTableCell>
                            <StyledTableCell align="right">POSITION</StyledTableCell>
                            <StyledTableCell align="right">DOB</StyledTableCell>
                            <StyledTableCell align="right">EMAIL</StyledTableCell>
                            <StyledTableCell align="right">PHONE</StyledTableCell>
                            <StyledTableCell align="right">CREATEAT</StyledTableCell>
                            <StyledTableCell align="right">FREE</StyledTableCell>
                            <StyledTableCell align="right">CLINIC</StyledTableCell>
                            <StyledTableCell align="right">IMAGE</StyledTableCell>
                            <StyledTableCell align="right">STAR</StyledTableCell>
                            <StyledTableCell align="right">SPECIALITY</StyledTableCell>
                            <StyledTableCell align="right">ACTION</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentDoctorList.map((item) => (
                            <StyledTableRow key={item.id}>
                                <StyledTableCell component="th" scope="row">
                                    {item.id}
                                </StyledTableCell>
                                <StyledTableCell align="right">{item.doctorName}</StyledTableCell>
                                <StyledTableCell align="right">{item.position.name}</StyledTableCell>
                                <StyledTableCell align="right">{item.dob}</StyledTableCell>
                                <StyledTableCell align="right">{item.email}</StyledTableCell>
                                <StyledTableCell align="right">{item.phone}</StyledTableCell>
                                <StyledTableCell align="right">{item.createAt}</StyledTableCell>
                                <StyledTableCell align="right">{item.fee}</StyledTableCell>
                                <StyledTableCell align="right">{item.clinic.clinicName}</StyledTableCell>
                                <StyledTableCell align="right">{item.avatarImg}</StyledTableCell>
                                <StyledTableCell align="right">{item.star}</StyledTableCell>
                                <StyledTableCell align="right">{item.speciality.specialtyName}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                                        <Button variant="contained" onClick={() => handleEditId(item.id)} sx={{ width: 5 }}><i className="fa-solid fa-pen-to-square"></i>
                                        </Button>
                                        <Button variant="outlined" color="error" onClick={() => handleDelete(item.id)}
                                            sx={{ marginLeft: 'auto' }}><i
                                                className="fa-solid fa-delete-left"></i>
                                        </Button>
                                    </Stack>
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