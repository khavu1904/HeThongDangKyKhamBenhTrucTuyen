import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button'; // Import Button component from MUI
import { NhanVien } from '../../type/NhanVien';
import Layout from '../Layout/Layout';
import { jwtDecode } from 'jwt-decode';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import BacSiDashboard from './BacSiDashboard';

interface TokenPayload {
    MaNV: string;
}

const ProfileBS = () => {
    const { maNV } = useParams<{ maNV: string | undefined }>();
    const navigate = useNavigate(); // Add useNavigate hook
    const [nhanVien, setNhanVien] = useState<NhanVien | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNhanVien = async () => {
            try {
                if (maNV) {
                    const response = await axios.get(`https://localhost:7178/api/NhanVien/${maNV}`);
                    setNhanVien(response.data);
                    setLoading(false);
                }
            } catch (error: any) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchNhanVien();
    }, [maNV]);

    const handleUpdateUserInfo = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const decodedToken = jwtDecode<TokenPayload>(token);
                const maNV = decodedToken.MaNV;
                navigate(`/bacsi/upprofile/${maNV}`);
            } else {
                console.error('Không tìm thấy token trong localStorage.');
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật thông tin:', error);
        }
    };

    if (!maNV) {
        return <div>Mã nhân viên không hợp lệ.</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <BacSiDashboard>
            <Container>
                <Typography variant="h4" gutterBottom>
                    Thông tin bác sĩ
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <img src={nhanVien?.anhDaiDien} alt="Ảnh nhân viên" style={{ maxWidth: '15%', height: 'auto' }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography>Họ và tên: {nhanVien?.hoTen}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography>Địa chỉ: {nhanVien?.diaChi}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography>Số điện thoại: {nhanVien?.sdt}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography>Email: {nhanVien?.email}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography>Học vấn: {nhanVien?.hocVan}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography>Chức danh: {nhanVien?.chucDanh}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography>Mã quyền: {nhanVien?.maQuyen}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={handleUpdateUserInfo}>Cập nhật thông tin</Button>
                    </Grid>
                </Grid>
            </Container>
        </BacSiDashboard>
    );
};

export default ProfileBS;
