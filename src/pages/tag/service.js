import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryList(params) {
  return request(`/api/tag?${stringify(params)}`);
}

export async function remove(params) {
  return request('/api/tag', {
    method: 'delete',
    data: params,
  });
}

export async function create(params) {
  return request('/api/tag', {
    method: 'post',
    data: params,
  });
}
