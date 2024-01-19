import React, { useEffect, useState } from 'react';
import { Button, Container, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import axios from 'axios';
import { toast } from "react-toastify";

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
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Tên</TableCell>
                            <TableCell>Số Điện thoại</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Tên phòng khám</TableCell>
                            <TableCell>Địa chỉ</TableCell>
                            <TableCell>Nội dung</TableCell>
                            <TableCell>Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentCooperateList.length > 0 ? (
                            currentCooperateList.map((cooperate) => (
                                <TableRow key={cooperate.id}>
                                    <TableCell>{cooperate.id}</TableCell>
                                    <TableCell>{cooperate.fullName}</TableCell>
                                    <TableCell>{cooperate.phone}</TableCell>
                                    <TableCell>{cooperate.email}</TableCell>
                                    <TableCell>{cooperate.clinicName}</TableCell>
                                    <TableCell>{cooperate.address}</TableCell>
                                    <TableCell>{cooperate.content}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant={cooperate.status === 'SELECTED' ? 'outlined' : 'contained'}
                                            color={cooperate.status === 'SELECTED' ? 'secondary' : 'primary'}
                                            onClick={() => handleClick(cooperate.id)}
                                            disabled={cooperate.status === 'SELECTED'}
                                        >
                                            {cooperate.status === 'SELECTED' ? 'Đã xác nhận' : 'Xác nhận'}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8}>No data available</TableCell>
                            </TableRow>
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