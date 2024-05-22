'use client'
import React, { useState } from 'react';
import { ThemeContext } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

function RootLayout({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <Navbar />
          {children}
        </ThemeContext.Provider>
      </body>
    </html>
  );
}

export default RootLayout;