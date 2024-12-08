// const express = require("express");
// const nodemailer = require("nodemailer");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const path = require("path");

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // Temporary storage for authentication codes
// let authCodes = {};

// // Create a Nodemailer transporter for sending emails
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "1797717rahim@gmail.com", // Replace with your email
//     pass: "ybyh ksay mrrw gcxo", // Replace with your app password
//   },
// });

// // Route to send the authentication code to the user's email
// app.post("/api/send-auth-code", (req, res) => {
//   const { email } = req.body;

//   if (!email) {
//     return res.status(400).json({ message: "Email is required." });
//   }

//   // Generate a random 6-digit authentication code
//   const authCode = Math.floor(100000 + Math.random() * 900000).toString();
//   authCodes[email] = authCode;

//   // Set up the email to be sent
//   const mailOptions = {
//     from: "1797717rahim@gmail.com", // Replace with your email
//     to: email,
//     subject: "Your Authentication Code",
//     text: `Your authentication code is ${authCode}`,
//   };

//   // Send the email
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error("Error sending email:", error);
//       return res.status(500).json({ message: "Failed to send email." });
//     }
//     res.json({ message: "Authentication code sent to your email." });
//   });
// });

// // Route to verify the authentication code
// app.post("/api/verify-auth-code", (req, res) => {
//   const { email, authCode } = req.body;

//   if (!email || !authCode) {
//     return res.status(400).json({ message: "Email and authentication code are required." });
//   }

//   if (authCodes[email] === authCode) {
//     delete authCodes[email]; // Delete the code once verified
//     return res.json({ success: true, message: "Email verified successfully." });
//   }

//   res.status(400).json({ success: false, message: "Invalid authentication code." });
// });

// // Serve static files (e.g., images, styles, etc.)
// app.use("/public", express.static(path.join(__dirname, "public")));

// // Route to serve Excel file (if needed)
// app.get("/lpu_data.xlsx", (req, res) => {
//   res.sendFile(path.join(__dirname, "lpu_data.xlsx"));
// });

// // Start the server
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });








// before onrender code

const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Temporary storage for authentication codes
let authCodes = {};

// Create a Nodemailer transporter for sending emails
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "1797717rahim@gmail.com", // Replace with your email
    pass: "ybyh ksay mrrw gcxo", // Replace with your app password
  },
});

// Route to send the authentication code to the user's email
app.post("/api/send-auth-code", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  // Generate a random 6-digit authentication code
  const authCode = Math.floor(100000 + Math.random() * 900000).toString();
  authCodes[email] = authCode;

  // HTML email content with black background and white OTP text
  const mailOptions = {
    from: "1797717rahim@gmail.com", // Replace with your email
    to: email,
    subject: "Your Authentication Code",
    html: `
      <html>
        <body style="background-color: black; color: white; font-family: Arial, sans-serif; text-align: center; padding: 50px;">
          <h1 style="color: white;">Authentication Code</h1>
          <p style="font-size: 24px; color: white;">Your authentication code is:</p>
          <div style="font-size: 36px; font-weight: bold; color: white; background-color: #333; padding: 20px; border-radius: 10px; display: inline-block;">
            ${authCode}
          </div>
        </body>
      </html>
    `,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ message: "Failed to send email." });
    }
    res.json({ message: "Authentication code sent to your email." });
  });
});

// Route to verify the authentication code
app.post("/api/verify-auth-code", (req, res) => {
  const { email, authCode } = req.body;

  if (!email || !authCode) {
    return res.status(400).json({ message: "Email and authentication code are required." });
  }

  if (authCodes[email] === authCode) {
    delete authCodes[email]; // Delete the code once verified
    return res.json({ success: true, message: "Email verified successfully." });
  }

  res.status(400).json({ success: false, message: "Invalid authentication code." });
});

// Serve static files (e.g., images, styles, etc.)
app.use("/public", express.static(path.join(__dirname, "public")));

// Route to serve Excel file (if needed)
app.get("/lpu_data.xlsx", (req, res) => {
  res.sendFile(path.join(__dirname, "lpu_data.xlsx"));
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});












// onrender code 


// const express = require("express");
// const nodemailer = require("nodemailer");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const path = require("path");
// require("dotenv").config();

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // Temporary storage for authentication codes
// let authCodes = {};

// // Nodemailer transporter for sending emails
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER, // Use environment variable
//     pass: process.env.EMAIL_PASS, // Use environment variable
//   },
// });

// // API to send the authentication code to the user's email
// app.post("/api/send-auth-code", (req, res) => {
//   const { email } = req.body;

//   if (!email) {
//     return res.status(400).json({ message: "Email is required." });
//   }

//   // Generate a random 6-digit authentication code
//   const authCode = Math.floor(100000 + Math.random() * 900000).toString();
//   authCodes[email] = { code: authCode, expires: Date.now() + 10 * 60 * 1000 }; // 10-minute expiry

//   // Email content
//   const mailOptions = {
//     from: `"LPU Student Details" <${process.env.EMAIL_USER}>`,
//     to: email,
//     subject: "Your Authentication Code",
//     html: `
//       <html>
//         <body style="background-color: black; color: white; font-family: Arial, sans-serif; text-align: center; padding: 50px;">
//           <h1>Authentication Code</h1>
//           <p>Your authentication code is:</p>
//           <div style="font-size: 36px; font-weight: bold; background-color: #333; padding: 20px; border-radius: 10px;">
//             ${authCode}
//           </div>
//           <p>This code is valid for 10 minutes.</p>
//         </body>
//       </html>
//     `,
//   };

//   // Send email
//   transporter.sendMail(mailOptions, (error) => {
//     if (error) {
//       console.error("Error sending email:", error);
//       return res.status(500).json({ message: "Failed to send email." });
//     }
//     res.json({ message: "Authentication code sent to your email." });
//   });
// });

// // API to verify the authentication code
// app.post("/api/verify-auth-code", (req, res) => {
//   const { email, authCode } = req.body;

//   if (!email || !authCode) {
//     return res.status(400).json({ message: "Email and authentication code are required." });
//   }

//   const storedCode = authCodes[email];
//   if (storedCode && storedCode.code === authCode && storedCode.expires > Date.now()) {
//     delete authCodes[email]; // Delete the code once verified
//     return res.json({ success: true, message: "Email verified successfully." });
//   }

//   res.status(400).json({ success: false, message: "Invalid or expired authentication code." });
// });

// // Serve React static files
// app.use(express.static(path.join(__dirname, "../client/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

// // Route to serve Excel file
// app.get("/lpu_data.xlsx", (req, res) => {
//   res.sendFile(path.join(__dirname, "lpu_data.xlsx"));
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
