import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryList(params) {
  return request(`/api/message?${stringify(params)}`);
}

export async function query(params) {
  return request(`/api/messageDetail?${stringify(params)}`);
}

export async function update(params) {
  return request('/api/message', {
    method: 'put',
    data: params,
  });
}

export async function remove(params) {
  return request('/api/message', {
    method: 'delete',
    data: params,
  });
}
