import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryList(params) {
  return request(`/api/project?${stringify(params)}`);
}

export async function remove(params) {
  return request('/api/project', {
    method: 'delete',
    data: params,
  });
}

export async function create(params) {
  return request('/api/project', {
    method: 'post',
    data: params,
  });
}

export async function detail(params) {
  return request(`/api/projectDetail?${stringify(params)}`);
}
