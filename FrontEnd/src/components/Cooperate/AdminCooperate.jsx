import React, { useEffect, useState } from 'react';
import { Button, Container, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import axios from 'axios';
import {toast } from "react-toastify";
import {styled} from "@mui/material/styles";
import {tableCellClasses} from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";

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

    useEffect(() => {
        const getAllCooperate = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/cooperate');
                setCooperateList(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        getAllCooperate();
    }, [currentPage]);

    const handleClick = async (id) => {
        try {
            await axios.get(`http://localhost:8080/api/cooperate/${id}`);
            toast.success("Xác nhận thành công");
        } catch (error) {
            console.error(error);
        }
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentCooperateList = cooperateList.slice(startIndex, endIndex);

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4, mb: 5, pb: 5 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Danh sách hợp tác cùng ZCare
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
                                            disabled={cooperate.status === 'SELECTED'}
                                        >
                                            {cooperate.status === 'SELECTED' ? 'Đã xác nhận' : 'Xác nhận'}
                                        </Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))
                        ) : (
                            <StyledTableRow>
                                <StyledTableCell colSpan={8}>No data available</StyledTableCell>
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
        </Container>
    );
}

export default AdminCooperate;