import React from 'react';
import styles from './App.module.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import NewPost from './pages/NewUser';
import Footer from './components/Footer';

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <div className={styles.app}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/newuser" element={<NewPost />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
