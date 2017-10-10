<template>
  <v-app>
    <div id="app">
      <!-- <log-top-nav @expandSidebar="expanded = !expanded"></log-top-nav> -->
      <log-side-nav class="hidden-sm-and-down" @expandSidebar="expanded = !expanded"></log-side-nav>
      <div class="app-body">
        <router-view :expanded="expanded" @closeSidebar="expanded = !expanded"></router-view>
      </div>
      <log-bottom-nav class="hidden-md-and-up"></log-bottom-nav>
    </div>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Cookies from 'vue-cookie';

import TheSideNav from '@/components/TheSideNav.vue';
import TheTopNav from '@/components/TheTopNav.vue';
import TheBottomNav from '@/components/TheBottomNav.vue';

@Component({
  components: {
    'log-side-nav': TheSideNav,
    'log-top-nav': TheTopNav,
    'log-bottom-nav': TheBottomNav,
  }
})
export default class App extends Vue {
  expanded: boolean = false;
  
  mounted() {
    this.$store.dispatch('log/LOAD_LOG_LIST');
    this.$store.dispatch('project/LOAD_PROJECT_LIST');
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
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}
.app-body {
  background: #fff;
}
@media (min-width: 960px) {
  .app-body {
    margin-left: 9em;
  }
}
@media (min-width: 1260px) {
  .app-body {
    margin-left: 36em;
  }
}
</style>
