import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';

interface Doctor {
  name: string;
  specialty: string;
  hospital: string;
}

interface DoctorCardProps {
  doctor: Doctor;
}

const StyledCard = styled(Card)({
  minWidth: 200,
  maxWidth: 250,
  margin: '0 10px',
  flex: '0 0 auto',
});

const StyledButton = styled(Button)({
  marginTop: 10,
});

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6">{doctor.name}</Typography>
        <Typography color="textSecondary">{doctor.specialty}</Typography>
        <Typography color="textSecondary">{doctor.hospital}</Typography>
        <StyledButton variant="contained" color="primary">
          Đặt lịch khám
        </StyledButton>
      </CardContent>
    </StyledCard>
  );
};

export default DoctorCard;
