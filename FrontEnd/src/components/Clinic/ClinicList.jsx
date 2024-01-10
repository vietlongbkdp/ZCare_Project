import React from 'react';
import Clinic from "./Clinic";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

function ClinicList() {
    // const Item = styled(Paper)(({ theme }) => ({
    //     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    //     ...theme.typography.body2,
    //     padding: theme.spacing(1),
    //     textAlign: 'center',
    //     color: theme.palette.text.secondary,
    // }));
    return (
        <div>
            <div >
                <div className={"d-flex justify-content-center align-items-center "}>
                        <Clinic/>
                        <Clinic/>
                </div>
                <div className={"d-flex justify-content-center align-items-center "}>
                        <Clinic/>
                        <Clinic/>
                </div>
            </div>
            {/*<Grid container spacing={2}>*/}
            {/*    <Grid item xs={6}>*/}
            {/*        <Item> <Clinic/></Item>*/}
            {/*    </Grid>*/}
            {/*    <Grid item xs={6}>*/}
            {/*        <Item> <Clinic/></Item>*/}
            {/*    </Grid>*/}
            {/*    <Grid item xs={6}>*/}
            {/*        <Item> <Clinic/></Item>*/}
            {/*    </Grid>*/}
            {/*    <Grid item xs={6}>*/}
            {/*        <Item> <Clinic/></Item>*/}
            {/*    </Grid>*/}
            {/*</Grid>*/}
        </div>
    );
}

export default ClinicList;