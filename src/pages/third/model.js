import { queryList } from './service';

export default {
  namespace: 'third',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryList, payload);
      yield put({
        type: 'save',
        payload: response.data,
      });
    },
    // *remove({ payload, callback }, { call, put }) {
    //   const response = yield call(removeList, payload);
    //   yield put({
    //     type: 'save',
    //     payload: response.data,
    //   });
    //   if (callback) callback();
    // },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
