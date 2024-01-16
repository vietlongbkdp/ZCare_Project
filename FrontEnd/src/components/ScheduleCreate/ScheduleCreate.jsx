import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {Chip, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {styled} from "@mui/material/styles";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
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
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';

export default function ScheduleCreate() {
    const [dateCreate, setDateCreate] = useState({
        startDateCreate: dayjs().add(1, 'day'),
        endDateCreate: dayjs().add(8, 'day'),
        betweenDateCreate: 0,
        times: "15",
        listBookingDetail: []
    })
    const [isAddTimes, setIsAddTimes] = useState({
        statusAdd: false,
        indexAdd: -1
    })
    const Item = styled(Paper)(({theme}) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    const [timeValueStart, setTimeValueStart] = useState(dayjs());
    const [timeValueEnd, setTimeValueEnd] = useState(dayjs());
    const changeToDate = (milliseconds) => {
        return (milliseconds / 86400000)
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget)
        const timesInput = parseInt(data.get('selectTime'))
        const dayjs = require('dayjs');
        const startDateString = event.target[0].defaultValue
        const startDate = dayjs(startDateString, "DD/MM/YYYY").format();
        const endDateString = event.target[2].defaultValue
        const endDate = dayjs(endDateString, "DD/MM/YYYY").format();
        let betweenDate = changeToDate(Date.parse(endDate) - Date.parse(startDate))
        let listDateGet = []
        for (let i = 0; i <= betweenDate; i++) {
            listDateGet.push(Date.parse(startDate) + 86400000 * i);
        }
        let listDayTrans = []
        listDateGet.forEach(item => {
            let dateShow = `${dayjs(item).date()}/${dayjs(item).month() + 1}/${dayjs(item).year()}`
            listDayTrans.push({
                dateCurrent: dayjs(item),
                dateShow: dateShow,
                listHourSet: []
            })
        })
        if ((Date.parse(startDate) - dayjs()) > 0) {
            setDateCreate({
                endDateCreate: Date.parse(endDate),
                startDateCreate: Date.parse(startDate),
                betweenDateCreate: betweenDate,
                times: timesInput,
                listBookingDetail: listDayTrans
            })
        } else {
            alert("Chọn ngày không hợp lệ, hãy bắt đầu từ ngày mai!!")
        }
    };
    const handleClickAddTimes = (event) => {
        setIsAddTimes({
            statusAdd: true,
            indexAdd: parseInt(event.target.closest(".recordDate").firstChild.innerText)-1
        })}
    const handleCancelTimeSet =() =>{
        setIsAddTimes({
            statusAdd: false,
            indexAdd: -1
        })
    }
    const getDetailByDuringTimes = (starTimes, endTimes, betweenTimes) =>{
        let countDetails = Math.floor((endTimes - starTimes)/(betweenTimes * 1000 *60))
        let listTimeDetails = []
        for (let i=0; i<countDetails; i++){
            let timeStartDetail = starTimes.add((betweenTimes * (i)), 'minute')
            let timeEndDetail = starTimes.add((betweenTimes * (i+1)), 'minute')
            listTimeDetails.push({
                timeDetailShow: `${dayjs(timeStartDetail).format('HH:mm')} - ${dayjs(timeEndDetail).format('HH:mm')}`
            })
        }
        return listTimeDetails
    }
    // const handleAddTimeSet = (event) =>{
    //     let strTimes = `${event.target.closest(".getTimes").querySelector('.startTimes input').value} - ${event.target.closest(".getTimes").querySelector('.endTimes input').value}`
    //     const indexSet = parseInt(event.target.closest(".recordDate").firstChild.innerText) -1
    //     const listTimeDetail =[]
    //     const startTimeGet = timeValueStart
    //     const endTimeGet = timeValueEnd
    //     setDateCreate({
    //         ...dateCreate,
    //         listBookingDetail: [
    //             ...dateCreate.listBookingDetail,
    //             dateCreate.listBookingDetail[indexSet] : {
    //     ...dateCreate.listBookingDetail[indexSet],
    //             dateCreate.listBookingDetail[indexSet].listHourSet: {
    //                 hourSetShow: dateCreate.listBookingDetail[indexSet].listHourSet.push(strTimes),
    //                 startTimeGet
    //                 endTimeGet
    //                 listDetail : listTimeDetail
    //         }
    //     }
    // ]
    // })
    //     setIsAddTimes({
    //         statusAdd: false,
    //         indexAdd: -1
    //     })
    // };
    const handleAddTimeSet = (event) => {
        const strTimes = `${event.target.closest(".getTimes").querySelector('.startTimes input').value} - ${event.target.closest(".getTimes").querySelector('.endTimes input').value}`;
        const startTimeGet = timeValueStart
        const endTimeGet = timeValueEnd
        const indexSet = parseInt(event.target.closest(".recordDate").firstChild.innerText)-1;

        const updatedListBookingDetail = [...dateCreate.listBookingDetail];
        const updatedListHourSet = [...updatedListBookingDetail[indexSet].listHourSet, strTimes];

        updatedListBookingDetail[indexSet] = {
            ...updatedListBookingDetail[indexSet],
            listHourSet: updatedListHourSet
        };

        setDateCreate({
            ...dateCreate,
            listBookingDetail: updatedListBookingDetail
        });
        console.log(getDetailByDuringTimes(startTimeGet, endTimeGet, dateCreate.times))
    };
    const handleDeleteTimes = (event) =>{
        const timeDelete = event.target.closest(".chipTimes").firstChild.innerText;
        const indexSetDelete = parseInt(event.target.closest(".recordDate").firstChild.innerText) - 1;
        const updatedListBookingDetail = [...dateCreate.listBookingDetail];
        const updatedListHourSet = updatedListBookingDetail[indexSetDelete].listHourSet.filter(item => item !== timeDelete);

        updatedListBookingDetail[indexSetDelete] = {
            ...updatedListBookingDetail[indexSetDelete],
            listHourSet: updatedListHourSet
        };

        setDateCreate({
            ...dateCreate,
            listBookingDetail: updatedListBookingDetail
        });
    }
    const handleClickTimes =(event) =>{
        console.log(event.target.closest(".chipTimes").firstChild.innerText)
    }
    console.log(dateCreate)
    return (
        <Container maxWidth="md">
            <Box>
                <Typography variant="h4" component="h4">
                    Taọ lịch khám bệnh
                </Typography>
            </Box>
            <Item>
                <Box component={"form"} onSubmit={handleSubmit} sx={{mt: 3}}>
                    <Typography variant={"h5"} align={"left"} mb={2}>Bác sĩ: Lê Bá Tường</Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateRangePicker']}>
                            <DateRangePicker
                                localeText={{start: 'Từ ngày', end: 'Đến ngày '}}
                                name="dateStart"
                                defaultValue={[dayjs(dateCreate.startDateCreate), dayjs(dateCreate.endDateCreate)]}
                                format={'DD/MM/YYYY'}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    <Stack direction={"row"} mt={3} alignItems={"center"}>
                        <FormLabel id="demo-radio-buttons-group-label"
                                   sx={{fontSize: 20, fontWeight: "bold", marginRight: 10}}>Thời lượng mỗi suất
                            khám</FormLabel>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="radioSelectTime"
                                defaultValue={dateCreate.times}
                                name="selectTime"
                                row
                            >
                                <FormControlLabel value="15" control={<Radio/>} label="15 phút"/>
                                <FormControlLabel value="30" control={<Radio/>} label="30 phút"/>
                                <FormControlLabel value="45" control={<Radio/>} label="45 phút"/>
                                <FormControlLabel value="60" control={<Radio/>} label="60 phút"/>
                            </RadioGroup>
                        </FormControl>
                    </Stack>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{mt: 5, mb: 1, alignItems: "left"}}
                    >
                        Create Schedule
                    </Button>
                </Box>
            </Item>
            <Item>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
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
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    className={"recordDate"}
                                >
                                    <TableCell align="center" component="th" scope="row">{index + 1}
                                    </TableCell>
                                    <TableCell align="center">{value.dateShow}</TableCell>
                                    <TableCell align="right">
                                        <Stack>
                                            <Stack direction={"row"} spacing={1}>
                                                {dateCreate.listBookingDetail[index].listHourSet.map((valueTiny, indexTiny) =>(
                                                    <Chip className={"chipTimes"} key={indexTiny} label={valueTiny} variant="outlined" onDelete={(event) =>{
                                                        handleDeleteTimes(event)
                                                    }} onClick={(event) =>{
                                                        handleClickTimes(event)
                                                    }}/>
                                                ))}
                                                <Button
                                                    sx={{borderRadius: 10}}
                                                    onClick={(event) => {
                                                        handleClickAddTimes(event)
                                                    }
                                                    }
                                                ><AddIcon sx={{fontSize: 20}}/></Button>
                                            </Stack>
                                            {
                                                (isAddTimes.statusAdd && (isAddTimes.indexAdd === index)?(
                                            <Stack direction={"row"}  className={"getTimes"}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer components={['TimePicker', 'TimePicker']} >
                                                    <TimePicker
                                                        label="Giờ bắt đầu"
                                                        sx={{width: "50px"}}
                                                        value={timeValueStart}
                                                        onAccept={(newValue) => setTimeValueStart(newValue)}
                                                        className={"startTimes"}
                                                    />
                                                    <TimePicker
                                                        label="Giờ kết thúc"
                                                        defaultValue={timeValueEnd}
                                                        sx={{width: "50px"}}
                                                        className={"endTimes"}
                                                        onAccept={(newValue) => setTimeValueEnd(newValue)}
                                                    />
                                                </DemoContainer>
                                            </LocalizationProvider>
                                            <Button
                                                sx={{borderRadius: 5, height: 50, margin: "10px"}}
                                                onClick={(event) =>{
                                                    handleAddTimeSet(event)
                                                }}
                                            ><AddCircleIcon
                                                sx={{fontSize: 30}} color={"success"}/></Button>
                                            <Button
                                                sx={{borderRadius: 5, height: 50, margin: "10px"}}
                                                onClick={handleCancelTimeSet}
                                            ><CancelIcon sx={{fontSize: 30}} color={"error"}/></Button>
                                            </Stack>
                                                ) : "")}
                                    </Stack>
                                </TableCell>
                                </TableRow>
                                )
                                )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Item>
        </Container>
    )
}