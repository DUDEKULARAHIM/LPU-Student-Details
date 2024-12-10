


// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LoginPage from "./components/LoginPage";
// // import StudentData from "./components/StudentData";
// import StudentData from "./components/StudentData";
// import '@fortawesome/fontawesome-free/css/all.min.css';


// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LoginPage />} />
//         <Route path="/student-data" element={<StudentData />} />
        
//       </Routes>
//     </Router>
//   );
// }

// export default App;





import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import StudentData from "./components/StudentData";
import GuestLogin from "./components/GuestLogin";
import InstallPrompt from "./InstallPrompt";  // Import the InstallPrompt component
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <Router>
      {/* Display the InstallPrompt component at the root level */}
      <InstallPrompt /> {/* This will show the custom install prompt */}
      
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/student-data" element={<StudentData />} />
        <Route path="/guest-login" element={<GuestLogin />} />

      </Routes>
    </Router>
  );
}

export default App;
