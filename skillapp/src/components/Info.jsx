import React from 'react';

export function Home() {
  return (
    <div
      style={{
        height: '80vh',
        backgroundImage: 'url("https://media.architecturaldigest.com/photos/66a914f1a958d12e0cc94a8e/16:9/w_2240,c_limit/DSC_5903.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: '120px', // 👈 pushes the text downward from the top
      }}
    >
      <h1
        style={{
          fontSize: '36px',
          fontWeight: 'bold',
          color: 'white',
          textShadow: '2px 2px 6px rgba(0,0,0,0.8)',
        }}
      >
        Welcome to Car Rental System
      </h1>
    </div>
  );
}


export function About() {
  return (
    <div style={{
      padding: '80px 40px',
      maxWidth: '1000px',
      margin: 'auto',
      fontFamily: 'Segoe UI, sans-serif',
      textAlign: 'center',
    }}>
      <h1 style={{ fontSize: '36px', marginBottom: '20px', color: '#222' }}>About Car Rental</h1>
      <p style={{ fontSize: '18px', marginBottom: '30px', color: '#444' }}>
        Welcome to our Car Rental platform! We provide a wide selection of vehicles for your convenience — 
        from compact cars to luxury SUVs. Whether you're looking for a short city trip or a long vacation ride, 
        we've got you covered.
      </p>
      <h2 style={{ fontSize: '24px', color: '#333', marginBottom: '15px' }}>Our services include:</h2>
      <ul style={{
        listStyleType: 'disc',
        textAlign: 'left',
        display: 'inline-block',
        fontSize: '18px',
        lineHeight: '1.8',
        color: '#333',
        paddingLeft: '30px',
      }}>
        <li>Self-drive or with-driver options</li>
        <li>Easy online booking</li>
        <li>Flexible rental durations</li>
        <li>Affordable pricing</li>
      </ul>
      <p style={{ marginTop: '40px', fontSize: '18px', color: '#555' }}>
        Thank you for choosing us!
      </p>
    </div>
  );
}

export function Page2() {
  return (
    <div>
      <h2>This is Page 2</h2>
    </div>
  );
}
