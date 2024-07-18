import React, {useState} from 'react';
import { Container, Stack, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../css/Home.css'; // Assuming the correct path to your CSS file
import SignUpForm from '../TaiKhoan/SignUpForm'

export function Home() {
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const handleShowSignUpModal = () => {
    setShowSignUpModal(true);
  };

  const handleCloseSignUpModal = () => {
    setShowSignUpModal(false);
  };
  return (
    <div>
    <h1>Welcome to My App</h1>
  </div>
  );
}
