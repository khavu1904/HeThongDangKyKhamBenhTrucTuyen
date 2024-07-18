import React from 'react';
import { Container, Typography, Grid, Avatar, Button, Card, CardContent } from '@mui/material';
import DoctorSchedule from './Test';

const Test: React.FC = () => {
  return (
    <Container>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} md={3}>
              <Avatar
                alt="Nguyễn Thị Thu Hà"
                src="https://via.placeholder.com/150"
                sx={{ width: 150, height: 150 }}
              />
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
              <Typography variant="h5" component="div">
                Bác sĩ chuyên khoa 2 Nguyễn Thị Thu Hà
              </Typography>
              <Typography variant="body1" color="text.secondary">
                35 năm kinh nghiệm
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Chuyên khoa: Nhi khoa
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Chức vụ: Phó Giám đốc Bệnh viện Nhi đồng Thành phố
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Nơi công tác: Bệnh viện Nhi Đồng Thành phố
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <DoctorSchedule />
    </Container>
  );
};

export default Test;
