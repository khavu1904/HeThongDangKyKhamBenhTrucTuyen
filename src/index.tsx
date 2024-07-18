import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BenhNhanDashboard from './components/BenhNhan/BenhNhanDashboard';
import DangKyKhamBenh from './components/BenhNhan/DangKyKhamBenh';
import ChuyenKhoaList from './components/BenhNhan/ChuyenKhoaList';
import UpdateProfile from './components/BenhNhan/UpdateProfile';
import  ProfileDangKy from './components/NhanVien/ProfileDangKy';
import BasicTable from './components/NhanVien/DuyetDangKyKham';
import DangNhap from './components/TaiKhoan/DangNhap';
import DangKy from './components/TaiKhoan/DangKy';
import BangDuyet from './components/NhanVien/BangDuyet';
import { Dashboard } from '@mui/icons-material';
import Dash from './components/NhanVien/Dashboard';
import ProfileBN from './components/BenhNhan/ProfileBN';
//import DoctorSchedule from './components/BenhNhan/Test';
import DKChuyenKhoa from './components/BenhNhan/DKChuyenKhoa';
import BacSi from './components/BacSi/HomeBacSi';
import CalendarComponent from './components/BacSi/CalendarComponent';
import ProfileBS from './components/BacSi/ProfieBacSi';
import AppLich from './components/BacSi/Lich/AppLich';
import UpdateProfileBS from './components/BacSi/UpdateProfileBS';
import GiaoDien from './components/common/GiaoDien';
import Test1 from './components/BenhNhan/Test1';
import LapLich from './components/NhanVien/LapLich';
//import DangKy from './components/TaiKhoan/DangKy';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/benhnhan/profilebenhnhan/:maBN' element={<UpdateProfile />} />
        <Route path='/' element={<BenhNhanDashboard />} />
        <Route path='/dangnhap' element={<DangNhap />} />
        <Route path='/dangky' element={<DangKy />} />
        <Route path='/dangkykhambenh/:maLichLamViec/:maNV/:maBN' element={<DangKyKhamBenh />} />
        <Route path='/nhanvien/Duyet' element={<BasicTable />} />
        <Route path='/nhanvien/profilebenhnhan/:maBN' element={<ProfileDangKy />} />
        <Route path='/bangduyet' element={<BangDuyet />} />
        <Route path='/nhanvien/das' element={<Dash />} />
        <Route path='/benhnhan/profile/:maBN' element={<ProfileBN />} />
        <Route path='/bacsi/home' element={<BacSi />} />
        <Route path='/bacsi/lich' element={<CalendarComponent />} />
        <Route path='/bacsi/profile/:maNV' element={<ProfileBS />} />
        <Route path='/bacsi/lichbs' element={<AppLich />} />
        <Route path="/bacsi/upprofile/:maNV" element={<UpdateProfileBS />} />
        <Route path='/chuyenkhoa' element={<DKChuyenKhoa />} />
        <Route path='/t' element={<Test1 />} />
        <Route path='/laplich' element={<LapLich />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
