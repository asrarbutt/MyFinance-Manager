import * as React from 'react';
import {useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import AuthContext from "../context/authentication/AuthContext";


const MyNavBar = () => {
    const navigate = useNavigate();
    const {loggedInUser, logout} = useContext(AuthContext);


    const goToLogin = () => {
        navigate('/auth/login')
        handleCloseNavMenu()
    }
    const goToRegister = () => {
        navigate('/auth/register')
        handleCloseNavMenu()
    }

    const goToLandingPage = () => {
        logout();
        navigate('/')
        handleCloseNavMenu()
    }

    const goToHomePage = () => {
        logout();
        navigate('/home')
        handleCloseNavMenu()
    }

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 'bold',
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        MyFinance-Manager
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            <MenuItem onClick={goToLogin}>
                                <Typography textAlign="center">Login</Typography>
                            </MenuItem>

                            <MenuItem onClick={goToRegister}>
                                <Typography textAlign="center">Registrieren</Typography>
                            </MenuItem>
                            <MenuItem onClick={goToHomePage}>
                                <Typography textAlign="center">Home</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <AdbIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 1,
                            display: {xs: 'flex', md: 'none'},
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 500,

                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        MyFinance-Manager
                    </Typography>
                    <Box sx={{flexGrow: 1, justifyContent: 'center', display: {xs: 'none', md: 'flex'}}}>
                        <Button
                            onClick={goToHomePage}
                            sx={{my: 2, color: 'white', display: 'block'}}
                        >Home
                        </Button>
                        <Button
                            onClick={goToRegister}
                            sx={{my: 2, color: 'white', display: 'block'}}
                        > Registrieren
                        </Button>
                    </Box>

                    {
                        loggedInUser === "anonymousUser" ? (
                                <Button
                                    onClick={goToLogin}
                                    sx={{my: 2, color: 'white', display: 'block'}}
                                >Login
                                </Button>
                            ) :
                            (
                                <Box sx={{flexGrow: 0}}>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{mt: '45px'}}
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
                                        <MenuItem onClick={goToLandingPage}>

                                            <Typography textAlign="center">Logout</Typography>
                                        </MenuItem>
                                    </Menu>
                                </Box>
                            )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default MyNavBar;
