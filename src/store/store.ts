import Vue from 'vue';
import Vuex from 'vuex';

import { State } from './state';
import { log } from './log';
import { project } from './project';

Vue.use(Vuex);

export const createStore = () =>  new Vuex.Store({
  modules: {
    log,
    project
  }
})

export const store = createStore();