import React from 'react';
import './Footer.css';

export default () => {
  return (
    <footer className="footer-background text-white mt-5 p-4 text-center">
      Copyright &copy; {new Date().getFullYear()} SmartList
    </footer>
  );
};
