import React from 'react';
import { FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#faeec5', padding: '20px 0', textAlign: 'center', borderTop: '1px solid #ccc' }}>
      <div style={{ marginBottom: '10px' }}>
        <p><strong>Contact:</strong> +91 98765 43210 | shivaskitchen@gmail.com</p>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <a href="https://instagram.com/yourpage" target="_blank" rel="noopener noreferrer" style={{ color: '#e1306c', fontSize: '20px' }}>
          <FaInstagram /> Follow us on Instagram
        </a>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <a href="/privacy-policy" style={{ textDecoration: 'none', color: '#333' }}>Privacy Policy</a>
      </div>

      <div>
        <p style={{ fontSize: '14px' }}><strong>Accepted Cards:</strong> Visa, MasterCard, RuPay, UPI</p>
      </div>

      <div style={{ fontSize: '12px', marginTop: '10px', color: '#777' }}>
        © {new Date().getFullYear()} Shiva’s Kitchen. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
