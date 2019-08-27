const domain = () => {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3001';
  }
  return 'https://gcc68.blog.com';
};

export default domain;
