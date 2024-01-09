import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import { useResponsive } from 'src/components/Dashboard/Hooks/UseResponsive';

import { bgBlur } from 'src/assets/themeDashboard/Css';

import Iconify from 'src/components/Dashboard/Components/Iconify';

import Searchbar from './Common/searchbar';
import { NAV, HEADER } from 'src/components/Dashboard/Layout/Common/Config-layout';
import AccountPopover from './Common/Account-popover';
// import LanguagePopover from './common/language-popover';
import NotificationsPopover from './Common/Notifications-popover';

// ----------------------------------------------------------------------

export default function Header({ onOpenNav }) {
    const theme = useTheme();

    const lgUp = useResponsive('up', 'lg');

    const renderContent = (
        <>
            {!lgUp && (
                <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
                    <Iconify icon="eva:menu-2-fill" />
                </IconButton>
            )}

            <Searchbar />

            <Box sx={{ flexGrow: 1 }} />

            <Stack direction="row" alignItems="center" spacing={1}>
                {/*<LanguagePopover />*/}
                <NotificationsPopover />
                <AccountPopover />
            </Stack>
        </>
    );

    return (
        <AppBar
            sx={{
                boxShadow: 'none',
                height: HEADER.H_MOBILE,
                zIndex: theme.zIndex.appBar + 1,
                ...bgBlur({
                    color: theme.palette.background.default,
                }),
                transition: theme.transitions.create(['height'], {
                    duration: theme.transitions.duration.shorter,
                }),
                ...(lgUp && {
                    width: `calc(100% - ${NAV.WIDTH + 1}px)`,
                    height: HEADER.H_DESKTOP,
                }),
            }}
        >
            <Toolbar
                sx={{
                    height: 1,
                    px: { lg: 5 },
                }}
            >
                {renderContent}
            </Toolbar>
        </AppBar>
    );
}

Header.propTypes = {
    onOpenNav: PropTypes.func,
};
