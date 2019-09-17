const data = {
  list: [
    {
      views: 7,
      likes: 0,
      keyword: ['ge'],
      desc: '',
      img_url:
        'https://upload-images.jianshu.io/upload_images/12890819-80fa7517ab3f2783.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
      type: 1,
      state: 1,
      origin: 0,
      tags: [],
      comments: [],
      category: [],
      id: '5d202e7fe831c675b90019c1',
      title: 'test',
      author: 'coco',
      create_time: '2019-07-06 05:15:43',
    },
    {
      views: 4,
      likes: 0,
      keyword: ['nuhuh'],
      desc: 'ggg',
      img_url:
        'https://upload-images.jianshu.io/upload_images/12890819-80fa7517ab3f2783.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
      type: 1,
      state: 1,
      origin: 0,
      tags: [
        {
          _id: '5d10984a1a9b12a2e0fc9afa',
          name: 'MySql',
          desc: 'MySql',
          create_time: '2019-06-24 09:30:50',
          update_time: '2019-06-24 09:30:50',
          id: 2,
          __v: 0,
        },
      ],
      comments: [],
      category: [
        {
          desc: 'MongoDB',
          _id: '5d1191d81a9b12a2e0fc9afb',
          name: 'MongoDB',
          create_time: '2019-06-25 03:15:36',
          update_time: '2019-06-25 03:15:36',
          id: 1,
          __v: 0,
        },
      ],
      id: '5d2011f9e831c675b90019c0',
      title: 'lele',
      author: 'coco',
      create_time: '2019-07-06 03:14:01',
    },
  ],
  pagination: {
    total: 4,
    pageSize: 10,
    pageIndex: 0,
  },
};

function getArticleList(req, res) {
  const params = req.query;
  const { title, state, sorter, origin } = params;
  const stateList = state ? state.split(',') : [];
  const originList = origin ? origin.split(',') : [];
  let result = data.list;
  if (title) {
    result = result.filter(item => item.title === title);
  }
  if (stateList.length > 0) {
    result = result.filter(item => stateList.includes(item.state.toString()));
  }

  if (originList.length > 0) {
    result = result.filter(item => stateList.includes(item.origin.toString()));
  }

  if (sorter) {
    const s = sorter.split('_');
    result = result.sort((prev, next) => {
      if (s[0] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }
  return res.json({
    data: {
      list: result,
      pagination: {
        total: result.length,
        pageSize: 10,
        pageIndex: 0,
      },
    },
  });
}

function deleteArticle(req, res) {
  const { id } = req.body;
  const list = data.list.filter(item => item.id !== id);
  return res.json({
    data: {
      list,
      pagination: {
        total: list.length,
        pageSize: 10,
        pageIndex: 0,
      },
    },
    success: true,
  });
}

function updateArticle(req, res) {
  const { id } = req.body;
  // if (id) {
  //   data.list.map(item => {
  //     if (item.id === id) {
  //       return { ...item, ...req.body };
  //     }
  //   });
  // }
  const newId = `article-${data.list.length}`;
  data.list.unshift({
    ...req.body,
    id: newId,
    create_time: new Date().getTime(),
  });
  return res.json({
    success: true,
    data: { id: id || newId },
  });
}

function getArticle(req, res) {
  const { id } = req.query;
  const article = data.list.map(item => item.id === id);
  return res.json({ data: article });
}

export default {
  'get /api/article_list': getArticleList,
  'delete /api/article': deleteArticle,
  'put /api/article': updateArticle,
  'get /api/article': getArticle,
};
