<template>
  <v-bottom-nav :value="true" class="bran-bottom-nav">
    <v-btn flat :exact="true" to="/" class="bottom-nav-btn" active-class="bottom-nav-active">
      <span>Home</span>
      <v-icon>home</v-icon>
    </v-btn>
    <v-btn flat :exact="true" to="/projects" class="bottom-nav-btn" active-class="bottom-nav-active">
      <span>Projects</span>
      <v-icon>assignment</v-icon>
    </v-btn>
  </v-bottom-nav>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class TheBottomNav extends Vue {
  
}
</script>

<style lang="scss" scoped>
@import '../assets/app-colors.scss';
.bran-bottom-nav {
  background-color: $background;
}
.bottom-nav-btn {
  color: $text;
  filter: none !important;
  -webkit-filter: none !important;
}
.bottom-nav-active {
  color: $accent;
}
@media print {
  .bran-bottom-nav {
    display: none;
  }
}
</style>
