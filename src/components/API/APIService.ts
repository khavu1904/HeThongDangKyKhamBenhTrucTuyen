import axios from 'axios';
import { NhomQuyen } from '../../type/NhomQuyen'
import { NhanVien } from '../../type/NhanVien';
import { BacSi } from '../../type/BacSi';
import { BenhNhan } from '../../type/BenhNhan';
import { KhamBenh } from '../../type/KhamBenh';

const API_URL = 'https://localhost:7178/api'; // Thay đổi URL này thành URL của API của bạn

export const getAllNhanVien = () => { //Lấy tất cả thông tin trong danh sách nhân viên
    return axios.get<NhanVien[]>(`${API_URL}/NhanVien`);
};

//Bác sĩ
export const getAllBacSiChuyenKhoa = () => { //Lấy danh sách bác sĩ theo chuyên khoa
    return axios.get<BacSi[]>(`${API_URL}/BacSi/with-chuyenkhoa`);
};
//Bác sĩ

export const getLichLamViecByBacSi = (maNV: number) => { //Lấy nhân viên theo maNV
    return axios.get(`${API_URL}/LichLamViec/bacsi/${maNV}`);
};

export const dangKyKhamBenh = (data: any) => { //Gọi API đăng kí khám chuwxc bệnh
    return axios.post(`${API_URL}/KhamBenh`, data);
};
//Nhóm quyền
export const getAllNhomQuyen = () => { //Lấy tất cả thông tin trong danh sách nhóm quyền
    return axios.get<NhomQuyen[]>(`${API_URL}/NhomQuyen`);
}
//Nhóm quyền
//Load danh sách bệnh nhân
export const getAllBenhNhan = () => { //Lấy tất cả thông tin trong danh sách nhóm quyền
    return axios.get<BenhNhan[]>(`${API_URL}/BenhNhan`);
}
//Load danh sách bệnh nhân

//Khám bệnh
export const getAllKhamBenh = () => { //Lấy tất cả thông tin trong danh sách kham benh
    return axios.get<KhamBenh[]>(`${API_URL}/KhamBenh`);
}
export const updateTrangThai = async (maKhamBenh: number, newStatus: string) => {
    const response = await axios.put(`${API_URL}/KhamBenh/UpdateKhamBenhStatusAsync/${maKhamBenh}`, { newStatus });
    return response.data;
};
export const getAllKhamBenhID = (maBN: number) => { //Lấy tất cả thông tin trong danh sách kham benh
    return axios.get(`${API_URL}/BenhNhan/${maBN}`);
}
//Khám bệnh

//
export const getAllLichSuKhamBenh = (maBN: number) => { //Lấy tất cả thông tin trong danh sách kham benh
    return axios.get(`${API_URL}/KhamBenh/maBN/${maBN}`);
}
//

//Load thông tin bệnh nhân
export const getAllNhanVienID = (maNV: number) => { //Lấy tất cả thông tin trong danh sách kham benh
    return axios.get(`${API_URL}/NhanVien/${maNV}`);
}
//Load thông tin bệnh nhân
