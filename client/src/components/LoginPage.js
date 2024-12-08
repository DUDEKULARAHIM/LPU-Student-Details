// import React, { useEffect, useState } from "react";
// import * as XLSX from "xlsx";
// import { useNavigate } from "react-router-dom";
// import './LoginPage.css'; // Import the CSS file

// function LoginPage() {
//   const [data, setData] = useState([]);
//   const [regdNo, setRegdNo] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch the Excel file from the public folder
//     fetch("/lpu_data.xlsx") // Ensure this matches the file path in the public folder
//       .then((response) => response.arrayBuffer())
//       .then((buffer) => {
//         // Read the data from the buffer using XLSX
//         const workbook = XLSX.read(buffer, { type: "buffer" });
//         const sheet = workbook.Sheets[workbook.SheetNames[0]];

//         // Convert the sheet to JSON and set the data state
//         const jsonData = XLSX.utils.sheet_to_json(sheet);
//         setData(jsonData);
//       })
//       .catch((error) => {
//         console.error("Error reading the Excel file:", error);
//         setError("Unable to load the data. Please try again later.");
//       });
//   }, []);

//   // Handle login button click
//   const handleLogin = () => {
//     const user = data.find((row) => row.Regd_No && row.Regd_No.toString() === regdNo);

//     if (user) {
//       // Redirect to StudentData component with user details
//       navigate("/student-data", { state: { user } });
//     } else {
//       setError("Invalid Registration Number.");
//     }
//   };

//   return (
//     <div className="login-container">
//       <h1>Login Page</h1>
//       <div>
//         <input
//           type="text"
//           placeholder="Enter Registration Number"
//           value={regdNo}
//           onChange={(e) => setRegdNo(e.target.value)}
//         />
//       </div>
//       <button onClick={handleLogin}>
//         Login
//       </button>
//       {error && <p>{error}</p>}
//     </div>
//   );
// }

// export default LoginPage;

















// import React, { useEffect, useState } from "react";
// import * as XLSX from "xlsx";
// import { useNavigate } from "react-router-dom";
// import './LoginPage.css';
// import axios from "axios";

// function LoginPage() {
//   const [data, setData] = useState([]);
//   const [regdNo, setRegdNo] = useState("");
//   const [email, setEmail] = useState("");
//   const [authCode, setAuthCode] = useState("");
//   const [step, setStep] = useState(1); // Step 1: Email Verification, Step 2: Registration Validation
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch("/lpu_data.xlsx")
//       .then((response) => response.arrayBuffer())
//       .then((buffer) => {
//         const workbook = XLSX.read(buffer, { type: "buffer" });
//         const sheet = workbook.Sheets[workbook.SheetNames[0]];
//         const jsonData = XLSX.utils.sheet_to_json(sheet);
//         setData(jsonData);
//       })
//       .catch((error) => {
//         console.error("Error reading the Excel file:", error);
//         setError("Unable to load the data. Please try again later.");
//       });
//   }, []);

//   // Email validation regex (simple example)
//   const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   const handleSendCode = async () => {
//     if (!isValidEmail(email)) {
//       setError("Please enter a valid email address.");
//       return;
//     }
//     try {
//       setError(""); // Clear any previous errors
//       const response = await axios.post("http://localhost:5000/api/send-auth-code", { email });
//       setMessage(response.data.message);
//       setStep(2); // Move to the next step
//     } catch (error) {
//       setError("Failed to send authentication code. Please try again.");
//     }
//   };

//   const handleVerifyCode = async () => {
//     try {
//       setError(""); // Clear any previous errors
//       const response = await axios.post("http://localhost:5000/api/verify-auth-code", { email, authCode });
//       setMessage(response.data.message);
//       if (response.data.success) {
//         setStep(3); // Move to the next step if successful
//       }
//     } catch (error) {
//       setError("Invalid authentication code. Please try again.");
//     }
//   };

//   const handleLogin = () => {
//     const user = data.find((row) => row.Regd_No && row.Regd_No.toString() === regdNo);

//     if (user) {
//       navigate("/student-data", { state: { user } });
//     } else {
//       setError("Invalid Registration Number.");
//     }
//   };

//   return (
//     <div className="login-container">
//       <h1>Login Page</h1>
//       {step === 1 && (
//         <>
//           <input
//             type="email"
//             placeholder="Enter Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <button onClick={handleSendCode}>Send Authentication Code</button>
//           {message && <p>{message}</p>}
//           {error && <p className="error">{error}</p>}
//         </>
//       )}
//       {step === 2 && (
//         <>
//           <input
//             type="text"
//             placeholder="Enter Authentication Code"
//             value={authCode}
//             onChange={(e) => setAuthCode(e.target.value)}
//           />
//           <button onClick={handleVerifyCode}>Verify Code</button>
//           {message && <p>{message}</p>}
//           {error && <p className="error">{error}</p>}
//         </>
//       )}
//       {step === 3 && (
//         <>
//           <input
//             type="text"
//             placeholder="Enter Registration Number"
//             value={regdNo}
//             onChange={(e) => setRegdNo(e.target.value)}
//           />
//           <button onClick={handleLogin}>Login</button>
//           {error && <p className="error">{error}</p>}
//         </>
//       )}
//     </div>
//   );
// }

// export default LoginPage;










import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import './LoginPage.css';
import axios from "axios";

