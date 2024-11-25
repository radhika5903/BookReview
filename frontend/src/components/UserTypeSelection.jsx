

// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './UserTypeSelection.css'; 
// function UserTypeSelection() {
//   const navigate = useNavigate();

//   const handleReaderClick = () => {
//     navigate('/reader');
//   };

//   const handleWriterClick = () => {
//     navigate('/writer');
//   };

//   return (
//     <div>
//       <h2>Select User Type</h2>
//       <button onClick={handleReaderClick}>Reader</button>
//       <button onClick={handleWriterClick}>Writer</button>
//     </div>
//   );
// }

// export default UserTypeSelection;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserTypeSelection.css';  // Make sure to import the CSS file

function UserTypeSelection() {
  const navigate = useNavigate();

  const handleReaderClick = () => {
    navigate('/reader');
  };

  const handleWriterClick = () => {
    navigate('/writer');
  };

  return (
    <div className="user-type-selection">
      
      <div className="button-container">
        <button className="user-type-button" onClick={handleReaderClick}>Reader</button>
        <button className="user-type-button" onClick={handleWriterClick}>Writer</button>
      </div>
    </div>
  );
}

export default UserTypeSelection;
