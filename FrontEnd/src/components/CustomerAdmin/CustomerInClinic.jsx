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
import { Pagination, TextField, Typography } from "@mui/material";
import Loading from "../Loading/Loading";
import Cookies from "js-cookie";
import BookingListCustomerInClinic from "./BookingListCustomerInClinic";
import './customer.css';
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
function CustomerInClinic() {
    const itemsPerPage = 7;
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const [customerList, setCustomerList] = useState([]);
    const [updateShow, setUpdateShow] = useState(false);
    const [showCustomer, setShowCustomer] = useState(true);
    const [showBookingList, setShowBookingList] = useState(false);
    const [loading, setLoading] = useState(true);
    const [clinicId, setClinicId] = useState();
    const [customerId, setCustomerId] = useState();
    const userId = Cookies.get('userId');
    const [searchText, setSearchText] = useState('');
    const [search, setSearch] = useState(true)
    const { API } = useContext(ApiContext)
    const handleSearch = () => {
        setSearch(!search);
    };

    const handleChange = (event) => {
        setSearchText(event.target.value);
    };

    useEffect(() => {
        const getCustomers = async () => {
            try {
                const response = await axios.get(`${API}/api/customer/clinic/${userId}`,
                    { params: { searchText } }
                );
                const result = await response.data;
                result.map(cus => {
                    const [year, month, day] = cus.dob;
                    cus.dob = new Date(year, month - 1, day).toLocaleDateString('en-GB');;
                });
                setCustomerList(result);
                setLoading(false)
            } catch (error) {
                console.error(error);
                setLoading(false)
            }
        }
        getCustomers();
    }, [updateShow, currentPage, search]);

    useEffect(() => {
        const getClinic = async () => {
            try {
                const response = await axios.get(`${API}/api/user/userlogin/${userId}`)
                const result = await response.data;
                setClinicId(result.id)
            } catch (error) {
                console.error(error);
                setLoading(false)
            }
        }
        getClinic();
    }, [])

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

    const handleShowBookingHistory = async (customerId) => {
        setCustomerId(customerId);
        setShowBookingList(true);
        setShowCustomer(false);
    }

    const handleHideBookingHistory = () => {
        setShowBookingList(false);
        setShowCustomer(true);
    }

    return (
        <>
            {loading && <Loading />}
            {showBookingList && <BookingListCustomerInClinic
                customerId={customerId}
                clinicId={clinicId}
                handleHideBookingHistory={handleHideBookingHistory} />}
            {showCustomer &&
                <>
                    <Typography variant="h5" align="center" gutterBottom>DANH SÁCH BỆNH NHÂN TRÊN HỆ THỐNG</Typography>
                    <div style={{ marginBottom: '10px', height: '40px' }}>
                        <TextField
                            label="Tìm kiếm bệnh nhân"
                            value={searchText}
                            variant="outlined"
                            onChange={handleChange}
                            inputProps={{ style: { height: '9px' } }}
                            sx={{ marginRight: '5px', width: '300px' }}
                        />
                        <Button variant="contained" color="secondary" onClick={handleSearch} sx={{ height: '41.6px' }}>Tìm kiếm</Button>
                    </div>
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
                                    <StyledTableCell sx={{ width: 25 }}>LỊCH SỬ KHÁM</StyledTableCell>
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
                                                color='primary'
                                                onClick={() => handleShowBookingHistory(item.id)}
                                            >
                                                <i className="fa-solid fa-list"></i>
                                            </Button>
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
                </>}
        </>
    )
}

export default CustomerInClinic;