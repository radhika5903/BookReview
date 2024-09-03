// import React from 'react';
// import Signup from './components/Signup';
// import Login from './components/Login';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// function App() {
//   return (
//     <Router>
//       <nav>
//         <ul>
//           <li>
//             <Link to="/">Signup</Link>
//           </li>
//           <li>
//             <Link to="/login">Login</Link>
//           </li>
//         </ul>
//       </nav>
//       <Routes>
//         <Route path="/" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
// src/App.js
// import React from 'react';
// import Signup from './components/Signup'; // Adjust path if necessary
// import Login from './components/Login'; // Adjust path if necessary
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// function App() {
//   return (
//     <Router>
//       <nav>
//         <ul>
//           <li>
//             <Link to="/">Signup</Link>
//           </li>
//           <li>
//             <Link to="/login">Login</Link>
//           </li>
//         </ul>
//       </nav>
//       <Routes>
//         <Route path="/" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
// src/App.js
import React from 'react';
import Signup from './components/Signup'; // Adjust path if necessary
import Login from './components/Login'; // Adjust path if necessary
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
