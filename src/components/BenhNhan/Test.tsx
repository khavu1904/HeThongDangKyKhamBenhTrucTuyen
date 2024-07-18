import React from 'react';
import { Box, Button, Grid, Typography, Container, Paper } from '@mui/material';

const DoctorSchedule: React.FC = () => {
  const dates = [
    { date: 'Th 6, 07-06', slots: 42 },
    { date: 'Th 7, 08-06', slots: 36 },
    { date: 'Th 2, 10-06', slots: 42 },
    { date: 'Th 3, 11-06', slots: 42 },
    { date: 'Th 4, 12-06', slots: 42 },
    { date: 'Th 5, 13-06', slots: 42 },
    { date: 'Th 6, 14-06', slots: 42 },
  ];

  const timeSlots = [
    '17:30:00-17:35:00', '17:35-17:40', '17:40-17:45', '17:45-17:50', '17:50-17:55',
    '17:55-18:00', '18:00-18:05', '18:05-18:10', '18:10-18:15', '18:15-18:20',
    '18:20-18:25', '18:25-18:30',
  ];

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h6" gutterBottom>
          Đặt khám nhanh
        </Typography>
        <Grid container spacing={2}>
          {dates.map((date, index) => (
            <Grid item key={index}>
              <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
                <Typography variant="body1">{date.date}</Typography>
                <Typography variant="body2">{date.slots} khung giờ</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ my: 4 }}>
        <Typography variant="subtitle1" gutterBottom>
          Buổi chiều
        </Typography>
        <Grid container spacing={1}>
          {timeSlots.map((slot, index) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
              <Button variant="outlined" fullWidth>{`${slot}:00`}</Button>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Button variant="contained" color="primary">
          Đặt khám ngay
        </Button>
      </Box>
    </Container>
  );
};

export default DoctorSchedule;
