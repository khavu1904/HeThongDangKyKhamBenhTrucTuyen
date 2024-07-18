// src/components/NhanVien/NhanVienDashboard.tsx
import React, { ReactNode } from 'react';
import { Container } from 'react-bootstrap';
import SidebarNhanVien from './SidebarNhanVien';
import '../../css/NhanVienApp.css';
import NavbarNhanVien from './NavbarNhanVien';

interface NhanVienDashboardProps {
    children: ReactNode;
}

const NhanVienDashboard: React.FC<NhanVienDashboardProps> = ({ children }) => {
    return (
        <div className="App">
            <SidebarNhanVien />
            <div className="main-content">
            <NavbarNhanVien />
                <Container fluid>
                    {children}
                </Container>
            </div>
        </div>
    );
}

export default NhanVienDashboard;
