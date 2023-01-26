import React, { useState, useEffect } from "react";

const ReadingProgressBar = ({ target, color }) => {
  const [readingProgress, setReadingProgress] = useState(0);

  const scrollListener = () => {
    if (!target.current) {
      return;
    }

    const element = target.current;
    const totalHeight =
      element.clientHeight - element.offsetTop - window.innerHeight;
    const windowScrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    if (windowScrollTop === 0) {
      return setReadingProgress(0);
    }

    if (windowScrollTop > totalHeight) {
      return setReadingProgress(100);
    }

    setReadingProgress((windowScrollTop / totalHeight) * 100);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollListener);
    return () => window.removeEventListener("scroll", scrollListener);
  });

  return (
    <div
      className="fixed top-0 left-0 z-10 h-1 w-full border-0 bg-primary"
      style={{
        backgroundColor: color,
        width: `${readingProgress}%`,
      }}
      max="100"
    />
  );
};

export default ReadingProgressBar;
