<template>
  <v-app>
    <div id="app">
      <log-top-nav @expandSideBar="expandSideBar"></log-top-nav>
      <div class="app-body">
        <log-side-nav :expanded="expanded"></log-side-nav>
        <router-view></router-view>
      </div>
    </div>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Cookies from 'vue-cookie';

import TheSideNav from './components/TheSideNav';
import TheTopNav from './components/TheTopNav';

@Component({
  components: {
    'log-side-nav': TheSideNav,
    'log-top-nav': TheTopNav,
  }
})
export default class App extends Vue {
  expanded = false;
  expandSideBar() {
    this.expanded = !this.expanded;
  }
  mounted() {
    this.$store.dispatch('log/LOAD_LOG_LIST');
  }
}
</script>

<style>
#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.app-body {
  display: flex;
  flex-flow: column nowrap;
  margin-top: 42px;
}
</style>
