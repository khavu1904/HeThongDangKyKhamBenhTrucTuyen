import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, IconButton, Avatar, Box, Container, Tooltip, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import { useNavigate, NavLink } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { BenhNhan } from '../../type/BenhNhan';
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';

interface TokenPayload {
    HoTenBN: string;
    email: string;
    CMND_CCCD: string;
    NgaySinh: string;
    MaBHYT: string;
    DanToc: string;
    NgheNghiep: string;
    AnhDaiDien: string;
    MaBN: string;
}

const getAllKhamBenhID = async (maBN: string) => {
    return axios.get(`/api/benhnhan/${maBN}`);
};

export function Header() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState<string | null>(null);
    const [maBN, setMaBN] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [benhNhan, setBenhNhan] = useState<BenhNhan | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    //
    const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [changePasswordError, setChangePasswordError] = useState('');
    //
    const handleOpenChangePasswordModal = () => {
        setOpenChangePasswordModal(true);
    };

    const handleCloseChangePasswordModal = () => {
        setOpenChangePasswordModal(false);
        // Xóa trạng thái mật khẩu khi đóng modal
        setOldPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setChangePasswordError('');
    };

    const handleChangePassword = async () => {
        try {
            if (newPassword !== confirmNewPassword) {
                setChangePasswordError('Mật khẩu mới và xác nhận mật khẩu mới không khớp.');
                return;
            }
    
            const response = await axios.put(`https://localhost:7178/api/BenhNhan/UpdatePassword/${maBN}`, `"${newPassword}"`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data);
            alert('Mật khẩu đã được cập nhật thành công.');
            handleCloseChangePasswordModal();
            localStorage.removeItem('token');
            setUserName(null);
            setIsLoggedIn(false);
            alert('Vui lòng đăng nhập lại');
            navigate('/');
            window.location.reload();
        } catch (error: any) {
            setChangePasswordError(error.message);
        }
    };
    
    //

    useEffect(() => {
        const fetchBenhNhan = async () => {
            if (maBN) {
                try {
                    setLoading(true);
                    const response = await getAllKhamBenhID(maBN);
                    setBenhNhan(response.data);
                } catch (error: any) {
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchBenhNhan();
    }, [maBN]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode<TokenPayload>(token);
                setUserName(decodedToken.HoTenBN);
                setMaBN(decodedToken.MaBN);
                setIsLoggedIn(true);
            } catch (error) {
                console.error('Invalid token:', error);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUserName(null);
        setIsLoggedIn(false);
        alert('Đã đăng xuất');
        navigate('/');
        window.location.reload();
    };

    const handleProfileClick = () => {
        navigate(`/benhnhan/profile/${maBN}`);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const pages = ['Chuyên Khoa', 'Tin Tức'];
    const settings = ['Thông tin bệnh nhân','Đổi mật khẩu', 'Đăng xuất'];


    return (
        <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component={NavLink}
                        to="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'black',
                            textDecoration: 'none',
                        }}
                    >
                        YouMed
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon sx={{ color: 'black' }} />
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
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                component={NavLink}
                                to="/chuyenkhoa"
                                sx={{ my: 2, color: 'black', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
                        {userName ? (
                            <>
                                <Typography variant="body1" sx={{ mr: 2, color: 'black' }}>
                                    {userName}
                                </Typography>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar src={benhNhan?.anhDaiDien} alt="Ảnh bệnh nhân" />
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
                                        <MenuItem
                                            key={setting}
                                            onClick={() => {
                                                handleCloseUserMenu();
                                                if (setting === 'Thông tin bệnh nhân') handleProfileClick();
                                                if (setting === 'Đổi mật khẩu') handleOpenChangePasswordModal(); // Sửa ở đây
                                                if (setting === 'Đăng xuất') handleLogout();
                                            }}
                                        >
                                            {setting}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </>
                        ) : (
                            <Button color="inherit" component={NavLink} to="/dangnhap">
                                Đăng nhập
                            </Button>
                        )}
                    </Box>
                </Toolbar>
                {/* Modal đổi mật khẩu */}
                <Dialog open={openChangePasswordModal} onClose={handleCloseChangePasswordModal}>
                    <DialogTitle>Đổi mật khẩu</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Mật khẩu cũ"
                            type="password"
                            fullWidth
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Mật khẩu mới"
                            type="password"
                            fullWidth
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Xác nhận mật khẩu mới"
                            type="password"
                            fullWidth
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                        />
                        {changePasswordError && <Typography color="error">{changePasswordError}</Typography>}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseChangePasswordModal}>Hủy</Button>
                        <Button onClick={handleChangePassword} color="primary">Đổi mật khẩu</Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </AppBar>
    );
}
