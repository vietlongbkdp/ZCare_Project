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
import { Link } from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from 'jwt-decode';
import ReminderTimer from "../ReminderTimer/ReminderTimer";
import {ApiContext} from "../ApiContext/ApiProvider";

function ResponsiveAppBar() {
    const [dashboarduser, setDashboarduser] = useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const getDisplayName = () => {
        if (userRole === "ROLE_CUSTOMER") {
            return dashboarduser.fullName;
        } else if (userRole === "ROLE_DOCTOR") {
            return dashboarduser.doctorName;
        } else if (userRole === "ROLE_ADMIN") {
            return "Admin";
        } else {
            return null;
        }
    };

    const storedUserId = Cookies.get('userId');
    const { API } = useContext(ApiContext)
    useEffect(() => {
        const finddUser = async () => {
            try {
                const response = await axios.get(`${API}/api/user/userlogin/${storedUserId}`)
                setDashboarduser(response.data)
            } catch (error) {
                console.error(error);
            }
        }
        finddUser();
    }, [])

    const handleLogout = () => {
        Cookies.remove('JWT');
        Cookies.remove('userId');
        window.location.href = '/login';
    };

    const token = Cookies.get('JWT');
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.roles[0];

    return (
        <AppBar position="fixed" sx={{ height: '54px' }}>
            <ReminderTimer />
            <Container sx={{ width: '100%', marginLeft: '265px', paddingRight: '50px !important' }}>
                <Toolbar sx={{ height: '54px' }}>
                    {userRole === "ROLE_ADMIN_CLINIC" && (
                        <Box sx={{ display: 'flex' }}>
                            <Avatar alt="Avatar" sx={{ mt: 1.7, borderRadius: 'none' }} src={dashboarduser.clinicLogo} />
                            <Typography
                                variant="h6"
                                noWrap
                                sx={{
                                    ml: 2,
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontWeight: 700,
                                    letterSpacing: '.1rem',
                                    color: 'inherit',
                                    my: 2,
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

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Thông tin cá nhân" onClick={handleClick}>
                            <IconButton sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src={dashboarduser.avatarImg} />
                                <Typography sx={{ color: 'white', ml: 1 }}>{getDisplayName()}</Typography>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            {userRole === "ROLE_ADMIN_CLINIC" && (
                                <>
                                    <MenuItem onClick={handleClose}>
                                        <Link to="editClinic" style={{ textDecoration: 'none', color: 'black' }}>
                                            Cập nhật thông tin
                                        </Link>
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <Link to="/home" style={{ textDecoration: 'none', color: 'black' }}>
                                            Trang chủ
                                        </Link>
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>
                                        <Link to="" style={{ textDecoration: 'none', color: 'black' }}>
                                            Đăng xuất
                                        </Link>
                                    </MenuItem>
                                </>
                            )}

                            {userRole === "ROLE_DOCTOR" && (
                                <>
                                    <MenuItem onClick={handleClose}>
                                        <Link to="/home" style={{ textDecoration: 'none', color: 'black' }}>
                                            Trang chủ
                                        </Link>
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>
                                        <Link to="" style={{ textDecoration: 'none', color: 'black' }}>
                                            Đăng xuất
                                        </Link>
                                    </MenuItem>
                                </>
                            )}

                            {userRole === "ROLE_ADMIN" && (
                                <>
                                    <MenuItem onClick={handleClose}>
                                        <Link to="/home" style={{ textDecoration: 'none', color: 'black' }}>
                                            Trang chủ
                                        </Link>
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>
                                        <Link to="" style={{ textDecoration: 'none', color: 'black' }}>
                                            Đăng xuất
                                        </Link>
                                    </MenuItem>
                                </>
                            )}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;