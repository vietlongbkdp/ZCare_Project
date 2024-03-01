import React, {useContext, useEffect, useState} from 'react';
import { Button, Container, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import axios from 'axios';
import {toast } from "react-toastify";
import {styled} from "@mui/material/styles";
import {tableCellClasses} from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
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
function AdminCooperate() {
    const [cooperateList, setCooperateList] = useState([]);
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const { API } = useContext(ApiContext)
    useEffect(() => {
        const getAllCooperate = async () => {
            try {
                const response = await axios.get(`${API}/api/cooperate`);
                const sortedData = response.data.sort((a, b) => b.id - a.id);
                setCooperateList(sortedData);
                setLoading(false)
            } catch (error) {
                console.error(error);
                setLoading(false)
            }
        };
        getAllCooperate();
    }, [currentPage, loading]);

    const handleClick = async (id) => {
        setLoading(true)
        try {
            const res = await axios.get(`${API}/api/cooperate/${id}`);
            if (res.status === 200) {
                toast.success("Xác nhận thành công");
                setLoading(false)
            }
        } catch (error) {
            console.error(error);
            setLoading(false)
        }
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentCooperateList = cooperateList.slice(startIndex, endIndex);

    return (
        <>
            {loading && <Loading/>}
            <Typography variant="h5" align="center" gutterBottom>
                DANH SÁCH HỢP TÁC CÙNG ZCARE
            </Typography>
            <TableContainer component={Paper}>
                <Table  sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>#</StyledTableCell>
                            <StyledTableCell>Tên</StyledTableCell>
                            <StyledTableCell>Số Điện thoại</StyledTableCell>
                            <StyledTableCell>Email</StyledTableCell>
                            <StyledTableCell>Tên phòng khám</StyledTableCell>
                            <StyledTableCell>Địa chỉ</StyledTableCell>
                            <StyledTableCell>Nội dung</StyledTableCell>
                            <StyledTableCell>Hành động</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentCooperateList.length > 0 ? (
                            currentCooperateList.map((cooperate) => (
                                <StyledTableRow key={cooperate.id}>
                                    <StyledTableCell>{cooperate.id}</StyledTableCell>
                                    <StyledTableCell>{cooperate.fullName}</StyledTableCell>
                                    <StyledTableCell>{cooperate.phone}</StyledTableCell>
                                    <StyledTableCell>{cooperate.email}</StyledTableCell>
                                    <StyledTableCell>{cooperate.clinicName}</StyledTableCell>
                                    <StyledTableCell>{cooperate.address}</StyledTableCell>
                                    <StyledTableCell>{cooperate.content}</StyledTableCell>
                                    <StyledTableCell>
                                        <Button
                                            variant={cooperate.status === 'SELECTED' ? 'outlined' : 'contained'}
                                            color={cooperate.status === 'SELECTED' ? 'secondary' : 'primary'}
                                            onClick={() => handleClick(cooperate.id)}
                                            type='button'
                                            disabled={cooperate.status === 'SELECTED'}
                                        >
                                            {cooperate.status === 'SELECTED' ? 'Đã xác nhận' : 'Xác nhận'}
                                        </Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))
                        ) : (
                            <StyledTableRow>
                                <StyledTableCell colSpan={8}>Không có danh sách đặt khám</StyledTableCell>
                            </StyledTableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                count={Math.ceil(cooperateList.length / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                showFirstButton
                showLastButton
                style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}
            />
        </>
    );
}

export default AdminCooperate;