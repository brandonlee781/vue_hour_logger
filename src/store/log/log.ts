import Vue from 'vue';
import { ActionContext, Store, mapGetters } from 'vuex';
import { getStoreAccessors } from 'vuex-typescript';
import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';

import * as types from '../mutation-types';

import { State as RootState } from '../state';
import { LogState, Log } from './logState';
import { IAuthCookie } from '../../interfaces/authCookie';

const api = axios.create({
  baseURL: 'https://www.branlee.me/api/v1/logs',
})
const authCookie = (): IAuthCookie => JSON.parse(Cookies.get('hourLoggerAuth'));

export const log = {
  namespaced: true,
  state: {
    isLoading: false,
    logs: []
  },
  getters: {
    getLogs(state: LogState): Log[] {
      return state.logs.map(log => log);
    },
    getLogCount(state: LogState): number {
      return state.logs.length;
    },
    getLogsByProject(state: LogState) {
      return projectName => state.logs.filter((log) => {
        return log.project.toLowerCase() === projectName.toLowerCase();
      });
    }
  },
  mutations: {
    [types.SET_LIST](state, { logs }) {
      state.logs = logs;
    },
    [types.PREPEND](state, { log }) {
      state.logs.unshift(log);
    },
    [types.ADD](state, { logs }) {
      state.logs.push(...logs);
    },
    [types.REMOVE](state, { log }) {
      const index = state.logs.findIndex(l => l._id === log._id);
      state.logs.splice(index, 1);
    },
    [types.UPDATE](state, { log }) {
      const index = state.logs.findIndex(l => l._id === log._id);
      state.logs.splice(index, 1, log);
    },
    'TOGGLE_IS_LOADING'(state) {
      state.isLoading = !state.isLoading;
    }
  },
  actions: {
    LOAD_LOG_LIST: async ({ commit }) => {
      commit('TOGGLE_IS_LOADING');
      const res = await api.get('/', { headers: { 'Authorization': 'Basic ' + authCookie().code } });
      commit('SET_LIST', { logs: res.data });
      commit('TOGGLE_IS_LOADING');
    },
    LOAD_MORE_LOGS: async ({ commit }, count) => {
      const res = await api.get('/', { params: { skip: count }, headers: { 'Authorization': 'Basic ' + authCookie().code } });
      commit('APPEND', { logs: res.data })
    },
    ADD_NEW_LOG: async ({ commit }, log) => {
      try {
        const res = await api.post('/', log, { headers: { 'Authorization': 'Basic ' + authCookie().code } });
        commit('PREPEND', { log: res.data });
        return Promise.resolve('finished');
      } catch (err) {
        console.error(err);
      }
    },
    DELETE_LOG: async ({ commit }, log) => {
      commit('REMOVE', { log });
      const res = await api.delete(`/${log._id}`, { headers: { 'Authorization': 'Basic ' + authCookie().code } });
    },
    EDIT_LOG: async ({ commit }, log) => {
      commit('UPDATE', { log });
      const res = await api.put(`/${log._id}`, log, { headers: { 'Authorization': 'Basic ' + authCookie().code } });
    }
  },
}
