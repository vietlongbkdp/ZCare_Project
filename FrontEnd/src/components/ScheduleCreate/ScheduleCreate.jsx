import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Chip, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import React, {useContext, useEffect, useState} from "react";
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
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from "@mui/x-date-pickers";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";
import {ApiContext} from "../ApiContext/ApiProvider";

export default function ScheduleCreate({ doctorId, handleShowDoctorInClinic, setShowSchedule }) {
    const [dateCreate, setDateCreate] = useState([])
    const [loadPage, setLoadPage] = useState(false)
    const [weekday, setWeekday] = useState(["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"])
    const Item = styled(Paper)(({ theme }) => ({
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
    const [betweenTime, setBetweenTime] = useState("30")
    const [loading, setLoading] = useState(true);
    const { API } = useContext(ApiContext)
    const handleDeleteWeekday = (event) => {
        const strWeekdayDelete = event.target.closest(".chipWeekday").firstChild.innerText
        let listWeekdayUpdate = weekday.filter(item => item !== strWeekdayDelete)
        setWeekday(listWeekdayUpdate)
    }

    function sortObjectsByWeekdayAndTime(objects) {
        const weekdays = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];

        objects.sort((a, b) => {
            const weekdayA = weekdays.indexOf(a.weekday);
            const weekdayB = weekdays.indexOf(b.weekday);

            if (weekdayA !== weekdayB) {
                return weekdayA - weekdayB;
            }

            const timeA = a.timeItem.split(" - ")[0];
            const timeB = b.timeItem.split(" - ")[0];

            return timeA.localeCompare(timeB);
        });

        return objects;
    }

    useEffect(() => {
        const getScheduleAPI = async () => {
            try {
                const response = await axios.get(`${API}/api/schedule/` + doctorId);
                const scheduleGet = sortObjectsByWeekdayAndTime(response.data)
                let listTimeDetails = []
                let strTemp = "temp"
                scheduleGet.forEach((index) => {
                    if (scheduleGet.length > 0 && strTemp !== index.weekday) {
                        strTemp = index.weekday
                        listTimeDetails.push({
                            dayInWeek: index.weekday,
                            listScheduleTimes: [],
                            listDetailTimes: []
                        })
                    }
                })
                listTimeDetails.forEach((index) => {
                    let listDetailPush = []
                    scheduleGet.forEach((item) => {
                        if (item.weekday === index.dayInWeek) {
                            listDetailPush.push({
                                timeDetailShow: item.timeItem
                            })
                        }
                    })
                    index.listDetailTimes = listDetailPush
                })
                setDateCreate(listTimeDetails)
                setLoading(false)
            } catch (error) {
                console.error(error);
                setLoading(false)
            }
        }
        getScheduleAPI();
    }, [loadPage])
    const checkExistingWeekday = (weekdayItem, listItemWeekday) => {
        let flag = false
        if (listItemWeekday.length === 0) {
            return flag
        } else {
            listItemWeekday.forEach((item) => {
                if (weekdayItem === item) {
                    flag = true
                }
            })
            return flag
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        const listWeek = weekday
        const listWeekdayExist = []
        dateCreate.forEach((item) => {
            listWeekdayExist.push(item.dayInWeek)
        })
        const listSchedule = dateCreate
        setIsAddTimes({
            statusAdd: false,
            indexAdd: -1
        })
        setWeekday(["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"])
        listWeek.forEach((value) => {
            if (!checkExistingWeekday(value, listWeekdayExist)) {
                listSchedule.push({
                    dayInWeek: value,
                    listScheduleTimes: [],
                    listDetailTimes: []
                })
            }
        })
        setDateCreate(listSchedule)
    }
    const handleClickAddTimes = (event) => {
        setIsAddTimes({
            statusAdd: true,
            indexAdd: parseInt(event.target.closest(".recordDate").firstChild.innerText) - 1
        })
    }
    const handleCancelTimeSet = () => {
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
        if ((startTimeGet === null) || (endTimeGet === null)) {
            toast.error("Quy trình chọn giờ chưa đúng, hãy chọn thơì gian rồi bấm OK để lưu!")
        } else {
            if ((endTimeGet - startTimeGet) < (parseInt(betweenTime) * 60000)) {
                toast.error("Lựa chọn thời gian không hợp lệ!")
            } else {
                const indexSet = parseInt(event.target.closest(".recordDate").firstChild.innerText) - 1;
                const newSchedule = {
                    scheduleTimeShow: strTimes,
                    scheduleStartTime: startTimeGet,
                    scheduleEndTime: endTimeGet
                };
                let flag = false
                const listDetailTimesNew = getDetailByDuringTimes(startTimeGet, endTimeGet, betweenTime)
                const updatedDateCreate = [...dateCreate];
                updatedDateCreate[indexSet].listScheduleTimes.push(newSchedule);
                listDetailTimesNew.forEach((item) => {
                    if (!checkExistTimeDetail(item, dateCreate[indexSet].listDetailTimes)) {
                        updatedDateCreate[indexSet].listDetailTimes.push(item);
                        setDateCreate(updatedDateCreate);
                        setTimeValueEnd(null);
                        setTimeValueStart(null);
                        setIsAddTimes({
                            statusAdd: false,
                            indexAdd: -1
                        });
                    } else {
                        flag = true
                    }
                })
                if (flag) {
                    toast.error("Có xung đột thời gian, vui lòng kiểm tra lại, hệ thống đã tự động bỏ đi lịch khám bị xung đột")
                }
            }
        }
    }
    const handleDeleteDetail = async (event) => {
        const detailDelete = event.target.closest(".chipDetail").firstChild.innerText;
        const indexSetDelete = parseInt(event.target.closest(".recordDate").firstChild.innerText) - 1
        const dataDeleteItem = {
            doctorId: doctorId,
            weekday: dateCreate[indexSetDelete].dayInWeek,
            detailTime: detailDelete
        }
        console.log(dataDeleteItem)
        const resp = await axios.delete(`${API}/api/schedule/delete`, { data: dataDeleteItem })
        if (resp.status === 200) {
            const updatedDateCreate = [...dateCreate];
            updatedDateCreate[indexSetDelete].listDetailTimes = updatedDateCreate[indexSetDelete].listDetailTimes.filter(item => item.timeDetailShow !== detailDelete);
            setDateCreate(updatedDateCreate);
            toast.success("Xoá thành công")
        } else {
            toast.error("Xoá thất bại")
        }
    }
    const handleChangeTimes = event => {
        setBetweenTime(event.target.value)
    }
    const convertStringDetailToNumDetail = (strTimeDetail) => {
        let arrTime = strTimeDetail.split(":")
        return parseInt(arrTime[0] + arrTime[1])
    }
    const convertStringTimeToArrNumberTime = (strTimes) => {
        let arrStr = strTimes.split(" - ")
        return [convertStringDetailToNumDetail(arrStr[0]), convertStringDetailToNumDetail(arrStr[1])]

    }
    const checkExistTimeDetail = (strDetail, listItemDetail) => {
        const arrStrDetail = convertStringTimeToArrNumberTime(strDetail.timeDetailShow);
        for (let i = 0; i < listItemDetail.length; i++) {
            if ((arrStrDetail[0] > convertStringTimeToArrNumberTime(listItemDetail[i].timeDetailShow)[0] && arrStrDetail[0] < convertStringTimeToArrNumberTime(listItemDetail[i].timeDetailShow)[1])
                || (arrStrDetail[1] > convertStringTimeToArrNumberTime(listItemDetail[i].timeDetailShow)[0] && arrStrDetail[1] < convertStringTimeToArrNumberTime(listItemDetail[i].timeDetailShow)[1])
                || (arrStrDetail[0] <= convertStringTimeToArrNumberTime(listItemDetail[i].timeDetailShow)[0] && arrStrDetail[1] >= convertStringTimeToArrNumberTime(listItemDetail[i].timeDetailShow)[1])) {
                return true
            }
        }
        return false

    }
    const handleSaveSchedule = async () => {
        setLoading(true)
        const listScheduleGet = []
        dateCreate.map((item) => (
            listScheduleGet.push({
                weekdayGet: item.dayInWeek,
                detailTime: item.listDetailTimes
            })
        ))
        const data = {
            doctorId: doctorId,
            listSchedule: listScheduleGet
        };
        let countItem = 0
        dateCreate.forEach((detail) => {
            if (detail.listDetailTimes.length !== 0) {
                countItem++;
            }
        });
        if (countItem === 0) {
            toast.error("Lịch đang trống, vui lòng kiểm tra lại")
            setLoading(false)
        } else {
            const resp = await axios.post(`${API}/api/schedule/create`, data)
            if (resp.status === 200) {
                setDateCreate([])
                setLoadPage(prevState => !prevState)
                setWeekday(["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"])
                toast.success("Lưu thành công");
                setLoading(false)
                handleCloseSchedule();
                handleCancelTimeSet();
            } else {
                toast.error("Lưu thất bại")
                setLoading(false)
            }
        }
    }
    const getDetailByDuringTimes = (starTimes, endTimes, betweenTimes) => {
        let countDetails = Math.floor((endTimes - starTimes) / (betweenTimes * 1000 * 60))
        let listTimeDetails = []
        for (let i = 0; i < countDetails; i++) {
            let timeStartDetail = starTimes.add((betweenTimes * (i)), 'minute')
            let timeEndDetail = starTimes.add((betweenTimes * (i + 1)), 'minute')
            listTimeDetails.push({
                timeDetailShow: `${dayjs(timeStartDetail).format('HH:mm')} - ${dayjs(timeEndDetail).format('HH:mm')}`
            })
        }
        return listTimeDetails
    }

    const handleCloseSchedule = () => {
        setShowSchedule(false)
        handleShowDoctorInClinic()
    }
    return (
        <>
        {loading && <Loading/>}
        <Container maxWidth="md">
            <Item>
                <Box component={"form"} onSubmit={(event) => {
                    handleSubmit(event)
                }}>
                    <Typography variant="h5" fontWeight={"bold"} textAlign='center' component="h2">
                        TẠO LỊCH KHÁM BỆNH
                    </Typography>
                    <Stack direction={"row"} mt={3} alignItems={"center"}>
                        <FormLabel id="demo-radio-buttons-group-label"
                            sx={{ fontSize: 20, fontWeight: "bold", marginRight: 10 }}>Thời lượng mỗi suất
                            khám</FormLabel>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="radioSelectTime"
                                value={betweenTime}
                                name="selectTime"
                                row
                                onChange={(event) => {
                                    handleChangeTimes(event)
                                }}
                            >
                                <FormControlLabel value="15" control={<Radio />} label="15 phút" />
                                <FormControlLabel value="30" control={<Radio />} label="30 phút" />
                                <FormControlLabel value="45" control={<Radio />} label="45 phút" />
                                <FormControlLabel value="60" control={<Radio />} label="60 phút" />
                            </RadioGroup>
                        </FormControl>
                    </Stack>
                    <Stack direction={"row"} mt={3} alignItems={"center"}>
                        <FormLabel id="demo-radio-buttons-group-label"
                            sx={{ fontSize: 20, fontWeight: "bold", marginRight: 5 }} mt={2}>Ngày làm
                            việc</FormLabel>
                        <Stack direction={"row"} mt={1} alignItems={"center"} spacing={1}>
                            {weekday.map((value, index) => (
                                <Chip key={index} className={"chipWeekday"} size="medium" variant="outlined"
                                    label={value} onDelete={(event) => {
                                        handleDeleteWeekday(event)
                                    }} />
                            ))}
                        </Stack>
                    </Stack>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 5, mb: 1, alignItems: "left" }}
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
                            {dateCreate.map((value, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    className={"recordDate"}>
                                    <TableCell align="center" component="th" scope="row">{index + 1}
                                    </TableCell>
                                    <TableCell align="center">{value.dayInWeek}</TableCell>
                                    <TableCell align="right">
                                        <Stack>
                                            <Stack direction={"row"} spacing={1}>
                                                <Button
                                                    sx={{ borderRadius: 10 }}
                                                    onClick={(event) => {
                                                        handleClickAddTimes(event)
                                                    }
                                                    }
                                                ><AddIcon sx={{ fontSize: 20 }} />Add</Button>
                                            </Stack>
                                            <Stack direction={"row"} mt={2} flexWrap="wrap">
                                                {dateCreate[index]?.listDetailTimes?.map((valueDetail, indexDetail) => (
                                                    <Chip className={"chipDetail"} key={indexDetail} color={"primary"}
                                                        sx={{ marginTop: 1, marginRight: 1 }}
                                                        label={valueDetail.timeDetailShow} variant="filled"
                                                        onDelete={(event) => {
                                                            handleDeleteDetail(event)
                                                        }} />
                                                ))}
                                            </Stack>
                                            {
                                                ((isAddTimes.statusAdd && (isAddTimes.indexAdd === index)) ? (
                                                    <Stack direction={"row"} className={"getTimes"}>
                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <DemoContainer components={['TimePicker', 'TimePicker']}>
                                                                <TimePicker
                                                                    label="Giờ bắt đầu"
                                                                    sx={{ width: "50px" }}
                                                                    value={timeValueStart}
                                                                    onAccept={(newValue) => setTimeValueStart(newValue)}
                                                                    className={"startTimes"}
                                                                />
                                                                <TimePicker
                                                                    label="Giờ kết thúc"
                                                                    sx={{ width: "50px" }}
                                                                    value={timeValueEnd}
                                                                    className={"endTimes"}
                                                                    onAccept={(newValue) => setTimeValueEnd(newValue)}
                                                                />
                                                            </DemoContainer>
                                                        </LocalizationProvider>
                                                        <Button
                                                            sx={{ borderRadius: 5, height: 50, margin: "10px" }}
                                                        ><AddCircleIcon
                                                                sx={{ fontSize: 30 }} color={"success"} onClick={(event) => {
                                                                    handleCreateSche(event)
                                                                }} /></Button>
                                                        <Button
                                                            sx={{ borderRadius: 5, height: 50, margin: "10px" }}
                                                        ><CancelIcon sx={{ fontSize: 30 }} color={"error"}
                                                            onClick={handleCancelTimeSet} /></Button>
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
                    <Box sx={{ display: 'flex', justifyContent: 'left', ml: 2 }}>
                        <Button
                            type="button"
                            variant="contained"
                            sx={{ mt: 5, mb: 1, alignItems: "left", mr: 1 }}
                            color={"success"}
                            onClick={handleSaveSchedule}
                            disabled={(dateCreate.length === 0)}
                        >
                            Tạo
                        </Button>
                        <Button
                            type="button"
                            variant="contained"
                            sx={{ mt: 5, mb: 1, alignItems: "left", backgroundColor: "grey", '&:hover': { backgroundColor: "#6e6c6c" } }}
                            onClick={handleCloseSchedule}
                            disabled={(dateCreate.length === 0)}
                        >
                            Hủy
                        </Button>
                    </Box>
                </TableContainer>
            </Item>
        </Container>
        </>
    )
}