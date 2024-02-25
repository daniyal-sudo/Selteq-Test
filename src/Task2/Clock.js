import React, { useState, useEffect } from 'react';
import '../App.css';

function Clock() {
  const [time, setTime] = useState(new Date());
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#000000');

  useEffect(() => {
    const interval = setInterval(() => {
      // Update time every second
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const colorChangeInterval = setInterval(() => {
      // Change background color and text color randomly
      setBackgroundColor(getRandomColor());
      setTextColor(getRandomColor());
    }, 10000); // Change colors every 10 seconds

    return () => clearInterval(colorChangeInterval);
  }, []);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="clock_container" style={{ backgroundColor, color: textColor }}>
      <h1>Digital Clock</h1>
      <div className="clock">{time.toLocaleTimeString()}</div>
    </div>
  );
}

export default Clock;
