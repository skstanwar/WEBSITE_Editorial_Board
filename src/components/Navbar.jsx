import React, { useState } from "react";
import { Link, graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

import IconLink from "./IconLink";

function Navbar({ siteTitle }) {
  const [isExpanded, toggleExpansion] = useState(false);

  return (
    <div className="container my-4 mx-auto px-4">
      <div className="flex justify-between">
        <div className="hidden w-36 shrink-0 items-center justify-between sm:flex">
          <IconLink
            icon={faFacebook}
            href="https://fb.me/editorialboard.nitb"
            size="lg"
            fixedWidth
            className="text-primary"
          />
          <IconLink
            icon={faInstagram}
            href="https://instagram.com/editorialboard.nitb"
            size="lg"
            fixedWidth
            className="text-primary"
          />
          <IconLink
            icon={faLinkedinIn}
            href="https://www.linkedin.com/company/editorial-board-manit-bhopal"
            size="lg"
            fixedWidth
            className="text-primary"
          />
          <IconLink
            icon={faEnvelope}
            href="mailto:editorialboard.nitb@gmail.com"
            size="lg"
            fixedWidth
            className="text-primary"
          />
        </div>

        <Link to="/" className="flex items-center">
          <StaticImage
            src="../../static/images/logo.svg"
            alt="EB Logo"
            className="h-12 w-12 sm:h-16 sm:w-16"
            placeholder="blurred"
          />
        </Link>

        <div className="hidden shrink-0 items-center sm:flex">
          <a
            href="https://linktr.ee/editorialboard.nitb"
            className="border-2 border-primary py-1 px-2 text-center text-sm font-semibold text-primary transition duration-300 hover:bg-primary hover:text-white sm:w-36 sm:text-lg"
          >
            Excelsior ʼ21
          </a>
        </div>
        <button
          className="sm:hidden"
          onClick={() => toggleExpansion(!isExpanded)}
        >
          <FontAwesomeIcon icon={faBars} size="lg" className="text-primary" />
        </button>
      </div>
      <nav className="sm:mt-4">
        <ul
          className={`${
            isExpanded ? "flex sm:flex" : "hidden sm:flex"
          } flex-col items-center justify-center gap-2 sm:flex-row`}
        >
          <li className="my-1 sm:hidden">
            <a
              href="https://linktr.ee/editorialboard.nitb"
              className="border-2 border-primary py-1 px-2 text-center text-sm font-semibold text-primary transition duration-300 hover:bg-primary hover:text-white sm:w-36 sm:text-lg"
            >
              Excelsior ʼ21
            </a>
          </li>
          <li>
            <Link className="px-4 font-medium hover:text-primary" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="px-4 font-medium hover:text-primary" to="/archive">
              Archive
            </Link>
          </li>
          <li>
            <Link
              className="px-4 font-medium hover:text-primary"
              to="/career-section"
            >
              Career Section
            </Link>
          </li>
          <li>
            <Link className="px-4 font-medium hover:text-primary" to="/team">
              Team
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
