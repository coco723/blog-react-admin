const { strictEslint } = require('@umijs/fabric');

module.exports = {
  ...strictEslint,
  globals: {
    BLOG_ADMIN: true,
    page: true,
  },
};
