

import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { useLocation, useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Font Awesome for icons
import "./StudentData.css";

function GuestLogin() {
  const [data, setData] = useState([]); // Stores Excel data
  const [searchQuery, setSearchQuery] = useState(""); // Search query input
  const [selectedRow, setSelectedRow] = useState(null); // Selected row data
  const [searchHistory, setSearchHistory] = useState([]); // Search history
  const [showHistory, setShowHistory] = useState(false); // Toggle history display
  const [error, setError] = useState(null); // Error state

  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state || {}; // Extract logged-in user details

  useEffect(() => {
    // Redirect to login if user data is not present
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Load data from Excel on component mount
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
        setError("Failed to load student data. Please try again later.");
      });
  }, []);

  // Update search query
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Search for student by Registration Number
  const handleSearchClick = () => {
    if (!searchQuery.trim()) return;

    const foundRow = data.find(
      (row) => row.Regd_No && row.Regd_No.toString() === searchQuery
    );

    setSelectedRow(foundRow || null);

    if (!searchHistory.includes(searchQuery.trim())) {
      setSearchHistory((prevHistory) => [...prevHistory, searchQuery.trim()]);
    }
  };

  // Click handler for search history
  const handleHistoryClick = (regdNo) => {
    setSearchQuery(regdNo);
    const foundRow = data.find((row) => row.Regd_No && row.Regd_No.toString() === regdNo);
    setSelectedRow(foundRow);
  };

  // Toggle search history visibility
  const toggleHistory = () => {
    setShowHistory((prev) => !prev);
  };

  // Logout handler
  const handleLogout = () => {
    navigate("/"); // Redirect to login
  };

  return (
    <div className="student-data-container">
      {/* Welcome Section */}
      {user && (
        <div className="welcome-box">
          <h1>Welcome</h1>
          <h2>Hello, {user.Name || "User"}!</h2>
          <h4>This is Guest Login . For complete details please login as email</h4>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      )}

      {/* Search Section */}
      <div className="search-section">
        <h1>Search by Registration Number</h1>
        <input
          type="text"
          placeholder="Enter Regd_No"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearchClick}>Search</button>
        <button onClick={toggleHistory} className="history-button">
          {showHistory ? "Hide History" : "Show History"}
        </button>
      </div>

      {/* Search History */}
      {showHistory && (
        <div className="history-box">
          <h2>Search History</h2>
          {searchHistory.length > 0 ? (
            <ul>
              {searchHistory.map((regdNo, index) => (
                <li
                  key={index}
                  onClick={() => handleHistoryClick(regdNo)}
                  className="history-item"
                >
                  {regdNo}
                </li>
              ))}
            </ul>
          ) : (
            <p>No history available.</p>
          )}
        </div>
      )}

      {/* Display Selected Row (Only first 3 columns with Rank as serial number) */}
      {selectedRow && (
        <div className="details-box">
          <h2>Record Details</h2>
          <div className="details-content">
            {/* Display "Rank" as serial number */}
            <p>
              <strong>Rank:</strong> {selectedRow["rank"] || "N/A"}
            </p>
            {Object.keys(selectedRow)
              .slice(1, 3) // Only show next 2 columns (excluding Rank/Serial No)
              .map((key) => (
                <p key={key}>
                  <strong>{key}:</strong> {selectedRow[key]}
                </p>
              ))}
          </div>
        </div>
      )}

      {/* No Record Found */}
      {searchQuery && !selectedRow && !error && (
        <p className="no-record">No record found for Regd_No: {searchQuery}</p>
      )}

      {/* Error Display */}
      {error && <p className="error-message">{error}</p>}

      {/* Footer */}
      <footer className="footer">
        <p>Powered by LPU Students</p>
        <p>For more details, contact us below:</p>
        <p>BY : xxxxxxxx xxxxx</p>
        <div className="contact-icons">
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-google"></i>
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default GuestLogin;
