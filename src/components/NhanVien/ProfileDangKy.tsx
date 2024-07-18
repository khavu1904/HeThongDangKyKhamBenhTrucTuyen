import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router-dom';
import NhanVienDashboard from './NhanVienDashboard';
import { getAllKhamBenhID, getAllNhanVienID } from '../API/APIService';
import { BenhNhan } from '../../type/BenhNhan';
import { jwtDecode } from 'jwt-decode';
import { NhanVien } from '../../type/NhanVien';

interface TokenPayload {
  MaNV: string;
}

const ProfileDangKy = () => {
  const { maBN } = useParams<{ maBN: string | undefined }>();
  const [benhNhan, setBenhNhan] = useState<BenhNhan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nhanvien, setNhanVien] = useState<NhanVien | null>(null);
  const [maNV, setMaNV] = useState<string | null>(null);

  useEffect(() => {
    const fetchBenhNhan = async () => {
      try {
        if (maBN) {
          const response = await getAllKhamBenhID(parseInt(maBN));
          setBenhNhan(response.data);
          setLoading(false);
        }
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchBenhNhan();
  }, [maBN]);

  // Lấy thông tin từ Token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode<TokenPayload>(token);
        setMaNV(decodedToken.MaNV);
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  }, []);


  if (!maBN) {
    return <div>Mã bệnh nhân không hợp lệ.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <NhanVienDashboard>
      <Container>
        <Typography variant="h4" gutterBottom>
          Thông tin bệnh nhân
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <img src={benhNhan?.anhDaiDien} alt="Ảnh bệnh nhân" style={{ maxWidth: '15%', height: 'auto' }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>Họ và tên: {benhNhan?.hoTenBN}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>Địa chỉ: {benhNhan?.diaChi}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>CMND/CCCD: {benhNhan?.cmnD_CCCD}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>Số điện thoại: {benhNhan?.sdt}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>Ngày sinh: {benhNhan?.ngaySinh}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>Giới tính: {benhNhan?.gioiTinh}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>Mã BHYT: {benhNhan?.maBHYT}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>Dân tộc: {benhNhan?.danToc}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>Nghề nghiệp: {benhNhan?.ngheNghiep}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>Email: {benhNhan?.email}</Typography>
          </Grid>
        </Grid>
      </Container>
    </NhanVienDashboard>
  );
};

export default ProfileDangKy;
