import React, { useState, useEffect } from 'react';

const InstallPrompt = () => {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      // Prevent the default mini-infobar or install prompt from appearing
      event.preventDefault();
      // Save the event so it can be triggered later
      setInstallPrompt(event);
      // Show the custom install prompt
      setIsVisible(true);
    };

    // Listen for the 'beforeinstallprompt' event
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (installPrompt) {
      // Show the native prompt
      installPrompt.prompt();
      // Wait for the user's response
      installPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        setInstallPrompt(null); // Reset after installation choice
        setIsVisible(false); // Hide the prompt
      });
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#333',
        color: 'white',
        padding: '15px 30px',
        borderRadius: '8px',
        boxShadow: '0 6px 10px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
        textAlign: 'center',
      }}
    >
      <p style={{ margin: 0, fontSize: '16px' }}>
        Install our app for a better experience!
      </p>
      <button
        onClick={handleInstallClick}
        style={{
          marginTop: '15px',
          backgroundColor: '#008CBA',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '14px',
          transition: 'background-color 0.3s',
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = '#007B9A')}
        onMouseLeave={(e) => (e.target.style.backgroundColor = '#008CBA')}
      >
        Install
      </button>
    </div>
  );
};

export default InstallPrompt;
