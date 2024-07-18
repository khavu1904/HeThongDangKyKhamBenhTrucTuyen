import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import {
    Container, Grid, Typography, TextField, Button, Card, CardContent,
    Accordion, AccordionSummary, AccordionDetails, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import Layout from '../Layout/Layout';
import { LichLamViec } from '../../type/LichLamViec';
import { NhanVien } from '../../type/NhanVien';
import { BacSiChuyenKhoa } from '../../type/BacSiChuyenKhoa';
import { useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { KhamBenh } from '../../type/KhamBenh';
import { getAllKhamBenhID } from '../API/APIService';
import { BenhNhan } from '../../type/BenhNhan';
import { SelectChangeEvent } from '@mui/material/Select';


interface FormState {
    trieuChung: string;
    chuanDoan: string;
    ghiChu: string;
    gioBatDau: string;
    gioKetThuc: string;
    maLichLamViec: string;
    trangThai: string;
    tenNhanVienDuyet: string;
    maBN?: string;
    maNV?: number;
}

const timeSlots = [
    '08:00-08:20', '08:30-08:50', '09:00-09:20', '09:30-09:50', '10:00-10:20',
    '10:30-10:45', '11:00-11:20', '11:30-11:50',
    '13:00-13:20', '13:30-13:50', '14:00-14:20', '14:30-14:50', '15:00-15:20',
    '15:30-15:50', '16:00-16:20', '16:30-16:50',
];

const fetchSessionInfo = async (maLichLamViec: string) => {
    try {
        const response = await axios.get(`https://localhost:7178/api/LichLamViec/${maLichLamViec}`);
        return response.data.ca; // Assuming `ca` is the session info
    } catch (error) {
        console.error('Error fetching session info:', error);
        return null;
    }
};


const DangKyKhamBenh: React.FC = () => {
    const [benhnhanList, setBenhNhanList] = useState<BenhNhan[]>([]);
    const [lichlamviecList, setLichLamViecList] = useState<LichLamViec[]>([]);
    const [khambenhList, setKhambenhList] = useState<KhamBenh[]>([]);
    const [nhanvien, setNhanVien] = useState<BacSiChuyenKhoa[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [filteredTimeSlots, setFilteredTimeSlots] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [shift, setShift] = useState<string>(''); // Lưu trữ loại ca (Sáng/Chiều)
    const [bacSiChuyenKhoa, setBacSiChuyenKhoa] = useState<BacSiChuyenKhoa | null>(null);




    const { maLichLamViec } = useParams<{ maLichLamViec: string }>();
    const { maNV } = useParams<{ maNV: string }>();
    const navigate = useNavigate();

    const maNVNumber = Number(maNV);


    const [form, setForm] = useState<FormState>({
        trieuChung: '',
        chuanDoan: 'Chưa có',
        ghiChu: '',
        gioBatDau: '',
        gioKetThuc: '',
        maLichLamViec: maLichLamViec || '',
        trangThai: '1',
        maNV: 0,
        tenNhanVienDuyet: 'Chưa có',
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken: any = jwtDecode(token);
                const maBN = decodedToken.MaBN;
                setForm(prevForm => ({ ...prevForm, maBN }));

                // Fetch patient data using maBN
                const fetchBenhNhanData = async () => {
                    try {
                        const benhnhanResponse = await getAllKhamBenhID(parseInt(maBN));
                        const benhnhanData = benhnhanResponse.data;
                        if (Array.isArray(benhnhanData)) {
                            setBenhNhanList(benhnhanData);
                        } else if (typeof benhnhanData === 'object') {
                            setBenhNhanList([benhnhanData]);
                        } else {
                            console.error('Unexpected data format:', benhnhanData);
                        }
                    } catch (error) {
                        console.error('Error fetching patient data:', error);
                    }
                };

                fetchBenhNhanData();
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://localhost:7178/api/LichLamViec/nhanvien/${maNVNumber}`);
                const lichLamViecData: LichLamViec[] = response.data;

                const responseBacSi = await axios.get<BacSiChuyenKhoa>(`https://localhost:7178/api/BacSi/${maNVNumber}`);
                const bacSiData: BacSiChuyenKhoa = responseBacSi.data;
                setBacSiChuyenKhoa(responseBacSi.data);

                const khambenhResponse = await axios.get('https://localhost:7178/api/KhamBenh');
                const khambenhData: KhamBenh[] = khambenhResponse.data;
                setKhambenhList(khambenhData);

                setLichLamViecList(lichLamViecData);
                setLoading(false);
            } catch (error: any) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [maLichLamViec, maNVNumber]);



    useEffect(() => {
        if (selectedDate && shift) {
            let filteredSlots: string[] = [];
            if (shift === 'Ca Sáng') {
                filteredSlots = timeSlots.filter(slot => slot.startsWith('08') || slot.startsWith('09') || slot.startsWith('10') || slot.startsWith('11'));
            } else if (shift === 'Ca Chiều') {
                filteredSlots = timeSlots.filter(slot => slot.startsWith('13') || slot.startsWith('14') || slot.startsWith('15') || slot.startsWith('16'));
            }
            setFilteredTimeSlots(filteredSlots);
        } else {
            setFilteredTimeSlots([]);
        }
    }, [selectedDate, shift]);


    const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const { value } = event.target; // Destructure value từ event.target
        setSelectedDate(value as string); // Ép kiểu value về string và cập nhật state
        console.log(value);
    };
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };
    const handleDateChange = (event: SelectChangeEvent<string>) => {
        const { value } = event.target;
        setSelectedDate(value);
        const selectedLichLamViec = lichlamviecList.find(item => item.maLichLamViec === value);
        if (selectedLichLamViec) {
            setShift(selectedLichLamViec.ca);
        }
    };


    const handleTimeSlotClick = (slot: string) => {
        const [start, end] = slot.split('-');
        setForm({
            ...form,
            gioBatDau: `${start}:00`,
            gioKetThuc: `${end}:00`
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('https://localhost:7178/api/KhamBenh', form, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Submitted:', response.data);
            alert('Vui lòng đợi thông báo từ gmail');
            navigate('/'); // Redirect to homepage
        } catch (error) {
            console.error('Error registering for examination:', error);
            if (axios.isAxiosError(error) && error.response) {
                console.error('Response data:', error.response.data);
            }
        }
    };




    const isTimeSlotReserved = (slot: string) => {
        const [slotStart, slotEnd] = slot.split('-');
        return khambenhList.some(khambenh => {
            const khamStart = khambenh.gioBatDau.substring(0, 5);
            const khamEnd = khambenh.gioKetThuc.substring(0, 5);
            return (
                khambenh.maLichLamViec === Number(form.maLichLamViec) &&
                ((slotStart >= khamStart && slotStart < khamEnd) ||
                    (slotEnd > khamStart && slotEnd <= khamEnd))
            );
        });
    };


    return (
        <Layout>
            <Container>
                <Typography variant="h4" gutterBottom>
                    Đăng Ký Khám Bệnh
                </Typography>
                {loading ? (
                    <Typography>Loading...</Typography>
                ) : error ? (
                    <Typography>Error: {error}</Typography>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            Thông Tin Bệnh Nhân
                                        </Typography>
                                        {benhnhanList.map((bn, index) => (
                                            <Accordion key={index}>
                                               
                                                <AccordionDetails>
                                                    <Grid container spacing={2} alignItems="center">
                                                        <Grid item xs={4}>
                                                            <img src={bn.anhDaiDien} alt="Ảnh bệnh nhân" style={{ maxWidth: '100%', height: 'auto', borderRadius: '50%' }} />
                                                        </Grid>
                                                        <Grid item xs={8}>
                                                            <Typography variant="subtitle1">Thông tin bệnh nhân:</Typography>
                                                            <Typography variant="body1">
                                                                <strong>Email:</strong> {bn.email}
                                                            </Typography>
                                                            <Typography variant="body1">
                                                                <strong>Số điện thoại:</strong> {bn.sdt}
                                                            </Typography>
                                                            <Typography variant="body1">
                                                                <strong>Giới tính:</strong> {bn.gioiTinh}
                                                            </Typography>
                                                            <Typography variant="body1">
                                                                <strong>CCCD/CMND:</strong> {bn.cmnD_CCCD}
                                                            </Typography>
                                                            <Typography variant="body1">
                                                                <strong>Địa chỉ:</strong> {bn.diaChi}
                                                            </Typography>
                                                            <Typography variant="body1">
                                                                <strong>Nghề nghiệp:</strong> {bn.ngheNghiep}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </AccordionDetails>

                                            </Accordion>
                                        ))}
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={12} md={6}>

                                <Card>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            Thông Tin Bác Sĩ
                                        </Typography>
                                        {bacSiChuyenKhoa && (
                                            <Accordion>
                                                <AccordionDetails>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} sm={6}>
                                                            <Typography variant="body1">
                                                                {bacSiChuyenKhoa.hocVan}: {bacSiChuyenKhoa.tenBacSi} 
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <Typography variant="body1">
                                                                <strong>Email:</strong> {bacSiChuyenKhoa.email}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <Typography variant="body1">
                                                                <strong>Tuổi:</strong> {bacSiChuyenKhoa.tuoi}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <Typography variant="body1">
                                                                <strong>Chuyên Khoa:</strong> {bacSiChuyenKhoa.tenChuyenKhoa}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </AccordionDetails>
                                            </Accordion>
                                        )}
                                    </CardContent>

                                </Card>

                                <FormControl fullWidth margin="normal">
                                    <InputLabel htmlFor="maLichLamViec">Chọn ngày</InputLabel>
                                    <Select
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        inputProps={{
                                            name: 'maLichLamViec',
                                            id: 'maLichLamViec',
                                        }}
                                    >
                                        {lichlamviecList.map(lichlamviec => (
                                            <MenuItem key={lichlamviec.maLichLamViec} value={lichlamviec.maLichLamViec}>
                                                {lichlamviec.ngayBatDau.split('T')[0]}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>


                                <FormControl fullWidth margin="normal">
                                    <Typography variant="h6">Chọn giờ khám</Typography>
                                    <Grid container spacing={1}>
                                        {filteredTimeSlots.map((slot, index) => (
                                            <Grid item key={index}>
                                                <Button
                                                    variant={form.gioBatDau.startsWith(slot.split('-')[0]) ? 'contained' : 'outlined'}
                                                    color={isTimeSlotReserved(slot) ? 'secondary' : 'primary'}
                                                    disabled={isTimeSlotReserved(slot)}
                                                    onClick={() => handleTimeSlotClick(slot)}
                                                >
                                                    {slot}
                                                </Button>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </FormControl>
                                <TextField
                                    name="trieuChung"
                                    label="Triệu Chứng"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    value={form.trieuChung}
                                    onChange={handleFormChange}
                                />
                                <TextField
                                    name="ghiChu"
                                    label="Ghi Chú"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    value={form.ghiChu}
                                    onChange={handleFormChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="flex-end" spacing={2} sx={{ mt: 2 }}>
                            <Grid item>
                                <Button type="submit" variant="contained" color="primary">
                                    Đăng Ký
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Container>
        </Layout>

    );
};

export default DangKyKhamBenh;
