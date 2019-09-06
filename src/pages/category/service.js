import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryList(params) {
  return request(`/api/category?${stringify(params)}`);
}

export async function remove(params) {
  return request('/api/category', {
    method: 'delete',
    data: params,
  });
}

export async function create(params) {
  return request('/api/category', {
    method: 'post',
    data: params,
  });
}
