import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, MenuItem, Menu, Avatar } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const NavbarNhanVien: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [tenNhanVien, setTenNhanVien] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token'); // Lấy token từ local storage
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Giải mã phần payload của token
      setTenNhanVien(decodedToken.HoTen); // Lấy tên nhân viên từ dữ liệu giải mã
    }
  }, []);

  const handleLogout = () => {
    // Xóa token khỏi Local Storage
    localStorage.removeItem('token');
    // Định tuyến người dùng đến trang đăng nhập
    navigate(`/`);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Chào mừng trở lại
        </Typography>
        <div>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleClick}
            color="inherit"
          >
            <Avatar alt="Avatar" sx={{ width: 30, height: 30 }} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>Settings</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
        <Typography variant="body1" color="inherit">
          {tenNhanVien}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default NavbarNhanVien;