function LoginPage() {
  const [data, setData] = useState([]);
  const [regdNo, setRegdNo] = useState("");
  const [email, setEmail] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1); // Step 1: Registration and Email, Step 2: Auth Code Verification
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/lpu_data.xlsx")
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        const workbook = XLSX.read(buffer, { type: "buffer" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        setData(jsonData);
      })
      .catch((error) => {
        console.error("Error reading the Excel file:", error);
        setError("Unable to load the data. Please try again later.");
      });
  }, []);

  // Email validation regex
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Handle sending the authentication code
  const handleSendCode = async () => {
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    try {
      setError(""); // Clear any previous errors
      const response = await axios.post("http://localhost:5000/api/send-auth-code", { email });
      setMessage(response.data.message);
      setStep(2); // Move to the next step for OTP entry
    } catch (error) {
      setError("Failed to send authentication code. Please try again.");
    }
  };

  // Handle verifying the authentication code
  const handleVerifyCode = async () => {
    try {
      setError(""); // Clear any previous errors
      const response = await axios.post("http://localhost:5000/api/verify-auth-code", { email, authCode });
      setMessage(response.data.message);
      if (response.data.success) {
        // Proceed with login if code is verified
        const user = data.find((row) => row.Regd_No && row.Regd_No.toString() === regdNo);
        if (user) {
          navigate("/student-data", { state: { user } });
        } else {
          setError("Invalid Registration Number.");
        }
      }
    } catch (error) {
      setError("Invalid authentication code. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h1>Login Page</h1>

      {/* Registration and Email Fields */}
      <input
        type="text"
        placeholder="Enter Registration Number"
        value={regdNo}
        onChange={(e) => setRegdNo(e.target.value)}
      />
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSendCode}>Send Authentication Code</button>

      {/* Display Message */}
      {message && <p>{message}</p>}

      {/* Step 2: Authentication Code Verification */}
      {step === 2 && (
        <>
          <input
            type="text"
            placeholder="Enter Authentication Code"
            value={authCode}
            onChange={(e) => setAuthCode(e.target.value)}
          />
          <button onClick={handleVerifyCode}>Verify Code and Login</button>
        </>
      )}

      {/* Error Message */}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default LoginPage;








// onrender code



// import React, { useEffect, useState } from "react";
// import * as XLSX from "xlsx";
// import { useNavigate } from "react-router-dom";
// import './LoginPage.css';
// import axios from "axios";

// function LoginPage() {
//   const [data, setData] = useState([]);
//   const [regdNo, setRegdNo] = useState("");
//   const [email, setEmail] = useState("");
//   const [authCode, setAuthCode] = useState("");
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");
//   const [step, setStep] = useState(1); // Step 1: Registration and Email, Step 2: Auth Code Verification
//   const navigate = useNavigate();

//   const BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://your-backend-url.onrender.com";

//   useEffect(() => {
//     fetch(`${BASE_URL}/lpu_data.xlsx`)
//       .then((response) => response.arrayBuffer())
//       .then((buffer) => {
//         const workbook = XLSX.read(buffer, { type: "buffer" });
//         const sheet = workbook.Sheets[workbook.SheetNames[0]];
//         const jsonData = XLSX.utils.sheet_to_json(sheet);
//         setData(jsonData);
//       })
//       .catch((error) => {
//         console.error("Error reading the Excel file:", error);
//         setError("Unable to load the data. Please try again later.");
//       });
//   }, [BASE_URL]);

//   const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   const handleSendCode = async () => {
//     if (!isValidEmail(email)) {
//       setError("Please enter a valid email address.");
//       return;
//     }
//     try {
//       setError(""); // Clear any previous errors
//       const response = await axios.post(`${BASE_URL}/api/send-auth-code`, { email });
//       setMessage(response.data.message);
//       setStep(2); // Move to the next step for OTP entry
//     } catch (error) {
//       setError("Failed to send authentication code. Please try again.");
//     }
//   };

//   const handleVerifyCode = async () => {
//     try {
//       setError(""); // Clear any previous errors
//       const response = await axios.post(`${BASE_URL}/api/verify-auth-code`, { email, authCode });
//       setMessage(response.data.message);
//       if (response.data.success) {
//         const user = data.find((row) => row.Regd_No && row.Regd_No.toString() === regdNo);
//         if (user) {
//           navigate("/student-data", { state: { user } });
//         } else {
//           setError("Invalid Registration Number.");
//         }
//       }
//     } catch (error) {
//       setError("Invalid authentication code. Please try again.");
//     }
//   };

//   return (
//     <div className="login-container">
//       <h1>Login Page</h1>
//       {step === 1 && (
//         <>
//           <input
//             type="text"
//             placeholder="Enter Registration Number"
//             value={regdNo}
//             onChange={(e) => setRegdNo(e.target.value)}
//           />
//           <input
//             type="email"
//             placeholder="Enter Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <button onClick={handleSendCode}>Send Authentication Code</button>
//         </>
//       )}

//       {message && <p>{message}</p>}

//       {step === 2 && (
//         <>
//           <input
//             type="text"
//             placeholder="Enter Authentication Code"
//             value={authCode}
//             onChange={(e) => setAuthCode(e.target.value)}
//           />
//           <button onClick={handleVerifyCode}>Verify Code and Login</button>
//         </>
//       )}

//       {error && <p className="error">{error}</p>}
//     </div>
//   );
// }

// export default LoginPage;











