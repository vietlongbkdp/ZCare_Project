import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { blueGrey } from '@mui/material/colors';

export default function SearchBar() {
    const { clinic, setClinic } = useState();

    return (
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <Stack direction='row' spacing={2} p={3} xs mdOffset={2} sx={{ borderRadius: '10px'}}>
                <TextField
                    label='Tìm kiếm với tên bác sĩ'
                    InputProps={{
                        endAdornment: (
                            <InputAdornment>
                                <IconButton>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <FormControl sx={{ width: '300px' }} >
                    <InputLabel>Phòng khám</InputLabel>
                    <Select
                        
                        id="demo-simple-select"
                        value={clinic}
                        label='Phòng khám'
                    // onChange={handleChange}
                    >
                        <MenuItem>Phòng khám</MenuItem>
                        <MenuItem value={10}>Phòng khám Chuyên khoa Nội An Phước</MenuItem>
                        <MenuItem value={20}>Phòng Khám Đa Khoa An Thịnh</MenuItem>
                        <MenuItem value={30}>Phòng khám Đa khoa CHAC</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ width: '300px' }} >
                    <InputLabel>Chuyên khoa</InputLabel>
                    <Select
                        id="demo-simple-select"
                        value={clinic}
                        label='Chuyên khoa'
                
                    // onChange={handleChange}
                    >
                        <MenuItem>Chuyên khoa</MenuItem>
                        <MenuItem value={10}>Tai mũi họng</MenuItem>
                        <MenuItem value={20}>Thần kinh</MenuItem>
                        <MenuItem value={30}>Tim mạch</MenuItem>
                    </Select>
                </FormControl>

                <Button variant='contained' >Tìm kiếm</Button>
            </Stack>
        </Box>

    )
}
