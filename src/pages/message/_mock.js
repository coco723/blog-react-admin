const data = {
  list: [
    {
      user_id: '',
      name: 'coco',
      avatar: 'user',
      phone: '13685747636',
      introduce: '',
      email: '1352118502@qq.com',
      state: 0,
      id: '5d0ca8206cddbe2fbfda90db',
      content: '你好哦',
      reply_list: [
        {
          id: '5d6e62ce0e3b86c2789e1703',
          content: 'teset',
        },
      ],
      create_time: '2019-06-21 09:49:20',
    },
  ],
};

function getList(req, res) {
  const params = req.query;
  let result = data.list;
  if (params.content) {
    result = result.filter(item => item.content.match(params.content));
  }
  res.json({
    data: { list: result },
  });
}

function getMessageDetail(req, res) {
  const params = req.query;
  let result = data.list;
  let detail = {};
  if (params.id) {
    result = result.filter(item => item.id === params.id);
    [detail] = result;
  }
  res.json({
    data: detail,
  });
}

export default {
  'get /api/message': getList,
  'get /api/messageDetail': getMessageDetail,
};
