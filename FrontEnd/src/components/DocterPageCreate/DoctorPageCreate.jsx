import  Container  from "@mui/material/Container";
import  Box  from "@mui/material/Box";
import  Typography  from "@mui/material/Typography";
import  Grid  from "@mui/material/Grid";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

export default function DoctorPageCreate(){
    return(
        <>
            <Container>
                <Typography variant="h5" fontWeight={"bold"} component="h2" mt={2}>
                        Create a new doctor
                </Typography>
                <Box>
                <Grid container spacing={2}>
                    <Grid item xs={4} align="center">
                        <Button component="label" sx={{backgroundColor: "none", display: "flex", flexDirection: "column",
                                width: 160, height: 160, borderRadius: 40}} >
                            <img src="https://www.pngall.com/wp-content/uploads/2/Upload.png" width={80}/>
                            <p>Upload Avatar</p>
                            <VisuallyHiddenInput type="file" />
                        </Button>
                        <Typography fontSize={12} fontStyle={"italic"}>
                            Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3 Mb
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        CREATE
                    </Grid>
                </Grid>
                </Box>
            </Container>
        </>
    )
}