import React, { useState, useEffect, ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Container, Typography, Grid, Box } from '@mui/material';
import { NhanVien } from '../../type/NhanVien';
import BacSiDashboard from './BacSiDashboard';

const UpdateProfileBS = () => {
    const navigate = useNavigate();
    const { maNV } = useParams<{ maNV: string }>(); // Extract maNV parameter
    const [nhanvien, setNhanVien] = useState<NhanVien | null>(null);
    const [hoTen, setHoTen] = useState('');
    const [diaChi, setDiaChi] = useState('');
    const [sdt, setSDT] = useState('');
    const [email, setEmail] = useState('');
    const [ngaySinh, setNgaySinh] = useState('');
    const [chucDanh, setChucDanh] = useState('');
    const [anhDaiDien, setAnhDaiDien] = useState('');
    const [matKhau, setMatKhau] = useState(''); // Corrected to 'matKhau'
    const [hocVan, setHocVan] = useState('');
    const [tuoi, setTuoi] = useState<number | null>(null);
    const [maQuyen, setMaQuyen] = useState<number | null>(null);
    const [maPhongBan, setMaPhongBan] = useState<number | null>(null);
    const [trangThai, setTrangThai] = useState<boolean | null>(null);
    const [cccd, setCccd] = useState('');

    useEffect(() => {
        const fetchNhanVien = async () => {
            try {
                const response = await axios.get<NhanVien>(`https://localhost:7178/api/NhanVien/${maNV}`);
                setNhanVien(response.data);
                setHoTen(response.data.hoTen);
                setDiaChi(response.data.diaChi);
                setSDT(response.data.sdt);
                setEmail(response.data.email);
                setNgaySinh(response.data.ngaySinh);
                setAnhDaiDien(response.data.anhDaiDien);
                setMatKhau(response.data.matKhau); 
                setMaQuyen(response.data.maQuyen);
                setChucDanh(response.data.chucDanh);
                setHocVan(response.data.hocVan);
                setTuoi(response.data.tuoi);
                setMaPhongBan(response.data.maPhongBan);
                setTrangThai(response.data.trangThai);
                setCccd(response.data.cccd); // Set CCCD
            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };
        fetchNhanVien();
    }, [maNV]);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = () => {
            const result = reader.result;
            if (typeof result === 'string') {
                setAnhDaiDien(result); // Save the image string to anhDaiDien
            }
        };

        reader.readAsDataURL(file);
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`https://localhost:7178/api/NhanVien/${maNV}`, {
                maNV,
                hoTen,
                sdt,
                diaChi,
                email,
                matKhau,
                hocVan,
                tuoi,
                anhDaiDien,
                chucDanh,
                maQuyen,
                maPhongBan,
                trangThai,
                cccd, // Include CCCD in the update request
            });
            localStorage.removeItem('token');
            alert('Thông tin nhân viên được cập nhật thành công! Bạn sẽ đăng xuất và được yêu cầu đăng nhập lại.');
            navigate(`/`);
        } catch (error) {
            console.error('Lỗi cập nhật thông tin nhân viên:', error);
            alert('Xảy ra lỗi khi cập nhật thông tin nhân viên.');
        }
    };

    if (!nhanvien) {
        return <div>Loading...</div>;
    }

    return (
        <BacSiDashboard>
            <Container>
                <Typography variant="h4" gutterBottom>
                    Cập Nhật Hồ Sơ Bác Sĩ
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField label="Họ và tên" value={hoTen} onChange={(e) => setHoTen(e.target.value)} fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Địa chỉ" value={diaChi} onChange={(e) => setDiaChi(e.target.value)} fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Số điện thoại" value={sdt} onChange={(e) => setSDT(e.target.value)} fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Học Vấn" value={hocVan} onChange={(e) => setHocVan(e.target.value)} fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Tuổi" type="number" value={tuoi || ''} onChange={(e) => setTuoi(parseInt(e.target.value))} fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="CCCD" value={cccd} onChange={(e) => setCccd(e.target.value)} fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                    </Grid>
                </Grid>
                <Box mt={2}>
                    <Button variant="contained" color="primary" onClick={handleUpdate}>
                        Cập nhật
                    </Button>
                </Box>
            </Container>
        </BacSiDashboard>
    );
};

export default UpdateProfileBS;
