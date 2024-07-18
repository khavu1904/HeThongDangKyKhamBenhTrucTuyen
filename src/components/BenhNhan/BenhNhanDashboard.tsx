import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../Layout/Layout';
import { Slide } from '../common/Slide';
import ChuyenKhoaList from './ChuyenKhoaList';
import { DanhSachBS } from '../common/DanhSachBS';
import { Home } from '../common/Home';
import AboutBackground from '../common/AboutBackground'
import DoctorCarousel from '../common/DoctorCarousel';
import News from '../common/News';


const BenhNhanDashboard: React.FC = () => {
  return (
    <Layout>
        <Slide />
        <DanhSachBS />
        <br />
        <AboutBackground />
        <br />
        <News />
    </Layout>
  );
};

export default BenhNhanDashboard;
