import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {Paper, Typography} from "@mui/material";
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
export default function ScheduleCreate(){
    const [dateCreate, setDateCreate] = useState({
        startDateCreate : dayjs().add(1, 'day'),
        endDateCreate: dayjs().add(8, 'day'),
        betweenDateCreate: 0,
        times: "15"
    })
    const Item = styled(Paper)(({theme}) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    const changeToDate = (miliseconds) =>{
        return (miliseconds/86400000)
    }
        const handleSubmit = (event) => {
            event.preventDefault();
                const data = new FormData(event.currentTarget)
                const timesImput = parseInt(data.get('selectTime'))
                const dayjs = require('dayjs');
                const startDateString =  event.target[0].defaultValue
                const startDate = dayjs(startDateString, "DD/MM/YYYY").format();
                const endDateString =  event.target[2].defaultValue
                const endDate = dayjs(endDateString, "DD/MM/YYYY").format();
                let betweenDate = changeToDate(Date.parse(endDate) - Date.parse(startDate))
                if((Date.parse(startDate) - dayjs()) > 0){
                    setDateCreate({
                        endDateCreate: Date.parse(endDate),
                        startDateCreate: Date.parse(startDate),
                        betweenDateCreate: betweenDate,
                        times: timesImput
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

                </Item>
            </Container>
    )
}