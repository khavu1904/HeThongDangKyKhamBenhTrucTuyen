import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button, Box, Modal,
    TablePagination, Snackbar, Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import NhanVienDashboard from './NhanVienDashboard';
import { getAllKhamBenh } from '../API/APIService';
import { KhamBenh } from '../../type/KhamBenh';
import { jwtDecode } from 'jwt-decode';
import { NhanVien } from '../../type/NhanVien';
import { BenhNhan } from '../../type/BenhNhan';

interface TokenPayload {
    MaNV: string;
    HoTen: string;
}

function formatDate(dateString: any) {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Format date to YYYY-MM-DD
}

const ActionButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
}));

const TabButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
}));

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #fff',
    boxShadow: 24,
    borderRadius: '5px',
    p: 4,
};

export default function BasicTable() {
    const navigate = useNavigate();
    const [khambenhList, setKhamBenhList] = useState<KhamBenh[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5); // Số lượng items trên mỗi trang
    const [currentTab, setCurrentTab] = useState<'1' | '2' | '3'>('1');
    const [nhanvien, setNhanVien] = useState<NhanVien | null>(null);
    const [maNV, setMaNV] = useState<string | null>(null);
    const [hoTen, setHoTen] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const [benhnhan, setBenhNhan] = useState<BenhNhan | null>(null);
    const [openBN, setOpenBN] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const fetchKhamBenhList = async (tenNhanVienDuyet: string | null = null) => {
        try {
            const response = tenNhanVienDuyet
                ? await axios.get(`https://localhost:7178/api/KhamBenh/by-nhanvienduyet`, { params: { tenNhanVienDuyet } })
                : await getAllKhamBenh();

            if (response.data) {
                setKhamBenhList(response.data);
            }
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchKhamBenhList();
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode<TokenPayload>(token);
                setMaNV(decodedToken.MaNV);
                setHoTen(decodedToken.HoTen);
            } catch (error) {
                console.error('Invalid token:', error);
            }
        }
    }, []);

    useEffect(() => {
        if (currentTab === '2' && hoTen) {
            fetchKhamBenhList(hoTen);
        } else if (currentTab !== '2') {
            fetchKhamBenhList();
        }
    }, [currentTab, hoTen]);

    const handleUpdateStatus = async (maKhamBenh: number, newStatus: string, maBN: number, maLichLamViec: number) => {
        if (!maNV && !hoTen) {
            setError("Không thể lấy thông tin nhân viên từ token.");
            return;
        }
        if (newStatus === 'Duyệt') {
            const confirmed = window.confirm('Bạn đã liên hệ với bệnh nhân chưa?');
            if (!confirmed) {
                return;
            }
        }
        try {
            const statusValue = newStatus === 'Duyệt' ? '2' : newStatus === 'Hủy' ? '3' : newStatus;

            await axios.put(`https://localhost:7178/api/KhamBenh/UpdateKhamBenhStatusAsync/${maKhamBenh}`, null, {
                params: {
                    newStatus: statusValue,
                    nhanVienDuyet: maNV,
                    tenNhanVienDuyet: hoTen
                }
            });

            setKhamBenhList(prevList =>
                prevList.map(khamBenh =>
                    khamBenh.maKhamBenh === maKhamBenh ? { ...khamBenh, trangThai: statusValue } : khamBenh
                )
            );

            // Gửi email
            const [khambenhResponse, benhnhanResponse, lichLamViecResponse] = await Promise.all([
                axios.get(`https://localhost:7178/api/KhamBenh/${maKhamBenh}`),
                axios.get(`https://localhost:7178/api/BenhNhan/${maBN}`),
                axios.get(`https://localhost:7178/api/LichLamViec/${maLichLamViec}`)
            ]);

            const { ghiChu, gioBatDau, gioKetThuc } = khambenhResponse.data;
            const { email, hoTenBN, diaChi, cmnD_CCCD, sdt } = benhnhanResponse.data;
            const { ca, ngayBatDau } = lichLamViecResponse.data;

            const formattedNgayBatDau = formatDate(ngayBatDau);

            let emailBody = '';

            if (newStatus === 'Duyệt') {
                emailBody = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Thông tin khám bệnh</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 20px;
                }
                .container {
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    max-width: 600px;
                    margin: auto;
                }
                h3 {
                    color: #009688;
                    border-bottom: 2px solid #009688;
                    padding-bottom: 5px;
                }
                p {
                    line-height: 1.6;
                    color: #333;
                }
                .section {
                    margin-bottom: 20px;
                }
                .strong {
                    font-weight: bold;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h3>Thông tin bệnh nhân</h3>
                <div class="section">
                    <p><span class="strong">Họ và tên:</span> ${hoTenBN}</p>
                    <p><span class="strong">Địa chỉ:</span> ${diaChi}</p>
                    <p><span class="strong">CMND/CCCD:</span> ${cmnD_CCCD}</p>
                    <p><span class="strong">Số điện thoại:</span> ${sdt}</p>
                </div>
                <h3>Thông tin khám bệnh</h3>
                <div class="section">
                    <p><span class="strong">Ghi chú:</span> ${ghiChu}</p>
                    <p><span class="strong">Giờ bắt đầu:</span> ${gioBatDau}</p>
                    <p><span class="strong">Giờ kết thúc:</span> ${gioKetThuc}</p>
                </div>
                <h3>Thông tin lịch làm việc</h3>
                <div class="section">
                    <p><span class="strong">Ca:</span> ${ca}</p>
                    <p><span class="strong">Ngày bắt đầu:</span> ${formattedNgayBatDau}</p>
                </div>
            </div>
        </body>
        </html>
        `;
            } else if (newStatus === 'Hủy') {
                emailBody = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thông báo hủy đăng ký</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 20px;
            }
            .container {
                background-color: #ffffff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                max-width: 600px;
                margin: auto;
            }
            h3 {
                color: #e74c3c;
                border-bottom: 2px solid #e74c3c;
                padding-bottom: 5px;
            }
            p {
                line-height: 1.6;
                color: #333;
            }
            .section {
                margin-bottom: 20px;
            }
            .strong {
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h3>Thông báo hủy đăng ký khám bệnh</h3>
            <div class="section">
                <p>Lịch đăng ký khám bệnh của bạn vào ngày ${formattedNgayBatDau} đã hủy. Do không liên hệ xác nhận thông tin</p>
            </div>
        </div>
    </body>
    </html>
    `;
            }

            await axios.post('https://localhost:7178/api/Email', {
                to: email,
                subject: newStatus === 'Duyệt' ? 'Thông tin khám bệnh của bạn' : 'Thông báo hủy đăng ký khám bệnh',
                body: emailBody
            });
            setEmailSent(true);

        } catch (error: any) {
            setError(error.message);
        }
    };


    const getCountByStatus = (status: string) => {
        return khambenhList.filter(khamBenh => khamBenh.trangThai === status).length;
    };

    const filteredPatients = khambenhList.filter(khamBenh => khamBenh.trangThai === currentTab);

    const handleNhanVienDuyet = async (nhanVienDuyet: string) => {
        try {
            const response = await axios.get(`https://localhost:7178/api/NhanVien/${nhanVienDuyet}`);
            setNhanVien(response.data);
            setOpen(true);
        } catch (error: any) {
            setError(error.message);
        }
    };

    const handleClose = () => setOpen(false);

    const handleThongTinBN = async (MaBN: number) => {
        try {
            const response = await axios.get(`https://localhost:7178/api/BenhNhan/${MaBN}`);
            setBenhNhan(response.data);
            setOpenBN(true);
        } catch (error: any) {
            setError(error.message);
        }
    };

    const handleCloseBN = () => setOpenBN(false);

    const handleChangePage = (event: unknown, newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setItemsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(0); // Reset to the first page when changing the number of items per page
    };

    return (
        <NhanVienDashboard>
            <Snackbar open={emailSent} autoHideDuration={6000} onClose={() => setEmailSent(false)}>
                <Alert onClose={() => setEmailSent(false)} severity="success" sx={{ width: '100%' }}>
                    Email đã được gửi thành công!
                </Alert>
            </Snackbar>
            <div className="tabs">
                <TabButton variant="contained" onClick={() => setCurrentTab('1')}>
                    Chưa Duyệt 
                </TabButton>
                <TabButton variant="contained" onClick={() => setCurrentTab('2')}>
                    Đã Duyệt 
                </TabButton>
                <TabButton variant="contained" onClick={() => setCurrentTab('3')}>
                    Đã Hủy 
                </TabButton>
            </div>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error}</div>
            ) : (
                <>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Mã Khám Bệnh</TableCell>
                                    <TableCell>Ghi Chú</TableCell>
                                    <TableCell>Giờ Bắt Đầu</TableCell>
                                    <TableCell>Giờ Kết Thúc</TableCell>
                                    {(currentTab === '2' || currentTab !== '1') && (
                                        <TableCell>Tên nhân viên </TableCell>
                                    )}
                                    <TableCell>Hành động</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredPatients.slice(currentPage * itemsPerPage, currentPage * itemsPerPage + itemsPerPage).map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.maKhamBenh}</TableCell>
                                        <TableCell>{row.ghiChu}</TableCell>
                                        <TableCell>{row.gioBatDau}</TableCell>
                                        <TableCell>{row.gioKetThuc}</TableCell>
                                        <TableCell>
                                            {currentTab === '1' && (
                                                <>
                                                    <ActionButton
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() => handleUpdateStatus(row.maKhamBenh, 'Duyệt', row.maBN, row.maLichLamViec)}
                                                    >
                                                        Duyệt
                                                    </ActionButton>
                                                    <ActionButton
                                                        variant="contained"
                                                        color="secondary"
                                                        onClick={() => handleUpdateStatus(row.maKhamBenh, 'Hủy', row.maBN, row.maLichLamViec)}
                                                    >
                                                        Hủy
                                                    </ActionButton>
                                                    <ActionButton
                                                        variant="contained"
                                                        color="inherit"
                                                        onClick={() => handleThongTinBN(row.maBN)}
                                                    >
                                                        Chi tiết bệnh nhân
                                                    </ActionButton>
                                                </>
                                            )}
                                            {currentTab === '2' && (
                                                <span>{row.tenNhanVienDuyet}</span>
                                            )}
                                            {currentTab === '3' && (
                                                <span>{row.tenNhanVienDuyet}</span>
                                            )}

                                        </TableCell>
                                        <TableCell>
                                            {(currentTab === '2' || currentTab !== '1') && (
                                                <>
                                                    <ActionButton
                                                        variant="contained"
                                                        color="inherit"
                                                        onClick={() => handleThongTinBN(row.maBN)}
                                                    >
                                                        Chi tiết bệnh nhân
                                                    </ActionButton>
                                                </>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            component="div"
                            count={filteredPatients.length}
                            page={currentPage}
                            onPageChange={handleChangePage}
                            rowsPerPage={itemsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableContainer>

                </>

            )}
            <Modal
                open={openBN}
                onClose={handleCloseBN}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <h2 id="modal-modal-title">Thông tin bệnh nhân</h2>
                    {benhnhan ? (
                        <div id="modal-modal-description">
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                <img src={benhnhan.anhDaiDien} alt="Avatar" style={{ width: '100px', height: '100px', borderRadius: '50%', marginRight: '20px' }} />
                                <div>
                                    <p><strong>Họ và tên:</strong> {benhnhan.hoTenBN}</p>
                                    <p><strong>Địa chỉ:</strong> {benhnhan.diaChi}</p>
                                    <p><strong>CMND/CCCD:</strong> {benhnhan.cmnD_CCCD}</p>
                                    <p><strong>Email:</strong> {benhnhan.email}</p>
                                    <p><strong>Số điện thoại:</strong> {benhnhan.sdt}</p>
                                </div>
                            </div>
                            {/* Add additional information about the patient if needed */}
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </Box>
            </Modal>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <h2 id="modal-modal-title">Thông tin nhân viên duyệt</h2>
                    {nhanvien ? (
                        <div id="modal-modal-description">
                            <p>Mã Nhân Viên: {nhanvien.maNV}</p>
                            <p>Họ và Tên: {nhanvien.hoTen}</p>
                            <p>Số điện thoại: {nhanvien.sdt}</p>
                            <p>Email: {nhanvien.email}</p>
                            {/* Add other employee details here */}
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </Box>
            </Modal>
        </NhanVienDashboard>
    );
}
