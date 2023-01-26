import React, { useState } from "react";
import { StaticQuery, graphql } from "gatsby";
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";
import { MDXRenderer } from "gatsby-plugin-mdx";

import {
  faFacebook,
  faInstagram,
  faTwitter,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

import Layout from "../components/Layout";
import Seo from "../components/Seo";
import IconLink from "../components/IconLink";

const SocialIconList = ({ social, ...props }) => {
  return (
    <ul {...props}>
      {social.fb && (
        <IconLink icon={faFacebook} href={`https://fb.me/${social.fb}`} />
      )}
      {social.ig && (
        <IconLink
          icon={faInstagram}
          href={`https://instagram.com/${social.ig}`}
        />
      )}
      {social.li && (
        <IconLink
          icon={faLinkedinIn}
          href={`https://linkedin.com/in/${social.li}`}
        />
      )}
      {social.twt && (
        <IconLink icon={faTwitter} href={`https://twitter.com/${social.fb}`} />
      )}
    </ul>
  );
};

const Member = ({ member: { name, pfp, pfp_alt, position, social, bio } }) => {
  const [showModal, setShowModal] = useState(false);
  const pfpImage = getImage(pfp);
  const pfpAltImage = getImage(pfp_alt);
  return (
    <>
      <div className="w-52">
        <div
          className="group relative h-52 w-52 cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          <GatsbyImage
            className="!absolute z-10 !block group-hover:!block md:!hidden"
            image={pfpAltImage}
            alt={name}
          />
          <GatsbyImage
            className="!absolute z-0 !hidden md:!block"
            image={pfpImage}
            alt={name}
          />
        </div>
        <p className="mt-2 text-center">
          <span className="font-semibold">{name}</span>
          <br />
          {position}
          <br />
        </p>
        <SocialIconList
          className="mt-0.5 flex justify-center space-x-2"
          social={social}
        />
      </div>
      {showModal ? (
        <>
          <div
            onClick={() => setShowModal(false)}
            className="fixed inset-0 z-50 m-4 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none"
          >
            <div
              className="relative mx-auto w-auto max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full rounded-md border-0 bg-white p-4 shadow-lg outline-none focus:outline-none">
                <div className="flex flex-col items-center sm:flex-row">
                  <GatsbyImage
                    className="m-4 w-52 flex-shrink-0 rounded-md"
                    image={pfpImage}
                    alt={name}
                  />

                  <div className="sm:p-4">
                    <h3 className="text-center text-2xl font-semibold sm:text-left">
                      {name}
                    </h3>
                    <SocialIconList
                      className="flex justify-center space-x-2 sm:justify-start"
                      social={social}
                    />
                    <p
                      className="my-2 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: bio }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-end rounded-b border-t border-solid">
                  <button
                    className="background-transparent p-4 pb-0 text-sm font-bold uppercase text-red-500 outline-none focus:outline-none"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
    </>
  );
};

const TeamPage = (props) => {
  return (
    <Layout>
      <Seo title="EDiots" description="Team EB, 2021" />
      <section className="my-8 mx-auto max-w-6xl p-4">
        <div className="flex flex-wrap justify-around gap-y-4 gap-x-8">
          <div className="flex h-52 w-52 items-center justify-center text-center">
            <h1 className="text-6xl font-extrabold">EDiots</h1>
          </div>
          <StaticQuery
            query={graphql`
              query memberList {
                allMembersYaml {
                  nodes {
                    name
                    position
                    social {
                      fb
                      ig
                      li
                      twt
                    }
                    bio
                    pfp_alt {
                      publicURL
                      childImageSharp {
                        gatsbyImageData(placeholder: NONE, width: 256)
                      }
                    }
                    pfp {
                      childImageSharp {
                        gatsbyImageData(placeholder: BLURRED, width: 256)
                      }
                    }
                  }
                }
              }
            `}
            render={(data) =>
              data.allMembersYaml.nodes.map((member) => (
                <Member key={member.name} member={member} />
              ))
            }
          />

          <p className="flex items-center justify-center md:h-52">
            Team Editorial Board, 2022
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default TeamPage;
