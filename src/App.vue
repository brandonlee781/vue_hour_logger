<template>
  <v-app>
    <div id="app">
      <log-nav-bar v-if="this.$route.path !== '/invoice'" class="log-nav-bar" @expandSideBar="expandSideBar"></log-nav-bar>
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

@Component
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
