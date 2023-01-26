import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import {
  faFacebook,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

import IconLink from "./IconLink";

const Footer = ({ description }) => {
  return (
    <footer className="mx-auto mt-8 max-w-6xl border-t-2 border-dashed border-gray-300 py-6 px-4 font-medium">
      <span className="text-lg font-bold">
        <StaticImage
          src="../../static/images/logo.svg"
          alt="EB Logo"
          className="h-16 w-16"
          placeholder="blurred"
        />
      </span>
      <div className="mt-2 flex flex-wrap gap-8">
        <div className="basis-full md:basis-1/2">
          <p>{description}</p>
          <div className="mt-2 flex shrink-0 space-x-4">
            <IconLink
              icon={faFacebook}
              size="lg"
              href="https://fb.me/editorialboard.nitb"
              fixedWidth
            />
            <IconLink
              icon={faInstagram}
              size="lg"
              href="https://instagram.com/editorialboard.nitb"
              fixedWidth
            />
            <IconLink
              icon={faLinkedinIn}
              size="lg"
              href="https://linkedin.com/in/editorialboard.nitb"
              fixedWidth
            />
            <IconLink
              icon={faEnvelope}
              size="lg"
              href="mailto:editorialboard.nitb@gmail.com"
              fixedWidth
            />
          </div>
        </div>
        <div className="flex-1">
          <p>
            Copyright © {new Date().getFullYear()} Editorial Board, MANIT. Built
            with{" "}
            <a href="https://www.gatsbyjs.com/" target="_blank">
              GatsbyJS
            </a>{" "}
            & {"<3"}.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
