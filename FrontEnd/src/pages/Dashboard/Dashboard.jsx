import * as React from 'react';
import Container from '@mui/material/Container';
import {Grid} from "@mui/material";
import TopBar from "../TopBar/TopBar";
export default function Dashboard() {
  return (
        <Container  maxWidth={false} disableGutters>
          <Grid container spacing={1} bgcolor={"lightblue"}>
            <Grid item xs={3}>
            </Grid>
            <Grid item xs={9}>
                <TopBar/>
            </Grid>
          </Grid>
        </Container>
  )
}