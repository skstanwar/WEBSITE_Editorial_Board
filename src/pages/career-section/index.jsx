import React from "react";
import Layout from "../../components/Layout";
import Seo from "../../components/Seo";
import Header from "../../components/Header";
import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelopeOpen,
  faUser,
  faHandshake,
} from "@fortawesome/free-regular-svg-icons";

export default function CareerSection() {
  return (
    <Layout>
      <Seo
        title="Career Section"
        description="Editorial Board, MANIT Archive"
      />
      <Header title="Career Section" />
      <div className="my-10 flex flex-col justify-around md:flex-row">
        <div className="relative m-5 flex flex-col items-center rounded-md bg-pink-50 md:w-1/3">
          <div className="absolute -top-3 rounded-md bg-primary py-1 px-2 text-white">
            Interviews
          </div>
          <div className="pt-10 font-semibold text-primary">
            HackerEarth for Enterprises
          </div>

          <Link to="/career-section/interviews">
            <FontAwesomeIcon
              icon={faEnvelopeOpen}
              size="4x"
              className="m-3 text-primary hover:text-secondary"
            />
          </Link>

          <div className="mx-5 mt-5 mb-10 flex flex-row text-center text-sm">
            HackerEarth lets you engage or source top developers with
            hackathons, while also enabling you to assess, interview and upskill
            them with ease.
          </div>
        </div>

        <div className="relative m-5 flex flex-col items-center rounded-md bg-pink-50 md:w-1/3">
          <div className="absolute -top-3 rounded-md bg-primary py-1 px-2 text-white">
            Offcampus Opportunities
          </div>
          <div className="pt-10 font-semibold text-primary">
            HackerEarth for Enterprises
          </div>

          <Link to="/career-section/offcampus-opportunities">
            <FontAwesomeIcon
              icon={faHandshake}
              size="4x"
              className="m-3 text-primary hover:text-secondary"
            />
          </Link>

          <div className="mx-5 mt-5 mb-10 flex flex-row text-center text-sm">
            HackerEarth lets you engage or source top developers with
            hackathons, while also enabling you to assess, interview and upskill
            them with ease.
          </div>
        </div>

        <div className="relative m-5 flex flex-col items-center rounded-md bg-pink-50 md:w-1/3">
          <div className="absolute -top-3 rounded-md bg-primary py-1 px-2 text-white">
            Roadmaps
          </div>
          <div className="pt-10 font-semibold text-primary">
            HackerEarth for Enterprises
          </div>

          <Link to="/career-section/roadmaps">
            <FontAwesomeIcon
              icon={faUser}
              size="4x"
              className="m-3 text-primary hover:text-secondary"
            />
          </Link>
          <div className="mx-5 mt-5 mb-10 flex flex-row text-center text-sm">
            HackerEarth lets you engage or source top developers with
            hackathons, while also enabling you to assess, interview and upskill
            them with ease.
          </div>
        </div>
      </div>
    </Layout>
  );
}
