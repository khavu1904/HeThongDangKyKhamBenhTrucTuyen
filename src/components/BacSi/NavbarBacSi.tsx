import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, MenuItem, Menu, Avatar, CssBaseline, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios, { AxiosError } from 'axios'; // Import AxiosError for type definition

const theme = createTheme({
  typography: {
    fontFamily: [
      'Roboto', // Thay đổi thành font mong muốn của bạn
      'Arial',
      'sans-serif'
    ].join(','),
  },
});

const NavbarBacSi: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [tenNhanVien, setTenNhanVien] = useState<string>("");
  const [maNV, setMaNV] = useState<string>("");
  const navigate = useNavigate();

  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState<string>(''); // Ensure types are explicitly set to string
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [changePasswordError, setChangePasswordError] = useState<string>(''); // Explicitly set type to string

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        setTenNhanVien(decodedToken.HoTen);
        setMaNV(decodedToken.MaNV);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate(`/`);
  };

  const handleProfileClick = () => {
    navigate(`/bacsi/profile/${maNV}`);
  };

  const handleOpenChangePasswordModal = () => {
    setOpenChangePasswordModal(true);
  };

  const handleCloseChangePasswordModal = () => {
    setOpenChangePasswordModal(false);
    // Reset fields when modal is closed
    setOldPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setChangePasswordError('');
  };

  const handleChangePassword = async () => {
    try {
      // Perform validation checks
      if (!oldPassword || !newPassword || !confirmNewPassword) {
        setChangePasswordError('Vui lòng điền đầy đủ thông tin.');
        return;
      }
      if (newPassword !== confirmNewPassword) {
        setChangePasswordError('Mật khẩu mới và xác nhận mật khẩu không khớp.');
        return;
      }

      // Call API to update password
      const response = await axios.put(`https://localhost:7178/api/NhanVien/UpdatePassword/${maNV}`, newPassword);
      alert(response.data); // Show success message from API

      // Close modal and reset fields
      handleCloseChangePasswordModal();
    } catch (error) {
      console.error('Error updating password:', error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError; // Cast error to AxiosError
        if (axiosError.response && axiosError.response.data) {
          setChangePasswordError(axiosError.response.data.toString()); // Handle error response data
        } else {
          setChangePasswordError('Đã xảy ra lỗi khi cập nhật mật khẩu.');
        }
      } else {
        // Handle other types of errors
        setChangePasswordError('Đã xảy ra lỗi khi cập nhật mật khẩu.');
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
              <MenuItem onClick={handleOpenChangePasswordModal}>Đổi mật khẩu</MenuItem>
              <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
            </Menu>
          </div>
          <Typography variant="body1" color="inherit" sx={{ marginLeft: 2 }}>
            {tenNhanVien}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Change Password Modal */}
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
    </ThemeProvider>
  );
}

export default NavbarBacSi;
