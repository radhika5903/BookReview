

import React from 'react';
import { useNavigate } from 'react-router-dom';

function UserTypeSelection() {
  const navigate = useNavigate();

  const handleReaderClick = () => {
    navigate('/reader');
  };

  const handleWriterClick = () => {
    navigate('/writer');
  };

  return (
    <div>
      <h2>Select User Type</h2>
      <button onClick={handleReaderClick}>Reader</button>
      <button onClick={handleWriterClick}>Writer</button>
    </div>
  );
}

export default UserTypeSelection;
