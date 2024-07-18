import React, { useEffect, useState } from 'react';
import { Spinner, Alert } from 'react-bootstrap';
import { getAllNhomQuyen } from '../API/APIService';
import { NhomQuyen } from '../../type/NhomQuyen';

const NhomQuyenList: React.FC = () => {
  const [nhomQuyenList, setNhomQuyenList] = useState<NhomQuyen[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNhomQuyen = async () => {
      try {
        const response = await getAllNhomQuyen();
        setNhomQuyenList(response.data);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchNhomQuyen();
  }, []);

  if (loading) {
    return <Spinner animation="border" variant="primary" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div>
      <table className="table table-success table-striped">
        <thead>
          <tr>
            <th>Mã Quyền</th>
            <th>Tên Quyền</th>
          </tr>
        </thead>
        <tbody>
          {nhomQuyenList.map((nhomQuyen, index) => (
            <tr key={index}>
              <td>{nhomQuyen.maQuyen}</td>
              <td>{nhomQuyen.tenQuyen}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NhomQuyenList;
