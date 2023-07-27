import React, { useState, useEffect } from "react";

const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const updateScrollProgress = () => {
    const scrollPx = document.documentElement.scrollTop;
    const windowHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (scrollPx / windowHeight) * 100;
    setScrollProgress(scrolled);
  };

  useEffect(() => {
    window.addEventListener("scroll", updateScrollProgress);
    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
    };
  }, []);

  const progressBarStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: `${scrollProgress}%`,
    height: "5px",
    backgroundColor: "#01a6decc",
    zIndex: 999,
  };

  return <div style={progressBarStyle}></div>;
};

export default ScrollProgressBar;
