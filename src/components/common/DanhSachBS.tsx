import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getAllBacSiChuyenKhoa } from '../API/APIService';
import { BacSi } from '../../type/BacSi';
import '../../css/Herder.css';
import BSImg from '../../img/hinhbacsi.jpg';
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode

export function DanhSachBS() {

  const navigate = useNavigate();
  const [bacsiCKList, setBacSiCKList] = useState<BacSi[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Theo dõi trạng thái đăng nhập

  useEffect(() => {
    const fetchBacSi = async () => {
      try {
        const response = await getAllBacSiChuyenKhoa();
        const bacSiList = response.data.map(bacSi => ({
          ...bacSi,
          maNV: bacSi.maNV // Assuming maNV is already part of the BacSi object returned by API
        }));
        setBacSiCKList(bacSiList);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchBacSi();

    // Kiểm tra trạng thái đăng nhập ở đây
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // !! chuyển đổi giá trị token thành giá trị boolean

    // Lấy thông tin từ token và cập nhật state ở đây
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        console.log(decodedToken); // Just for debugging purposes
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  }, []);

  const handleRegisterClick = (maLichLamViec: string) => {
    if (isLoggedIn) {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken: any = jwtDecode(token);
          const maBN = decodedToken.MaBN;
          // Find the corresponding BacSi object
          const selectedBacSi = bacsiCKList.find(bacSi => bacSi.maLichLamViec === maLichLamViec);
          if (selectedBacSi) {
            navigate(`/dangkykhambenh/${maLichLamViec}/${selectedBacSi.maNV}/${maBN}`);
          } else {
            console.error(`BacSi with maLichLamViec ${maLichLamViec} not found in bacsiCKList`);
          }
        } catch (error) {
          console.error('Invalid token:', error);
        }
      }
    } else {
      alert('Vui lòng đăng nhập để đăng ký khám bệnh');
      navigate(`/dangnhap`);
      // Display login modal or navigate to login page here
    }
  };


  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1 className="text-center mb-5 name-dichvu">Danh sách các bác sĩ</h1>
      <Container className="scroll" style={{ maxHeight: '400px', overflowX: 'auto' }}>
        <Row>
          <Col className='d-flex flex-nowrap'>
            {bacsiCKList.map(bacSi => (
              <Card key={bacSi.maNV} style={{ width: '18rem' }} className="m-2">
                <Card.Img
                  as="div"
                  variant="top"
                  style={{
                    maxWidth: '60%', // Giới hạn chiều rộng tối đa
                    height: 'auto', // Chiều cao tự điều chỉnh theo chiều rộng
                    borderRadius: '50%', // Bo tròn hình ảnh
                    display: 'block', // Đảm bảo hình ảnh không bị lệch
                    margin: 'auto' // Canh giữa hình ảnh
                  }}
                >
                  <img
                    src={bacSi?.anhDaiDien}
                    alt="Ảnh nhân viên"
                    style={{
                      maxWidth: '100%', // Giới hạn chiều rộng tối đa bên trong thẻ div
                      height: 'auto', // Chiều cao tự điều chỉnh theo chiều rộng
                      borderRadius: '50%', // Bo tròn hình ảnh
                      display: 'block', // Đảm bảo hình ảnh không bị lệch
                      margin: 'auto' // Canh giữa hình ảnh
                    }}
                  />
                </Card.Img>
                <Card.Body className='text-center'>
                  <Card.Title>{bacSi.hocVan}: {bacSi.tenBacSi}</Card.Title>
                  <Card.Title>{bacSi.tenChuyenKhoa}</Card.Title>
                  <br />
                  <Button onClick={() => handleRegisterClick(bacSi.maLichLamViec)}>Đăng ký khám</Button>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
