import { graphql } from "gatsby";

export const query = graphql`
  fragment Slug on Mdx {
    fields {
      slug
      collection
    }
  }
  fragment SiteMetadata on Site {
    siteMetadata {
      title
      siteUrl
    }
  }
`;
