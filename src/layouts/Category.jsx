import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/Layout";
import Header from "../components/Header";
import Seo from "../components/Seo";

import getAbsoluteUrl from "../utils/pathGenerator.js";

const ArchivePage = ({
  pageContext: { category, allCategories },
  data: {
    allMdx: { posts },
  },
}) => {
  const postsGroupedByYear = posts.reduce((obj, post) => {
    if (!obj.hasOwnProperty(post.frontmatter.year)) {
      obj[post.frontmatter.year] = [];
    }
    obj[post.frontmatter.year].push(post);
    return obj;
  }, {});

  const data = Object.keys(postsGroupedByYear)
    .sort()
    .reverse()
    .map((key) => ({ year: key, posts: postsGroupedByYear[key] }));

  return (
    <Layout>
      <Seo title="Archive" description="Editorial Board, MANIT Archive" />
      <Header title={`${category} Archive`} />

      <section className="mx-auto max-w-3xl mt-12 px-4">
        <ul className="flex flex-wrap gap-2 justify-center">
          {allCategories.map((c) => (
            <li
              className={`px-2 py-1 border-2 border-primary text-sm ${
                category === c && "bg-primary text-white"
              }`}
              key={c}
            >
              <Link to={`/category/${c}`}>{c}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto mt-12 max-w-4xl space-y-12">
        {data.map((i) => (
          <div key={i.year} className="grid gap-6 sm:grid-cols-3">
            <h3 className="text-4xl font-semibold">{i.year}</h3>
            <div className="col-span-2 space-y-6">
              {i.posts.map((post) => (
                <div>
                  <Link to={getAbsoluteUrl(post)} className="group">
                    <h4 className="text-2xl group-hover:text-secondary sm:text-3xl">
                      {post.frontmatter.title}
                    </h4>
                    <div className="mt-2 space-x-4">
                      <span>{post.frontmatter.date}</span>
                      <span>
                        {post.wordCount.words} words ({post.timeToRead} min)
                      </span>
                      <ul className="inline-flex flex-wrap space-x-2">
                        {post.frontmatter.categories.map((n) => (
                          <li key={n}>
                            <Link
                              className="text-primary"
                              to={`/category/${n}`}
                            >
                              #{n}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </Layout>
  );
};

export const PageData = graphql`
  query CategoryListQuery($ids: [String]!) {
    allMdx(
      filter: { id: { in: $ids } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      posts: nodes {
        id
        frontmatter {
          title
          date(formatString: "MMM DD, YYYY")
          year: date(formatString: "YYYY")
          categories
        }
        fields {
          slug
          collection
        }
        timeToRead
        wordCount {
          words
        }
      }
    }
  }
`;

export default ArchivePage;
