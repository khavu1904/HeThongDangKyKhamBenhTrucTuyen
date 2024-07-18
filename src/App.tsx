import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/common/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
//import { Home } from './components/common/Home';
import { Footer } from './components/common/Footer';

const App: React.FC = () => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
