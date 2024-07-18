import React from 'react';
import { Container, Box, Typography, Grid, Card, CardMedia, CardContent, Link } from '@mui/material';

const newsItems = [
    {
        title: 'ƯU ĐÃI 20% KHI ĐIỀU TRỊ BẰNG CÁC KỸ THUẬT MỚI TẠI KHOA Y HỌC CỔ TRUYỀN – BỆNH VIỆN FV...',
        image: '/img/tintuc1.jpg',
        link: '#',
    },
    {
        title: 'TRIỆT BƯỚU GIÁP BẰNG SÓNG CAO TẦN: HIỆU QUẢ CAO, AN TOÀN VÀ SIÊU NHANH...',
        image: '/img/tintuc1.jpg',
        link: '#',
    },
    {
        title: 'ĐIỀU TRỊ BÓC TÁCH U XƠ TỬ CUNG, BẢO TỒN THIÊN CHỨC LÀM MẸ...',
        image: '/img/tintuc1.jpg',
        link: '#',
    },
    {
        title: 'FV ỨNG DỤNG MÁY MYOPIA MASTER TÍCH HỢP AI ĐỂ KIỂM SOÁT CẬN THỊ CHO TRẺ EM NGAY CẢ KHI TRẺ ...',
        image: '/img/tintuc1.jpg        ',
        link: '#',
    }
];

const News: React.FC = () => {
    return (
        <Container>
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Tin Tức
                </Typography>
                <Link href="#" underline="none">
                    <Typography variant="body2" color="primary">
                        Xem thêm
                    </Typography>
                </Link>
            </Box>
            <Grid container spacing={2}>
                {newsItems.map((item, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={item.image}
                                alt={item.title}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="body2" color="textSecondary">
                                    {item.title}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default News;
