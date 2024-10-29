
import React from 'react';
import Signup from './components/Signup'; 
import Login from './components/Login'; 
import UserTypeSelection from './components/UserTypeSelection'; 
import WriterPage from './components/WriterPage';
import ReaderSection from './components/ReaderSection';
import BookContent from './components/BookContent';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-type" element={<UserTypeSelection />} /> {/* New route */}
        {/* Add routes for Reader and Writer if needed */}
        <Route path="/writer" element={<WriterPage />} />
        <Route path="/reader" element={<ReaderSection />} />
                <Route path="/book/:bookId" element={<BookContent />} />
      </Routes>
    </Router>
  );
}

export default App;
