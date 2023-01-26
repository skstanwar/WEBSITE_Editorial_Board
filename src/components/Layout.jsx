import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import Navbar from "./Navbar";
import Footer from "./Footer";
import "./global.css";

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);

  return (
    <>
      <Navbar siteTitle={data.site.siteMetadata.title} />
      <main className="mx-auto max-w-6xl px-4">{children}</main>
      <Footer description={data.site.siteMetadata.description} />
    </>
  );
};

export default Layout;
