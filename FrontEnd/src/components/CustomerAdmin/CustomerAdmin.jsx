import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import {styled} from "@mui/material/styles";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import * as React from "react";
import Swal from "sweetalert2";
import {toast} from "react-toastify";
import {Pagination} from "@mui/material";



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
function GetCustomerAdmin (){
    const itemsPerPage = 7;
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const [customerList, setCustomerList] = useState([])
    const [updateShow, setUpdateShow] = useState(false)



    useEffect(() => {
        const getCustomers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/customer');
                setCustomerList(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        getCustomers();
    }, [updateShow,currentPage]);
    const currentCustomerList = customerList.slice(startIndex, endIndex);
    const handleChangeLock = async (id, currentLockStatus) => {


        Swal.fire({
            title: currentLockStatus === "LOCK" ? "Bạn muốn mở khóa?" : "Bạn muốn khóa" ,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, change it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.put(`http://localhost:8080/api/customer/${id}`, {
                        lockStatus: currentLockStatus
                    });
                    toast.success("Thành công");
                    setUpdateShow((prev) => !prev);
                } catch (error) {
                    toast.error("Thất bại");
                }
                Swal.fire({
                    title:currentLockStatus === "LOCK" ? "mở khóa thành công" : "khóa thành công",
                    text: `The doctor has been ${currentLockStatus}.`,
                    icon: "success"
                });
            }
        });
    };


    return(
        <>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell sx={{ width: 10 }}>#</StyledTableCell>
                        <StyledTableCell>TÊN BỆNH NHÂN </StyledTableCell>
                        <StyledTableCell> NGÀY SINH </StyledTableCell>
                        <StyledTableCell> SỐ ĐIỆN THOẠI </StyledTableCell>
                        <StyledTableCell> EMAIL </StyledTableCell>
                        <StyledTableCell> ĐỊA CHỈ </StyledTableCell>
                        <StyledTableCell> GIỚI TÍNH </StyledTableCell>
                        <StyledTableCell sx={{ width: 25 }}> TRẠNG THÁI </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {currentCustomerList.map((item) => (
                        <StyledTableRow key={item.id}>
                            <StyledTableCell sx={{ width: 10 }} component="th" scope="row">
                                {item?.id}
                            </StyledTableCell>
                            <StyledTableCell>
                                <img src={item?.fullName} alt="Clinic Logo" style={{ width: '50px', height: '50px', borderRadius: '25px' }} />
                            </StyledTableCell>
                            <StyledTableCell>{item?.dob}</StyledTableCell>
                            <StyledTableCell>{item?.phone}</StyledTableCell>
                            <StyledTableCell>{item?.email}</StyledTableCell>
                            <StyledTableCell>{item?.address}</StyledTableCell>
                            <StyledTableCell>{item?.gender}</StyledTableCell>
                            <StyledTableCell align="right">
                                <Button
                                    variant="contained"
                                    style={{ backgroundColor: item.lockStatus === 'LOCK' ? 'red' : 'green' }}
                                    onClick={() => handleChangeLock(item.id, item.lockStatus)}
                                >
                                    {item.lockStatus}
                                </Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
            <Pagination
                count={Math.ceil(customerList.length / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                showFirstButton
                showLastButton
                style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}
            />

        </>
    )
}

export default GetCustomerAdmin;