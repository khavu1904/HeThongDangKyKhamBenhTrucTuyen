import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Container, Form } from 'react-bootstrap';
import '../../css/TimKiem.css'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Stack, Nav } from 'react-bootstrap';
import { faHospital, faUserMd, faClinicMedical, faBriefcaseMedical } from '@fortawesome/free-solid-svg-icons';
import backgroundImg from '../../img/nen.jpg';
import '../../css/Slide.css'

export function Slide() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex: number) => {
        setIndex(selectedIndex);
    };

    return (
        <div>
           <div className="bg-image" style={{ height: '500px', backgroundImage: `url(${backgroundImg})` }}>
                <Container className="h-100 d-flex flex-column justify-content-center align-items-center text-center">
                    <h1 className="mb-4 testt">Ứng Dụng Đặt Khám Bệnh</h1>
                    <h5 className="mb-3 test">Đặt khám với hơn 600 bác sĩ, 25 bệnh viện, 100 phòng khám trên YouMed để có số thứ tự và khung giờ khám trước.</h5>
                    <Form className="position-relative">
                        <Form.Control type="text" placeholder="Tìm kiếm....." className="mr-2 search-input" />
                        <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    </Form>
                    <Stack direction="horizontal" gap={3} className='slide'>
                        <div className="p-4"><Nav.Link href="#" className="test"><FontAwesomeIcon icon={faHospital} /> Bệnh viện kết nối</Nav.Link></div>
                        <div className="p-4"><Nav.Link href="#" className="test"><FontAwesomeIcon icon={faUserMd} /> Bác sĩ hoạt động</Nav.Link></div>
                        <div className="p-4"><Nav.Link href="#" className="test"><FontAwesomeIcon icon={faClinicMedical} /> Phòng khám đa khoa</Nav.Link></div>
                        <div className="p-4"><Nav.Link href="#" className="test"><FontAwesomeIcon icon={faBriefcaseMedical} /> Chuyên khoa</Nav.Link></div>
                    </Stack>
                </Container>
            </div>
        </div>
    );
}
