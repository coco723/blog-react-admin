import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryList(params) {
  return request(`/api/article_list?${stringify(params)}`);
}

export async function update(params) {
  return request('/api/article', {
    method: 'put',
    data: params,
  });
}

export async function remove(params) {
  return request('/api/article', {
    method: 'delete',
    data: params,
  });
}

export async function detail(params) {
  return request(`/api/article?${stringify(params)}`);
}
