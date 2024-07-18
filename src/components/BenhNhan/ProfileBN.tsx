import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getAllKhamBenhID, getAllLichSuKhamBenh } from '../API/APIService';
import { BenhNhan } from '../../type/BenhNhan';
import { KhamBenhChiTiet } from '../../type/KhamBenhChiTiet';
import Layout from '../Layout/Layout';
import { jwtDecode } from 'jwt-decode';
import { useNavigate, useParams } from 'react-router-dom';

interface TokenPayload {
    MaBN: string;
}

const ProfileBN = () => {
    const { maBN } = useParams<{ maBN: string | undefined }>();
    const navigate = useNavigate();
    const [benhNhan, setBenhNhan] = useState<BenhNhan | null>(null);
    const [khamBenh, setKhamBenh] = useState<KhamBenhChiTiet[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBenhNhan = async () => {
            try {
                if (maBN) {
                    const response = await getAllKhamBenhID(parseInt(maBN));
                    setBenhNhan(response.data);
                }
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBenhNhan();
    }, [maBN]);

    useEffect(() => {
        const fetchKhamBenh = async () => {
            try {
                if (maBN) {
                    const response = await getAllLichSuKhamBenh(parseInt(maBN));
                    setKhamBenh(response.data);
                }
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchKhamBenh();
    }, [maBN]);

    const handleUpdateUserInfo = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const decodedToken = jwtDecode<TokenPayload>(token);
                const maBN = decodedToken.MaBN;
                navigate(`/benhnhan/profilebenhnhan/${maBN}`);
            } else {
                console.error('Token not found in localStorage.');
            }
        } catch (error) {
            console.error('Error updating user info:', error);
        }
    };

    if (!maBN) {
        return <div>Invalid patient ID.</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Layout>
            <Container>
                <Typography variant="h4" gutterBottom>
                    Thông Tin Bệnh Nhân
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={3}>
                                <img
                                    src={benhNhan?.anhDaiDien || ''}
                                    alt="Patient Avatar"
                                    style={{ width: '90%', borderRadius: '60%' }}
                                />
                            </Grid>
                            <Grid item xs={12} md={9}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6} >
                                        <Typography sx={{ fontWeight: 'bold' }}>Họ và tên: {benhNhan?.hoTenBN}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography sx={{ fontWeight: 'bold' }}>Địa chỉ: {benhNhan?.diaChi}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography sx={{ fontWeight: 'bold' }}>CCCD_CMND: {benhNhan?.cmnD_CCCD}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography sx={{ fontWeight: 'bold' }}>Số điện thoại: {benhNhan?.sdt}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography sx={{ fontWeight: 'bold' }}>Ngày sinh: {benhNhan?.ngaySinh ? new Date(benhNhan?.ngaySinh).toLocaleDateString() : 'Unknown'}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography sx={{ fontWeight: 'bold' }}>Giới tính: {benhNhan?.gioiTinh}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography sx={{ fontWeight: 'bold' }}>Mã BHYT: {benhNhan?.maBHYT}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography sx={{ fontWeight: 'bold' }}>Dân tộc: {benhNhan?.danToc}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography sx={{ fontWeight: 'bold' }}>Nghề nghiệp: {benhNhan?.ngheNghiep}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography sx={{ fontWeight: 'bold' }}>Email: {benhNhan?.email}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant="contained" onClick={handleUpdateUserInfo}>Cập nhật thông tin</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Accordion style={{ marginBottom: '8px' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`panel-content`}
                                id={`panel-header`}
                            >
                                <Typography variant="h6" gutterBottom>Lịch Sử Khám Bệnh</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {khamBenh.map((kb, index) => (
                                    <Grid container spacing={2} key={index}>
                                        <Grid item xs={12}>
                                            <Accordion style={{ marginBottom: '8px' }}>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls={`panel${index}-content`}
                                                    id={`panel${index}-header`}
                                                >
                                                    <Typography sx={{ fontWeight: 'bold' }}><strong>Ngày Khám: </strong>{new Date(kb.ngayBatDauLichLamViec).toLocaleDateString()}</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={6}>
                                                            <Typography sx={{ fontWeight: 'bold' }}><strong>Giờ bắt đầu:</strong> {kb.gioBatDau}</Typography>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <Typography sx={{ fontWeight: 'bold' }}><strong>Giờ kết thúc:</strong> {kb.gioKetThuc}</Typography>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <Typography sx={{ fontWeight: 'bold' }}><strong>Ngày khám:</strong> {new Date(kb.ngayBatDauLichLamViec).toLocaleDateString()}</Typography>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography sx={{ fontWeight: 'bold' }}><strong>Bác sĩ:</strong> {kb.tenBacSi}</Typography>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography sx={{ fontWeight: 'bold' }}><strong>Ghi chú:</strong> {kb.ghiChu}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                </AccordionDetails>
                                            </Accordion>
                                        </Grid>
                                    </Grid>
                                ))}
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    );
};

export default ProfileBN;
