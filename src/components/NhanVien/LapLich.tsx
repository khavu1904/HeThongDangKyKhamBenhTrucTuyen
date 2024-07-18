import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Button, Box, Grid, Paper, Typography, FormControlLabel, Checkbox, Alert } from '@mui/material';
import NhanVienDashboard from './NhanVienDashboard';
import axios from 'axios';
import { NhanVien } from '../../type/NhanVien';
import { PhongKham } from '../../type/PhongKham';

interface ScheduleFormData {
  ca: string;
  ngayTao: string;
  ngayBatDau: string;
  maNV: string;
  maPhongKham: string;
  tenNhanVienTao: string;
}

const LapLich: React.FC = () => {
  const initialFormData: ScheduleFormData = {
    ca: '',
    ngayTao: '',
    ngayBatDau: '',
    maNV: '',
    maPhongKham: '',
    tenNhanVienTao: ''
  };

  const [formData, setFormData] = useState<ScheduleFormData>(initialFormData);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [bacSiList, setBacSiList] = useState<NhanVien[]>([]);
  const [phongKhamList, setPhongKhamList] = useState<PhongKham[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const caOptions = ["Ca Sáng", "Ca Chiều", "Ca Tối"]; // Các tùy chọn cho combobox Ca

  // Load danh sách bác sĩ
  useEffect(() => {
    const fetchBacSi = async () => {
      try {
        const response = await axios.get('https://localhost:7178/api/NhanVien');
        const data: NhanVien[] = response.data;
        const filteredData = data.filter(nv => nv.chucDanh === 'Doctor');
        setBacSiList(filteredData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchBacSi();
  }, []);

  // Load danh sách phòng khám
  useEffect(() => {
    const fetchPhongKham = async () => {
      try {
        const responsePhongKham = await axios.get('https://localhost:7178/api/PhongKham');
        const dataPhongKham: PhongKham[] = responsePhongKham.data;
        setPhongKhamList(dataPhongKham);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPhongKham();
  }, []);

  // Get tenNhanVienTao from the token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const parsedToken = JSON.parse(atob(token.split('.')[1]));
      setFormData(prevState => ({
        ...prevState,
        tenNhanVienTao: parsedToken.HoTen
      }));
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | { name?: string | undefined; value: unknown; }>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name as string]: value as string
    });
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRole(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://localhost:7178/api/LichLamViec', formData);
      console.log('Response:', response.data);

      if (response.data.Message) {
        alert(response.data.Message);
      } else {
        alert('Đã tạo lịch thành công.');
      }

      resetForm();
      setErrorMessage('');
    } catch (error: any) {
      console.error('Error submitting data:', error);

      if (error.response) {
        if (error.response.status === 400 || error.response.status === 409) {
          setErrorMessage(error.response.data || 'Validation error occurred.');
        } else if (error.response.status === 500) {
          setErrorMessage('Internal Server Error: ' + error.response.data);
        } else {
          setErrorMessage('An error occurred while creating the record.');
        }
      } else {
        setErrorMessage('An error occurred while creating the record.');
      }
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setSelectedRole('');
  };

  return (
    <NhanVienDashboard>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 1000, margin: 'auto', mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Lập Lịch Làm Việc
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          )}
          {successMessage && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {successMessage}
            </Alert>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Ca"
                name="ca"
                value={formData.ca}
                onChange={handleChange}
              >
                {caOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Ngày Tạo"
                name="ngayTao"
                type="date"
                value={formData.ngayTao}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Ngày Bắt Đầu"
                name="ngayBatDau"
                type="date"
                value={formData.ngayBatDau}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Danh sách phòng khám"
                name="maPhongKham"
                value={formData.maPhongKham}
                onChange={handleChange}
              >
                {phongKhamList.map(phongKham => (
                  <MenuItem key={phongKham.maPhongKham} value={phongKham.maPhongKham}>
                    {phongKham.tenPhongKham}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Danh sách bác sĩ"
                name="maNV"
                value={formData.maNV}
                onChange={handleChange}
              >
                {bacSiList.map(bacSi => (
                  <MenuItem key={bacSi.maNV} value={bacSi.maNV}>
                    {bacSi.hoTen}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Lập lịch
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </NhanVienDashboard>
  );
};

export default LapLich;
