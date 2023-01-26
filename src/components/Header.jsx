import React from "react";

const Header = ({ title }) => {
  return (
    <header className="bg-dots py-12 px-8">
      <h1 className="mt-2">
        <span className="bg-white text-6xl font-extrabold leading-relaxed">
          {title}
        </span>
      </h1>
    </header>
  );
};

export default Header;
