const data = {
  list: [
    {
      name: 'CoCoyh',
      type: 2,
      phone: '',
      email: '1352118502@qq.com',
      introduce: '',
      avatar: 'https://avatars1.githubusercontent.com/u/24558814?v=4',
      _id: '5d106f901a9b12a2e0fc9af4',
      create_time: '2019-06-24 06:37:04',
    },
    {
      name: 'coco',
      type: 0,
      phone: '2434',
      email: '1352118502@qq.com',
      introduce: 'nihdhfk',
      avatar: 'http://prn8lcgbf.bkt.clouddn.com/avatar/1.jpeg',
      _id: '5d10622dc2dc15a11c9f1cd5',
      create_time: '2019-06-24 05:39:57',
    },
    {
      name: 'user',
      type: 0,
      phone: '15623455678',
      email: '1367636@163.com',
      introduce: 'nihao',
      avatar: 'user',
      _id: '5d0dc30fa86a82640a859a3d',
      create_time: '2019-06-22 05:56:31',
    },
    {
      name: 'admin',
      type: 0,
      phone: '15623455678',
      email: '13685747636@163.com',
      introduce: 'nihao',
      avatar: 'user',
      _id: '5d0dc2eba86a82640a859a3c',
      create_time: '2019-06-22 05:55:55',
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
  if (params.name) {
    data.filter(item => item.name === params.name);
  }

  return res.json({ data });
}

export default {
  'GET  /api/third_list': getThirdList,
};
