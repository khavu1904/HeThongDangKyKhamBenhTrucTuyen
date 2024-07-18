import React, { useEffect, useState } from 'react';
import {
    Container, TextField, MenuItem, Select, FormControl, InputLabel, Button,
    Grid, Card, CardContent, Typography, Avatar, Pagination
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { BacSi } from '../../type/BacSi';
import { SelectChangeEvent } from '@mui/material/Select';
import { ChuyenKhoa } from '../../type/ChuyenKhoa';
import { jwtDecode } from 'jwt-decode';

const DKChuyenKhoa: React.FC = () => {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState<BacSi[]>([]);
    const [specialty, setSpecialty] = useState<string>('Tất cả');
    const [totalResults, setTotalResults] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [chuyenkhoaList, setChuyenKhoaList] = useState<ChuyenKhoa[]>([]);

    useEffect(() => {
        const fetchChuyenKhoaList = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://localhost:7178/api/ChuyenKhoa');
                if (!response.ok) {
                    throw new Error('Failed to fetch specialty list');
                }
                const data = await response.json();
                setChuyenKhoaList(data);
            } catch (error) {
                setError('Failed to fetch specialty list');
            } finally {
                setLoading(false); // Dời setLoading(false) vào trong finally
            }
        };

        fetchChuyenKhoaList();
    }, []);

    useEffect(() => {
        // Chỉ fetch dữ liệu bác sĩ khi chuyenkhoaList và page thay đổi
        if (specialty !== 'Tất cả' && chuyenkhoaList.length > 0) {
            const chuyenKhoa = chuyenkhoaList.find(item => item.tenChuyenKhoa === specialty);
            if (chuyenKhoa) {
                fetchDoctors(chuyenKhoa.maChuyenKhoa.toString(), page);
            }
        } else {
            fetchDoctors(specialty, page);
        }
    }, [specialty, page, chuyenkhoaList]);

    const fetchDoctors = async (selectedSpecialty: string, selectedPage: number) => {
        setLoading(true);
        setError('');
        try {
            let url = `https://localhost:7178/api/BacSi/with-chuyenkhoa?page=${selectedPage}`;
            if (selectedSpecialty !== 'Tất cả') {
                url = `https://localhost:7178/api/BacSi/with-chuyenkhoa-ma/${selectedSpecialty}?page=${selectedPage}`;
            }

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setDoctors(data || []);
            setTotalResults(data.length || 0);
        } catch (error) {
            console.error('Error fetching doctors:', error);
            setError('Failed to fetch data');
            setDoctors([]);
            setTotalResults(0);
        } finally {
            setLoading(false);
        }
    };

    const handleSpecialtyChange = (event: SelectChangeEvent<string>) => {
        const selectedSpecialty = event.target.value;
        setSpecialty(selectedSpecialty);
        setPage(1);
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    // Kiểm tra xem token đăng nhập chưa
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); // Chuyển đổi giá trị token thành boolean

        // Lấy thông tin từ token và cập nhật state ở đây
        if (token) {
            try {
                const decodedToken: any = jwtDecode(token);
                console.log(decodedToken); // Để debug
            } catch (error) {
                console.error('Invalid token:', error);
            }
        }
    }, []);

    // Hàm đăng ký khám bệnh
    const handleRegisterClick = (maLichLamViec: string, maNV: number) => {
        if (isLoggedIn) {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const decodedToken: any = jwtDecode(token);
                    const maBN = decodedToken.MaBN;
                    navigate(`/dangkykhambenh/${maLichLamViec}/${maNV}/${maBN}`);
                } catch (error) {
                    console.error('Invalid token:', error);
                }
            }
        } else {
            alert('Vui lòng đăng nhập để đăng ký khám bệnh');
            navigate(`/dangnhap`);
            // Hiển thị modal đăng nhập hoặc điều hướng đến trang đăng nhập tại đây
        }
    };

    const startIndex = (page - 1) * 6;
    const endIndex = Math.min(startIndex + 6, doctors.length);
    const displayedDoctors = doctors.slice(startIndex, endIndex);

    return (
        <Layout>
            <Container>
                <main>
                    <TextField fullWidth label="Tìm theo triệu chứng, bác sĩ, bệnh viện..." variant="outlined" margin="normal" />
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={3}>
                            <FormControl fullWidth variant="outlined" margin="normal">
                                <InputLabel>Chuyên khoa</InputLabel>
                                <Select value={specialty} onChange={handleSpecialtyChange} label="Chuyên khoa">
                                    <MenuItem value="Tất cả">Tất cả</MenuItem>
                                    {chuyenkhoaList.map((item) => (
                                        <MenuItem key={item.maChuyenKhoa} value={item.tenChuyenKhoa}>{item.tenChuyenKhoa}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            {loading ? (
                                <Typography variant="h6">Loading...</Typography>
                            ) : error ? (
                                <Typography variant="h6" color="error">{error}</Typography>
                            ) : totalResults === 0 ? (
                                <Typography variant="h6">Không tìm thấy kết quả.</Typography>
                            ) : (
                                <>
                                    <Typography variant="h6">Tìm thấy {totalResults} kết quả.</Typography>
                                    <Grid container spacing={2}>
                                        {displayedDoctors.map((doctor, index) => (
                                            <Grid item xs={12} key={index}>
                                                <Card>
                                                    <CardContent>
                                                        <Grid container spacing={2} alignItems="center">
                                                            <Grid item>
                                                                <img
                                                                    src={doctor?.anhDaiDien}
                                                                    alt="Ảnh nhân viên"
                                                                    style={{
                                                                        maxWidth: '60%', // Giới hạn chiều rộng tối đa
                                                                        height: 'auto', // Chiều cao tự điều chỉnh theo chiều rộng
                                                                        borderRadius: '50%', // Bo tròn hình ảnh
                                                                        display: 'block', // Đảm bảo hình ảnh không bị lệch
                                                                        margin: 'auto' // Canh giữa hình ảnh
                                                                    }}
                                                                />
                                                            </Grid>
                                                            <Grid item xs={8}>
                                                                <Typography variant="h6">Bác Sĩ: {doctor.tenBacSi}</Typography>
                                                                <Typography variant="body2">Chuyên khoa: {doctor.tenChuyenKhoa}</Typography>
                                                            </Grid>
                                                            <Grid item>
                                                                <Button variant="contained" color="primary" onClick={() => handleRegisterClick(doctor.maLichLamViec, doctor.maNV)}>Đặt lịch khám bệnh</Button>
                                                            </Grid>
                                                        </Grid>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        ))}
                                    </Grid>
                                    <Pagination count={Math.ceil(totalResults / 6)} page={page} onChange={handlePageChange} color="primary" />
                                </>
                            )}
                        </Grid>
                    </Grid>
                </main>
            </Container>
        </Layout>
    );
};

export default DKChuyenKhoa;
