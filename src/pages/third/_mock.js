const data = {
  list: [
    {
      name: 'CoCoyh',
      type: 2,
      phone: '',
      email: '1352118502@qq.com',
      introduce: '',
      avatar: 'https://avatars1.githubusercontent.com/u/24558814?v=4',
      id: '5d106f901a9b12a2e0fc9af4',
      create_time: '2019-06-24 06:37:04',
    },
    {
      name: 'coco',
      type: 0,
      phone: '2434',
      email: '1352118502@qq.com',
      introduce: 'nihdhfk',
      avatar: 'http://prn8lcgbf.bkt.clouddn.com/avatar/1.jpeg',
      id: '5d10622dc2dc15a11c9f1cd5',
      create_time: '2019-06-24 05:39:57',
    },
    {
      name: 'user',
      type: 0,
      phone: '15623455678',
      email: '1367636@163.com',
      introduce: 'nihao',
      avatar: 'user',
      id: '5d0dc30fa86a82640a859a3d',
      create_time: '2019-06-22 05:56:31',
    },
    {
      name: 'admin',
      type: 0,
      phone: '15623455678',
      email: '13685747636@163.com',
      introduce: 'nihao',
      avatar: 'user',
      id: '5d0dc2eba86a82640a859a3c',
      create_time: '2019-08-27 14:50:07',
    },
  ],
  pagination: {
    total: 4,
    pageSize: 10,
    pageIndex: 0,
  },
};

function getThirdList(req, res) {
  const params = req.query;
  const { name, type, sorter } = params;
  const typeList = type ? type.split(',') : [];
  let list = () => data.list;
  if (name) {
    list = list.filter(item => item.name === name);
  }
  if (typeList.length > 0) {
    list = list.filter(item => typeList.includes(item.type.toString()));
  }

  if (sorter) {
    const s = sorter.split('_');
    list = list.sort((prev, next) => {
      if (s[0] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
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

function deleteThird(req, res) {
  // eslint
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

export default {
  'get  /api/third_list': getThirdList,
  'delete /api/third': deleteThird,
};
