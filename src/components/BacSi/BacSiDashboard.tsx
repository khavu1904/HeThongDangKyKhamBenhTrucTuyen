// src/components/NhanVien/NhanVienDashboard.tsx
import React, { ReactNode } from 'react';
import { Container } from 'react-bootstrap';
import '../../css/NhanVienApp.css';
import SidebarBacSi from './SidebarBacSi';
import NavbarBacSi from './NavbarBacSi';

interface BacSiDashboardProps {
    children: ReactNode;
}

const BacSiDashboard: React.FC<BacSiDashboardProps> = ({ children }) => {
    return (
        <div className="App">
            <SidebarBacSi />
            <div className="main-content">
            <NavbarBacSi />
                <Container fluid>
                    {children}
                </Container>
            </div>
        </div>
    );
}

export default BacSiDashboard;
