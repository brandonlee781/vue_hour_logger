import Vue from 'vue';
import { ActionContext, Store, mapGetters } from 'vuex';
import { getStoreAccessors } from 'vuex-typescript';
import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';

import * as types from '../mutation-types';

import { State as RootState } from '../state';
import { ProjectState, Project } from './projectState';
import { IAuthCookie } from '../../interfaces/authCookie';

const api = axios.create({
  baseURL: 'https://www.branlee.me/api/v1/projects',
})
const authCookie = (): IAuthCookie => JSON.parse(Cookies.get('hourLoggerAuth'));

export const project = {
  namespaced: true,
  state: {
    isLoading: false,
    projects: []
  },
  getters: {
    getProjects(state: ProjectState): Project[] {
      return state.projects.map(project => project);
    },
    getProjectCount(state: ProjectState): number {
      return state.projects.length;
    },
  },
  mutations: {
    [types.SET_LIST](state, { projects }) {
      state.projects = projects;
    },
    [types.PREPEND](state, { project }) {
      state.projects.unshift(project);
    },
    [types.ADD](state, { projects }) {
      state.projects.push(...projects);
    },
    [types.REMOVE](state, { project }) {
      const index = state.projects.findIndex(l => l._id === project._id);
      state.projects.splice(index, 1);
    },
    [types.UPDATE](state, { project }) {
      const index = state.projects.findIndex(l => l._id === project._id);
      state.projects.splice(index, 1, project);
    },
    'TOGGLE_IS_LOADING'(state) {
      state.isLoading = !state.isLoading;
    }
  },
  actions: {
    LOAD_PROJECT_LIST: async ({ commit }) => {
      commit('TOGGLE_IS_LOADING');
      const res = await api.get('/', { headers: { 'Authorization': 'Basic ' + authCookie().code } });
      commit('SET_LIST', { projects: res.data });
      commit('TOGGLE_IS_LOADING');
    },
    LOAD_MORE_LOGS: async ({ commit }, count) => {
      const res = await api.get('/', { params: { skip: count }, headers: { 'Authorization': 'Basic ' + authCookie().code } });
      commit('APPEND', { logs: res.data })
    },
    ADD_NEW_PROJECT: async ({ commit }, project) => {
      try {
        console.log(project);
        const res = await api.post('/', project, { headers: { 'Authorization': 'Basic ' + authCookie().code } });
        commit('PREPEND', { project: res.data });
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
