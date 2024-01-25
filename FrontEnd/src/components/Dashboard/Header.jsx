import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import SearchIcon from "@mui/icons-material/Search";
import { alpha, styled } from "@mui/material/styles";
import { InputBase } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from 'jwt-decode';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
    const { userId } = useParams();
    const [dashboarduser, setDashboarduser] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: '#18a2b9',
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
    }));
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const isCustomer = location.pathname.startsWith("/user")
    const isCooperate = location.pathname.startsWith("/clinicadmin");
    const isAdmin = location.pathname.startsWith("/admin");

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
        if (isCustomer) {
            navigate("/user/doctorInfor");
        } else if (isCooperate) {
            navigate("/cooperate/doctorInfor")
        } else if (isAdmin) {
            navigate("/admin/doctorInfor")
        }
    };
    const storedUserId = Cookies.get('userId');

    useEffect(()=>{
        const finddUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/user/userlogin/${storedUserId}`)
                console.log(response.data)
                setDashboarduser(response.data)
                // setRoleuser(dashboarduser.user)
                console.log(dashboarduser)
            }catch (error) {
                console.error(error);
            }
        }
        finddUser();
    },[])

    const token = Cookies.get('JWT');
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.roles[0];
    console.log(userRole)

    return (
        <AppBar position="fixed" sx={{ height: '54px' }}>
            <Container sx={{width: '100%', marginLeft: '265px', paddingRight: '50px !important' }}>
                <Toolbar disableGutters>
                    {userRole === "ROLE_ADMIN_CLINIC" && (
                        <Box sx={{display: 'flex'}}>
                            <Avatar alt="Remy Sharp" sx={{mt: 1.7}} src={dashboarduser.clinicLogo} />
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                href="#app-bar-with-responsive-menu"
                                sx={{
                                    ml:2,
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                    my: 2
                                }}
                            >
                                {dashboarduser.clinicName}
                            </Typography>
                        </Box>
                    )}

                    {userRole !== "ROLE_ADMIN_CLINIC" && (
                        <Typography variant="h6" noWrap component="p">
                            Xin chào bạn đến với hệ thống Z-Care
                        </Typography>
                    )}

                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                    </Box>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp"
                                        src={dashboarduser.avatarImg} />
                                <Typography sx={{color: 'white', ml: 1}}>
                                    {(() => {
                                        if (userRole === "ROLE_CUSTOMER") {
                                            return dashboarduser.fullName;
                                        } else if (userRole === "ROLE_DOCTOR") {
                                            return dashboarduser.doctorName;
                                        } else if (userRole === "ROLE_ADMIN") {
                                            return "Admin";
                                        } else {
                                            return null;
                                        }
                                    })()}
                                </Typography>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;