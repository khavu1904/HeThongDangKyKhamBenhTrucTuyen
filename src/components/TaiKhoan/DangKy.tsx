import React, { useState } from 'react';
import {
    Container,
    TextField,
    Button,
    Grid,
    Typography,
    Select,
    MenuItem,
    InputLabel,
    FormControl
} from '@mui/material';
import axios from 'axios';
import { SelectChangeEvent } from '@mui/material/Select';
import { BenhNhan } from '../../type/BenhNhan';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate, Link } from 'react-router-dom';

const DangKy: React.FC = () => {
    const navigate = useNavigate();
    const [model, setModel] = useState<BenhNhan>({
        hoTenBN: '',
        diaChi: '',
        cmnD_CCCD: '',
        sdt: '',
        ngaySinh: '',
        tuoi: 0,
        gioiTinh: '',
        maBHYT: 'Chưa có',
        danToc: 'Chưa có',
        ngheNghiep: 'Chưa có',
        email: '',
        anhDaiDien: 'Chưa có',
        matKhau: '',
        maQuyen: 4 // Giá trị mặc định cho maQuyen
    });

    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleCloseSnackbar = () => {
        setErrorMessage('');
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        const { name, value } = event.target;
        setModel({ ...model, [name!]: value });
    };

    const handleSignUpSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await axios.post('https://localhost:7178/api/BenhNhan', model);
            console.log('Đăng ký thành công:', response.data);
            alert('Đăng ký thành công!');
            navigate('/dangnhap');
        } catch (error: any) {
            console.error('Đăng ký thất bại:', error);
            if (error.response) {
                setErrorMessage(error.response.data); // Lấy thông báo lỗi từ phản hồi của backend
            } else {
                setErrorMessage('Đã xảy ra lỗi khi gửi yêu cầu.');
            }
        }
    };
    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom>
                Đăng ký
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center">
                <span style={{ color: 'red', fontSize: '13px' }}>Lưu ý * là thông tin bắt buộc </span>
            </Typography>
            <form onSubmit={handleSignUpSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Họ và tên"
                            name="hoTenBN"
                            value={model.hoTenBN}
                            onChange={handleInputChange}
                            required
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Số điện thoại"
                            name="sdt"
                            value={model.sdt}
                            onChange={handleInputChange}
                            required
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Ngày sinh"
                            type="date"
                            name="ngaySinh"
                            value={model.ngaySinh}
                            onChange={handleInputChange}
                            required
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="CCCD/CMND"
                            name="cmnD_CCCD"
                            value={model.cmnD_CCCD}
                            onChange={handleInputChange}
                            required
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Địa chỉ"
                            name="diaChi"
                            value={model.diaChi}
                            onChange={handleInputChange}
                            required
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            name="email"
                            value={model.email}
                            onChange={handleInputChange}
                            required
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Mật khẩu"
                            type="password"
                            name="matKhau"
                            value={model.matKhau}
                            onChange={handleInputChange}
                            required
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined" required>
                            <InputLabel>Giới tính</InputLabel>
                            <Select
                                name="gioiTinh"
                                value={model.gioiTinh}
                                onChange={(event) => handleInputChange(event as SelectChangeEvent<string>)}
                                label="Giới tính"
                            >
                                <MenuItem value="">
                                    <em>Chọn...</em>
                                </MenuItem>
                                <MenuItem value="Nam">Nam</MenuItem>
                                <MenuItem value="Nữ">Nữ</MenuItem>
                                <MenuItem value="Khác">Khác</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '16px' }}>
                    Đăng ký
                </Button>
            </form>
            <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <MuiAlert elevation={6} variant="filled" severity="error" onClose={handleCloseSnackbar}>
                    {errorMessage}
                </MuiAlert>
            </Snackbar>
        </Container>
    );
};

export default DangKy;
