import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Header.css'
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase } from "@mui/material";
import { Link } from 'react-router-dom';
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Cookies from "js-cookie";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import ReminderTimer from "../ReminderTimer/ReminderTimer";
import {jwtDecode} from "jwt-decode";
import {ApiContext} from "../ApiContext/ApiProvider";

library.add(fas)
export default function Header() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [customer,setCustomer]=useState('');
    const open = Boolean(anchorEl);
    const { API } = useContext(ApiContext)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const userId = Cookies.get('userId');
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
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

    const linkStyle = {
        textDecoration: "none",
        color: 'white'
    };
    useEffect(() => {
        axios.get(`${API}/api/customer/${userId}`)
            .then(response => {
                setCustomer(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [userId]);

    const handleLogout = () => {
        Cookies.remove('JWT');
        Cookies.remove('userId');
        window.location.href = '/login';
    };

    const token = Cookies.get('JWT');
    let userRole = '';

    if (token) {
        const decodedToken = jwtDecode(token);
        userRole = decodedToken.roles[0];
    }
    return (
        <>
            <ReminderTimer/>
            <div className={"container-fluid"} style={{ padding: 0 }}>
                <div className={"d-flex justify-content-between align-items-center fw-bold topHead"}>
                    <div className={"d-flex justify-content-between"}>
                        <div className={"mx-4"}>
                            <FontAwesomeIcon icon="fas fa-map-marked-alt" className={"mx-2"} />
                            28 Nguyễn Đình Chiểu , Phường Võ Thị Sáu, Quận 3
                        </div>
                        <div className={"mx-4"}>
                            <FontAwesomeIcon icon="fas fa-mobile-alt" className={"mx-2"} />
                            (028 3331 916)
                        </div>
                    </div>
                    <div className={"d-flex justify-content-between align-items-center"}>
                        <div className={"mx-4"}>
                            <FontAwesomeIcon icon="fas fa-calendar-check" className={"mx-2"} />
                            T.2 - CN: 6h30 AM - 20h30 PM
                        </div>
                        <div className={"mx-4 d-flex align-items-center"} style={{cursor: "pointer"}}>
                            <FontAwesomeIcon icon="fas fa-user" className={"mx-2"}/>
                            {userId ? (
                                <div>
                                    {userRole === "ROLE_CUSTOMER" && (
                                        <div>
                                            <Button
                                                id="basic-button"
                                                aria-controls={open ? 'basic-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                onClick={handleClick}
                                            >
                                                {customer.fullName}
                                            </Button>
                                            <Menu
                                                id="basic-menu"
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleClose}
                                                MenuListProps={{
                                                    'aria-labelledby': 'basic-button',
                                                }}
                                            >
                                                <Link style={{ textDecoration: 'none', color: 'black' }} to="/information-customer">
                                                    <MenuItem onClick={handleClose}>Cập nhập</MenuItem>
                                                </Link>
                                                <Link style={{ textDecoration: 'none', color: 'black' }} to="/appointment-schedule">
                                                    <MenuItem onClick={handleClose}>Lịch hẹn</MenuItem>
                                                </Link>
                                                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                                            </Menu>
                                        </div>
                                    )}

                                    {userRole === "ROLE_DOCTOR" && (
                                        <div>
                                            <Button
                                                id="basic-button"
                                                aria-controls={open ? 'basic-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                onClick={handleClick}
                                            >
                                                {'DOCTOR'}
                                            </Button>
                                            <Menu
                                                id="basic-menu"
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleClose}
                                                MenuListProps={{
                                                    'aria-labelledby': 'basic-button',
                                                }}
                                            >
                                                <Link style={{ textDecoration: 'none', color: 'black' }} to="/doctoradmin">
                                                    <MenuItem onClick={handleClose}>Trang cá nhân</MenuItem>
                                                </Link>
                                                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                                            </Menu>
                                        </div>
                                    )}

                                    {userRole === "ROLE_ADMIN_CLINIC" && (
                                        <div>
                                            <Button
                                                id="basic-button"
                                                aria-controls={open ? 'basic-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                onClick={handleClick}
                                            >
                                                {'ADMIN-CLINIC'}
                                            </Button>
                                            <Menu
                                                id="basic-menu"
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleClose}
                                                MenuListProps={{
                                                    'aria-labelledby': 'basic-button',
                                                }}
                                            >
                                                <Link style={{ textDecoration: 'none', color: 'black' }} to="/clinicadmin">
                                                    <MenuItem onClick={handleClose}>Phòng khám</MenuItem>
                                                </Link>
                                                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                                            </Menu>
                                        </div>
                                    )}

                                    {userRole === "ROLE_ADMIN" && (
                                        <div>
                                            <Button
                                                id="basic-button"
                                                aria-controls={open ? 'basic-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                onClick={handleClick}
                                            >
                                                {'ADMIN'}
                                            </Button>
                                            <Menu
                                                id="basic-menu"
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleClose}
                                                MenuListProps={{
                                                    'aria-labelledby': 'basic-button',
                                                }}
                                            >
                                                <Link style={{ textDecoration: 'none', color: 'black' }} to="/admin">
                                                    <MenuItem onClick={handleClose}>Admin</MenuItem>
                                                </Link>
                                                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                                            </Menu>
                                        </div>
                                    )}

                                </div>
                            ) : (
                                <Link style={{textDecoration: 'none', color: 'black'}} to='/login'>Đăng ký/ Đăng nhập</Link>
                            )}
                        </div>
                    </div>
                </div>
                <div className={"d-flex justify-content-around fw-bold bodyHead"}>
                    <Link to='/home' style={linkStyle} className={"fs-2 d-flex homeHead"}>
                        <FontAwesomeIcon icon="fas fa-hospital-user" className={"mx-2"} style={{margin: "auto"}}/>
                        <p style={{margin: "auto"}}>ZCARE</p>
                    </Link>
                    <div className={"d-flex justify-content-between detailHead"}>
                        <p><Link to='/home' style={linkStyle}>TRANG CHỦ</Link></p>
                        <p><Link to='/home/introduce' style={linkStyle}>GIỚI THIỆU</Link></p>
                        <p><Link to='/home/clinic-page' style={linkStyle}>PHÒNG KHÁM</Link></p>
                        <p><Link to='/home/speciality-page' style={linkStyle}>CHUYÊN KHOA</Link></p>
                        <p><Link to='/home/cooperate' style={linkStyle}>HỢP TÁC</Link></p>
                    </div>
                </div>
            </div>
        </>
    )
} 