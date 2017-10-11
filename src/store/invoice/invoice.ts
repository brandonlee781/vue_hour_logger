import Vue from 'vue';
import { ActionContext, Store, mapGetters } from 'vuex';
import { getStoreAccessors } from 'vuex-typescript';
import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';

import * as types from '../mutation-types';

import { State as RootState } from '../state';
import { InvoiceState, Invoice } from './invoiceState';
import { IAuthCookie } from '../../interfaces/authCookie';

const api = axios.create({
  baseURL: 'https://www.branlee.me/api/v1/invoices',
})
const authCookie = (): IAuthCookie => JSON.parse(Cookies.get('hourLoggerAuth'));

export const invoice = {
  namespaced: true,
  state: {
    isLoading: false,
    invoices: []
  },
  getters: {
    getInvoices(state: InvoiceState): Invoice[] {
      return state.invoices.map(invoice => invoice);
    },
    getInvoiceCount(state: InvoiceState): number {
      return state.invoices.length;
    }
  },
  mutations: {
    [types.SET_LIST](state, { invoices }) {
      state.invoices = invoices;
    },
    [types.PREPEND](state, { invoice }) {
      state.invoices.unshift(invoice);
    },
    [types.ADD](state, { invoices }) {
      state.invoices.push(...invoices);
    },
    [types.REMOVE](state, { invoice }) {
      const index = state.invoices.findIndex(l => l._id === invoice._id);
      state.invoices.splice(index, 1);
    },
    [types.UPDATE](state, { invoice }) {
      const index = state.invoice.findIndex(l => l._id === invoice._id);
      state.invoices.splice(index, 1, invoice);
    },
    'TOGGLE_IS_LOADING'(state) {
      state.isLoading = !state.isLoading;
    }
  },
  actions: {
    LOAD_INVOICE_LIST: async ({ commit }) => {
      commit('TOGGLE_IS_LOADING');
      const res = await api.get('/', { headers: { 'Authorization': 'Basic ' + authCookie().code } });
      commit('SET_LIST', { invoices: res.data });
      commit('TOGGLE_IS_LOADING');
    },
    ADD_NEW_INVOICE: async ({ commit }, invoice) => {
      try {
        const res = await api.post('/', invoice, { headers: { 'Authorization': 'Basic ' + authCookie().code } });
        commit('PREPEND', { invoice: res.data });
        return Promise.resolve('finished');
      } catch (err) {
        console.error(err);
      }
    },
  },
}