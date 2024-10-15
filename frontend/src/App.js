// import React from 'react';
// import Signup from './components/Signup'; // Adjust path if necessary
// import Login from './components/Login'; // Adjust path if necessary
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import React from 'react';
import Signup from './components/Signup'; // Adjust path if necessary
import Login from './components/Login'; // Adjust path if necessary
import UserTypeSelection from './components/UserTypeSelection'; // Import the new component
import WriterPage from './components/WriterPage';
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
      </Routes>
    </Router>
  );
}

export default App;
