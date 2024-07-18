import React from 'react';
import { Container, Grid, Typography, Link, Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

export function Footer() {
    return (
        <Box component="footer" sx={{ bgcolor: '#f5f5f5', color: '#333', borderTop: '1px solid #ddd', mt: 4 }}>
            <Container maxWidth="lg">
                <Grid container spacing={4} sx={{ py: 4 }}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5" gutterBottom>Về Chúng Tôi</Typography>
                        <Typography variant="body1">
                        Chúng tôi tận tâm cung cấp các dịch vụ chăm sóc sức khỏe tốt nhất cho bệnh nhân của mình. Đội ngũ chuyên gia giàu kinh nghiệm của chúng tôi luôn sẵn sàng trợ giúp mọi nhu cầu y tế của bạn.                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Typography variant="h5" gutterBottom>Liên kết hữu ích</Typography>
                        <Box>
                            <Link href="/dangkykhambenh" color="inherit" underline="none">Home</Link>
                        </Box>
                        <Box>
                            <Link href="/about" color="inherit" underline="none">About Us</Link>
                        </Box>
                        <Box>
                            <Link href="/services" color="inherit" underline="none">Services</Link>
                        </Box>
                        <Box>
                            <Link href="/appointments" color="inherit" underline="none">Appointments</Link>
                        </Box>
                        <Box>
                            <Link href="/contact" color="inherit" underline="none">Contact</Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Typography variant="h5" gutterBottom>Theo dõi chúng tôi</Typography>
                        <Box>
                            <Link href="https://www.facebook.com" color="inherit" underline="none">
                                <FontAwesomeIcon icon={faFacebook} style={{ marginRight: 8 }} /> Facebook
                            </Link>
                        </Box>
                        <Box>
                            <Link href="https://www.twitter.com" color="inherit" underline="none">
                                <FontAwesomeIcon icon={faTwitter} style={{ marginRight: 8 }} /> Twitter
                            </Link>
                        </Box>
                        <Box>
                            <Link href="https://www.instagram.com" color="inherit" underline="none">
                                <FontAwesomeIcon icon={faInstagram} style={{ marginRight: 8 }} /> Instagram
                            </Link>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <Box sx={{ bgcolor: '#e0e0e0', color: '#333', textAlign: 'center', py: 2 }}>
                <Typography variant="body2">&copy; {new Date().getFullYear()} Your Healthcare Provider</Typography>
            </Box>
        </Box>
    );
}
