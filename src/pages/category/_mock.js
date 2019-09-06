const data = {
  list: [
    {
      id: '5d106f901a9b12a2e0fc9af4',
      name: 'MYSQL',
      desc: 'mysql',
      create_time: '2019-08-04 06:37:04',
    },
    {
      name: 'MONGODB',
      desc: 'mongodb',
      id: '5d10622dc2dc15a11c9f1cd5',
      create_time: '2019-08-24 05:39:57',
    },
    {
      name: 'NODE',
      desc: 'node',
      id: '5d1062267bdc15a11c9f1cd5',
      create_time: '2019-08-21 05:39:57',
    },
  ],
  pagination: {
    total: 3,
    pageSize: 10,
    pageIndex: 0,
  },
};

function getCategoryList(req, res) {
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

function deleteCategory(req, res) {
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

function createCategory(req, res) {
  const params = req.body;
  let { list } = data;
  list = list.unshift({
    ...params,
    id: `${list.length}`,
  });
  res.json({ data: { id: list.length } });
}

export default {
  'get  /api/category': getCategoryList,
  'delete /api/category': deleteCategory,
  'post /api/category': createCategory,
};
