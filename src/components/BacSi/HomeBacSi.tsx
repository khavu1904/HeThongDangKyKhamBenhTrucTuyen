import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import BacSiDashboard from './BacSiDashboard';

const BacSi: React.FC = () => {
  return (
    <BacSiDashboard>
       <Row>
        <Col>
          <Card>
            <Card.Body>
              <h1>Hello</h1>
              <h1>Hello</h1>
            </Card.Body>
          </Card>
        </Col>
      </Row>  
    </BacSiDashboard>
  );
}

export default BacSi;
