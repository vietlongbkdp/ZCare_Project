import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {styled} from "@mui/material/styles";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {DateRangePicker, LocalizationProvider} from '@mui/x-date-pickers-pro';
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import {useState} from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Stack from "@mui/material/Stack";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
export default function ScheduleCreate(){
    const [dateCreate, setDateCreate] = useState({
        startDateCreate : dayjs().add(1, 'day'),
        endDateCreate: dayjs().add(8, 'day'),
        betweenDateCreate: 0,
        times: "15",
        listBookingDetail: []
    })
    const Item = styled(Paper)(({theme}) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    const changeToDate = (milliseconds) =>{
        return (milliseconds/86400000)
    }
        const handleSubmit = (event) => {
            event.preventDefault();
                const data = new FormData(event.currentTarget)
                const timesInput = parseInt(data.get('selectTime'))
                const dayjs = require('dayjs');
                const startDateString =  event.target[0].defaultValue
                const startDate = dayjs(startDateString, "DD/MM/YYYY").format();
                const endDateString =  event.target[2].defaultValue
                const endDate = dayjs(endDateString, "DD/MM/YYYY").format();
                let betweenDate = changeToDate(Date.parse(endDate) - Date.parse(startDate))
                let listDateGet = []
                for (let i = 0; i <= betweenDate; i++) {
                    listDateGet.push(Date.parse(startDate) + 86400000*i);
                    }
                let listDayTrans = []
                listDateGet.forEach(item => {
                        let dateShow = `${dayjs(item).date()}/${dayjs(item).month() +1}/${dayjs(item).year()}`
                    listDayTrans.push({
                        dateCurrent: dayjs(item),
                        dateShow: dateShow,
                        listBooking: [],
                        listHourSet: []
                    })
                })
                if((Date.parse(startDate) - dayjs()) > 0){
                    setDateCreate({
                        endDateCreate: Date.parse(endDate),
                        startDateCreate: Date.parse(startDate),
                        betweenDateCreate: betweenDate,
                        times: timesInput,
                        listBookingDetail: listDayTrans
                    })
                }else{
                    alert("Chọn ngày không hợp lệ, hãy bắt đầu từ ngày mai!!")
                }
        };
    console.log(dateCreate)
    return(
            <Container maxWidth="md">
                <Box>
                    <Typography variant="h4" component="h4">
                        Taọ lịch khám bệnh
                    </Typography>
                </Box>
                <Item>
                        <Box component={"form"} onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Typography variant={"h5"} align={"left"} mb={2}>Bác sĩ: Lê Bá Tường</Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateRangePicker']}>
                                    <DateRangePicker
                                        localeText={{ start: 'Từ ngày', end: 'Đến ngày ' }}
                                        name="dateStart"
                                        defaultValue={[dayjs(dateCreate.startDateCreate), dayjs(dateCreate.endDateCreate)]}
                                        format={'DD/MM/YYYY'}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                            <Stack direction={"row"} mt={3} alignItems={"center"}>
                                <FormLabel id="demo-radio-buttons-group-label" sx={{fontSize: 20, fontWeight: "bold", marginRight: 10}}>Thời lượng mỗi suất khám</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        aria-labelledby="radioSelectTime"
                                        defaultValue= {dateCreate.times}
                                        name="selectTime"
                                        row
                                    >
                                        <FormControlLabel value="15" control={<Radio />} label="15 phút" />
                                        <FormControlLabel value="30" control={<Radio />} label="30 phút" />
                                        <FormControlLabel value="45" control={<Radio />} label="45 phút" />
                                        <FormControlLabel value="60" control={<Radio />} label="60 phút" />
                                    </RadioGroup>
                                </FormControl>
                            </Stack>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 5, mb: 1, alignItems: "left"}}
                            >
                                Create Schedule
                            </Button>
                        </Box>
                </Item>
                <Item>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                        <TableCell align="center">STT</TableCell>
                                    <TableCell align="center">Ngày khám</TableCell>
                                    <TableCell align="center">Chọn khoảng thời gian</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dateCreate.listBookingDetail.map((value, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center" component="th" scope="row">{index +1}
                                        </TableCell>
                                        <TableCell align="center">{value.dateShow}</TableCell>
                                        <TableCell align="right">
                                            <Button sx={{borderRadius: 10}}><AddIcon sx={{ fontSize: 20 }}/></Button>
                                        </TableCell>
                                    </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Item>
            </Container>
    )
}