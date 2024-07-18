import React from 'react';
import { Container, TextField, MenuItem, Select, FormControl, InputLabel, Button, Grid, Card, CardContent, Typography, Avatar, Pagination } from '@mui/material';
import '../../css/AppGD.css';

const GiaoDien: React.FC = () => {
  return (
    <Container>
      <header className="App-header">
        <h1>YouMed</h1>
        <nav>
          <ul>
            <li>Trang chủ</li>
            <li>Bác sĩ</li>
            <li>Tìm kiếm</li>
            <li>Đặt khám</li>
            <li>Tư vấn trực tuyến</li>
            <li>Store</li>
            <li>Tin Y tế</li>
            <li>Trần Vũ Kha</li>
          </ul>
        </nav>
      </header>
      <main>
        <TextField fullWidth label="Tìm theo triệu chứng, bác sĩ, bệnh viện..." variant="outlined" margin="normal" />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel>Chuyên khoa</InputLabel>
              <Select label="Chuyên khoa" defaultValue="Da liễu">
                <MenuItem value="Tất cả">Tất cả</MenuItem>
                <MenuItem value="Nhi khoa">Nhi khoa</MenuItem>
                <MenuItem value="Sản phụ khoa">Sản phụ khoa</MenuItem>
                <MenuItem value="Da liễu">Da liễu</MenuItem>
                <MenuItem value="Tiêu hoá">Tiêu hoá</MenuItem>
                <MenuItem value="Cơ xương khớp">Cơ xương khớp</MenuItem>
                <MenuItem value="Dị ứng - miễn dịch">Dị ứng - miễn dịch</MenuItem>
                <MenuItem value="Gây mê hồi sức">Gây mê hồi sức</MenuItem>
                <MenuItem value="Tai - mũi - họng">Tai - mũi - họng</MenuItem>
                <MenuItem value="Ung bướu">Ung bướu</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Typography variant="h6">Tìm thấy 22 kết quả.</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item>
                        <Avatar />
                      </Grid>
                      <Grid item xs={8}>
                        <Typography variant="h6">BS. CK1 Lê Minh Tuấn</Typography>
                        <Typography variant="body2">Nội tổng quát - Da liễu</Typography>
                        <Typography variant="body2">54 An Dương Vương, Phường Nguyễn Văn Cừ, Thành phố Qui Nhơn, Bình Định</Typography>
                      </Grid>
                      <Grid item>
                        <Button variant="contained" color="primary">Đặt lịch tư vấn</Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item>
                        <Avatar />
                      </Grid>
                      <Grid item xs={8}>
                        <Typography variant="h6">ThS. BS Nguyễn Ngọc Như Phương</Typography>
                        <Typography variant="body2">Da liễu - Nội tổng quát</Typography>
                        <Typography variant="body2">90 Hoàng Quốc Việt, Phường An Bình, Quận Ninh Kiều, Cần Thơ</Typography>
                      </Grid>
                      <Grid item>
                        <Button variant="contained" color="primary">Đặt lịch tư vấn</Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Pagination count={3} color="primary" />
          </Grid>
        </Grid>
      </main>
    </Container>
  );
}

export default GiaoDien;
