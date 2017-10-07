import Vue from 'vue';
import Vuex from 'vuex';

import { State } from './state';
import { log } from './log';

Vue.use(Vuex);

export const createStore = () =>  new Vuex.Store({
  modules: {
    log
  }
})

export const store = createStore();