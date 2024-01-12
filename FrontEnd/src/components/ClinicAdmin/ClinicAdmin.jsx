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
import {useEffect, useState} from "react";
import axios from "axios";
import AddModal from "./AddModal";
import EditModal from "./EditModal"
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';



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

export default function CustomizedTables() {

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [isupdate, setIsupdate] = useState(false);
    const [editClinic, setEditClinic] = useState(null)
   const [clinicList, setClinicList] = useState([]);
    const [clinicID, setClinicID] = useState()
    useEffect(() => {
        const getClinics = async () => {
            try{
                const response = await axios.get('http://localhost:8080/api/clinic');
                    setClinicList(response.data);
            }catch (error){
                console.error(error);
            }

        }
        getClinics();
    }, [isupdate]);

    const handleShowClinic = () => {
        setShowAddModal(true);
    }

    const handEditID= (id) => {
        setClinicID(id);
        setShowEditModal(true)
        // const clinic = clinicList.find(item => item.id===id);
        // setEditClinic(clinic)
    }
    return (
       <>
           {showEditModal && <EditModal
               setShow={setShowEditModal}
               setISupdate={setIsupdate}
               clinicId = {clinicID}
           />}
           <Box sx={{maxWidth: 1000}}>
               <Button
                   type="submit"
                   variant="contained"
                   sx={{ mt: 3, mb: 1}}
                   onClick={handleShowClinic}
               >
                   Create
               </Button>
               {showAddModal && <AddModal
                   setShow = {setShowAddModal}
                   setISupdate = {setIsupdate}
               />}

               <TableContainer component={Paper}>
                   <Table sx={{ minWidth: 700 }} aria-label="customized table">
                       <TableHead>
                           <TableRow>
                               <StyledTableCell sx={{width: 10}}>#</StyledTableCell>
                               <StyledTableCell align="right">FULLNAME</StyledTableCell>
                               <StyledTableCell align="right">ADDRESS</StyledTableCell>
                               <StyledTableCell align="right">INFORMATION</StyledTableCell>
                               <StyledTableCell align="right">LOGO</StyledTableCell>
                               <StyledTableCell align="right">ACTION</StyledTableCell>
                           </TableRow>
                       </TableHead>
                       <TableBody>
                           {clinicList.map((item) => (
                               <StyledTableRow key={item.id}>
                                   <StyledTableCell sx={{width: 10}} component="th" scope="row">
                                       {item.id}
                                   </StyledTableCell>
                                   <StyledTableCell align="right">{item.clinicName}</StyledTableCell>
                                   <StyledTableCell align="right">{item.address}</StyledTableCell>
                                   <StyledTableCell align="right">{item.clinicInfor}</StyledTableCell>
                                   <StyledTableCell align="right">
                                       <img src={item.clinicLogo} alt="Clinic Logo" style={{width: '50px', height: '50px'}}/>
                                   </StyledTableCell>
                                   <StyledTableCell align="right" >
                                       <Stack direction="row" spacing={1} justifyContent="flex-end">
                                           <Button variant="contained" onClick={()=>handEditID(item.id)} sx={{width: 5}}><i className="fa-solid fa-pen-to-square"></i>
                                           </Button>
                                           <Button variant="outlined" startIcon={<DeleteIcon />} sx={{ marginLeft: 'auto' }}>
                                           </Button>
                                       </Stack>
                                   </StyledTableCell>
                               </StyledTableRow>
                           ))}
                       </TableBody>
                   </Table>
               </TableContainer>
           </Box>
       </>
    );
}