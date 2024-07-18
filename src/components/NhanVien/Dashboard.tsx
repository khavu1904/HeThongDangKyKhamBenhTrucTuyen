import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import NhanVienDashboard from './NhanVienDashboard';

const Dash: React.FC = () => {
  return (
    <NhanVienDashboard>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h1>Hello</h1>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </NhanVienDashboard>
  );
}

export default Dash;
