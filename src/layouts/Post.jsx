import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";
import { MDXRenderer } from "gatsby-plugin-mdx";

import {
  faFacebookSquare,
  faTwitter,
  faWhatsappSquare,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

import Layout from "../components/Layout";
import Seo from "../components/Seo";
import ReadingProgressBar from "../components/ReadingProgressBar";
import IconLink from "../components/IconLink";

import getAbsolutePath from "../utils/pathGenerator";

const BlogPostTemplate = ({ data: { previousPost, nextPost, post, site } }) => {
  const featuredImage = getImage(post.frontmatter.featuredImage);
  const featuredImageUrl = getSrc(post.frontmatter.featuredImage);

  const themeColor = featuredImage?.backgroundColor
    ? featuredImage?.backgroundColor
    : "#164E63";

  const { siteUrl } = site.siteMetadata;
  const pageUrl = `${siteUrl}${getAbsolutePath(post)}`;
  const shareText = encodeURIComponent(`Hey! Check out this post by EB, MANIT:

${pageUrl}`);

  const target = React.createRef();

  return (
    <Layout>
      <Seo
        title={post.frontmatter.title}
        description={post.excerpt}
        featuredImageUrl={featuredImageUrl}
      />
      <div ref={target}>
        <header
          className="relative flex min-h-min flex-wrap items-center gap-8 p-8"
          style={{
            backgroundImage: `radial-gradient(${themeColor} 8%, transparent 0)`,
            backgroundSize: "1rem 1rem",
          }}
        >
          {featuredImage && (
            <div className="basis-full md:basis-2/5">
              <GatsbyImage image={featuredImage} alt={post.frontmatter.title} />
            </div>
          )}
          <div className="flex-1">
            <ul className="flex space-x-2">
              {post.frontmatter.categories.map((n) => (
                <li
                  key={n}
                  className="rounded-full border-2 border-gray-700 bg-gray-50 py-1 px-2 text-xs font-semibold uppercase tracking-widest hover:bg-gray-100"
                >
                  {n}
                </li>
              ))}
            </ul>
            <h1 className="mt-2">
              <span className="bg-white text-6xl font-extrabold leading-normal">
                {post.frontmatter.title}
              </span>
            </h1>
            <p>
              <span className="bg-white">
                on {post.frontmatter.date} by Editoral Board
              </span>
            </p>
            <div className="mt-4 flex shrink-0 space-x-4">
              <IconLink
                icon={faFacebookSquare}
                size="2x"
                fixedWidth
                href={`http://www.facebook.com/sharer.php?u=${pageUrl}&p[title]=${post.frontmatter.title}`}
                className="bg-white hover:text-gray-900"
              />
              <IconLink
                icon={faTwitter}
                size="2x"
                fixedWidth
                href={`https://www.twitter.com/intent/tweet?text=${shareText}`}
                className="bg-white hover:text-gray-900"
              />
              <IconLink
                icon={faWhatsappSquare}
                size="2x"
                fixedWidth
                href={`https://api.whatsapp.com/send?text=${shareText}`}
                className="bg-white hover:text-gray-900"
                data-action="share/whatsapp/share"
              />
            </div>
          </div>
        </header>

        <ReadingProgressBar color={themeColor} target={target} />
        <article className="prose mx-auto mt-8 p-4 md:prose-lg">
          <MDXRenderer className="prose mx-auto mt-8 p-4 md:prose-lg">
            {post.body}
          </MDXRenderer>
        </article>

        <nav>
          <ul className="mx-auto flex max-w-prose justify-between">
            <li>
              {previousPost && (
                <Link to={getAbsolutePath(previousPost)} rel="prev">
                  ← {previousPost.frontmatter.title}
                </Link>
              )}
            </li>

            <li>
              {nextPost && (
                <Link to={getAbsolutePath(nextPost)} rel="next">
                  {nextPost.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query PostData($id: String!, $nextPostId: String, $previousPostId: String) {
    post: mdx(id: { eq: $id }) {
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
      ...Slug
      body
      excerpt
    }
    nextPost: mdx(id: { eq: $nextPostId }) {
      frontmatter {
        title
      }
      ...Slug
    }
    previousPost: mdx(id: { eq: $previousPostId }) {
      frontmatter {
        title
      }
      ...Slug
    }
    site {
      ...SiteMetadata
    }
  }
`;
