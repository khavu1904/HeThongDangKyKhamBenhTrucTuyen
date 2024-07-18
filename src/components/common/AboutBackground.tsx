import React from 'react';
import { Container, Grid, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';

const AboutBackground = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  borderRadius: theme.spacing(2),
}));

const AboutSection = () => {
  return (
    <Container maxWidth="xl" >
      <Container>
        <Grid container spacing={5} alignItems="center">
          <Grid item lg={6} sx={{ animation: 'fadeIn 0.1s', backgroundColor: 'LightBlue' }} >
            <AboutBackground>
              <Grid container>
                <Grid item xs={6} textAlign="start">
                  <img src="/img/About1.jpg" alt="About 1" style={{ width: '100%' }} />
                </Grid>
                <Grid item xs={6} textAlign="start">
                  <img src="/img/About2.jpg" alt="About 2" style={{ width: '85%', marginTop: '15%' }} />
                </Grid>
                <Grid item xs={6} textAlign="end">
                  <img src="/img/About3.jpg" alt="About 3" style={{ width: '85%' }} />
                </Grid>
                <Grid item xs={6} textAlign="end">
                  <img src="/img/About4.jpg" alt="About 4" style={{ width: '100%' }} />
                </Grid>
              </Grid>
            </AboutBackground>
          </Grid>
          <Grid item lg={6} sx={{ animation: 'fadeIn 0.5s' }}>
            <Typography variant="h3" mb={4}>
              We Help To Get The Best Job And Find A Talent
            </Typography>
            <Typography variant="body1" mb={4}>
              Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat
              ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet
            </Typography>
            <Typography variant="body1" mb={2}>
              <i className="fa fa-check text-primary me-3"></i>Tempor erat elitr rebum at clita
            </Typography>
            <Typography variant="body1" mb={2}>
              <i className="fa fa-check text-primary me-3"></i>Aliqu diam amet diam et eos
            </Typography>
            <Typography variant="body1" mb={2}>
              <i className="fa fa-check text-primary me-3"></i>Clita duo justo magna dolore erat amet
            </Typography>
            <Button variant="contained" color="primary" sx={{ py: 2, px: 3, mt: 2 }} href="">
              Read More
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};

export default AboutSection;
