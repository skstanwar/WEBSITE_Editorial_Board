const PostsTemplate = require.resolve("./src/layouts/Post.jsx");
const CategoryTemplate = require.resolve("./src/layouts/Category.jsx");
const { createFilePath } = require(`gatsby-source-filesystem`);

function dedupeCategories(allMdx) {
  const uniqueCategories = new Set();
  allMdx.edges.forEach(({ node }) => {
    node.frontmatter.categories.forEach((category) => {
      uniqueCategories.add(category);
    });
  });

  return Array.from(uniqueCategories);
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query AllPosts {
      allMdx(
        filter: { fields: { collection: { eq: "posts" } } }
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        edges {
          node {
            id
            frontmatter {
              categories
            }
            fields {
              slug
              collection
            }
          }
          next {
            id
          }
          previous {
            id
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild("Error while running GraphQL query.");
    return;
  }

  const dedupedCategories = dedupeCategories(result?.data?.allMdx);
  dedupedCategories.forEach((category) => {
    reporter.info(`Building category/${category}`);
    createPage({
      path: `category/${category}`,
      component: CategoryTemplate,
      context: {
        allCategories: dedupedCategories,
        category,
        ids: result.data.allMdx.edges
          .filter(({ node }) => {
            return node.frontmatter.categories.includes(category);
          })
          .map(({ node }) => node.id),
      },
    });
  });

  createPage({
    path: "archive",
    component: CategoryTemplate,
    context: {
      allCategories: dedupedCategories,
      category: "",
      ids: result.data.allMdx.edges.map(({ node }) => node.id),
    },
  });

  result.data.allMdx.edges.forEach(({ node, previous, next }) => {
    createPage({
      path: `/${node.fields.collection}${node.fields.slug}`,
      component: PostsTemplate,
      context: {
        id: node.id,
        previousPostId: previous ? previous.id : null,
        nextPostId: next ? next.id : null,
      },
    });
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent);
    let collection = parent.sourceInstanceName;
    const slug = createFilePath({ node, getNode });
    createNodeField({
      node,
      name: "slug",
      value: slug,
    });
    createNodeField({
      node,
      name: "collection",
      value: collection,
    });
  }
};
