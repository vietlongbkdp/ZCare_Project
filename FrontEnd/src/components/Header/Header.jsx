import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Header.css'
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase } from "@mui/material";
import { Link } from 'react-router-dom';
library.add(fas)
export default function Header() {
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

    return (
        <div className={"container-fluid"} style={{ padding: 0 }}>
            <div className={"d-flex justify-content-between fw-bold topHead"}>
                <div className={"d-flex justify-content-between"}>
                    <div className={"mx-4"}>
                        <FontAwesomeIcon icon="fas fa-map-marked-alt" className={"mx-2"} />
                        28 Nguyễn Tri Phương
                    </div>
                    <div className={"mx-4"}>
                        <FontAwesomeIcon icon="fas fa-mobile-alt" className={"mx-2"} />
                        (0913 331 916)
                    </div>
                </div>
                <div className={"d-flex justify-content-between"}>
                    <div className={"mx-4"}>
                        <FontAwesomeIcon icon="fas fa-calendar-check" className={"mx-2"} />
                        T.2 - CN: 6h30 AM - 20h30 PM
                    </div>
                    <div className={"mx-4"} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon icon="fas fa-user" className={"mx-2"} />
                        <Link style={{textDecoration:'none', color: 'black' }} to='/login'>Đăng ký/ Đăng nhập</Link>
                    </div>
                </div>
            </div>
            <div className={"d-flex justify-content-around fw-bold bodyHead"}>
                <Link to='/home' style={linkStyle}  className={"fs-2 d-flex homeHead"} >
                    <FontAwesomeIcon icon="fas fa-hospital-user" className={"mx-2"} style={{ margin: "auto" }} />
                    <p style={{ margin: "auto" }}>ZCARE</p>
                </Link>
                <div className={"d-flex justify-content-between detailHead"}>
                    <p><Link to='/home' style={linkStyle}>TRANG CHỦ</Link></p>
                    <p><Link to='/home/introduce' style={linkStyle}>GIỚI THIỆU</Link></p>
                    <p><Link to='/home/clinic-page' style={linkStyle}>PHÒNG KHÁM</Link></p>
                    <p><Link to='/home/speciality-page' style={linkStyle}>CHUYÊN KHOA</Link></p>
                    <p><Link to='/home/cooperate' style={linkStyle}>HỢP TÁC</Link></p>
                </div>
                <div className={"searchHead my-auto"}>
                    <Search className={"inputSearch"}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            style={{ maxWidth: 150 }}
                        />
                    </Search>
                </div>
            </div>
        </div>
    )
} 