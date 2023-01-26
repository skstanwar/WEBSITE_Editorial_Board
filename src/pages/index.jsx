import React from "react";
import { Link, graphql } from "gatsby";
import { GatsbyImage, StaticImage, getImage } from "gatsby-plugin-image";

import Layout from "../components/Layout";
import Seo from "../components/Seo";

import getAbsolutePath from "../utils/pathGenerator";

const IndexPost = ({ post }) => {
  const image = getImage(post.frontmatter.featuredImage);
  return (
    <>
      <div className="mx-auto w-72 group">
        <Link to={getAbsolutePath(post)}>
          <GatsbyImage
            className="object-cover aspect-square"
            image={image}
            alt={post.frontmatter.title}
          />
          <span className="block pl-2 mt-2 text-xs font-medium tracking-wider leading-none text-gray-500 uppercase border-l-2 border-primary">
            {post.frontmatter.categories.join(", ")}
          </span>
          <h3 className="my-1 text-lg font-medium group-hover:underline decoration-secondary decoration-2 underline-offset-4">
            {post.frontmatter.title}
          </h3>
          <p className="text-xs tracking-wider leading-none text-gray-500 uppercase">
            {post.frontmatter.date}
          </p>
        </Link>
      </div>
    </>
  );
};

export default function Index({ data }) {
  const {
    featuredPost: { nodes: fp },
    latestPosts: { nodes: lp },
  } = data;
  const featuredPost = fp[0];
  const latestPosts =
    lp[0].id === featuredPost.id ? lp.slice(1) : lp.slice(0, 9);
  const featuredImage = getImage(featuredPost.frontmatter.featuredImage);
  return (
    <>
      <Seo title="Home" description="Editorial Board, MANIT" />
      <Layout>
        <section className="flex flex-col gap-8 items-center my-8 md:flex-row">
          <div className="flex flex-wrap flex-grow items-center justify-center self-stretch p-8 bg-dots">
            <Link to={getAbsolutePath(featuredPost)}>
              <span className="relative">
                <span className="absolute top-0 left-0 bg-primary text-white uppercase text-xs tracking-wide font-medium px-3 py-2 z-10">
                  Featured
                </span>
                <GatsbyImage
                  className="aspect-square max-w-[20rem] object-cover"
                  image={featuredImage}
                  alt={featuredPost.frontmatter.title}
                />
              </span>
            </Link>
            <div className="flex-1 p-4 bg-white min-w-[16rem] max-w-[20rem]">
              <Link to={getAbsolutePath(featuredPost)}>
                <h3 className="text-xl font-medium">
                  {featuredPost.frontmatter.title}
                </h3>
                <p className="mt-2 text-sm">{featuredPost.frontmatter.date}</p>
                <p className="mt-2 text-sm">{featuredPost.excerpt}</p>
              </Link>
            </div>
          </div>
          <div className="p-8 w-96 flex-shrink-0 bg-dots">
            <a
              href="https://www.instagram.com/p/CY1f7igvvem/"
              target="_blank"
              rel="nofollow"
            >
              <StaticImage
                className="object-cover w-full rounded aspect-square"
                src="../../static/images/uploads/polls.png"
                alt="MANIT Polls"
              />
            </a>
          </div>
        </section>

        <section className="flex flex-wrap gap-8 justify-between mb-8">
          {latestPosts.map((post) => (
            <IndexPost key={post.id} post={post} />
          ))}
        </section>
      </Layout>
    </>
  );
}

export const pageQuery = graphql`
  query AllPosts {
    featuredPost: allMdx(
      filter: { frontmatter: { featured: { eq: true } } }
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1
    ) {
      nodes {
        id
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
          categories
          featuredImage {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        fields {
          slug
          collection
        }
        excerpt(truncate: true, pruneLength: 210)
      }
    }
    latestPosts: allMdx(
      filter: { fields: { collection: { eq: "posts" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 10
    ) {
      nodes {
        id
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
          categories
          featuredImage {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        fields {
          slug
          collection
        }
      }
    }
  }
`;
