import React from 'react';
import { Nav } from 'react-bootstrap';

const SidebarBacSi: React.FC = () => {
  return (
    <div className="sidebar">
      <Nav className="flex-column">
        <Nav.Link href="/bacsi/lichbs">Xem thông tin lịch khám</Nav.Link>
      </Nav>
    </div>
  );
}

export default SidebarBacSi;
