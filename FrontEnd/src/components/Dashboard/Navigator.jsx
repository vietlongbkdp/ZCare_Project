import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import PermMediaOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActual';
import PublicIcon from '@mui/icons-material/Public';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import TimerIcon from '@mui/icons-material/Timer';
import SettingsIcon from '@mui/icons-material/Settings';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';
import { Link, useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const categories = [
    {
        id: 'ADMIN',
        children: [
            {
                id: 'Danh sách lịch khám ',
                icon: <PeopleIcon />,
                active: true,
                // url: "booking"
            },
            { id: 'Phòng khám', icon: <PublicIcon />, url: "clinic" },
            {
                id: 'Bác sĩ',
                icon: <SettingsInputComponentIcon />,
                url: "doctor"
            },
            { id: 'Chuyên khoa', icon: <DnsRoundedIcon /> },
            { id: 'Bệnh nhân', icon: <PermMediaOutlinedIcon />, url: "customer" },
            { id: 'Lịch làm việc', icon: <PermMediaOutlinedIcon /> },
            { id: 'Thông tin lịch khám', icon: <PermMediaOutlinedIcon /> },

            { id: 'Liên hệ', icon: <SettingsEthernetIcon />, url: "doctorInfor" },

        ],
    },
    {
        id: 'ADMIN_CLINIC',
        children: [
            { id: ' Trang chủ ', icon: <SettingsIcon /> },
            { id: 'Doanh thu', icon: <SettingsIcon /> },
            { id: 'Bệnh nhân', icon: <TimerIcon /> },
            { id: 'Bác sĩ', icon: <PhonelinkSetupIcon />, url: "clinic" },
        ],
    },
    {
        id: 'DOCTOR',
        children: [
            { id: ' Trang chủ ', icon: <SettingsIcon /> },
            { id: 'Doanh thu', icon: <SettingsIcon /> },
            { id: 'Bệnh nhân', icon: <TimerIcon /> },
            { id: 'Bác sĩ', icon: <PhonelinkSetupIcon />, url: "clinic" },
        ],
    },
    {
        id: 'CUSTOMER',
        children: [
            { id: 'TOTAL', icon: <SettingsIcon /> },
            { id: 'HISTORY', icon: <TimerIcon />, url: "" },
            { id: 'CUSTOMER', icon: <PhonelinkSetupIcon />, url: "doctorInfor" },
        ],
    },
];

const item = {
    py: '2px',
    px: 3,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover, &:focus': {
        bgcolor: 'rgba(255, 255, 255, 0.08)',
    },
};

const itemCategory = {
    boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
    py: 1.5,
    px: 3,
};

export default function Navigator(props) {
    const { userId } = useParams();
    const location = useLocation();
    const isAdmin = location.pathname.startsWith('/admin');
    const isAdminClinic = location.pathname.startsWith(`/clinicadmin`);
    const isUser = location.pathname.startsWith('/customer');
    const isDoctor = location.pathname.startsWith('/doctoradmin');

    let filteredCategories = [];

    if (isAdmin) {
        filteredCategories = categories.filter((category) => category.id === 'ADMIN');
    } else if (isUser) {
        filteredCategories = categories.filter((category) => category.id === 'CUSTOMER');
    } else if (isAdminClinic) {
        filteredCategories = categories.filter((category) => category.id === 'ADMIN_CLINIC');
    } else if (isDoctor) {
        filteredCategories = categories.filter((category) => category.id === 'DOCTOR');
    }
    // const filteredCategories = categories.filter(
    //     category => isAdmin ? category.id === 'ADMIN' : category.id === 'CLINIC-DOCTOR'
    // );

    const { ...other } = props;

    return (
        <Drawer variant="permanent" {...other}>
            <List disablePadding>
                <ListItem sx={{ ...item, ...itemCategory, fontSize: 20, color: '#fff', backgroundColor: '#18a2b9', '&:hover': { backgroundColor: '#18a2b9' } }}>
                    <FontAwesomeIcon icon="fas fa-hospital-user" className={"mx-2"} style={{ margin: "auto" }} />
                    Quản trị Website
                </ListItem>
                {filteredCategories.map(({ id, children }) => (
                    <Box key={id} sx={{ bgcolor: '#101F33' }}>
                        <ListItem sx={{ py: 2, px: 3 }}>
                            <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
                        </ListItem>
                        {children.map(({ id: childId, url, icon, active }) => (
                            <ListItem disablePadding key={childId}>
                                <Link to={url}>
                                    <ListItemButton selected={active} sx={item}>
                                        <ListItemIcon>{icon}</ListItemIcon>
                                        <ListItemText>{childId}</ListItemText>
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        ))}
                        <Divider sx={{ mt: 2 }} />
                    </Box>
                ))}
            </List>
        </Drawer>
    );
}