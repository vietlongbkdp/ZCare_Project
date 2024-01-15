import React from 'react';
import {Container, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {Facebook, Instagram, LinkedIn, Twitter} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";



function Clinic() {
    return (
        <Container style={{
            display: 'flex',
            borderRadius: '4px',
            border: '1px solid',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            padding: '16px',
            marginTop: '8px',
            // marginBottom: '16px',
        }}>
            <Grid container spacing={2} >
                <Grid item xs={8}>
                    <Box display="flex" flexDirection="column" marginRight="10px" marginLeft="10px">
                        <Typography variant="h6" style={{ color: '#74b9ff' }}>BrainCare</Typography>
                        <Typography variant="subtitle1" style={{ color: '#81ecec' }} className={"address"}>
                            Tầng 7, Tòa 59 Võ Chí Công, Nghĩa Đô, Cầu giấy, Hà Nội
                        </Typography>
                        <Typography variant="body2">
                            Viện tâm lý Giáo dục BrainCare với đội ngũ gồm các chuyên gia
                        </Typography>
                        <div style={{ display: 'flex' }}>
                            <IconButton style={{ marginRight: '8px' }}>
                                <Facebook />
                            </IconButton>
                            <IconButton style={{ marginRight: '8px' }}>
                                <Instagram />
                            </IconButton>
                            <IconButton style={{ marginRight: '8px' }}>
                                <Twitter />
                            </IconButton>
                            <IconButton style={{ marginRight: '8px' }}>
                                <LinkedIn />
                            </IconButton>
                        </div>
                    </Box>
                </Grid>
                <Grid item  xs={3}>
                    <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: '8px',marginRight:'16px' }}>
                        <img
                            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                            alt=""
                            style={{ width: '120px', margin: '0 auto' }}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Clinic;