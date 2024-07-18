import React from 'react';
import { Box, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DoctorCard from './DoctorCard';
import { styled } from '@mui/system';

const CarouselContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
});

const CardContainer = styled(Box)({
  display: 'flex',
  overflowX: 'scroll',
  scrollBehavior: 'smooth', // Enables smooth scrolling
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  width: 'calc(100% - 96px)',
  margin: '0 8px',
});

const doctors = [
  {
    name: 'GS. TS. BS Lâm Việt Trung',
    specialty: 'Tiêu hoá',
    hospital: 'Bệnh viện Chợ Rẫy',
  },
  {
    name: 'BS. CK2 Nguyễn Thị Thu Hà',
    specialty: 'Nhi khoa',
    hospital: 'Bệnh viện Nhi Đồng Thành phố',
  },
  {
    name: 'BS. CK2 Võ Đức Hiếu',
    specialty: 'Ung bướu',
    hospital: 'Bệnh viện Ung Bướu TP. HCM',
  },
  {
    name: 'TS. BS Trần Quang Nam',
    specialty: 'Nội tiết',
    hospital: 'Bệnh viện Trường ĐH Y Dược',
  },
  {
    name: 'TS. BS Trần Quang Nam',
    specialty: 'Nội tiết',
    hospital: 'Bệnh viện Trường ĐH Y Dược',
  },
  {
    name: 'TS. BS Trần Quang Nam',
    specialty: 'Nội tiết',
    hospital: 'Bệnh viện Trường ĐH Y Dược',
  },
  {
    name: 'TS. BS Trần Quang Nam',
    specialty: 'Nội tiết',
    hospital: 'Bệnh viện Trường ĐH Y Dược',
  },
];

const DoctorCarousel: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <CarouselContainer>
      <IconButton onClick={scrollLeft}>
        <ArrowBackIosIcon />
      </IconButton>
      <CardContainer ref={containerRef}>
        {doctors.map((doctor, index) => (
          <DoctorCard key={index} doctor={doctor} />
        ))}
      </CardContainer>
      <IconButton onClick={scrollRight}>
        <ArrowForwardIosIcon />
      </IconButton>
    </CarouselContainer>
  );
};

export default DoctorCarousel;
