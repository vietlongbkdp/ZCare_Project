import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {Chip, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {styled} from "@mui/material/styles";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
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
import {LocalizationProvider} from "@mui/x-date-pickers";
export default function ScheduleCreate() {
    const [dateCreate, setDateCreate] = useState([])
    const [weekday, setWeekday] = useState(["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6","Thứ 7", "Chủ Nhật"])
    const Item = styled(Paper)(({theme}) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    const [isAddTimes, setIsAddTimes] = useState({
        statusAdd: false,
        indexAdd: -1
    })
    const [timeValueStart, setTimeValueStart] = useState(null);
    const [timeValueEnd, setTimeValueEnd] = useState(null);
    const handleDeleteWeekday =(event) =>{
        const strWeekdayDelete = event.target.closest(".chipWeekday").firstChild.innerText
        let listWeekdayUpdate = weekday.filter(item => item !== strWeekdayDelete)
        setWeekday(listWeekdayUpdate)
    }
    function handleDeleteTimes(event) {
        const timeDelete = event.target.closest(".chipTimes").firstChild.innerText;
        const indexSetDelete = parseInt(event.target.closest(".recordDate").firstChild.innerText) - 1;
        const updatedDateCreate = [...dateCreate];
        updatedDateCreate[indexSetDelete].listScheduleTimes = updatedDateCreate[indexSetDelete].listScheduleTimes.filter(item => item.scheduleTimeShow !== timeDelete);
        setDateCreate(updatedDateCreate);
    }
    function handleClickTimes(event) {

    }
    const changeToDate = (milliseconds) => {
        return (milliseconds / 86400000)
    }
    const handleSubmit = (event) =>{
        event.preventDefault()
            const listWeek = weekday
            const listSchedule =[]
            setIsAddTimes({
                statusAdd: false,
                indexAdd: -1
            })
            listWeek.forEach((value)=>{
                listSchedule.push({
                    dayInWeek: value,
                    listScheduleTimes: [],
                    listDetailTimes: []
                })
            })
            setDateCreate(listSchedule)
        }
    const handleClickAddTimes = (event) => {
        setIsAddTimes({
            statusAdd: true,
            indexAdd: parseInt(event.target.closest(".recordDate").firstChild.innerText)-1
        })
    }
    const handleCancelTimeSet =() =>{
        setIsAddTimes({
            statusAdd: false,
            indexAdd: -1
        })
        setTimeValueStart(null)
        setTimeValueEnd(null)
    }
    const handleCreateSche = event => {
        const strTimes = `${event.target.closest(".getTimes").querySelector('.startTimes input').value} - ${event.target.closest(".getTimes").querySelector('.endTimes input').value}`;
        const startTimeGet = timeValueStart;
        const endTimeGet = timeValueEnd;
        const indexSet = parseInt(event.target.closest(".recordDate").firstChild.innerText) - 1;
        const newSchedule = {
            scheduleTimeShow: strTimes,
            scheduleStartTime: startTimeGet,
            scheduleEndTime: endTimeGet
        };
        const updatedDateCreate = [...dateCreate];
        updatedDateCreate[indexSet].listScheduleTimes.push(newSchedule);
        setDateCreate(updatedDateCreate);
        setTimeValueEnd(null)
        setTimeValueStart(null)
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
    console.log(dateCreate)



    return (
        <Container maxWidth="md">
            <Box>
                <Typography variant="h4" component="h4">
                    Taọ lịch khám bệnh
                </Typography>
            </Box>
            <Item>
                <Box component={"form"} onSubmit={(event) =>{handleSubmit(event)}} sx={{mt: 3}}>
                    <Typography variant={"h5"} align={"left"} mb={2}>Bác sĩ: Lê Bá Tường</Typography>
                    <Stack direction={"row"} mt={3} alignItems={"center"}>
                        <FormLabel id="demo-radio-buttons-group-label"
                                   sx={{fontSize: 20, fontWeight: "bold", marginRight: 10}}>Thời lượng mỗi suất
                            khám</FormLabel>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="radioSelectTime"
                                defaultValue={"15"}
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
                    <Stack direction={"row"} mt={3} alignItems={"center"}>
                        <FormLabel id="demo-radio-buttons-group-label"
                                   sx={{fontSize: 20, fontWeight: "bold", marginRight: 5}} mt={2}>Ngày làm việc</FormLabel>
                        <Stack direction={"row"} mt={1} alignItems={"center"} spacing={1}>
                            {weekday.map((value, index) => (
                                <Chip key={index} className={"chipWeekday"} size="medium" variant="outlined"  label={value} onDelete={(event) =>{handleDeleteWeekday(event)}}/>
                            ))}
                        </Stack>
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
                            { dateCreate.map((value, index) =>(
                                <TableRow
                                    key={index}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    className={"recordDate"}>
                                    <TableCell align="center" component="th" scope="row">{index + 1}
                                    </TableCell>
                                    <TableCell align="center">{value.dayInWeek}</TableCell>
                                    <TableCell align="right">
                                        <Stack>
                                            <Stack direction={"row"} spacing={1}>
                                                {dateCreate[index]?.listScheduleTimes?.map((valueTiny, indexTiny) =>(
                                                    <Chip className={"chipTimes"} key={indexTiny} label={valueTiny.scheduleTimeShow} variant="outlined" onDelete={(event) =>{
                                                        handleDeleteTimes(event)
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
                                                ((isAddTimes.statusAdd && (isAddTimes.indexAdd === index)) ? (
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
                                                                    sx={{width: "50px"}}
                                                                    value={timeValueEnd}
                                                                    className={"endTimes"}
                                                                    onAccept={(newValue) => setTimeValueEnd(newValue)}
                                                                />
                                                            </DemoContainer>
                                                        </LocalizationProvider>
                                                        <Button
                                                            sx={{borderRadius: 5, height: 50, margin: "10px"}}
                                                        ><AddCircleIcon
                                                            sx={{fontSize: 30}} color={"success"} onClick={(event) =>{handleCreateSche(event)}}/></Button>
                                                        <Button
                                                            sx={{borderRadius: 5, height: 50, margin: "10px"}}
                                                        ><CancelIcon sx={{fontSize: 30}} color={"error"} onClick={handleCancelTimeSet}/></Button>
                                                    </Stack>
                                                ) : "")
                                            }
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))
                            }

                        </TableBody>
                    </Table>
                </TableContainer>
            </Item>
        </Container>
    )
}