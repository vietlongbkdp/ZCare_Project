import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import React, {useEffect, useState} from 'react'
import axios from "axios";

export default function SpecialityContent() {
    const [specialityList, setSpecialityList] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/api/speciality')
            .then(response => {
                setSpecialityList(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    if (!specialityList) {
        return null;
    }
    return (
        <>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'space-around', m:7 }}>
                {
                    specialityList.map((item, index) => (
                        <Card key={index} sx={{ borderRadius: '15px', m:2 }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    width="250"
                                    image={item.specialtyImage}
                                    alt="Error image"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" align='center' >
                                        {item.specialtyName}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))
                }
            </Box>
        </>
    )
}