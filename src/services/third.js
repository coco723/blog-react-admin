import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryList(params) {
  return request(`/api/thirdList?${stringify(params)}`);
}

export async function queryCurrent() {
  return request('/api/currentUser');
}
