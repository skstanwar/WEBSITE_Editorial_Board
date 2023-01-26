const getAbsolutePath = ({ fields: { collection, slug } }) => {
  return `/${collection}${slug}`;
};

export default getAbsolutePath;
