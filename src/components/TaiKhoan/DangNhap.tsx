import React, { useState } from 'react';
import { Container, TextField, Button, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const DangNhap: React.FC = () => {
    const [sdt, setSdt] = useState('');
    const [matKhau, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [loginAttempts, setLoginAttempts] = useState(0);
    const [lastAttemptTime, setLastAttemptTime] = useState<Date | null>(null);
    const navigate = useNavigate();

    const handleCloseSnackbar = () => setOpenSnackbar(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage('');

        const currentTime = new Date();
        if (loginAttempts >= 5 && lastAttemptTime && (currentTime.getTime() - lastAttemptTime.getTime()) < 300000) {
            setErrorMessage('Bạn đã nhập sai mật khẩu 5 lần. Vui lòng đợi 5 phút và thử lại.');
            setOpenSnackbar(true);
            return;
        }

        try {
            let response;
            // Try to login as BenhNhan
            try {
                response = await axios.post('https://localhost:7178/api/Authenticate/login', {
                    sdt,
                    matKhau
                });
            } catch (error) {
                // If login as BenhNhan fails, try to login as NhanVien
                try {
                    response = await axios.post('https://localhost:7178/api/Authenticate/login/nhanvien', {
                        sdt,
                        matKhau
                    });
                } catch (error) {
                    // If login as NhanVien also fails, throw error
                    throw new Error('Invalid credentials');
                }
            }

            const { token } = response.data;
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const maQuyen = decodedToken.MaQuyen;

            localStorage.setItem('token', token);
            alert('Đăng nhập thành công!');

            if (maQuyen === '4') {
                navigate('/');
            } else if (maQuyen === '3') {
                navigate('/nhanvien/das');
            } else {
               navigate('/bacsi/lichbs');
            }
        } catch (error) {
            setErrorMessage('Số điện thoại hoặc mật khẩu không đúng');
            setOpenSnackbar(true);
            setLoginAttempts(prevAttempts => prevAttempts + 1);
            setLastAttemptTime(new Date());
        }
    };

    return (
        <div className="login-container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Container maxWidth="sm">
                <div className="login-form">
                    <h2 className="text-center">Đăng nhập</h2>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Số điện thoại"
                            type="text"
                            value={sdt}
                            onChange={(e) => setSdt(e.target.value)}
                            sx={{ mb: 2 }}
                            required
                        />
                        <TextField
                            fullWidth
                            size="small"
                            label="Mật khẩu"
                            type="password"
                            value={matKhau}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{ mb: 2 }}
                            required
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mb: 2 }}>
                            Đăng nhập
                        </Button>
                    </form>
                    <p className="text-center mt-3">Chưa có tài khoản? <Link to="/dangky">Đăng ký</Link></p>
                </div>
            </Container>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default DangNhap;
