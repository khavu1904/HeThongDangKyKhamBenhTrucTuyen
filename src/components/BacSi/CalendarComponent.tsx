import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import moment from 'moment';
import BacSiDashboard from './BacSiDashboard'; // Replace 'BacSiDashboard' with your actual dashboard component

interface TokenPayload {
  MaNV: string;
}

interface LichLamViecItem {
  maLichLamViec: number;
  ca: string;
  ngayBatDau: string;
}

const DoctorScheduleComponent = () => {
  const [lichLamViec, setLichLamViec] = useState<LichLamViecItem[]>([]);

  useEffect(() => {
    const fetchDoctorSchedule = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Access token:', token); // Debug log to check token presence
        if (!token) {
          throw new Error('Access token not found');
        }

        const decodedToken: TokenPayload = jwtDecode(token);
        const maNV = parseInt(decodedToken.MaNV, 10); // Convert MaNV to number if necessary

        const response = await axios.get(`https://localhost:7178/api/LichLamViec/nhanvien/${maNV}`);
        setLichLamViec(response.data);
      } catch (error) {
        console.error('Error fetching schedule data:', error);
      }
    };

    fetchDoctorSchedule();
  }, []); // Empty dependency array to run only once after component mounts

  const formatTime = (ca: string) => {
    switch (ca) {
      case 'Sáng':
        return '8AM - 11AM';
      case 'Chìu':
        return '1PM - 5PM';
      default:
        return '';
    }
  };

  return (
    <BacSiDashboard>
      <div>
        <h2>Doctor Schedule</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #ccc' }}>
              <th>Ca làm việc</th>
              <th>Ngày bắt đầu</th>
              <th>Ngày kết thúc</th>
            </tr>
          </thead>
          <tbody>
            {lichLamViec.map((item) => (
              <tr key={item.maLichLamViec} style={{ borderBottom: '1px solid #ccc' }}>
                <td>{item.ca}</td>
                <td>{moment(item.ngayBatDau).format('YYYY-MM-DD')}</td>
                <td>{moment(item.ngayBatDau).format('YYYY-MM-DD')}</td> {/* Assuming ngayBatDau is both start and end */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </BacSiDashboard>
  );
};

export default DoctorScheduleComponent;
