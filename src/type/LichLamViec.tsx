import { NhanVien } from './NhanVien';

export type LichLamViec = {
    maLichLamViec: string,
    ca: string,
    ngayTao: string,
    ngayBatDau: string,
    maNV: number,
    maPhongKham: number
    employeeInfo?: NhanVien;
}