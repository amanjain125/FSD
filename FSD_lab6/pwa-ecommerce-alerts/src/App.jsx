import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [permission, setPermission] = useState(Notification.permission);
  const [product, setProduct] = useState(null);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  // Capture the install prompt event
  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e); // Save the event for later use
    });
  }, []);

  // Handle install button click
  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('✅ User installed the PWA');
      }
      setDeferredPrompt(null); // Can only use once
    }
  };

  // Ask for notification permission
  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      alert("This browser does not support notifications.");
      return;
    }
    const status = await Notification.requestPermission();
    setPermission(status);
  };

  // Fetch sample product
  const fetchSampleProduct = async () => {
    const res = await fetch('https://fakestoreapi.com/products/1');
    const data = await res.json();
    setProduct(data);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '500px', margin: '0 auto' }}>
      <h1>🛍️ PWA Deal Alerts</h1>

      {/* Install App Button */}
      {deferredPrompt && (
        <div style={{ padding: '15px', background: '#e0f7fa', borderRadius: '8px', marginBottom: '20px' }}>
          <p>Get the best experience by installing our app!</p>
          <button 
            onClick={handleInstallClick} 
            style={{ padding: '10px', background: '#00838f', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Install App
          </button>
        </div>
      )}

      {/* Push Permission Section */}
      <div style={{ padding: '15px', background: '#f4f4f4', borderRadius: '8px', marginBottom: '20px' }}>
        <p><strong>Push Permission Status:</strong> {permission}</p>
        {permission !== 'granted' && (
          <button 
            onClick={requestNotificationPermission} 
            style={{ padding: '10px', background: 'blue', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Enable Background Alerts
          </button>
        )}
      </div>

      {/* Fetch Product Section */}
      <button onClick={fetchSampleProduct} style={{ padding: '10px', cursor: 'pointer' }}>
        Fetch App Data (Standard API Call)
      </button>

      {product && (
        <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '15px' }}>
          <h3>{product.title}</h3>
          <p>${product.price}</p>
        </div>
      )}
    </div>
  );
}

export default App;