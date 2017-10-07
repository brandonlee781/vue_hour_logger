import { ActionContext, Store, mapGetters } from 'vuex';
import { getStoreAccessors } from 'vuex-typescript';
import { State as RootState } from '../state';
import { LogState, Log } from './logState';

import * as Cookies from 'js-cookie';
import { ILog } from '../../interfaces/log';
import { IAuthCookie } from '../../interfaces/authCookie';
import axios, { AxiosInstance } from 'axios';

const authCookie = JSON.parse(Cookies.get('hourLoggerAuth'));
const api = axios.create({
  baseURL: 'https://www.branlee.me/api/v1/logs',
  headers: { 'Authorization': 'Basic ' + authCookie.code }
})

type LogContext = ActionContext<LogState, RootState>;

export const log = {
  namespaced: true,
  state: {
    logs: []
  },
  getters: {
    getLogs(state: LogState): Log[] {
      return state.logs.map(log => log);
    }
  },
  mutations: {
    SET_LOGS(state, { logs }) {
      state.logs = logs;
    }
  },
  actions: {
    LOAD_LOGS: ({ commit }) => {
      api.get('/').then((res) => {
        console.log(res);
        commit('SET_LOGS', { logs: res.data });
      })
      .catch((err) => {
        console.error(err);
      })
    }
  },
}

const { commit, read, dispatch } = getStoreAccessors<LogState, RootState>('log');

const getters = log.getters;
const mutations = log.mutations;

export const readLogs = read(getters.getLogs);
