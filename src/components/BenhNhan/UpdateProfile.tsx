import React, { useState, useEffect, ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Container, Typography, Grid, Box, Avatar, IconButton } from '@mui/material';
import { PhotoCamera, Clear } from '@mui/icons-material';
import { BenhNhan } from '../../type/BenhNhan';
import Layout from '../Layout/Layout';

const UpdateProfile = () => {
    const navigate = useNavigate();
    const { maBN } = useParams<{ maBN: string }>(); // trích xuất tham số maBN
    const [benhnhan, setBenhNhan] = useState<BenhNhan | null>(null);
    
    const [hoTenBN, setHoTenBN] = useState('');
    const [diaChi, setDiaChi] = useState('');
    const [cmnD_CCCD, setCMND_CCCD] = useState('');
    const [sdt, setSDT] = useState('');
    const [ngaySinh, setNgaySinh] = useState('');
    const [tuoi, setTuoi] = useState<number | null>(null); // State variable for age
    const [gioiTinh, setGioiTinh] = useState('');
    const [maBHYT, setMaBHYT] = useState('');
    const [danToc, setDanToc] = useState('');
    const [ngheNghiep, setNgheNghiep] = useState('');
    const [email, setEmail] = useState('');
    const [anhDaiDien, setAnhDaiDien] = useState('');
    const [matKhau, setMatKhau] = useState(''); // Giữ giá trị gốc của password
    const [maQuyen, setMaQuyen] = useState<number | null>(null); // Giữ giá trị gốc của maQuyen
    
    useEffect(() => {
        const fetchBenhNhan = async () => {
            try {
                const response = await axios.get(`https://localhost:7178/api/BenhNhan/${maBN}`);
                setBenhNhan(response.data);
                setHoTenBN(response.data.hoTenBN);
                setDiaChi(response.data.diaChi);
                setCMND_CCCD(response.data.cmnD_CCCD);
                setSDT(response.data.sdt);
                const ngaySinh = response.data.ngaySinh.substring(0, 10);
                setNgaySinh(ngaySinh); // Lấy 10 ký tự đầu tiên của chuỗi ngày sinh
                setTuoi(calculateAge(ngaySinh)); // Calculate age based on ngaySinh
                setGioiTinh(response.data.gioiTinh);
                setMaBHYT(response.data.maBHYT);
                setDanToc(response.data.danToc);
                setNgheNghiep(response.data.ngheNghiep);
                setEmail(response.data.email);
                setAnhDaiDien(response.data.anhDaiDien);
                setMatKhau(response.data.matKhau);
                setMaQuyen(response.data.maQuyen);
            } catch (error) {
                console.error('Lỗi khi lấy thông tin bệnh nhân:', error);
            }
        };
        fetchBenhNhan();
    }, [maBN]);

    const calculateAge = (ngaySinh: string) => {
        const birthDate = new Date(ngaySinh);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = () => {
            const result = reader.result;
            if (typeof result === 'string') {
                setAnhDaiDien(result); // Lưu chuỗi của ảnh vào anhDaiDien
            }
        };

        reader.readAsDataURL(file);
    };

    const clearImage = () => {
        setAnhDaiDien('');
    };

    // Cập nhật
    const handleUpdate = async () => {
        // Gửi thông tin cập nhật lên server
        try {
            await axios.put(`https://localhost:7178/api/BenhNhan/${maBN}`, {
                maBN,
                hoTenBN,
                diaChi,
                cmnD_CCCD,
                sdt,
                ngaySinh,
                tuoi,
                gioiTinh,
                maBHYT,
                danToc,
                ngheNghiep,
                email,
                anhDaiDien, // Sử dụng giá trị của anhDaiDien trong yêu cầu PUT
                matKhau,
                maQuyen
            });
            // localStorage.removeItem('token'); // hoặc sessionStorage.removeItem('token');
            alert('Cập nhật thông tin bệnh nhân thành công!.');
            window.location.reload(); //Tải lại trang web khi cập nhật thành công
        } catch (error) {
            console.error('Lỗi khi cập nhật thông tin bệnh nhân:', error);
            alert('Đã xảy ra lỗi khi cập nhật thông tin bệnh nhân.');
        }
    };

    if (!benhnhan) {
        return <div>Loading...</div>;
    }
    return (
        <Layout>
            <Container>
                <Typography variant="h4" gutterBottom>
                    Cập nhật thông tin bệnh nhân
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6">Ảnh đại diện</Typography>
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="contained-button-file"
                            type="file"
                            onChange={handleImageChange}
                        />
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" component="span" startIcon={<PhotoCamera />}>
                                Upload
                            </Button>
                        </label>
                        {anhDaiDien && (
                            <Box sx={{ mt: 2, position: 'relative', display: 'inline-block' }}>
                                <Avatar
                                    src={anhDaiDien}
                                    alt="Selected"
                                    sx={{ width: 150, height: 150 }}
                                />
                                <IconButton
                                    color="secondary"
                                    onClick={clearImage}
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        right: 0,
                                        bgcolor: 'rgba(255, 255, 255, 0.7)',
                                    }}
                                >
                                    <Clear />
                                </IconButton>
                            </Box>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Họ và tên" value={hoTenBN} onChange={(e) => setHoTenBN(e.target.value)} fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Địa chỉ" value={diaChi} onChange={(e) => setDiaChi(e.target.value)} fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="CMND/CCCD" value={cmnD_CCCD} onChange={(e) => setCMND_CCCD(e.target.value)} fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Số điện thoại" value={sdt} onChange={(e) => setSDT(e.target.value)} fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Ngày sinh" type="date" value={ngaySinh} onChange={(e) => { setNgaySinh(e.target.value); setTuoi(calculateAge(e.target.value)); }} fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Giới tính" value={gioiTinh} onChange={(e) => setGioiTinh(e.target.value)} fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Mã BHYT" value={maBHYT} onChange={(e) => setMaBHYT(e.target.value)} fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Dân tộc" value={danToc} onChange={(e) => setDanToc(e.target.value)} fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Nghề nghiệp" value={ngheNghiep} onChange={(e) => setNgheNghiep(e.target.value)} fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Tuổi" value={tuoi !== null ? tuoi.toString() : ''} disabled fullWidth />
                    </Grid>
                </Grid>
                <Box mt={2}>
                    <Button variant="contained" color="primary" onClick={handleUpdate}>
                        Cập nhật
                    </Button>
                </Box>
            </Container>
        </Layout>
    );
};
export default UpdateProfile;
