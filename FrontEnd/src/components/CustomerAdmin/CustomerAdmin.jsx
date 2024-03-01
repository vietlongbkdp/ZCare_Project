import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import * as React from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Pagination, Typography } from "@mui/material";
import Loading from "../Loading/Loading";
import {ApiContext} from "../ApiContext/ApiProvider";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: 'white',
        color: theme.palette.common.black,
        textAlign: 'left'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        textAlign: 'left',
        padding: '16px'
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
function GetCustomerAdmin() {
    const itemsPerPage = 7;
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };
    const { API } = useContext(ApiContext)
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const [customerList, setCustomerList] = useState([])
    const [updateShow, setUpdateShow] = useState(false)
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getCustomers = async () => {
            try {
                const response = await axios.get(`${API}/api/customer`);
                setCustomerList(response.data);
                setLoading(false)
            } catch (error) {
                console.error(error);
                setLoading(false)
            }
        }
        getCustomers();
    }, [updateShow, currentPage]);

    const currentCustomerList = customerList.slice(startIndex, endIndex);
    const handleChangeLock = async (id, currentLockStatus) => {
        Swal.fire({
            title: "Bạn có chắc chắn muốn khóa?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Hủy",
            confirmButtonText: "Đồng ý, khóa!"
        }).then(async (result) => {
            setLoading(true)
            if (result.isConfirmed) {
                try {
                    await axios.put(`${API}/api/customer/lock/${id}`, {
                        userId: currentLockStatus
                    });
                    toast.success("Khóa bệnh nhân thành công");
                    setLoading(false)
                    setUpdateShow((prev) => !prev);
                } catch (error) {
                    toast.error("Khóa bệnh nhân thất bại");
                    setLoading(false)
                }
            }
            else {
                setLoading(false)
            }
        });
    };

    return (
        <>
            {loading && <Loading/>}
            <Typography variant="h5" align="center" gutterBottom>DANH SÁCH BỆNH NHÂN TRÊN HỆ THỐNG</Typography>
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
                            <StyledTableCell sx={{ width: 25 }}>KHÓA</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentCustomerList.map((item) => (
                            <StyledTableRow key={item.id}>
                                <StyledTableCell sx={{ width: 10 }} component="th" scope="row">
                                    {item?.id}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {item?.fullName}
                                </StyledTableCell>
                                <StyledTableCell>{item?.dob}</StyledTableCell>
                                <StyledTableCell>{item?.phone}</StyledTableCell>
                                <StyledTableCell>{item?.email}</StyledTableCell>
                                <StyledTableCell>{item?.address}</StyledTableCell>
                                <StyledTableCell>{
                                    item?.gender && (() => {
                                        if (item?.gender == "MALE") {
                                            return "Nam"
                                        }
                                        else if (item?.gender == "FEMALE") {
                                            return "Nữ"
                                        }
                                        else {
                                            return "Khác"
                                        }
                                    })()}
                                </StyledTableCell>
                                <StyledTableCell align="right">
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