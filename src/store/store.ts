import Vue from 'vue';
import Vuex from 'vuex';

import { State } from './state';
import { log } from './log';
import { project } from './project';
import { invoice } from './invoice';

Vue.use(Vuex);

export const createStore = () =>  new Vuex.Store({
  modules: {
    log,
    project,
    invoice
  }
})

export const store = createStore();