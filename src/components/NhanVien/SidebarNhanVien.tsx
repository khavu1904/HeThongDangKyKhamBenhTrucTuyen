import React from 'react';
import { Nav } from 'react-bootstrap';

const SidebarNhanVien: React.FC = () => {
  return (
    <div className="sidebar">
      <Nav className="flex-column">
        <Nav.Link href="/nhanvien/das"></Nav.Link>
        <Nav.Link href="/nhanvien/Duyet">Quản Lý Đăng Ký Khám Bệnh</Nav.Link>
        <Nav.Link href="/laplich">Đăng Ký Lịch Khám</Nav.Link>
      </Nav>
    </div>
  );
}

export default SidebarNhanVien;
