// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// function UserTypeSelection() {
//   const navigate = useNavigate();

//   const handleReaderClick = () => {
//     // Navigate to the reader's page (create the route for the reader page)
//     navigate('/reader');
//   };

//   const handleWriterClick = () => {
//     // Navigate to the writer's page (create the route for the writer page)
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
