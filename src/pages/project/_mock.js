const data = {
  list: [
    {
      id: '5d12e696732d36fdb82e8695',
      title: 'test',
      content: 'test',
      img: 'https://avatars1.githubusercontent.com/u/24558814?v=4',
      url: 'https://github.com/CoCoyh/blog-react-admin',
      start_time: '2019-07-04 06:37:04',
      end_time: '2019-08-04 06:37:04',
      state: 1,
    },
    {
      id: '5d12e696732d35tdb82e8695',
      title: 'qq',
      content: 'qq',
      img: 'https://avatars1.githubusercontent.com/u/24558814?v=4',
      url: 'https://github.com/CoCoyh/blog-react',
      start_time: '2019-07-12 06:37:04',
      end_time: '2019-08-04 06:37:04',
      state: 0,
    },
  ],
  pagination: {
    total: 2,
    pageSize: 10,
    pageIndex: 0,
  },
};

function getProjectList(req, res) {
  const params = req.query;
  const { name, type, sorter } = params;
  const typeList = type ? type.split(',') : [];
  let { list } = data;
  if (name) {
    list = list.filter(item => item.name === name);
  }
  if (typeList.length > 0) {
    list = list.filter(item => typeList.includes(item.type.toString()));
  }

  if (sorter) {
    const s = sorter.split('_');
    const [t] = s;
    list = list.sort((prev, next) => {
      if (t === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[t] - next[t];
    });
  }
  return res.json({
    data: {
      list,
      pagination: {
        total: list.length,
        pageSize: 10,
        pageIndex: 0,
      },
    },
  });
}

function deleteProject(req, res) {
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
  });
}

function createProject(req, res) {
  const params = req.body;
  let { list } = data;
  list = list.unshift({
    ...params,
    id: `${list.length}`,
  });
  res.json({ data: { id: list.length } });
}

function getDetail(req, res) {
  const params = req.query;
  const obj = data.list.filter(item => item.id === params.id);
  res.json({
    success: true,
    data: { ...obj },
  });
}

export default {
  'get  /api/project': getProjectList,
  'delete /api/project': deleteProject,
  'post /api/project': createProject,
  'get /api/projectDetail': getDetail,
};
